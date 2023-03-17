<script setup>
import { useAuthStore } from '../stores/authStore';
import { useGoalStore } from '../stores/goalStore';

const authStore = useAuthStore()
const store = useGoalStore()
</script>

<template>
    <div>
        <button class="btn">
            <i class="fa-solid fa-spinner animate-spin" v-if="store.loading || authStore.isLoading"></i>
            <slot v-else>Button</slot>
        </button>
    </div>
</template>
