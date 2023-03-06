import { defineStore } from "pinia";
import pinia from "./store";
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('authStore', () => {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const pageType = ref('signUp')
    const url = ref('http://localhost:8000/api/users')
    const router = useRouter()
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)

    function setUser(data) {
        user.value = data
        localStorage.setItem('user', JSON.stringify(data))
    }
    
    const isAuthenticated = computed(() => {
        return !!user.value
    })

    async function handleSubmit() {
        if(pageType.value == 'signUp' && name.value != '' && email.value != '' && password.value != ''){
            await axios.post(url.value, {
                name: name.value,
                email: email.value,
                password: password.value
            })
            .then((res) => {
                console.log(res);
                pageType.value == "login"
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }else if(pageType.value == 'login' && email.value != '' && password.value != ''){
            await axios.post(`${url.value}/login`, {
                email: email.value,
                password: password.value
            })
            .then(async (res) => {
                const token = res.data.token;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await axios.get(`${url.value}/me`)
                    .then((res) => {
                        setUser(res.data)
                        router.push('/')
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

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        axios.defaults.headers.common['Authorization'] = ''
        user.value = null
        router.push('/login')
    }

    return { name, email, password, pageType, user, handleSubmit, setLoginPage, isAuthenticated, logout }
})

pinia.use(useAuthStore)
// useAuthStore(pinia)