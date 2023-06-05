<template>
  <section class="hero-section row d-flex justify-content-center align-items-center mt-5">
    <img src="./../../assets/img/hero.svg" class="hero-section_image col-12 col-lg-8"/>
    <div class="hero-section_navigate col-12 col-lg-4 text-center mt-5">
      <h2 class="hero-section_header text-uppercase">Купуй, продавай, арендуй</h2>
      <h3 class="hero-section_text">з нами</h3>
      <NuxtLink v-if="authenticated" to="/offers/create" class="btn btn-warning">Додати оголошення</NuxtLink>
      <NuxtLink v-else to="/auth/login" class="btn btn-warning">Додати оголошення</NuxtLink>
    </div>
  </section>
</template>
<script>
import { mapState } from 'pinia';
import { useAuthStore } from '~/store/auth';
export default{
  computed:{
    ...mapState(useAuthStore,['authenticated']),
  },
}
</script>
<style lang="scss">
  .hero-section_header{
    font-weight:600;
  }
  .btn-warning{
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding:10px 25px;
    font-weight:600;
  }
</style>