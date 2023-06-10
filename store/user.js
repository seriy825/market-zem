import { useAuthStore } from "./auth";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
        errors:null,        
    };
  },  
  actions: {      
      async updateUser(updatedUser){
        try{          
          const {user} = useAuthStore();
          return await $fetch(useRuntimeConfig().public.backendUrl+'/api/user/'+user.id,{
            method:'POST',
            body:updatedUser,
          }).then(response=>{
            if (response.status===200){
              useAuthStore().user=response.user;
              this.errors=null;
            }
            else if (response.email||response.phone||response.name){
              this.errors='Введені некоректні дані!';        
            }            
          });
        }
        catch(err){
          console.error(err);
        }
      },    
      clearErrors(){
        this.errors=null;
      }
  },
  persist: true,
});
