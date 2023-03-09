<script setup>
import { useDateFormat } from '../composables/dateFormat';
import { useGoalStore } from '../stores/goalStore';

const store = useGoalStore()

store.getGoals()

const { formatDate } = useDateFormat()

</script>

<template>
    <div>
        <div class="flex items-center justify-center mb-2" v-if="store.isLoading">
            <div
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
                >
            </div>
        </div>
        <div class="grid grid-cols-1 gap-y-5 md:grid-cols-2 lg:grid-cols-3 mb-3">
            <div v-for="(goal, id) in store.goals" :key="id" class="bg-gray-300 mx-3 px-2 pb-6">
                <div class="flex justify-end font-bold text-2xl">
                    <span class="cursor-pointer" @click="store.deleteGoal(goal._id)">X</span>
                </div>
                <div>
                    <p>{{ formatDate(goal.createdAt) }}</p>
                    <p class="font-bold">{{ goal.text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

