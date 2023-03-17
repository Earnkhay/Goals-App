<script setup>
import { useDateFormat } from '../composables/dateFormat';
import { useGoalStore } from '../stores/goalStore';

const store = useGoalStore()

store.getGoals()

const { formatDate } = useDateFormat()

</script>

<template>
    <div>
        <i class="fa-solid fa-spinner animate-spin text-3xl mb-2" v-if="store.isLoading"></i>
        <div class="text-xl" v-if="store.goals.length == 0 && !store.isLoading">No goals added yet</div>
        <div class="grid grid-cols-1 gap-y-5 md:grid-cols-2 lg:grid-cols-3 mb-3">
            <div v-for="(goal, id) in store.goals" :key="id" class="bg-gray-300 mx-3 px-2 pb-6">
                <div class="flex justify-end font-bold text-2xl">
                    <span class="cursor-pointer hover:text-red-500" @click="store.deleteGoal(goal._id)">x</span>
                </div>
                <div>
                    <p>{{ formatDate(goal.createdAt) }}</p>
                    <p class="font-bold">{{ goal.text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

