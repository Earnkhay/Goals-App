<script setup>
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
import ButtonComp from "./ButtonComp.vue";

const store = useAuthStore()

const { name, email, password, pageType, emailError, errMsg } = storeToRefs(store)

</script>

<template>
    <form @submit.prevent="store.handleSubmit" class="text-center">
        <div class="mb-3" v-if="pageType == 'signUp'">
            <input type="text" class="input" v-model="name" placeholder="name" required>
        </div>
        <div class="mb-3">
            <input type="email" @input="store.validateEmail" :class="{ 'focus:outline-red-600': emailError, 'outline-red-600': emailError }" class="input" v-model="email" placeholder="email" required>
            <p v-if="emailError" class="text-red-500">! {{ errMsg }}</p>
        </div>
        <div class="mb-3">
            <input type="password" class="input" v-model="password" placeholder="password" required>
        </div>
        <button-comp>
            {{ pageType == "signUp" ? "Register" : "Login"}}
        </button-comp>
    </form>
</template>

