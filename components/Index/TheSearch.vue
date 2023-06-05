<template>
  <section class="search-section">
    <h2 class="search-section_header">Пошук ділянок</h2>
    <div class="d-flex justify-content-between align-items-center row">
      <VueSelect @click="deselect" v-model="params.region" :options="regions" class="search-section_select col" placeholder="Область" @option:selected="fetchDistincts">
        <template v-slot:no-options="{ search, searching }">
          <template v-if="searching">
            Не знайдено результатів
          </template>
          <em v-else style="opacity: 0.5">Дані завантажуються...</em>
        </template>
      </VueSelect>
      <VueSelect @click="deselect" v-model="params.distinct" :options="distincts" class="search-section_select col" placeholder="Район" @option:selected="fetchCities">
        <template v-slot:no-options="{ search, searching }">
          <template v-if="searching">
            Не знайдено результатів
          </template>
          <em v-else style="opacity: 0.5">Дані завантажуються...</em>
        </template>
      </VueSelect>
      <VueSelect  v-model="params.city" :options="cities" :reduce="city => city.name" label="name" class="search-section_select col" placeholder="Населений пункт">
        <template v-slot:no-options="{ search, searching }">
          <template v-if="searching">
            Не знайдено результатів
          </template>
          <em v-else style="opacity: 0.5">Дані завантажуються...</em>
        </template>
      </VueSelect>
      <button class="btn btn-light col-sm-1 d-flex justify-content-center align-items-center" @click="search"><img src="../../assets/img/searchIcon.png"/></button>
    </div>
  </section>
</template>
<script>
  import  VueSelect  from "vue-select";
  export default{
    components:{
      VueSelect,
    },
    data(){
      return{
        regions:[],
        distincts:[],
        cities:[],
        params:{
          region:'',
          distinct:'',
          city:'',
        }
      }
    },
    async mounted(){
      this.regions = await $fetch(this.$config.public.backendUrl+'/api/regions');
    },
    methods:{
      async fetchDistincts(){
        this.params.city='';
        this.params.distinct='';
        this.distincts = await $fetch(this.$config.public.backendUrl+'/api/distincts/'+this.params.region);
      },
      async fetchCities(){
        this.params.city='';
        this.cities = await $fetch(this.$config.public.backendUrl+'/api/cities/'+this.params.region+'/'+this.params.distinct);
      },
      search(){
        const query={};
        if (this.params.region)
        {     
          query.region=this.params.region;   
          if (this.params.distinct)
          {
            query.distinct=this.params.distinct;
            if (this.params.city)
              query.city = this.params.city;
          }
        }
        this.$router.push({
          path:'/offers',
          query
        });
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
    }
  }
</script>
<style lang="scss">
  @import "vue-select/dist/vue-select.css";
  .search-section{
    .btn{
      border-radius: 20px;
      border:1px solid black;
    }
    &_header{
      margin:90px 0 41px;
    }
    &_select{     
      .vs__dropdown-toggle{
        border-radius: 20px;
        height: 40px;
        margin:10px 0;
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
</style>