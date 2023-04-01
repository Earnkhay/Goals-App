<script setup>
import { useAuthStore } from '../stores/authStore';
import { RouterLink } from 'vue-router';

const store = useAuthStore()
</script>

<template>
    <div class="flex font-bold p-3 sm:px-8 border-b drop-shadow-sm items-center">
        <h1 class="text-2xl">GoalSetter</h1>

        <div class="ml-auto cursor-pointer">
            <div class="flex items-center" @click="store.setLoginPage" v-if="!store.isAuthenticated">
                <i class="fa-solid text-lg mr-1" :class="[store.pageType == 'signUp' ? 'fa-right-to-bracket': 'fa-user-plus']"></i>
                <h3>{{ store.pageType == "signUp" ? "Login" : "Register" }}</h3>
            </div>
            <div class="flex items-center" v-else>
                <i class="fa-solid fa-right-from-bracket mr-1"></i>
                <h3 @click="store.logout">Logout</h3>
            </div>
        </div>
    </div>
</template>
