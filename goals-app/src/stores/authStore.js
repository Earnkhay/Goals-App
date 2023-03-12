import { defineStore } from "pinia";
import pinia from "./store";
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from "vue-router";
import { useToast } from "../composables/toast";

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
    const mailformat = ref(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    const emailError = ref(false)
    const errMsg = ref('')
    const { icon, title, showAlert } = useToast()
    showAlert

    function setUser(data) {
        user.value = data
        localStorage.setItem('user', JSON.stringify(data))
    }

    function validateEmail() {
        if (mailformat.value.test(email.value)) {
            emailError.value = false

        }else{
            emailError.value = true
            errMsg.value = 'Please input valid Email address'
        }
    }
    
    const isAuthenticated = computed(() => {
        return !!user.value
    })

    async function handleSubmit() {
        isLoading.value = true
        if(pageType.value == 'signUp' && !emailError.value && name.value != '' && email.value != '' && password.value != ''){
            await axios.post(url.value, {
                name: name.value,
                email: email.value,
                password: password.value
            })
            .then(() => {
                pageType.value = "login"
                isLoading.value = false
                icon.value = 'success'
                title.value = 'Signed up successfully'
                showAlert()
            })
            .catch((err) => {
                console.log(err.response.data.message);
                icon.value = 'error'
                title.value = `${err.response.data.message}`
                showAlert()
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
                        // router.go(0)
                        icon.value = 'success'
                        title.value = `Welcome ${res.data.name}, to your goals app`
                        showAlert()
                    })
                    .catch((err) => {
                        console.log(err);
                        icon.value = 'error'
                        title.value = `${err.response.data.message}`
                        showAlert()
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
        router.push('/login')
        // router.go(0)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        axios.defaults.headers.common['Authorization'] = ''
        user.value = null
        icon.value = 'success'
        title.value = 'Logged out successfully'
        showAlert()
    }

    return { name, email, password, pageType, user, emailError, errMsg, 
        token, isLoading, isAuthenticated, validateEmail, handleSubmit, setLoginPage, logout }
})

pinia.use(useAuthStore)
// useAuthStore(pinia)