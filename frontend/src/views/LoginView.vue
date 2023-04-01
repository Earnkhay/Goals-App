<script setup>
import { useAuthStore } from "../stores/authStore";
import LoginForm from "../components/LoginForm.vue";

const store = useAuthStore()

</script>

<template>
    <div class="max-h-screen">
        <div class="text-center mb-4 font-bold pt-28">
            <div class="flex justify-center items-center">
                <i class="fa-solid text-2xl mr-2 mb-2" :class="[store.pageType == 'signUp' ? 'fa-user-plus': 'fa-right-to-bracket']"></i>
                <h1 class="text-4xl mb-3">{{store.pageType == "signUp" ? 'Register' : 'Login'}}</h1>
            </div>
            <h3 class="text-2xl sm:text-3xl text-gray-400">{{ store.pageType == "signUp" ? "Please create an account" : "Login and start setting goals" }}</h3>
        </div>
        <LoginForm/>
    </div>
</template>
