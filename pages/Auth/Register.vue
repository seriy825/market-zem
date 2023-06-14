<template>
  <div class="container">
      <div class="d-flex align-items-center justify-content-center">
          <div class="card mb-5">
              <div class="card-body mb-5">
                  <h1 class="text-center my-3">Реєстрація</h1>
                  <div class="alert alert-danger" role="alert" v-if="validationErrors">
                      <ul class="mb-0">
                          <li v-if="validationErrors.email">Вказана пошта вже зареєстрована!</li>
                          <li v-if="validationErrors.phone">Вказаний номере телефону не відповідає правильному формату! (+380 хх ххх хххх)</li>
                      </ul>
                  </div>
                  <Form class="row d-flex align-items-center justify-content-center" @submit="handleSubmit">
                      <div class="form-group col-10 my-2 required">
                          <label for="name" class="control-label">Ім'я</label>
                          <Field v-model="user.name" :rules="isName" name="name"  :validateOnInput=true v-slot="{field,errors}">
                            <input type="text" id="name" class="form-control" :class="errors.length>0&&'border border-danger'" autocomplete="on" v-bind="field"/>
                          </Field>
                          <ErrorMessage name="name" v-slot="{ message }" >
                            <span class="text-danger">{{ message }}</span>
                          </ErrorMessage>
                      </div>
                      <div class="form-group col-10 my-2 required">
                          <label for="email" class="control-label">Електронна пошта</label>
                          <Field v-model="user.email" :rules="isEmail" name="email"  :validateOnInput=true v-slot="{field,errors}">
                            <input type="email" id="email" class="form-control" :class="errors.length>0&&'border border-danger'" autocomplete="on" v-bind="field"/>
                          </Field>
                          <ErrorMessage name="email" v-slot="{ message }">
                            <span class="text-danger">{{ message }}</span>
                          </ErrorMessage>
                      </div>
                      <div class="form-group col-10 my-2 required">
                          <label for="password" class="control-label">Пароль</label>
                          <Field v-model="user.password" :rules="isPassword" name="password"  :validateOnInput=true v-slot="{field,errors}">
                            <input type='password' id="password" class="form-control" :class="errors.length>0&&'border border-danger'" autocomplete="on" v-bind="field"/>
                          </Field>
                          <ErrorMessage name="password" v-slot="{ message }">
                            <span class="text-danger">{{ message }}</span>
                          </ErrorMessage>
                      </div>
                      <div class="form-group col-10 my-2 required">
                          <label for="password_confirmation" class="control-label">Підтверждення паролю</label>
                          <Field v-model="user.password_confirmation" :rules="isConfirmedPassword" name="password_confirmation"  :validateOnInput=true v-slot="{field,errors}">
                            <input type='password' id="password_confirmation" class="form-control" :class="errors.length>0&&'border border-danger'" autocomplete="on" v-bind="field"/>
                          </Field>
                          <ErrorMessage name="password_confirmation" v-slot="{ message }">
                            <span class="text-danger">{{ message }}</span>
                          </ErrorMessage>
                      </div>
                      <div class="form-group col-10 my-2 required">
                          <label for="birthdate" class="control-label">День народження</label>
                          <Field v-model="user.birthdate" :rules="isValidDate" name="birthdate"  :validateOnInput=true  v-slot="{field,errors}">
                            <input type="date" id="birthdate" class="form-control" autocomplete="on" :class="errors.length>0&&'border border-danger'" v-bind="field"/>
                          </Field>
                          <ErrorMessage name="birthdate" v-slot="{ message }">
                            <span class="text-danger">{{ message }}</span>
                          </ErrorMessage>
                      </div>
                      <div class="form-group col-10 my-2 required">
                          <label for="phone" class="control-label">Номер телефону</label>
                          <Field v-model="user.phone" :rules="isPhone" name="phone"    v-slot="{field,errors}">
                            <vue-tel-input 
                              v-model="user.phone" 
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
                      </div>
                      <div class=" mt-5 text-center">
                          <button type="submit" :disabled="processing" class="btn btn-light btn-block">
                              {{ processing ? "Зачекайте, будь-ласка" : "Зареєструватися" }}
                              <span v-show="processing" class="spinner-border spinner-border-sm mr-1"></span>
                          </button>
                      </div>
                  </Form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { mapActions } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
export default {
  components:{
    Form,
    Field,
    ErrorMessage,
    VueTelInput,
  },
  data(){
      return {
        user:{
          name:'',
          email:'',
          password:'',
          password_confirmation:'',
          birthdate:'',
          phone:''
        },
        validationErrors:{},
        processing:false
      }
  },
  methods:{
    ...mapActions(useAuthStore,['register']),    
    async handleSubmit(values){          
      this.processing=!this.processing;
      const response = await this.register(values).then(this.processing=!this.processing);
      if (response?.status==200){
        return true;
      }
      else {
        this.validationErrors=response;
        return false;
      }
    },
    isEmail(value){
      if (!value)
        return 'Це поле обов\'язкове!';
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) 
        return 'Це поле має бути коректною адресою електронної пошти!';
      return true;
    },
    isName(value){
      if (!value) 
        return 'Це поле обов\'язкове!';
      if (value.length<4)
        return 'Ім\'я має бути не менше 4и символів у довжину.';
      return true;
    },
    isPassword(value){
      if (!value) 
        return 'Це поле обов\'язкове!';
      if (value.length<8)
        return 'Пароль має бути не менше 8и символів у довжину.';
      return true;
    },
    isConfirmedPassword(value){
      if (!value)
        return 'Це поле обов\'язкове!';
      if (value.length<8)
        return 'Пароль має бути не менше 8и символів у довжину.';
      if (value!=this.user.password)
        return 'Підтвердження паролю не співпадає!';
      return true;
    },
    isValidDate(value){
      if (value.length==0) 
        return 'Це поле обов\'язкове!';
      return true;
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
<style lang="scss" scoped>
  .container{
      @media(max-width:576px){
          padding:0;
      }
  }
  .card{
      border-radius: 50px;
      background-color: #FEA2048C;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25) !important;      
      .btn{
          padding:10px 50px;
          font-size:20px;
          border-radius: 20px;
          @media (max-width:768px){
            font-size:14px;
        }
      }
      .required .control-label:after {
          content:" *";
          color:red;
      }
      .form-control{
          border-radius: 20px;
          @media (max-width:768px){
            font-size:14px;
          }
          &:focus{
            box-shadow: none;
          }
      }
      @media (max-width:768px){
        width:100%;
        font-size:14px;
      }
      @media (min-width:768px) {
          width:75%;
      }
      @media (min-width:992px) {
          width:50%;
      }
  }
</style>
