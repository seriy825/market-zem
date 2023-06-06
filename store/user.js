import { useAuthStore } from "./auth";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
      return {
          user:{}
      };
  },
  actions: {      
      async fetchUser(){
        try{          
          const {token} = useAuthStore();
          return await $fetch(useRuntimeConfig().public.backendUrl+'/api/user/'+token).then(response=>{
            this.user=response.user;
          });
        }
        catch(err){
          console.error(err);
        }
      },  
      async updateUser(updatedUser){
        try{          
          return await $fetch(useRuntimeConfig().public.backendUrl+'/api/user/'+this.user.id,{
            method:'POST',
            body:updatedUser,
          }).then(response=>{
            useAuthStore().user=response;
          });
        }
        catch(err){
          console.error(err);
        }
      },    
  },
  persist: true,
});
