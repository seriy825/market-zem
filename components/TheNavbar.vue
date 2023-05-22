<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary my-3">
      <div class="container-fluid">
          <NuxtLink to="/" class="navbar-brand">МаркетЗем</NuxtLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <NuxtLink class="nav-link">Агенти</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link">Новини</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link">Як працювати з системою?</NuxtLink>
                </li>
            </ul>
            <div class="d-flex gap-3" v-if="!authenticated">
                <NuxtLink :to="{path:'/auth/login'}" class="nav-link">Увійти</NuxtLink>
                <NuxtLink :to="{path:'/auth/register'}" class="nav-link">Зареєструватися</NuxtLink>
            </div>
            <div v-else>
                <NuxtLink to="/" class="nav-link" @click="logout">Вийти</NuxtLink>    
            </div>
          </div>
      </div>
  </nav>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '~/store/auth';
export default {
    computed:{
        ...mapState(useAuthStore,['authenticated']),
    },
    methods:{
        ...mapActions(useAuthStore,['logout']),
    }
}
</script>
<style lang="scss">
    .d-flex{
        @media(max-width:992px){
            flex-direction: column;
        }
    }
</style>