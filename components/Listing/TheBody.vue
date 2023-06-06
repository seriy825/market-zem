<template>
  <div :class="$route.path!=='/'?'row':''">
    <img class="card-image_img col-md-3 d-md-block d-none" v-if="$route.path!=='/'" :src="listing.images[0]?.url"/>
    <div class="card-body" :class="$route.path!=='/'?'col-8':''">     
      <div class="listing-section_price card-title">
        <h5 class="fw-bold" v-if="$route.path!=='/offers'">{{ listing.square }} Га / {{ listing.price }}₴</h5>
        <div v-else>
          <h6 class="fw-bold">{{ listing.square }} Га / {{ convertCity(listing.city.name) }}</h6>
          <h6>{{ convertCity(listing.city.community) }}, {{ convertCity(listing.city.region) }}</h6>
        </div>

      </div>
      <div class="listings-section_location card-text" v-if="$route.path=='/'">
        <span>{{ convertCity(listing.city.community) }}</span>
        <p>{{ convertCity(listing.city.region) }}</p>
      </div>      
      <div class="listings-section_location card-text" v-else>
        <div class="row">
          <span class="col-lg-3">Площа : {{ listing.square }}</span>
          <span class="col-lg">Ціна оренди : {{ listing.rental_price?listing.rental_price+'₴':'не вказано' }}</span>
          <span class="col-lg">Статус оренди : {{ listing.rental_status?'в оренді до '+listing.rental_status:'не вказано' }}</span>
        </div>
        <span class="col">Цільове призначення ділянки : {{ listing.assignment.name }}</span>        
      </div>        
      <span class="col">Продавець : {{ listing.user.name }}</span>
      <TheButtons :listing="listing"/>
    </div> 
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useListingStore } from '~/store/listings';
import { useAuthStore } from '~/store/auth';
  export default{
    props:{
      listing:{
        square:'',
        price:'',
        user:{},
        city:{},
        images:{}
      },
    },
    computed:{
        ...mapState(useAuthStore,['isAdmin']),
    },    
    methods:{
      ...mapActions(useListingStore,['approve','decline']),
      checkRoute(){
        return this.$route.path==='/'|| this.$route.path=='/offers';
      },
      convertCity(field){
        return field.charAt(0) + field.toLowerCase().slice(1)
      }
    }
  }
</script>
<style lang="scss">
  img{
    object-fit: contain;
  }
  .btn{
    &:active{
      border-color:transparent !important;
    }    
    .bi{
      &-heart{
        &:hover{
          path{
            fill:red;
          }
        }
      }
      &-heart-fill{
        &:hover{
          path{
            fill:black;
          }
        }
      }
      &-chat-right{
        &:hover{
          path{
            fill:grey;
          }
        }
      }
      &-x-circle{
        &:hover{
          path{
            fill:red;
          }
        }
      }
      &-check-circle{
        &:hover{
          path{
            fill:green;
          }
        }
      }
    }
  }
  .card-body{    
    padding-bottom:0;
    padding-top:0;    
  }
</style>