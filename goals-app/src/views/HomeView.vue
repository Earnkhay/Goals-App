<script setup>
import NavbarComp from '../components/NavbarComp.vue';
import { useAuthStore } from '../stores/authStore';
// import { useGoalStore } from '../stores/goalStore';
import GoalsForm from '../components/GoalsForm.vue';
import goalsDetails from '../components/goalsDetails.vue';

const authStore = useAuthStore();
// const store = useGoalStore()

// store.getGoals()

</script>

<template>
  <main>
    <navbar-comp/>
    <div class="text-center">
      <div class="mb-4 font-bold pt-14">
          <h1 class="text-4xl mb-3">Welcome {{ authStore.user?.name }}</h1>
          <h3 class="text-2xl sm:text-3xl text-gray-400">Goals dashboard</h3>
      </div>
      
      <goals-form/>

      <goals-details/>
    </div>
  </main>
</template>
