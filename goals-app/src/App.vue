<script setup>
import { RouterView } from 'vue-router'
import NavbarComp from './components/NavbarComp.vue';
</script>

<template>
  <div>
    <navbar-comp/>
    <RouterView />
  </div>
</template>
