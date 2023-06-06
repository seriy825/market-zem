<template>
  <div class="listings-section_actions card-actions" v-if="!isAdmin || checkRoute()">
    <button class="btn" data-bs-toggle="modal" data-bs-target="#modal" @click.prevent="">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="" class="bi bi-chat-right" viewBox="0 0 16 16">
        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
      </svg>
    </button>
    <button class="btn" @click.prevent="removeFromFavorites(listing.id)" v-if="checkFavoriteListing(listing.favorites)&&!isAdmin">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>
    </button>
    <button class="btn" @click.prevent="addToFavorites(listing.id)" v-else-if="!isAdmin">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
      </svg>
    </button>
  </div>
  <div class="listings-section_actions card-actions" v-else>
    <button class="btn" @click.prevent="decline(listing.id)">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="" class="bi bi-x-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </button>
    <button class="btn" @click.prevent="approve(listing.id)">        
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="" class="bi bi-check-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
      </svg>
    </button>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useListingStore } from '~/store/listings';
import { useAuthStore } from '~/store/auth';
export default{
    computed:{
        ...mapState(useAuthStore,['isAdmin','user','authenticated']),
    },
    props:{
      listing:{},
    },
    methods:{
      ...mapActions(useListingStore,['approve','decline','addToFavorites','removeFromFavorites']),
      checkRoute(){
        return this.$route.path==='/'|| this.$route.path=='/offers';
      },
      checkFavoriteListing(favorites){
        if(favorites!==undefined&&this.authenticated)
          return favorites.find(item=>item.id===this.user.id);
        else
          return false;
      }
    }
  }
</script>
<style lang="scss">
  .card-actions{
    text-align: right;
  } 
</style>