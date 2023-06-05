<template>
  <section class="agents-section">
    <div class="row align-items-center justify-content-center flex-row-reverse">
      <img class="col-lg-6 col-6" src="./../../assets/img/land.svg"/>
      <div class="col-lg-5">
        <h2 class="fw-bold agents-section_header">Агенти МаркетЗем</h2>
        <p class="agents-section_text">Будь нашим агентом та поширюй інформацію про наш маркет та ринок землі в цілому.</p>
        <p class="agents-section_text">Якщо вам це цікаво то будемо раді бачити у нашій команді!</p>
      </div>      
    </div>
    <h3 class="fw-bold agents-section_header">Щоб стати агентом треба</h3>
    <div class="row agents-section_list">
      <div class="col-lg-4 col-sm-6 col-12 d-flex gap-2 align-items-center mb-3">
        <img src="./../../assets/img/mail.svg"/>
        <a href="mailto:info@marketzem.com.ua">Надіслати анкету на нашу пошту</a>
      </div>
      <div class="col-lg-4 col-sm-6 col-12 d-flex gap-2 align-items-center mb-3">
        <img src="./../../assets/img/ask.svg"/>
        <p>Запитати про те, що вас цікавить</p>
      </div>
      <div class="col-lg-4 col-sm-6 col-12 d-flex gap-2 align-items-center mb-3">
        <img src="./../../assets/img/deal.svg"/>
        <p>Підписати договір про співпрацю</p>
      </div>
      <div class="col-lg-4 col-sm-6 col-12 d-flex gap-2 align-items-center mb-3">
        <img src="./../../assets/img/learn.svg"/>
        <p>Вивчити необхідні матеріали</p>
      </div>
      <div class="col-lg-4 col-sm-6 col-12 d-flex gap-2 align-items-center mb-3">
        <img src="./../../assets/img/interview.svg"/>
        <p>Пройти кваліфікаційну співбесіду</p>
      </div>
      <div class="col-lg-4 col-sm-6 col-12 d-flex gap-2 align-items-center mb-3">
        <img src="./../../assets/img/approve.svg"/>
        <p>Стати агентом</p>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
  .agents-section{
    &_header{
      margin:20px 0;
    }
    &_text{
      font-size:18px;
    }
    &_list{
      a{
        color:#000;
        text-decoration: underline;
      }
      @media(max-width:768px){
        a,p{
          text-align: center;
        }
      }
    }   
  }
</style>