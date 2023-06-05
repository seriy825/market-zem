<template>
  <NuxtLink class="card" :to="{path:'/offers/'+listing.id}" :style="$route.path=='/admin'?'cursor:inherit':''">
       <TheBody :listing="listing"/>
  </NuxtLink>
</template>
<script>
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
    methods:{
      checkRoute(){
        return this.$route.path==='/'|| this.$route.path=='/offers';
      }
    }
  }
</script>
<style lang="scss">
  .listings-section{
    .card{
      border-radius: 20px;
      border: 1px solid #fea204;
      box-shadow: 0px 4px 5px rgba(254, 162, 4, 0.25);
      padding:23px;
      text-decoration: none;
      color:#000;       
      p{
        margin:0;
      }
      &:hover{
        color:#000;
        cursor: pointer;
        box-shadow: 0px 0px 35px -15px rgba(254, 162, 4,1);
      }
    }
  }
  .modal{
    &-content{
      border-radius: 50px !important;
    }    
    .btn{
      border-radius: 20px;
      border: 1px solid #fea204;
      &:hover{
        cursor: pointer;
        box-shadow: 0px 0px 15px 0px rgba(254, 162, 4,1);
      }
    }
    .content{
      margin:30px 0 0;
      text-align: center;
    }
  }
</style>