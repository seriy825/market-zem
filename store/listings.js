import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useAuthStore } from "./auth";

export const useListingStore = defineStore("listings", {
  state: () => {
      return {
          listings:null,
          total:0,
          current_page:1,
          per_page:null,
          next_page_url:null,
          prev_page_url:null,
          first_page_url:null,
          last_page_url:null,
          path:null,
      };
  },
  getters:{
    pages:state=>Math.ceil(state.total / state.per_page)
  },
  actions: {
      async createListing(data){
        try{
          const formData = new FormData();
          const {token} = useAuthStore();
          for (const key in data){
            if (data[key]){
              if (key=='images') {
                for (let i=0;i<data[key].length;i++){                        
                  formData.append('images[]',data[key][i]);
                }                
              }
              else formData.append(key,data[key]);
            }
          }
          formData.append('token',token);
          return await $fetch(useRuntimeConfig().public.backendUrl+'/api/listings',{
            method:'POST',
            body:formData
          });
        }
        catch(err){
          console.error(err);
        }
      },
      async fetchListingsForUser(data){
        try{          
          data ? data+='&approved=1' : data='?approved=1';
          return await $fetch(useRuntimeConfig().public.backendUrl+'/api/listings'+data).then(response=>{ 
            this.listings = response.data;
            this.total=response.total;
            this.current_page=response.current_page;
            this.per_page=response.per_page;
            this.next_page_url=response.next_page_url;
            this.prev_page_url=response.prev_page_url;
            this.first_page_url=response.first_page_url;
            this.last_page_url=response.last_page_url;
            this.path=response.path;
          })
        }
        catch(err){
          console.error(err);
        }
      },   
      async fetchListingsByUser(data){
        try{          
          const {id} = useUserStore().user;          
          return await $fetch(useRuntimeConfig().public.backendUrl+'/api/user/listings/'+id+data).then(response=>{ 
            this.listings = response.data;
            this.total=response.total;
            this.current_page=response.current_page;
            this.per_page=response.per_page;
            this.next_page_url=response.next_page_url;
            this.prev_page_url=response.prev_page_url;
            this.first_page_url=response.first_page_url;
            this.last_page_url=response.last_page_url;
            this.path=response.path;
          })
        }
        catch(err){
          console.error(err);
        }
      },  
      async fetchListingsForAdmin(data){
        try{          
          data ? data+='&approved=0' : data='?approved=0';
          return await $fetch(useRuntimeConfig().public.backendUrl+'/api/listings'+data).then(response=>{
            this.listings = response.data;
            this.total=response.total;
            this.current_page=response.current_page;
            this.per_page=response.per_page;
            this.next_page_url=response.next_page_url;
            this.prev_page_url=response.prev_page_url;
            this.first_page_url=response.first_page_url;
            this.last_page_url=response.last_page_url;
            this.path=response.path;
          })
        }
        catch(err){
          console.error(err);
        }
      }, 
      async fetchListing(id){
        try{
          return await $fetch(useRuntimeConfig().public.backendUrl+'/api/listings/'+id);
        }
        catch(err){
          console.error(err);
        }
      },
      async approve(listingId){
        await $fetch(useRuntimeConfig().public.backendUrl+'/api/listings/'+listingId,{
          method:'POST'
        });
        const index = this.listings.map(listing=>listing.id).indexOf(listingId);
        this.listings.splice(index,1);
      },
      async decline(listingId){
        await $fetch(useRuntimeConfig().public.backendUrl+'/api/listings/'+listingId,{
          method:'DELETE'
        });
        const index = this.listings=this.listings.map(listing=>listing.id).indexOf(listingId);
        this.listings.splice(index,1);
      }  
  },
  persist: true,
});
