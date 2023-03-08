import { defineStore } from "pinia";
import axios from 'axios'
import pinia from "./store";
import { useAuthStore } from "./authStore";

const authStore = useAuthStore(pinia)

export const useGoalStore = defineStore('goalStore', {
    state: () => ({
        goal: '',
        goals: [],
        isLoading: false,
        apiUrl: 'http://localhost:8000/api/goals'
    }),
    getters: {
    },
    actions: {
        async addGoal() {
            this.isLoading = true
            if (this.goal !== '') {
                try {
                  const res = await axios.post(this.apiUrl, {
                    text: this.goal,
                  }, {
                    headers: {
                      Authorization: `Bearer ${authStore.token}`
                    }
                  });
                  this.goal = '';
                  this.goals.push(res.data);
                  this.isLoading = false
                } catch (err) {
                  console.log(err.response.data.message);
                }
            }else{
                alert('please add a goal')
            }
        },

        async deleteGoal(id) {
            await axios.delete(`${this.apiUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            })
            .then(async () =>{
                await this.getGoals()
                console.log(`Goal with id ${id} deleted successfully`);
            })
            .catch((err) => {
                console.log(`Failed to delete goal with id ${id}: ${err.response.data.message}`);
            })
        },

        async getGoals(){
            this.isLoading = true
            await axios.get(this.apiUrl, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            })
            .then((res) =>{
                this.isLoading = false
                this.goals = res.data
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }
    }
})