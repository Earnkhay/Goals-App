<script setup>
import ButtonComp from "../components/ButtonComp.vue";
import { useLoginStore } from "../stores/loginStore";
import { storeToRefs } from "pinia";
import NavbarComp from "../components/NavbarComp.vue";

const store = useLoginStore()

const { name, email, password, pageType} = storeToRefs(store)

</script>

<template>
    <div class="min-h-screen">
        <navbar-comp/>
        <div class="text-center mb-4 font-bold pt-28">
            <h1 class="text-4xl mb-3">{{pageType == "signUp" ? 'Register' : 'Login'}}</h1>
            <h3 class="text-2xl sm:text-3xl text-gray-400">{{ pageType == "signUp" ? "Please create an account" : "Login and start setting goals" }}</h3>
        </div>
        <form @submit.prevent="store.handleSubmit" class="text-center">
            <div class="mb-3" v-if="pageType == 'signUp'">
                <input type="text" class="input" v-model="name" placeholder="name" required>
            </div>
            <div class="mb-3">
                <input type="email" class="input" v-model="email" placeholder="email" required>
            </div>
            <div class="mb-3">
                <input type="password" class="input" v-model="password" placeholder="password" required>
            </div>
            <button-comp>{{ pageType == "signUp" ? "Register" : "Login"}}</button-comp>
        </form>
    </div>
</template>
