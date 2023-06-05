<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
            <div class="container-fluid">
                <NuxtLink to="/" class="navbar-brand">               
                    <img src="../assets/img/logo.svg"/>
                </NuxtLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse mt-3" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <NuxtLink to="/offers" class="nav-link">Пошук</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink to="/agents" class="nav-link">Агенти</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink to="/how-to-work-with-system" class="nav-link">Як працювати з системою?</NuxtLink>
                        </li>
                        <li class="nav-item" v-if="isAdmin">
                            <NuxtLink to="/admin" class="nav-link">Адмін-панель</NuxtLink>
                        </li>
                        <li class="nav-item" v-if="authenticated">
                            <NuxtLink to="/offers/create" class="nav-link">Додати оголошення</NuxtLink>
                        </li>
                    </ul>
                    <div class="d-flex gap-3" v-if="!authenticated">
                        <NuxtLink to="/auth/login" class="nav-link fw-bold">Увійти</NuxtLink>
                        <NuxtLink to="/auth/register" class="nav-link fw-bold">Зареєструватися</NuxtLink>
                    </div>
                    <div class="d-flex gap-5" v-else>
                        <NuxtLink class="user-logo" to="/user/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#000" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                            </svg>
                        </NuxtLink>
                        <NuxtLink to="/" class="nav-link fw-bold" @click="logout">Вийти</NuxtLink>    
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '~/store/auth';
export default {
    computed:{
        ...mapState(useAuthStore,['authenticated','isAdmin']),
    },
    methods:{
        ...mapActions(useAuthStore,['logout']),
    }
}
</script>
<style lang="scss">
    .d-flex{
        @media(max-width:991px){
            flex-direction: column;            
        }
    }
    .user-logo:hover{
        transform:scale(1.3);
    }
    .navbar{
        .navbar-brand{
            &:hover{
                transform: scale(1.3);
            }
        }
        .nav-link{
            color:#000;
            position: relative;
            @media((min-width:991px) and (max-width:1200px)){
                font-size:13px;
            }
            &:after{
                display: block;
                content: "";
                background-color: #000;            
                height: 1px;
                width: 0%;
                bottom:0;
                left: 50%;
                position: absolute;
                -webkit-transition: width .3s ease-in-out;
                -moz--transition: width .3s ease-in-out;
                transition: width .3s ease-in-out;
                -webkit-transform: translateX(-50%);
                -moz-transform: translateX(-50%);
                transform: translateX(-50%);
            }               
            &:hover,&:focus{
                color:#000;
                &:after{
                    width:100%;
                }
            } 
        }
    }
</style>