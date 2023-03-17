import { defineStore } from "pinia";
import axios from 'axios'
import pinia from "./store";
import { useAuthStore } from "./authStore";
import { ref } from "vue";
import { useToast } from "../composables/toast";

const authStore = useAuthStore(pinia)

export const useGoalStore = defineStore('goalStore', () => {
    const goal = ref('')
    const goals = ref([])
    const isLoading = ref(false)
    const loading = ref(false)
    const apiUrl = ref('http://localhost:8000/api/goals')
    const { icon, title, showAlert } = useToast()

    const addGoal = async () =>  {
        loading.value = true
        if (goal.value !== '') {
            try {
              const res = await axios.post(apiUrl.value, {
                text: goal.value,
              }, {
                headers: {
                  Authorization: `Bearer ${authStore.token}`
                }
              });
              goal.value = '';
              goals.value.push(res.data);
              loading.value = false
              icon.value = 'success'
              title.value = 'Goal added successfully'
              showAlert()
            } catch (err) {
              icon.value = 'error'
              title.value = `${err.response.data.message}`
              showAlert()
            }
        }else{
            icon.value = 'info'
            title.value = 'Please add a goal'
            showAlert()
            loading.value = false
        }
    }

    const deleteGoal = async (id) => {
        await axios.delete(`${apiUrl.value}/${id}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
        .then(async () =>{
            await getGoals()
            icon.value = 'success'
            title.value = 'Goal deleted successfully'
            showAlert()
        })
        .catch((err) => {
            icon.value = 'error'
            title.value = `Failed to delete goal with: ${err.response.data.message}`
            showAlert()
        })
    }

    const getGoals = async () => {
        isLoading.value = true
        await axios.get(apiUrl.value, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
        .then((res) =>{
            isLoading.value = false
            goals.value = res.data
        })
        .catch((err) => {
            icon.value = 'error'
            title.value = `${err.response.data.message}`
            showAlert()
        })
    }

    return { goal, goals, isLoading, loading, addGoal, deleteGoal, getGoals}
})