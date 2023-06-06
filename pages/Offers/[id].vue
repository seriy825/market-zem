<template>
  <div class="d-flex align-items-center justify-content-center" v-if="!listing.square">
    <div class="loading spinner-border text-warning" role="status" >
      <span class="visually-hidden">Завантаження...</span>
    </div>
  </div>
  <section class="offer-section mb-5" v-else>
    <hr/>
    <div class="row offer-section_header justify-content-center gap-5">
      <div class="col-lg-4 col-8">
        <Swiper
          :modules="[SwiperAutoplay]"
          :slides-per-view="1"
          :loop="true"  
          :autoplay="{
            delay: 2500,
          }"               
        >
          <SwiperSlide v-for="slide in listing.images" :key="slide">
            <img class="col-12" :src="slide.url">
          </SwiperSlide>
        </Swiper>        
      </div>
      <div class="col-lg col-12 d-flex justify-content-between flex-column ">
        <div>
          <h6 class="fw-bold">{{ listing.square }} Га / {{ convertCity(listing.city.name) }}</h6>
          <p>{{ convertCity(listing.city.community) }}, {{ convertCity(listing.city.region) }}</p>
          <p >Продавець : {{ listing.user?.name }}</p>
          <p v-if="show">Номер телефону : {{ listing.user?.phone }}</p>
          <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal">
            Задати питання
          </button>        
          <button class="btn btn-danger fw-bold mx-sm-2 my-sm-0 my-2" data-bs-toggle="modal" data-bs-target="#delete" v-if="listing.user.id===user.id||isAdmin">
            Видалити оголошення
          </button>   
        </div>
        <div class="row align-items-center">
          <span class="clickable col" @click="showPhone">{{show?'Сховати номер телефону':'Переглянути номер телефону'}}</span>
          <p class="col">Створено {{ convertDate(listing.created_at) }}</p>
          <button class="btn col" @click.prevent="removeListingFromFavorites()" v-if="checkFavoriteListing()&&!isAdmin">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
          </button>
          <button class="btn col" @click.prevent="addListingToFavorites()" v-else-if="!isAdmin">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="" class="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <hr/>
    <div class="row mb-5 text-center">
      <div class="col-md-4 col-sm-12">
        <h6 class="fw-bold">Статус оренди</h6>
        <p>{{ listing.rental_status?'в оренді'+listing.rental_status:'Не вказано' }}</p>
      </div>
      <div class="col-md-4 col-sm-12">
        <h6 class="fw-bold">Загальна орендна плата</h6>
        <p>{{ listing.rental_price?listing.rental_price:'Не вказано' }}</p>
      </div>
      <div class="col-md-4 col-sm-12">
        <h6 class="fw-bold">Нормативна грошова оцінка</h6>
        <p>{{ listing.price?listing.price:'Не вказано' }}</p>
      </div>
    </div>
    <h6 class="fw-bold">Цільове призначення : {{ listing?.assignment.name }}</h6>
    <p class="fw-bold">Опис ділянки</p>
    <p class="mb-5">{{ listing.description }}</p>
    <a :href="'https://kadastr.live/parcel/'+listing.cadastral_number" class="mb-5">Більше інформації ви можете переглянути за цим посиланням</a>
  </section>
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body d-flex flex-column justify-content-center align-items-center">
          <img src="../../assets/img/logo.svg"/>
          <div class="content">
            <p>Якщо маєте питання стосовно даного оголошення - ви можете звернутись до нас через:</p>
            <p>Вайбер (+380684607564)</p>
            <p>Телеграм (+380684607564)</p>            
          </div>
          <button class="btn" data-bs-dismiss="modal">Зрозуміло</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="delete" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <img class="mx-auto d-block" src="../../assets/img/logo.svg"/>
          <div class="content">
            <p>Ви впевнені, що бажаєте видалити це оголошення?</p>
          </div>
          <div class="row align-items-center justify-content-center gap-5">
            <button class="btn col-3 text-danger fw-bold" data-bs-dismiss="modal" @click="deleteListing(listing.id)">Так</button>
            <button class="btn col-3 fw-bold" data-bs-dismiss="modal">Ні</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions,mapState } from 'pinia';
import { useListingStore } from '~/store/listings';
import { useAuthStore } from '~/store/auth';
  export default{
    data(){
      return{
        listing:{
          city:{},
          images:[],
          assignment:{}
        },
        show:false,
      }
    },
    computed:{
      ...mapState(useAuthStore,['user','isAdmin']),
    },
    async mounted(){
      this.listing = await this.fetchListing(this.$route.params.id);
    },
    methods:{
      ...mapActions(useListingStore,['fetchListing','addToFavorites','removeFromFavorites','deleteListing']),
      convertCity(field){
        return field?.charAt(0) + field?.toLowerCase().slice(1)
      },
      showPhone(){
        this.show=!this.show;
      },
      convertDate(field){
        const date = new Date(field);
        const day = date.getDate()>10?date.getDate():'0'+date.getDate();
        const month = date.getMonth()>10?date.getMonth():'0'+date.getMonth();
        const hours = date.getHours()>10?date.getHours():'0'+date.getHours();
        const minutes = date.getMinutes()>10?date.getMinutes():'0'+date.getMinutes();
        return day+"."+month+"."+date.getFullYear()+", "+hours+":"+minutes+".";
      },
      async addListingToFavorites(){
        await this.addToFavorites(this.listing.id);
        this.listing.favorites.push(this.user);
      },
      async removeListingFromFavorites(){
        await this.removeFromFavorites(this.listing.id);
        this.listing.favorites=[];
      },
      checkFavoriteListing(){
        if (this.listing.favorites)
          return this.listing.favorites.find(item=>item.id===this.user.id);
        else
          return false;
      }
    }
  }
</script>
<style lang="scss">
  .offer-section{
    margin-top:50px;
    hr{      
      color:#FEA204;
    }
    p{
      margin:20px 0;
    }
    .clickable{
      &:hover{
        text-decoration: underline;
        cursor:pointer;
      }
    }
    .btn-warning{
      background-color: #fff;
      border:2px solid #000;
      &:hover{
        border:2px solid #FEA204;
      }
    }
    .btn-danger{
      background-color: #fff;
      color:#000;
      border:2px solid red;
      padding:9px ;
      &:hover{
        border:2px solid #FEA204;
      }
    }
  }
  .loading{
    position: absolute;
    top:50%;
    bottom:50%;
    left:50%;
    right:50%;
  }
</style>