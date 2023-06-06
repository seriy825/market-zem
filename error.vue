<template>
  <TheNavbar/>
  <section class="not-found-page d-flex align-items-center justify-content-center mt-5 flex-column text-center">
    <h3>Упс... Схоже, щось пішло не так.</h3>
    <h3>Перезавантажте сторінку або поверніться на голову сторінку!</h3>
    <NuxtLink to="/"><img src="./assets/img/logo.svg" class="not-found-page_img"/></NuxtLink>
  </section>
</template>
<style lang="scss">
  .not-found-page{
    &_img{
      cursor: pointer;
      &:hover{
        transform: scale(1.3);
      }
    }
  }
</style>