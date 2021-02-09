<template>
<div>
  <Navbar v-bind="{transparent: true, to: 10}" />
  <Banner />
  <div container="general-container">
    <div>
      <div container="note">
        <div>
          <div>
            Lorem ipsum. Dolor
          </div>
          <div>
            IP lorem ip.
          </div>
        </div>
        <div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, a ullam aspernatur eligendi recusandae exercitationem id consequatur sunt obcaecati deleniti suscipit corporis et maxime delectus. Minima, nam facilis. Quia, quisquam.
          </div>
        </div>
        <div>
          <div container="closeNote">
            <icon :icon="['fas', 'times']" />
          </div>
        </div>
      </div>

      <div container="superheros">
        <h3>Superheroes Anteriores</h3>

        <div container="previous">
          <!-- previous_superheros
          new_superheros -->

          <TargetSuperhero v-for="(superhero, idx) in previous_superheros" :key="idx" v-bind="{superhero}" />

        </div>

        <h3>Nuevos Superheroes</h3>

        <div container="new">

          <TargetSuperhero v-for="(superhero, idx) in new_superheros" :key="idx" v-bind="{superhero}" />

        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Navbar from '../templates/Navbar.vue'
import Banner from '../templates/Banner.vue'
import TargetSuperhero from '../templates/TargetSuperhero.vue'
import {
  server,
  general
} from '../../constants'
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: 'Home',
  metaInfo: {
    title: 'Home - Marvel App',
    htmlAttrs: {
      lang: 'es',
      amp: true
    },
    link: [{
      rel: 'icon',
      href: '/static/favicon.png'
    }],
    meta: [{
        name: 'description',
        content: 'Dinos tu opinion'
      },
      {
        property: 'og:image',
        content: '/static/social.png'
      },
    ]
  },
  data() {
    return {
      images: {}
    }
  },
  components: {
    Navbar,
    Banner,
    TargetSuperhero
  },
  sockets: {
    connect() {
      // console.log('socket connected')
    },
    addLike(data) {
      this.$swal({
        title: 'Correcto',
        text: data,
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000
      }).then((result) => {
        if (result) {}
      })
      this.getSuperheros()
    }
  },
  methods: {
    ...mapActions('superheros', [
      'updateSuperheros'
    ]),
    ...mapActions([
      'processOn',
      'processOff'
    ]),
    async getSuperheros() {
      this.processOn('Consultando superheroes')
      const result = await fetch(server.get() + '/api/superheros/getAll', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      this.processOff()
      const status = result.status
      const data = await result.json()

      if (data.length === 0) {
        this.processOn('Creando superheroes')
        const resultCreate = await fetch(server.get() + '/api/superheros/createDefault', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        })
        this.processOff()
        const statusCreate = resultCreate.status
        const dataCreate = await resultCreate.json()
        this.getSuperheros()
      }

      this.updateSuperheros(data)
    }
  },
  created() {
    this.getSuperheros()
    // this.$socket.emit('listen-server', 'ejemplo conexion')
  },
  mounted() {

    //EVENT WITH VANILLA JS
    const button = document.querySelector('div[container=closeNote]')
    const note = document.querySelector('div[container=note]')
    button.addEventListener("click", () => {
      note.remove()
    })
  },
  computed: {
    ...mapGetters('superheros', [
      'list',
      'votes'
    ]),
    previous_superheros() {
      return this.list.filter((superhero) => superhero.new === false)
    },
    new_superheros() {
      return this.list.filter((superhero) => superhero.new === true)
    }
  }

}
</script>

<style lang="scss" scoped>
h3 {
  color: rgba(255, 255, 255, .8);
  text-align: left;
  font-size: 30px;
}

div[container=general-container] {
  display: flex;
  justify-content: center;

  &>div {
    width: 100%;
    max-width: 1000px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;

    &>div[container=note] {
      display: flex;
      justify-content: flex-start;
      background: rgba(255, 255, 255, .4);
      border-radius: 0px;
      padding: 15px 20px 15px 20px;
      box-sizing: border-box;
      align-items: center;
      margin-top: 50px;
      margin-bottom: 30px;
      color: rgba(0, 0, 0, .9);
      box-shadow: 0px 20px 20px -10px rgba(0, 0, 0, .3);

      &>div {
        &:nth-of-type(1) {
          width: 160px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          &>div {
            &:nth-of-type(1) {
              font-size: 15px;
            }

            &:nth-of-type(2) {
              font-size: 27px;
            }
          }
        }

        &:nth-of-type(2) {
          flex: 1;
          padding-left: 15px;
          box-sizing: border-box;

          &>div {
            text-align: left;
            font-size: 12px;
          }
        }

        &:nth-of-type(3) {
          display: flex;
          align-items: center;

          &>div {
            cursor: pointer;
            margin-left: 15px;
          }
        }
      }
    }

    &>div[container=superheros] {
      width: 100%;
      margin-top: 40px;

      h3 {
        color: rgba(255, 255, 255, .5);
        text-align: center;
        margin-bottom: 5px;
      }

      &>div[container=previous],
      &>div[container=new] {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-bottom: 40px;

        &>div {
          margin: 15px 10px;
          height: auto;
        }

      }
    }

  }
}

@media (max-width: 700px) {

  div[container=general-container] {
    &>div {
      &>div[container=superheros] {
        h3 {
          text-align: center;
          font-size: 20px;
          margin-bottom: 0px;
        }

        &>div[container=previous],
        &>div[container=new] {
          justify-content: center;
        }
      }

      &>div[container=note] {
        align-items: flex-start;
        padding: 10px 15px 10px 15px;

        &>div {
          &:nth-of-type(1) {
            width: 110px;

            &>div {
              &:nth-of-type(1) {
                font-size: 10px;
              }

              &:nth-of-type(2) {
                font-size: 18px;
              }
            }
          }

          &:nth-of-type(2) {
            width: 100%;
            padding-left: 5px;

            &>div {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
