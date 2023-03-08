<script setup>
import ButtonComp from './ButtonComp.vue';
import { useGoalStore } from '../stores/goalStore';

const store = useGoalStore()

</script>

<template>
    <div class="mb-4">
        <div class="mb-3">
            <input type="text" class="input" v-model="store.goal" placeholder="Goal"  @keydown.enter="store.addGoal" required>
        </div>
        <button-comp @click.prevent="store.addGoal">Add Goal</button-comp>
    </div>
</template>