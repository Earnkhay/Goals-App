<script setup>
const props = defineProps({
    type: String,
    placeholder: String
})
</script>
<template>
    <div class="mb-3">
        <input :type="type" class="input" :placeholder="placeholder" required>
    </div>
</template>