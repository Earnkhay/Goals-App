<script setup>
import { useLoginStore } from '../stores/loginStore';

const store = useLoginStore()
</script>

<template>
    <div class="flex bg-red-50 font-bold p-3 sm:px-8 border-b drop-shadow-sm items-center">
        <h1 class="text-2xl">GoalSetter</h1>

        <div class="ml-auto cursor-pointer" @click="store.setLoginPage" >
            <h3 class="">{{ store.pageType == "signUp" ? "Login" : "Register" }}</h3>
        </div>
    </div>
</template>
