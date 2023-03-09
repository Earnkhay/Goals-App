<script setup>
import { useAuthStore } from '../stores/authStore';
import { RouterLink } from 'vue-router';

const store = useAuthStore()
</script>

<template>
    <div class="flex font-bold p-3 sm:px-8 border-b drop-shadow-sm items-center">
        <h1 class="text-2xl">GoalSetter</h1>

        <div class="ml-auto cursor-pointer flex">
            <h3 @click="store.setLoginPage" v-if="!store.isAuthenticated">{{ store.pageType == "signUp" ? "Login" : "Register" }}</h3>
            <h3 @click="store.logout" v-else>Logout</h3>
        </div>
    </div>
</template>
