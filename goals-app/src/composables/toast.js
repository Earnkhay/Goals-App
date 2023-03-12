import { ref } from "vue"
import Swal from 'sweetalert2'

export function useToast() {

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

  return { icon, title, showAlert }
}