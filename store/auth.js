import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
      return {
          token:null,
          role:null,
          user:null,
      };
  },
  getters: {
    authenticated:state=>state.token?true:false,
    isAdmin:state=>state.role=='admin',    
  },
  actions: {
      async login(data){
        return await $fetch(useRuntimeConfig().public.backendUrl+'/login',{
          method:'POST',
          body:data
        }).then(response=>{
          if (response.token){
            this.token = response.token;
            this.user=response.user;
            this.role = response.role;            
            localStorage.setItem('token',this.token);
            this.role=='admin'?useRouter().push({path:'/admin'}):useRouter().push({path:'/'});
          }
        })
      },
      async register(data){
        return await $fetch(useRuntimeConfig().public.backendUrl+'/register',{
          method:'POST',
          body:data,
        }).then(response=>{
          if (response.token){
            this.token = response.token;
            this.user=response.user
            localStorage.setItem('token',this.token); 
            router.push({path:'/'});         
          }
        });                        
      },
      async logout(){    
        await $fetch(useRuntimeConfig().public.backendUrl+'/logout',{
          method:'POST',
          body:{token:this.token}
        })
        localStorage.removeItem('token');
        this.token=null;
        this.role=null;        
        this.user=null;       
      }
  },
  persist: true,
});
