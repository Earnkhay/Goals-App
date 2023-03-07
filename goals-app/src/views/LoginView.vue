<script setup>
import { useAuthStore } from "../stores/authStore";
import NavbarComp from "../components/NavbarComp.vue";
import LoginForm from "../components/LoginForm.vue";

const store = useAuthStore()

</script>

<template>
    <div class="min-h-screen">
        <navbar-comp/>
        <div class="text-center mb-4 font-bold pt-28">
            <h1 class="text-4xl mb-3">{{store.pageType == "signUp" ? 'Register' : 'Login'}}</h1>
            <h3 class="text-2xl sm:text-3xl text-gray-400">{{ store.pageType == "signUp" ? "Please create an account" : "Login and start setting goals" }}</h3>
        </div>
        <LoginForm/>
    </div>
</template>
