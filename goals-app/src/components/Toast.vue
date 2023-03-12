<script setup>
import Swal from 'sweetalert2'
import { ref } from 'vue'

const icon = ref('')
const title = ref('')

const showAlert = ()=> {
    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    }).fire({
        icon: icon.value,
        title: title.value,
    })
}
</script>

<template>
    <div>

    </div>
</template>


<style lang="scss" scoped>

</style>