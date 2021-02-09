<template>
  <div container="general-container" v-scroll="setScroll">
    <div container="navbar-top" v-bind:class="transparent === true && scroll < to && complete_navbar === false ? 'transparent' : ''">
      <div>
        <router-link to="/"><IconNavbar /></router-link>
      </div>
      <div :class="[search === true ? 'hide' : '']">
        <ul>
          <li>
            <router-link to="/home">Home</router-link>
          </li>
          <li v-if="sesion.auth === false">
            <router-link to="/login">Iniciar Sesion</router-link>
          </li>
          <li v-if="sesion.auth === false">
            <router-link to="/register">Registro</router-link>
          </li>
          <li v-if="sesion.auth === true">
            <a v-on:click="closeSesionConfirm()">Cerrar Sesion</a>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <input ref="search" type="text" placeholder="Nombre del titulo" v-on:keyup.enter="actionSearch()" :class="[search === true ? 'active' : '']">
          <icon :icon="['fas', 'search']" v-if="search === false" v-on:click="toggleSearch" :class="[search === true ? 'active' : '']"/>
          <icon :icon="['fas', 'times']" v-else-if="search === true" v-on:click="toggleSearch" :class="[search === true ? 'active' : '']"/>
        </div>
      </div>
      <div>
        <div v-on:click="complete_navbar = complete_navbar === true ? complete_navbar = false : complete_navbar = true">
          <icon v-if="complete_navbar === true" :icon="['fas', 'times']" />
          <icon v-else-if="complete_navbar === false" :icon="['fas', 'ellipsis-v']" />
        </div>
      </div>
    </div>

    <div container="navbar-complete" :class="[complete_navbar === true ? 'show' : '']">
      <div>
        <ul>
          <li>
            <router-link to="/home">Home</router-link>
          </li>
          <li v-if="sesion.auth === false">
            <router-link to="/login">Iniciar Sesion</router-link>
          </li>
          <li v-if="sesion.auth === false">
            <router-link to="/register">Registro</router-link>
          </li>
          <li v-if="sesion.auth === true">
            <a v-on:click="closeSesionConfirm()">Cerrar Sesion</a>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import IconNavbar from '../../assets/images/navbar/icon.svg'
import {
  server, general
} from '../../constants'
export default {
  name: 'Navbar',
  components: {
    IconNavbar
  },
  data() {
    return {
      search: false,
      scroll: 0,
      complete_navbar: false
    }
  },
  props: {
    transparent: {
      type: Boolean,
      default: false,
      required: false
    },
    to: {
      type: Number,
      default: 0,
      required: false
    }
  },
  methods: {
    ...mapActions('user', [
      'closeSesion'
    ]),
    closeSesionConfirm(){
      this.$swal({
        text: 'Confirma cerrar sesion ?',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: general.color_button_modal,
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.closeSesion()
        }
      })
    },
    setScroll(value) {
      this.scroll = value
    },
    toggleSearch() {
      this.search = this.search === true ? this.search = false : this.search = true
      this.$refs.search.focus()
    },
    actionSearch() {
      
    }
  },
  mounted(){
    
  },
  computed: {
    ...mapGetters('user', [
      'sesion'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '../../scss/colors.scss';

  div[container=general-container] {
    width: 100%;
    height: 70px;
    position: absolute;
    top: 0px;
    left: 0px;

    & > div[container=navbar-top] {
      z-index: 50;
      height: auto;
      position: fixed;
      width: 100%;
      top: 0px;
      box-shadow: 0px 8px 15px -2px rgba(0,0,0,.5);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      background: $primaryHight;
      padding-left: 15px;
      padding-right: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      transition: background .3s;

      &.transparent {
        background: transparent;
        box-shadow: none;

        & > div {
          &:nth-of-type(2){
            & > ul{
              & > li {
                & > a {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      & > div{
        
        &:nth-of-type(1){
          flex: 1;
          display: flex;
          justify-content: flex-start;
          
          & > a {
            & > svg {
              height: 50px;
              box-shadow: 0px 15px 15px -5px rgba(0,0,0,.2);
            }
          }
          
        }

        &:nth-of-type(2) {
          &.hide {
            display: none;
          }

          & > ul {
            list-style: none;
            display: flex;
            justify-content: flex-start;

            & > li {
              & > a{
                font-family: 'Comfortaa Bold';
                font-weight: bold;
                text-decoration: none;
                color: rgba(255, 255, 255, .7);
                transition: color .3s;
                cursor: pointer;
                
                font-size: 18px;

                &.router-link-active {
                  color: #fff;
                }

                &:hover {
                  color: #fff;
                }
              }

              &:not(:last-of-type){
                margin-right: 15px;
              }
            }
          }
        }

        &:nth-of-type(3){
          transition: width .3s;
          width: auto;
          
          & > div{
            width: auto;
            height: auto;
            display: flex;
            justify-content: flex-start;
            position: relative;

            & > input {
              width: 40px;
              height: 40px;
              box-sizing: border-box;
              background: rgba(255, 255, 255, .2);
              border: none;
              outline: none;
              border-radius: 40px;
              margin-left: 15px;
              float: left;
              transition: width .3s;
              color: transparent;
              box-sizing: border-box;
              padding-left: 15px;
              font-size: 15px;
              font-family: 'Comfortaa Bold';

              &::placeholder {
                color: rgba(255,255,255,.0);
              }

              &.active {
                color: rgba(0,0,0,.5);
                width: 220px;
                background: #fff;
                box-shadow: 0px 15px 15px -5px rgba(0,0,0,.2);
                padding-right: 34px;

                &::placeholder {
                  color: rgba(0,0,0,.3) !important;
                }
              }

            }

            & > svg {
              color: #fff;
              position: absolute;
              top: 12px;
              font-size: 18px;
              right: 10px;
              cursor: pointer;

              &.active {
                right: 15px;
                color: rgba(0,0,0, .5)
              }
            }
          }
        }

        &:nth-of-type(4) {
          & > div {
            width: 40px;
            height: 40px;
            border-radius: 40px;
            margin-left: 10px;
            color: $primaryHight;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 25px;
            background: #fff;
            box-shadow: 0px 15px 15px -5px rgba(0,0,0,.2);
            cursor: pointer;
          }
        }
      }
    }


    & > div[container=navbar-complete]{
      width: 100%;
      height: 0px;
      position: fixed;
      top: 0px;
      left: 0px;
      background: rgba(0,0,0,.7);
      z-index: 49;
      display: flex;
      justify-content: flex-end;
      transition: height .3s;

      &.show {
        height: 100vh;
      }

      & > div {
        position: relative;
        background: #fff;
        width: 100%;
        height: 100%;
        max-width: 600px;
        top: 0px;
        overflow-y: scroll;

        & > ul {
          margin-top: 90px;
          list-style: none;
          padding-left: 20px;
          padding-right: 20px;
          & > li {
            display: flex;
            justify-content: flex-end;
            border-bottom: 2px solid rgba(0,0,0,.09);

            & > a {
              min-width: 100%;
              text-align: right;
              text-decoration: none;
              padding: 10px 0px;
              font-family: 'Comfortaa Bold';
              color: #2a2a2a;

              &.router-link-active {
                  color: rgb(171, 21, 36);
                }
            }
          }
        }
      }
    }


  }

  @media (max-width: 900px) {
    div[container=general-container] {
      & > div[container=navbar-top] {
        & > div{
          &:nth-of-type(1){
            & > a {
              & > svg {
                height: 40px;
              }
            }
          }

          &:nth-of-type(2){
            & > ul{
              & > li {
                & > a {
                  font-size: 15px;
                }
              }
            }
          }
        }
      }
    }
  }


  @media (max-width: 700px) {
    div[container=general-container] {
      & > div[container=navbar-top] {
        & > div{
          &:nth-of-type(1){
            & > a {
              & > svg {
                height: 40px;
              }
            }
          }
          &:nth-of-type(2){
            display: none;
          }
        }
      }
    }
  }

</style>