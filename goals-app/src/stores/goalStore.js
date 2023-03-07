import { defineStore } from "pinia";
import axios from 'axios'
import pinia from "./store";
import { useAuthStore } from "./authStore";

const authStore = useAuthStore(pinia)

export const useGoalStore = defineStore('goalStore', {
    state: () => ({
        goal: '',
        goals: [],
        apiUrl: 'http://localhost:8000/api/goals'
    }),
    getters: {
    },
    actions: {
        async addGoal() {
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
            
                } catch (err) {
                  console.log(err.response.data.message);
                }
            }
        },

        getGoals(){
            axios.get(this.apiUrl, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            })
            .then((res) =>{
                this.goals = res.data
            })
            .catch((err) => {
                console.log(err.response.data.message);
            })
        }
    }
})