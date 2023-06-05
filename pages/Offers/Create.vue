<template>
  <section class="create-offer-section">
    <h4 class="create-offer-section_header my-5 fw-bold">Додати оголошення</h4>
    <div class="row flex-row-reverse align-items-start justify-content-center">
      <img class="col-lg-7 col-6" src="./../../assets/img/land.svg"/>
      <div class="create-offer-section_form col-lg-5">
        <Form class="d-flex flex-column align-items-start" @submit="handleSubmit">

          <label for="cadastralNumber" class="mt-2">Кадастровий номер</label>        
          <Field v-model="listing.cadastral_number" name="cadastral_number" :rules="isCadastralNumber"  v-slot="{field,errors}">
            <input type="text" v-maska data-maska="##########:##:###:####" data-maska-eager class="form-control" id="cadastralNumber" :class="errors.length>0&&'border border-danger'" v-bind="field" placeholder="__________:__:___:____">        
          </Field>
          <ErrorMessage name="cadastral_number" v-slot="{ message }" >
              <span class="text-danger">{{ message }}</span>
          </ErrorMessage>  

          <label for="square" class="mt-2">Площа</label>        
          <Field v-model="listing.square" name="square" :rules="isSquare" v-slot="{field,errors}">
            <input type="text" class="form-control" id="square" :class="errors.length>0&&'border border-danger'" v-bind="field" placeholder="Га">        
          </Field>
          <ErrorMessage name="square" v-slot="{ message }" >
              <span class="text-danger">{{ message }}</span>
          </ErrorMessage>    

          <label for="rentalPrice" class="mt-2">Ціна оренди</label>        
          <Field v-model="listing.rental_price" name="rental_price" :rules="isRentalPrice" v-slot="{field,errors}">
            <input type="text" class="form-control" id="rentalPrice" :class="errors.length>0&&'border border-danger'" v-bind="field" placeholder="грн.">        
          </Field>
          <ErrorMessage name="rental_price" v-slot="{ message }" >
              <span class="text-danger">{{ message }}</span>
          </ErrorMessage>              

          <label for="status" class="mt-2">Статус оренди</label>
          <VueSelect v-model="status" :options="rental_statuses" class="create-offer-section_select col-12" placeholder="Статус оренди"/>
          <label for="rentalStatus" class="mt-2" v-if="status==='В оренді'">До</label>
          <Field v-model="listing.rental_status" name="rentalStatus" :rules="isYear" v-slot="{field,errors}">
            <input v-maska data-maska="####" data-maska-eager class="form-control" v-if="status==='В оренді'" type="text" :class="errors.length>0&&'border border-danger'" v-bind="field" placeholder="Рік"/>
          </Field>
          <ErrorMessage name="rentalStatus" v-slot="{ message }" >
              <span class="text-danger">{{ message }}</span>
          </ErrorMessage>  

                     
          <Field  name="region" :rules="isChoosen" v-slot="{field,errors}">
            <VueSelect @click="deselect" v-model="region" :options="regions" class="col-12 create-offer-section_select"  placeholder="Область" @option:selected="fetchDistincts" :class="errors.length>0&&'error'" v-bind="field">
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                Не знайдено результатів
              </template>
              <em v-else style="opacity: 0.5">Дані завантажуються...</em>
            </template>
          </VueSelect> 
          </Field>
          <ErrorMessage name="region" v-slot="{ message }" >
              <span class="text-danger">{{ message }}</span>
          </ErrorMessage>

          <Field  name="distinct" :rules="isChoosen" v-slot="{field,errors}">
            <VueSelect @click="deselect" v-model="distinct" :options="distincts" class="col-12 create-offer-section_select"  placeholder="Район" @option:selected="fetchCities" :class="errors.length>0&&'error'" v-bind="field">
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  Не знайдено результатів
                </template>
                <em v-else style="opacity: 0.5">Дані завантажуються...</em>
              </template>
            </VueSelect>
          </Field>
          <ErrorMessage name="distinct" v-slot="{ message }" >
              <span class="text-danger">{{ message }}</span>
          </ErrorMessage>

          <Field  name="city_id" :rules="isChoosen" v-slot="{field,errors}">
            <VueSelect v-model="listing.city_id" :reduce="city => city.id" :options="cities" label="name" class="col-12 create-offer-section_select" placeholder="Населений пункт" :class="errors.length>0&&'error'" v-bind="field">
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  Не знайдено результатів
                </template>
                <em v-else style="opacity: 0.5">Дані завантажуються...</em>
              </template>
              <template #search="{attributes, events}">
                <input
                  class="vs__search"
                  :required="!listing.city_id"
                  v-bind="attributes"
                  v-on="events"
                />
              </template>
            </VueSelect>
          </Field>
          <ErrorMessage name="city_id" v-slot="{ message }" >
              <span class="text-danger">{{ message }}</span>
          </ErrorMessage>  
                    
          <Field  name="assignment_id" :rules="isChoosen" v-slot="{field,errors}">
            <VueSelect v-model="listing.assignment_id" :reduce="assignment => assignment.id" :options="assignments" label="name" class="col-12 create-offer-section_select" :class="errors.length>0&&'error'" v-bind="field" placeholder="Призначення ділянки">
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  Не знайдено результатів
                </template>
                <em v-else style="opacity: 0.5">Дані завантажуються...</em>
              </template>
              <template #search="{attributes, events}">
                <input
                  class="vs__search"
                  :required="!listing.assignment_id"
                  v-bind="attributes"
                  v-on="events"
                />
              </template>
            </VueSelect>
          </Field>
          <ErrorMessage name="assignment_id" v-slot="{ message }" >
              <span class="text-danger">{{ message }}</span>
          </ErrorMessage>         
          
          <label for="description">Опис</label>        
          <textarea rows="5" class="form-control" id="description" v-bind="field" placeholder="Опис"/>   

          <label for="formFileMultiple"  class="form-label mt-2">Фотографії ділянки</label>
          <Field name="images" :rules="fileIsChoosen" v-slot="{errors}">
            <input class="form-control" accept="image/png, image/jpg, image/jpeg, image/bmp" @change="fileUpload" required type="file" id="formFileMultiple" multiple :class="errors.length>0&&!listing.images.length>0>0&&'border border-danger'">
          </Field>
          <ErrorMessage v-if="!listing.images.length>0" name="images" v-slot="{ message }" >
              <span class="text-danger">{{ message }}</span>
          </ErrorMessage>                     

          <button type="submit" :disabled="processing" class="btn btn-warning col-12 my-5">
              {{ processing ? "Зачекайте, будь-ласка" : "Додати" }}
              <span v-show="processing" class="spinner-border spinner-border-sm mr-1"></span>
          </button>

          <div class="alert alert-success mt-4 alert-dismissible fade show" role="alert" v-if="success">
            <span>Оголошення успішно додано! Після підтверждення адміністрацією сайту, його зможуть побачити всі користувачі!</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

          <div class="alert alert-danger mt-4 alert-dismissible fade show" role="alert" v-if="success===false">
            <span>Не вдалось додати оголошення. Перевірте введені дані та спробуйте ще раз!</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </Form>
      </div>      
    </div>
  </section>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import  VueSelect  from "vue-select";
import { mapActions } from 'pinia';
import { useListingStore } from '~/store/listings';
export default{
  components:{
      Form,
      Field,
      ErrorMessage,
      VueSelect,
  },
  data(){
    return{
      listing:{
          cadastral_number:"",   
          square:'',
          rental_price:null,
          rental_status:null,   
          city_id:'', 
          description:null, 
          assignment_id:'',  
          images:[],                
      },
      status:'',
      processing:false,
      rental_statuses:['В оренді','Не в оренді','Не вказано'],
      error:'',
      regions:[],
      distincts:[],
      cities:[],
      assignments:[],
      region:'',
      distinct:'', 
      success:null, 
    }
  },
  async mounted(){
    this.regions = await $fetch(this.$config.public.backendUrl+'/api/regions');
    this.assignments = await $fetch(this.$config.public.backendUrl+'/api/assignments');
  },
  methods:{
    ...mapActions(useListingStore,['createListing']),
    async handleSubmit(data,{resetForm }){       
        this.processing=!this.processing;
        const response = await this.createListing(this.listing).then(this.processing=!this.processing);
        if (response.id){
          this.success=true;
          resetForm();
          this.region='';
          this.distinct='';
          this.listing.city_id='';    
        }else{
          this.success=false;
        }
        return true;
    },
    fileUpload(event){
      const target = event.target;
      if (target && target.files){
        this.listing.images = target.files;
      }
    },
    deselect(){
      if (this.region==null){
        this.distincts=[];
        this.cities=[];
        this.listing.city_id='';
        this.distinct='';
      }       
      else if (this.distinct==null){
        this.cities=[];
        this.listing.city_id='';
      } 
    },
    isCadastralNumber(value){
      if (!value) {
          return 'Це поле обов\'язкове!';
      }
      const regex = /^\d{10}:\d{2}:\d{3}:\d{4}$/i;
      if (!regex.test(value)) {
          return 'Це поле повинне бути правильним кадастровим номером!';
      }
      return true;
    },
    isRentalPrice(value){
      if (value<0||(isNaN(value) && value?.toString().indexOf('.') == -1) || (isNaN(value) && value?.toString().indexOf('.') != -1))
        return 'Це поле має бути корректною ціною!';
      return true;
    },
    isSquare(value){
      if (!value)
        return 'Це поле обов\'язкове!';
      if (value<0||(isNaN(value) && value.toString().indexOf('.') == -1) || (isNaN(value) && value.toString().indexOf('.') != -1))
        return 'Це поле має бути корректною площею!';
      return true;
    },
    isYear(value){
      if (value?.length<4)
        return 'Це поле має бути корректним роком!';
      return true;
    },
    isChoosen(value){
      if (!value)
        return 'Це поле обов\'язкове!';
      return true;
    },
    fileIsChoosen(){
      if (this.listing.images.length==0)
        return 'Це поле обов\'язкове!';
      return true;
    },
    async fetchDistincts(){
      this.listing.city_id='';
      this.distinct='';
      this.distincts = await $fetch(this.$config.public.backendUrl+'/api/distincts/'+this.region);
    },
    async fetchCities(){
      this.listing.city_id='';
      this.cities = await $fetch(this.$config.public.backendUrl+'/api/cities/'+this.region+'/'+this.distinct);
    }
  }
}
</script>
<style lang="scss">
  @import "vue-select/dist/vue-select.css";
  .create-offer-section{
    &_select{     
      .vs__dropdown-toggle{
        border-radius: 20px;
        height: 40px;
        margin:10px 0;
        overflow:hidden;
      }
      &.error{
        .vs__dropdown-toggle{
          border:1px solid red;
        }
      }
      .vs__actions{
        cursor: pointer;
      }
      .vs__dropdown-menu{
        border-radius: 20px;
        font-size:14px;
        ol,ul{
          padding-left: 0;
        }
      }  
      .vs__selected-options{
        flex-wrap: nowrap;
        &:has(span){
          input{
            display:none;
          }
        }
      }    
      .vs__selected{
        white-space: nowrap;
      }
    }
  }
</style>