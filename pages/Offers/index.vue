<template>
  <section class="offers-section">
    <h2 class="offers-section_header">Пошук ділянок</h2>
    <div class="d-flex justify-content-between align-items-center row">
      <VueSelect 
        v-model="params.region" 
        :options="regions"        
        class="offers-section_select col" 
        placeholder="Область"         
        @option:selected="fetchDistincts"         
        @click="deselect"
      >
        <template v-slot:no-options="{ search, searching }">
          <template v-if="searching">
            Не знайдено результатів
          </template>
          <em v-else style="opacity: 0.5">Дані завантажуються...</em>
        </template>
      </VueSelect>
      <VueSelect 
        v-model="params.distinct" 
        :options="distincts" 
        class="offers-section_select col" 
        placeholder="Район" 
        @option:selected="fetchCities" 
        @click="deselect"
      >
        <template v-slot:no-options="{ search, searching }">
          <template v-if="searching">
            Не знайдено результатів
          </template>
          <em v-else style="opacity: 0.5">Дані завантажуються...</em>
        </template>
      </VueSelect>
      <VueSelect 
        v-model="params.city" 
        :options="cities" 
        class="offers-section_select col" 
        placeholder="Населений пункт"
        :reduce="city => city.name" 
        label="name"
      >
        <template v-slot:no-options="{ search, searching }">
          <template v-if="searching">
            Не знайдено результатів
          </template>
          <em v-else style="opacity: 0.5">Дані завантажуються...</em>
        </template>
      </VueSelect>
      <div class="collapse row" id="filters">
        <div class="offers-section_price col-lg-6">
          <div class="row gap-3 gap-lg-0 mt-2">
            <h4>Ціна</h4>
            <div class="input-group col-lg align-items-center">
              <label for="from" class="me-3">Від</label>
              <input name="from" class="form-control" type="text" v-model="params.priceFrom" placeholder="грн"/>
            </div>
            <div class="input-group col-lg align-items-center">
              <label for="to" class="me-3">До</label>
              <input name="to" class="form-control" type="text" v-model="params.priceTo" placeholder="грн"/>
            </div>
          </div>
        </div>
        <div class="offers-section_square col-lg-6">
          <div class="row gap-3 gap-lg-0 mt-2">
            <h4>Площа</h4>
            <div class="input-group col-lg align-items-center">
              <label for="from" class="me-3">Від</label>
              <input name="from" class="form-control" type="text" v-model="params.squareFrom" placeholder="га"/>
            </div>
            <div class="input-group col-lg align-items-center">
              <label for="to" class="me-3">До</label>
              <input name="to" class="form-control" type="text" v-model="params.squareTo" placeholder="га"/>
            </div>
          </div>
        </div>
        <div class="offers-section_rental col-lg-6">
          <div class="row mt-3">
            <h4>Оренда</h4>
            <div class="input-group col-lg align-items-center">
              <label for="status" class="col-3 col-lg">Статус оренди</label>
              <VueSelect v-model="status" :options="rental_statuses" class="offers-section_select col" placeholder="Статус оренди"/>
            </div>
            <div class="input-group col-lg align-items-center justify-content-between gap-5 gap-lg-0" v-if="status==='В оренді'">
              <label for="to" class="me-3 col-lg-1 col-2">До</label>
              <input name="to" class="form-control" type="text" v-model="params.rental_status" placeholder="Рік"/>
            </div>
          </div>
        </div>        
      </div>
    </div>    
    <div class="offers-section d-flex align-items-center justify-content-between my-3">
      <div class="offers-section_buttons d-flex align-items-center mb-3 mb-lg-0">
        <button class="btn btn-warning me-lg-5 mb-3 mb-lg-0" @click="search">Знайти<img src="../../assets/img/searchIcon.png"/></button>
        <button class="btn btn-secondary" @click="reset">Скинути фільтри</button>
      </div> 
      <a href="#filters" data-bs-toggle="collapse" class="offers-section_collapse-btn" @click="collapsed=!collapsed">
        {{ collapsed?'Згорнути фільтри':'Розгорнути фільтри' }}
      </a>          
    </div>    
    <div class="offers-section_sort mt-3 d-flex flex-row-reverse">
      <div class="col col-lg-3">
        <VueSelect v-model="sort" :value="params.createSort||params.priceSort" :options="sorts" label="label" class="offers-section_select " placeholder="Спочатку новіші">
          <template #option="{ label, createSort, priceSort }">
            <li @click="setSorting(createSort,priceSort)">{{ label }}</li>
          </template>
        </VueSelect>
      </div>
    </div>
    <TheListings/>
  </section>
</template>
<script>
import { mapActions } from 'pinia';
import { useListingStore } from '~/store/listings';
import  VueSelect  from "vue-select";
  export default{
    components:{
      VueSelect,
    },
    props:{
      region:'',
      distinct:'',
      city:''
    },
    data(){
      return{
        regions:[],
        distincts:[],
        cities:[],        
        collapsed:false,
        status:'',
        sort:'',
        rental_statuses:['В оренді','Не в оренді','Не вказано'],
        sorts:[
          {
            label:'Спочатку новіші',
            createSort:'desc',
            priceSort:'',
          },           
          {
            label:'Спочатку старіші',
            createSort:'asc',
            priceSort:'',
          },
          {
            label:'Спочатку дорожчі',
            priceSort:'desc',
            createSort:'',
          },
          {
            label:'Спочатку дешевші',
            priceSort:'asc',
            createSort:'',
          }
        ],
        params:{
          region:'',
          distinct:'',
          city:'',
          rental_status:'',        
          priceFrom:'',
          priceTo:'',
          squareFrom:'',
          squareTo:'',
          priceSort:'',
          createSort:'',
        }        
      }
    },
    async mounted(){
      this.regions = await $fetch(this.$config.public.backendUrl+'/api/regions');
      if (this.$route.query){
        if (this.$route.query.region)
        {
          this.params.region=this.$route.query.region;
          if (this.$route.query.distinct)
          {
            this.params.distinct=this.$route.query.distinct;
            if (this.$route.query.city)
              this.params.city=this.$route.query.city;
          }
        }
      }
    },
    methods:{
      ...mapActions(useListingStore,['fetchListingsForUser']),
      async fetchDistincts(){
        this.params.distinct='';
        this.params.city='';
        this.distincts = await $fetch(this.$config.public.backendUrl+'/api/distincts/'+this.params.region);
      },
      async fetchCities(){
        this.params.city='';
        this.cities = await $fetch(this.$config.public.backendUrl+'/api/cities/'+this.params.region+'/'+this.params.distinct);
      },
      deselect(){
        if (this.params.region==null){
          this.distincts=[];
          this.cities=[];     
          this.params.distinct='';     
        }       
        else if (this.params.distinct==null){
          this.cities=[];
          this.params.city='';
        } 
      },
      reset(){
        this.params.distinct='';
        this.params.city='';
        this.params.region='';
        this.params.priceFrom='';
        this.params.priceTo='';
        this.params.squareFrom='';
        this.params.squareTo='';
        this.params.year='';
        this.params.rental_status='';
        this.status='';
        history.pushState(
            {},
            null,
            this.$route.path +''
        );
      },    
      async setSorting(createSort,priceSort){
        if (createSort){
          this.params.createSort=createSort
          this.params.priceSort='';
        }
        else{
          this.params.priceSort=priceSort
          this.params.createSort='';
        };
        await this.search();
      },
      async search(){
        if (this.status=='Не в оренді'){
          this.params.rental_status=new Date().getFullYear()-1;
        }
        history.pushState(
            {},
            null,
            this.$route.path +
            '?' +
            Object.keys(this.params).map(key => {
                return (this.params[key] && this.params[key].length!==0)?(encodeURIComponent(key) + '=' + encodeURIComponent(this.params[key])):""
            }).filter(element => element!=='').join('&')
        )
        await this.fetchListingsForUser(window.location.search);
      }  
    }
  }
</script>
<style lang="scss">
  @import "vue-select/dist/vue-select.css";
  .offers-section{
    .btn{
      border-radius: 20px;
      img{
        margin-left:55px;
        height:25px;
      }
      &-secondary{
        padding:10px 18px;
      }
    }
    &_header{
      margin:90px 0 41px;
    }
    &_collapse-btn{
      color:#000;
      text-decoration: none;
      &:hover{
        text-decoration: underline;
        color:#000;
        cursor:pointer;
      }
    }
    &_select{     
      .vs__dropdown-toggle{
        border-radius: 20px;
        height: 40px;
        margin:10px 0;
        overflow:hidden;
      }
      .vs__actions{
        cursor: pointer;
      }
      .vs__dropdown-menu{
        border-radius: 20px;
        font-size:14px;
        ol,ul{
          padding-left: 0;
        }
      }  
      .vs__selected-options{
        flex-wrap: nowrap;
        &:has(span){
          input{
            display:none;
          }
        }
      }    
      .vs__selected{
        white-space: nowrap;
      }      
    }    
  }
  h4{
    margin: 0;
  }
  .form-control{
    border-radius: 20px !important;
    &:focus{
      box-shadow: 0px 0px 35px -15px rgba(254, 162, 4,1);
      border-color: #fea204;
    }
  }
</style>