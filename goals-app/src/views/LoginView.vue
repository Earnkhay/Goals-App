<script setup>
import { ref } from "vue";
import axios from 'axios'
import ButtonComp from "../components/ButtonComp.vue";

const name = ref('')
const email = ref('')
const password = ref('')
const url = ref('http://localhost:8000/api/users')

const handleSubmit = () => {
    if(name.value != '' && email.value != '' && password.value != ''){
        console.log(name.value, url.value);
        axios.post(url.value, {
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
    }
}
</script>

<template>
    <div>
        <h1>Sign up</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="name" placeholder="name" required>
            <input type="email" v-model="email" placeholder="email" required>
            <input type="password" v-model="password" placeholder="password" required>
            <button-comp>Login</button-comp>
        </form>
    </div>
</template>


<style lang="scss" scoped>

</style>