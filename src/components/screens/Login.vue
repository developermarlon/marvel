<template>
<div container="general-container">
  <Navbar />

  <div container="container-form">
    <form v-on:submit.prevent="login">
      <h3>Ingreso marvel</h3>
      <div container="form-group">
        <label>Email</label>
        <input type="text" placeholder="Digite su email" v-model="data_login.email" required>
      </div>
      <div container="form-group">
        <label>Contraseña</label>
        <input type="password" placeholder="Digite su contraseñ" v-model="data_login.password" required>
      </div>

      <button type="submit">Ingresar</button>
    </form>
  </div>
</div>
</template>

<script>
import Navbar from '../templates/Navbar.vue'
import {
  mapActions,
  mapGetters
} from 'vuex'
import {
  server,
  general
} from '../../constants'
export default {
  name: 'Register',
  data() {
    return {
      data_login: {
        name: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions([
      'processOn',
      'processOff'
    ]),
    ...mapActions('user', [
      'openSesion',
      'closeSesion'
    ]),
    async login() {
      this.processOn('Creando usuario')
      const result = await fetch(server.get() + '/api/users/login', {
        method: 'POST',
        body: JSON.stringify(this.data_login),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      this.processOff()
      const data = await result.json()
      const status = result.status

      if (status === 200) {
        let user = {
          name: data.name,
          token: data.token
        }
        this.openSesion(user)
        this.$swal({
          title: 'Correcto',
          text: data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          if (result) {
            this.$router.push({
              path: '/home'
            })
          }
        })
      } else {
        this.$swal({
          title: 'Error',
          text: data.message,
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton: true,
          allowOutsideClick: false,
          confirmButtonColor: general.color_button_modal,
          confirmButtonText: 'Ok'
        })
      }
    }
  },
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/inputs.scss';

div[container=general-container] {

  &>div[container=container-form] {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;

    &>form {
      width: 100%;
      max-width: 500px;
      background: #fff;
      box-shadow: 0px 25px 35px -15px rgba(0, 0, 0, .5);

      h3 {
        color: rgba(0, 0, 0, .7);
        margin-bottom: 20px;
        margin-top: 20px;
      }

      &>div[container=form-group] {
        @include formGroupDefault;
      }

      &>button[type=submit] {
        background: $primaryHight;
        outline: none;
        border: none;
        width: 100%;
        color: #fff;
        height: 50px;
        font-family: 'Comfortaa Bold';
        font-size: 18px;
        margin-top: 20px;
        cursor: pointer;
      }
    }

  }

}
</style>
