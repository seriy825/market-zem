<template>
  <client-only>   
    <section class="listings-section" :style="$route.path=='/offers'?'margin-top:0':'margin-top:50px'">
      <h2 class="listings-section_header" :style="$route.path=='/offers'||$route.path==='/user/offers'||$route.path==='/user/favorites'?'display:none':''">
        {{ isAdmin && !checkRoute() ? 'Оголошення очікуючі підтверждення':'Оголошення'}}
      </h2>
      <div :class="$route.path!=='/'?'':'d-flex row'" v-if="listings?.length>0">
        <div :class="$route.path!=='/'?'mt-5':'col-md-12 col-lg-6 col-xl-4 mt-4'" v-for="listing in listings" :key="listing.id">
          <Listing :listing="listing"/> 
        </div>                  
      </div>        
      <div v-else>      
        <div class="d-flex align-items-center justify-content-center" v-if="processing">
          <div class="loading spinner-border text-warning" role="status" >
            <span class="visually-hidden">Завантаження...</span>
          </div>
        </div>   
        <div class="d-flex align-items-center justify-content-center flex-column" v-else>
          <h3>{{isAdmin&&$route.path=='/admin'?'На жаль, поки немає нових оголошень, очікуючих підтверждення...':$route.path==='/user/offers'?'Ви ще не додали жодного оголошення!':$route.path==='/user/favorites'?'Ви ще не додали жодного оголошення до обраних!':'Поки що немає оголошень...'}}</h3>
          <NuxtLink v-if="$route.path==='/user/offers'" to="/offers/create" class="btn btn-warning mt-5">Додати оголошення</NuxtLink>
        </div>
      </div>
      <div class="listings-section_buttons d-flex justify-content-end" v-if="$route.path=='/'">
        <NuxtLink :to="{path:'/offers'}" class="btn listings-section_button" v-if="listings.length>0">Всі оголошення</NuxtLink>  
        <NuxtLink :to="{path:'/offers/create'}" class="btn btn-warning" v-else-if="authenticated">Додати оголошення</NuxtLink>  
        <NuxtLink to="/auth/login" class="btn btn-warning" v-else >Додати оголошення</NuxtLink>
      </div>
      <div v-if="pages>1 && $route.path!=='/'">
        <nav class="mt-5 d-flex justify-content-end align-items-end">
          <ul class="pagination">
            <li class="page-item" aria-current="page">
              <button class="page-link" v-if="prev_page_url !== null" @click="changePage(1)">&lt;</button>
            </li>
            <li class="page-item">
              <button class="page-link" v-if="prev_page_url !== null" @click="changePage(current_page-1)">&lt;&lt;</button>
            </li>
            <li class="page-item">
              <button class="page-link" @click="changePage(current_page)">{{current_page}}</button>
            </li>
            <li class="page-item">
              <button class="page-link" v-if="next_page_url !== null" @click="changePage((current_page+1))">></button>
            </li>
            <li class="page-item">
              <button class="page-link" v-if="next_page_url !== null" @click="changePage(pages)">>></button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true" v-if="checkRoute">
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
  </client-only>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useListingStore } from '~/store/listings';
import { useAuthStore } from '~/store/auth';
  export default{
    data(){
      return{
        processing:true,
      }
    },
    computed:{
      ...mapState(useListingStore,['listings','current_page','pages','next_page_url','prev_page_url','first_page_url','last_page_url','path']),
      ...mapState(useAuthStore,['isAdmin','authenticated']),
    },
    async mounted(){
      if (this.isAdmin && !this.checkRoute()){
        if (this.$route.query)
          if (this.$route.path==='/')
          {
            await this.fetchListingsForAdmin('?limit=9');
            this.processing=false;
          }          
          else{
            await this.fetchListingsForAdmin(window.location.search);
            this.processing=false;
          }            
        else
        {
          await this.fetchListingsForAdmin();
          this.processing=false;
        }          
      }
      else 
        if (this.$route.query)
          if (this.$route.path==='/'){
            await this.fetchListingsForUser('?limit=9');
            this.processing=false;
          }            
          else if (this.$route.path==='/user/offers'){
            await this.fetchListingsByUser(window.location.search);
            this.processing=false;
          }
          else if (this.$route.path==='/user/favorites'){
            await this.fetchFavoritesByUser(window.location.search);
            this.processing=false;
          }
          else{
            await this.fetchListingsForUser(window.location.search);              
            this.processing=false;
          }          
        else{
          if (this.$route.path==='/user/offers'){
            await this.fetchListingsByUser();
            this.processing=false;
          }
          else{
            await this.fetchListingsForUser();
            this.processing=false;
          }
        }          
    },
    methods:{
      ...mapActions(useListingStore,['fetchListingsForUser','fetchListingsByUser','fetchListingsForAdmin','fetchFavoritesByUser']),
      checkRoute(){
        return this.$route.path==='/'|| this.$route.path==='/offers';
      },
      changePage(page){
        this.$route.query={
          ...this.$route.query,
          page
        };
        history.pushState(
            {},
            null,
            this.$route.path +
            '?' +
            Object.keys(this.$route.query).map(key => {
                return (this.$route.query[key] && this.$route.query[key].length!==0)?(encodeURIComponent(key) + '=' + encodeURIComponent(this.$route.query[key])):""
            }).filter(element => element!=='').join('&')
        )
        if (this.$route.path==='/user/offers')
            if (this.$route.query.page)
              this.fetchListingsByUser(window.location.search)
            else
              this.fetchListingsByUser()
        else
          this.fetchListingsForUser(window.location.search)
      }
    }
  }
</script>
<style lang="scss">
  .listings-section{
    margin:75px 0;
    &_button{
      margin-top:35px;
      border: 2px solid #000000;
      font-weight: 600;
      border-radius: 10px;
      &:hover{
        border: 2px solid #fea204;
        border-radius: 10px;
      }
    }
    h3{
      @media(max-width:756px){
        font-size:16px;
      }
      @media((min-width:757px) and (max-width:991px)){
        font-size:20px;
      }
    }
    .pagination{
      gap:10px;
      .page-item{
        .page-link{
          color:#000;
          border:2px black solid;
          border-radius: 20px;
          padding:5px 15px;
          font-size:20px;
          &:focus{
            box-shadow: 0px 0px 35px -15px #000;
          }
        }
      }
    }
  }
</style>