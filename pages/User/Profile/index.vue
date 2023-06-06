<template>    
  <NavBar></NavBar>
  <section class="user-section my-5">
    <div class="alert alert-danger text-center" role="alert" v-if="errors">
      {{ this.errors }}
    </div>
    <div class="row align-items-center justify-content-center text-center mt-5" v-if="!updateShow">      
      <div class="col-lg-4 col-sm-4 col-12">
        <p>Прізвище та ім'я</p>
        <p class="fw-bold">{{ user.name }}</p>
        <hr/>
      </div>
      <div class="col-lg-4 col-sm-4 col-12">
        <p>Електрона адреса</p>
        <p class="fw-bold">{{ user.email }}</p>
        <hr/>
      </div>
      <div class="col-lg-4 col-sm-4 col-12">
        <p>Номер телефону</p>
        <p class="fw-bold">{{ user.phone }}</p>
        <hr/>
      </div>
      <div class="col">
        <button class="btn btn-warning" @click="updateShow=!updateShow">Редагувати дані</button>
      </div>
    </div>
    <div class="row text-center mt-5" v-else>
      <div class="col-lg-4 col-sm-4 col-12">
        <label>Прізвище та ім'я</label>
        <input class="form-control" type="text" name="name" v-model="updatedUser.name" autocomplete="on"/>
        <hr/>
      </div>
      <div class="col-lg-4 col-sm-4 col-12">
        <label>Електрона адреса</label>
        <input class="form-control" type="email" name="email" v-model="updatedUser.email" autocomplete="on"/>
        <hr/>
      </div>
      <div class="col-lg-4 col-sm-4 col-12">
        <label>Номер телефону</label>
        <Field v-model="updatedUser.phone" :rules="isPhone" name="phone"    v-slot="{field,errors}">
          <vue-tel-input 
            v-model="updatedUser.phone" 
            :onlyCountries="['UA']" 
            :defaultCountry="'UA'" 
            mode="international" 
            :inputOptions="{maxlength:16}" 
            class="form-control" 
            :class="errors.length>0&&'border border-danger'" 
            v-bind="field"
          />
        </Field>
        <ErrorMessage name="phone" v-slot="{ message }">
          <span class="text-danger">{{ message }}</span>
        </ErrorMessage>        
        <hr/>
      </div>
      <div class="col">
        <button class="btn btn-warning" @click="update">Зберегти зміни</button>
      </div>
    </div>
  </section>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { mapActions, mapState } from 'pinia';
import { useUserStore } from '~/store/user';
import { useAuthStore } from '~/store/auth';
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
  export default{
    components:{
      Form,
      Field,
      ErrorMessage,
      VueTelInput
    },
    data(){
      return{
        updateShow:false,
        updatedUser:{
          name:'',
          phone:'',
          email:'',
        },
      }
    },
    computed:{
      ...mapState(useAuthStore,['user']),
      ...mapState(useUserStore,['errors'])
    },
    async mounted(){
      this.updatedUser=this.user;
      this.clearErrors();
    },
    methods:{
      ...mapActions(useUserStore,['updateUser','clearErrors']),
      async update(){
        await this.updateUser(this.updatedUser);
        if (!this.errors){
          this.updateShow=!this.updateShow;
        }
        else{
          this.updatedUser=this.user;
        }
      },
      isPhone(value){
        if (!value)
          return 'Це поле обов\'язкове!';
        if (!value.match(/^\+[0-9]{3}\s\d{2}\s\d{3}\s\d{4}/))
          return 'Це поле має бути коректним номером телефону!'
        return true;
      }
    }
  }
</script>
<style lang="scss">
  .user-section{
    p{
      @media(max-width:991px){
        font-size:14px;
      }
    }
    input{
      @media(max-width:991px){
        font-size:14px;
      }
    }
    hr{
      color:#FEA204;
    }
    .vti__input{
      border-radius:20px;
    }
    .vue-tel-input.form-control{
      padding:1.5px 0;
      border:1px solid #ced4da;
      &:focus-within{
        border-color: #FEA204;
        box-shadow: 0px 0px 35px -15px rgb(254, 162, 4);
      }      
    }
  }
</style>