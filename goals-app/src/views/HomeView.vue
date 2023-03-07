<script setup>
import NavbarComp from '../components/NavbarComp.vue';
import ButtonComp from '../components/ButtonComp.vue'
import { useAuthStore } from '../stores/authStore';
import { useGoalStore } from '../stores/goalStore';

const authStore = useAuthStore();
const store = useGoalStore()

store.getGoals()

// const goal = ref('')
// const apiUrl = ref('http://localhost:8000/api/goals')
// const goals = ref([])

// axios.get(apiUrl.value, {
//   headers: {
//       Authorization: `Bearer ${authStore.token}`
//   }
// })
// .then((res) =>{
//   goals.value = res.data
// })
// .catch((err) => {
//     console.log(err.response.data.message);
// })

// const addGoal = async () => {
//   if(goal.value != ''){
//     await axios.post(apiUrl.value, {
//         text: goal.value,
//     }, {
//         headers: {
//             Authorization: `Bearer ${authStore.token}`
//         }
//     })
//     .then((res) => {
//         console.log(res);
//         goal.value = ''
//     })
//     .catch((err) => {
//         console.log(err.response.data.message);
//     })
//   }
// }

</script>

<template>
  <main>
    <navbar-comp/>
    <div class="text-center">
      <div class="mb-4 font-bold pt-28">
          <h1 class="text-4xl mb-3">Welcome {{ authStore.user?.name }}</h1>
          <h3 class="text-2xl sm:text-3xl text-gray-400">Goals dashboard</h3>
      </div>

      <div class="mb-3">
          <input type="text" class="input" v-model="store.goal" placeholder="Goal" required>
      </div>
      <button-comp @click="store.addGoal">Add Goal</button-comp>

      <ul v-for="(goal, id) in store.goals" :key="id">
        <li>{{ goal.text }}</li>
      </ul>
    </div>
  </main>
</template>
