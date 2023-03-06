<script setup>
import NavbarComp from '../components/NavbarComp.vue';
import { useAuthStore } from '../stores/authStore';

const store = useAuthStore();
</script>

<template>
  <main>
    <navbar-comp/>

    <div class="text-center mb-4 font-bold pt-28">
        <h1 class="text-4xl mb-3">Welcome {{ store.user?.name }}</h1>
        <h3 class="text-2xl sm:text-3xl text-gray-400">Goals dashboard</h3>
    </div>
  </main>
</template>
