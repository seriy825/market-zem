<template>
  <section class="user-navbar-section d-flex align-items-center justify-content-center gap-lg-5 gap-sm-2">
    <NuxtLink to="/user/offers">Мої оголошення</NuxtLink>
    <NuxtLink to="/user/favorites">Мої вподобання</NuxtLink>
    <NuxtLink to="/user/profile">Мій кабінет</NuxtLink>
  </section>
</template>
<style lang="scss">
  .user-navbar-section{
    border:1px #FEA204 solid;
    padding:15px 0;
    .router-link-active, .router-link-exact-active{
      text-decoration: none;
      color:#FEA204;
    }
    a{
      color:#000;
      text-decoration: none;
      &:hover{
        color:black;
        text-decoration: underline;
      }
    }
  }  
</style>