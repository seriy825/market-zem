import { useAuthStore } from "./auth";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  actions: {      
      async updateUser(updatedUser){
        try{          
          const {user} = useAuthStore();
          return await $fetch(useRuntimeConfig().public.backendUrl+'/api/user/'+user.id,{
            method:'POST',
            body:updatedUser,
          }).then(response=>{
            if (response.status===200)
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
