<template>
  <div class="container">
      <div class="d-flex align-items-center justify-content-center">
          <div class="card">
              <div class="card-body mb-5">
                  <h1 class="text-center my-3">Вхід</h1>
                  <Form class="row d-flex align-items-center justify-content-center" @submit="handleSubmit">
                      <div class="form-group col-10 my-2">
                        <label for="email" class="font-weight-bold">Електронна пошта</label>
                        <Field v-model="auth.email" name="email" :rules="isEmail" :validateOnInput=true v-slot="{field,errors}">
                            <input type="email" id="email" class="form-control" :class="errors.length>0&&'border border-danger'" autocomplete="on" v-bind="field">
                        </Field>
                        <ErrorMessage name="email" v-slot="{ message }" >
                            <span class="text-danger">{{ message }}</span>
                        </ErrorMessage>
                      </div>
                      <div class="form-group col-10 my-2">
                        <label for="password" class="control-label">Пароль</label>
                        <Field v-model="auth.password" name="password" :rules="isPassword" :validateOnInput=true v-slot="{field,errors}">
                            <input type="password"  id="password" class="form-control" :class="errors.length>0&&'border border-danger'" autocomplete="on" v-bind="field">
                        </Field>
                        <ErrorMessage name="password" v-slot="{ message }" >
                            <span class="text-danger">{{ message }}</span>
                        </ErrorMessage>
                      </div>
                      <div class="col-10 mt-5 text-center">
                          <button type="submit" :disabled="processing" class="btn btn-light btn-block">
                              {{ processing ? "Зачекайте, будь-ласка" : "Увійти" }}
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
export default {
    components:{
        Form,
        Field,
        ErrorMessage
    },
    data(){
        return {
            auth:{
                email:"",
                password:""
            },
            validationErrors:{},
            processing:false
        }
    },
    methods:{
        ...mapActions(useAuthStore,['login']),    
        async handleSubmit(data){       
            this.processing=!this.processing;
            const response = await this.login(data).then(this.processing=!this.processing);
            return response?.status==200;
        },
        isEmail(value){
            if (!value) {
                return 'This field is required';
            }
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
                return 'This field must be a valid email';
            }
            return true;
        },
        isPassword(value){
            if (!value) {
                return 'This field is required';
            }
            if (value.length<8)
                return 'Password must be at least 8 characters long.';
            return true;
        },
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
      }
      .form-control{
          border-radius: 20px;
          &:focus{
            box-shadow: none;
          }
      }
      @media (min-width:768px) {
          width:75%;
      }
      @media (min-width:992px) {
          width:50%;
      }
  }
</style>
