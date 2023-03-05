import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from 'axios'

export const useLoginStore = defineStore('loginStore', () => {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const pageType = ref('signUp')
    const url = ref('http://localhost:8000/api/users')

    async function handleSubmit() {
        if(pageType.value == 'signUp' && name.value != '' && email.value != '' && password.value != ''){
            await axios.post(url.value, {
                name: name.value,
                email: email.value,
                password: password.value
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }else if(pageType.value == 'login' && email.value != '' && password.value != ''){
            await axios.post(`${url.value}/login`, {
                email: email.value,
                password: password.value
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data.message);
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

    return { name, email, password, pageType, handleSubmit, setLoginPage }
})