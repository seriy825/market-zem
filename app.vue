<template>
  <div :id="$route.path!=='/agents'?'__nuxt':''">
    <div class="container">
      <TheNavbar/>
      <main class="mx-auto">
        <NuxtPage />
      </main>
    </div>
    <TheFooter v-if="$route.path!=='/agents'"/>
  </div>
</template>
<style lang="scss" scoped>
  #__nuxt{
    position: relative;
    min-height: 100vh;
    &:after{
      content:'';
      display:block;
      height:200px;
      @media(max-width:991px){
        height:350px;
      }
    }
  }
</style>
