import { defineStore } from "pinia";
import pinia from "./store";
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('authStore', () => {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const pageType = ref('signUp')
    const url = ref('http://localhost:8000/api/users')
    const router = useRouter()
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const token = ref(localStorage.getItem('token'))

    function setUser(data) {
        user.value = data
        localStorage.setItem('user', JSON.stringify(data))
    }
    
    const isAuthenticated = computed(() => {
        return !!user.value
    })

    async function handleSubmit() {
        isLoading.value = true
        if(pageType.value == 'signUp' && name.value != '' && email.value != '' && password.value != ''){
            await axios.post(url.value, {
                name: name.value,
                email: email.value,
                password: password.value
            })
            .then(() => {
                pageType.value = "login"
                isLoading.value = false
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }else if(pageType.value == 'login' && email.value != '' && password.value != ''){
            await axios.post(`${url.value}/login`, {
                email: email.value,
                password: password.value
            })
            .then( (res) => {
                isLoading.value = false
                const token = res.data.token;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                axios.get(`${url.value}/me`)
                    .then((res) => {
                        setUser(res.data)
                        router.push({name: 'home'})
                        router.go(0)
                        // console.log(router.push('/'));
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    function setLoginPage() {
        if(pageType.value == "signUp"){
            pageType.value = "login"
        }else if(pageType.value == "login"){
            pageType.value = "signUp"
        }
    }

    async function logout() {
        await router.push('/login')
        router.go(0)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        axios.defaults.headers.common['Authorization'] = ''
        user.value = null
    }

    return { name, email, password, pageType, user, token, isLoading, isAuthenticated, handleSubmit, setLoginPage, logout }
})

pinia.use(useAuthStore)
// useAuthStore(pinia)