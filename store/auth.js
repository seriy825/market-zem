import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
      return {
          token:null,
      };
  },
  getters: {
    authenticated:state=>state.token?true:false,
  },
  actions: {
      async login(data){
        try{          
          return await $fetch(useRuntimeConfig().public.backendUrl+'/login',{
            method:'POST',
            body:data
          }).then(response=>{
            this.token = response;
            localStorage.setItem('token',this.token);
            useRouter().push({path:'/'});
          })
        }
        catch(err){
          console.error(err);
        }
      },
      async register(data){
        try{         
          return await $fetch(useRuntimeConfig().public.backendUrl+'/register',{
            method:'POST',
            body:data,
          }).then(response=>{
            this.token = response;
            localStorage.setItem('token',this.token); 
            router.push({path:'/'});         
          });                        
        }
        catch(err){
          console.error(err);
        }          
      },
      async logout(){        
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', 'Bearer '+this.token);
        localStorage.removeItem('token');
        this.token=null;
      }
  },
  persist: true,
});
