<template>
<div container="vote">
  <div container="addlike" v-if="modal_like === null">
    <div>
      <div>
        Dinos tu opinion sobre
      </div>
      <div>
        {{superhero.name}} ?
      </div>
      <div>
        {{superhero.description}}
      </div>
      <div>
        <a :href="superhero.link" target="_blanc">
          <icon :icon="['fab', 'wikipedia-w']" />Mayor informacion</a>
      </div>
      <div>
        ¿ Cual es tu voto ?
      </div>
    </div>
    <div>
      <div v-on:click="like(superhero.id_superhero)">
        <icon :icon="['fas', 'thumbs-up']" />
      </div>
      <div v-on:click="dislike(superhero.id_superhero)">
        <icon :icon="['fas', 'thumbs-down']" />
      </div>
    </div>
  </div>

  <div container="like" v-else-if="modal_like === true">
    <div>
      <div>
        Marvel -
      </div>
      <div>
        {{superhero.name}}
      </div>
    </div>
    <div>
      <div>
        <div>
          <icon :icon="['fas', 'thumbs-up']" />
        </div>
      </div>
      <div>
        <div>
          Tu voto<br>
          ha sido registrado!
        </div>
      </div>
    </div>
    <div>
      {{superhero.description}}
    </div>
    <div>
      <div v-on:click="vote_egain = true">
        <div>
          <icon :icon="['fas', 'chevron-left']" />
          <icon :icon="['fas', 'chevron-left']" />
          <icon :icon="['fas', 'chevron-left']" /> Volver a votar</div>
      </div>
    </div>
  </div>

  <div container="dislike" v-else-if="modal_like === false">
    <div>
      <div>
        Marvel -
      </div>
      <div>
        {{superhero.name}}
      </div>
    </div>
    <div>
      <div>
        <div>
          <icon :icon="['fas', 'thumbs-down']" />
        </div>
      </div>
      <div>
        <div>
          Tu voto<br>
          ha sido registrado!
        </div>
      </div>
    </div>
    <div>
      {{superhero.description}}
    </div>
    <div>
      <div v-on:click="vote_egain = true">
        <div>
          <icon :icon="['fas', 'chevron-left']" />
          <icon :icon="['fas', 'chevron-left']" />
          <icon :icon="['fas', 'chevron-left']" /> Volver a votar</div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import {
  server,
  general
} from '../../constants'

import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'Vote',
  data() {
    return {
      vote_egain: false
    }
  },
  props: {
    superhero: {
      type: Object,
      default: null,
      required: false
    }
  },
  methods: {
    ...mapActions('superheros', [
      'addLike',
      'addDislike'
    ]),
    ...mapActions('user', [
      'closeSesion'
    ]),
    ...mapActions([
      'processOn',
      'processOff'
    ]),
    like(id) {
      const info = this.list.filter((superhero) => superhero.id_superhero === id)
      this.$swal({
        text: 'Confirma dar like al titulo ' + info[0].name,
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: general.color_button_modal,
        confirmButtonText: 'Ok'
      }).then(async (result) => {
        if (result.isConfirmed) {

          if (this.sesion.auth === true) {

            this.processOn('Almacenando voto')
            const result = await fetch(server.get() + '/api/votes/addLike', {
              method: 'POST',
              body: JSON.stringify({
                id_superhero: id
              }),
              headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'token': this.sesion.token
              }
            })

            this.processOff()
            const data = await result.json()
            const status = result.status

            if (status !== 200) {
              this.$swal({
                text: data.message,
                icon: 'error',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonColor: general.color_button_modal,
                confirmButtonText: 'Ok'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  this.closeSesion()
                }
              })
            }

            this.vote_egain = false
          } else {
            this.$swal({
              text: 'Inicie Sesion',
              icon: 'error',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonColor: general.color_button_modal,
              confirmButtonText: 'Ok'
            }).then(async (result) => {
              if (result.isConfirmed) {
                this.$router.push({
                  path: '/login'
                })
              }
            })
          }

        }
      })
    },
    dislike(id) {
      const info = this.list.filter((superhero) => superhero.id_superhero === id)
      this.$swal({
        text: 'Confirma dar dislike al titulo ' + info[0].name,
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: general.color_button_modal,
        confirmButtonText: 'Ok'
      }).then(async (result) => {
        if (result.isConfirmed) {

          if (this.sesion.auth === true) {

            this.processOn('Almacenando voto')
            const result = await fetch(server.get() + '/api/votes/addDislike', {
              method: 'POST',
              body: JSON.stringify({
                id_superhero: id
              }),
              headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'token': this.sesion.token
              }
            })

            this.processOff()
            const data = await result.json()
            const status = result.status

            if (status !== 200) {
              this.$swal({
                text: data.message,
                icon: 'error',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonColor: general.color_button_modal,
                confirmButtonText: 'Ok'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  this.closeSesion()
                }
              })
            }

            this.vote_egain = false
          } else {
            this.$swal({
              text: 'Inicie Sesion',
              icon: 'error',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonColor: general.color_button_modal,
              confirmButtonText: 'Ok'
            }).then(async (result) => {
              if (result.isConfirmed) {

              }
            })
          }

        }
      })
    }
  },
  created() {},
  computed: {
    modal_like() {
      if (this.sesion.token !== null && this.sesion.token !== undefined && String(this.sesion.token).trim() !== '' && this.vote_egain === false) {
        const id_user = VueJwtDecode.decode(this.sesion.token).id
        const resultVotes = this.superhero.votes.filter((vote) => vote.id_user === id_user)

        if (resultVotes.length > 0) {
          const lastVote = resultVotes[resultVotes.length - 1]
          if (lastVote.like === true) {
            return true
          } else if (lastVote.like === false) {
            return false
          }
        } else {
          return null
        }
      } else {
        return null
      }
    },
    ...mapGetters('superheros', [
      'list',
      'votes'
    ]),
    ...mapGetters('user', [
      'sesion'
    ]),
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/colors.scss';

div[container=vote] {
  left: 10px;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  margin-left: 10%;

  &>div[container=like] {
    width: 400px;
    background: rgba(0, 0, 0, .1);
    color: #fff;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, .8);
    backdrop-filter: blur(7px);
    padding: 20px;
    box-sizing: border-box;
    text-align: left;

    &>div {
      &:nth-of-type(1) {
        display: flex;
        justify-content: flex-start;

        &>div {
          font-size: 25px;

          &:nth-of-type(1) {
            margin-right: 8px;
          }

          &:nth-of-type(2) {
            font-family: 'Comfortaa Bold';
            font-weight: bold;
          }
        }
      }

      &:nth-of-type(2) {
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &>div {

          &:nth-of-type(1) {

            &>div {
              width: 70px;
              height: 70px;
              border-radius: 40px;
              box-shadow: 0px 15px 15px -8px rgba(0, 0, 0, .5);
              display: flex;
              justify-content: center;
              align-items: center;
              background: $colorLikeUp;

              &>svg {
                font-size: 40px;
              }
            }
          }

          &:nth-of-type(2) {
            padding-left: 15px;

            &>div {
              font-family: 'Comfortaa Bold';
              font-size: 18px;
            }
          }
        }
      }

      &:nth-of-type(3) {
        font-family: 'Comfortaa Bold';
        margin-top: 20px;
      }

      &:nth-of-type(4) {
        display: flex;
        justify-content: center;
        margin-top: 20px;

        &>div {
          padding: 10px 15px;
          border: 2px solid #fff;
          font-family: 'Comfortaa Bold';
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }

  &>div[container=dislike] {
    width: 400px;
    background: rgba(0, 0, 0, .1);
    color: #fff;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, .8);
    backdrop-filter: blur(7px);
    padding: 20px;
    box-sizing: border-box;
    text-align: left;

    &>div {
      &:nth-of-type(1) {
        display: flex;
        justify-content: flex-start;

        &>div {
          font-size: 25px;

          &:nth-of-type(1) {
            margin-right: 8px;
          }

          &:nth-of-type(2) {
            font-family: 'Comfortaa Bold';
            font-weight: bold;
          }
        }
      }

      &:nth-of-type(2) {
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &>div {

          &:nth-of-type(1) {

            &>div {
              width: 70px;
              height: 70px;
              border-radius: 40px;
              box-shadow: 0px 15px 15px -8px rgba(0, 0, 0, .5);
              display: flex;
              justify-content: center;
              align-items: center;
              background: $colorLikeDown;

              &>svg {
                font-size: 40px;
              }
            }
          }

          &:nth-of-type(2) {
            padding-left: 15px;

            &>div {
              font-family: 'Comfortaa Bold';
              font-size: 18px;
            }
          }
        }
      }

      &:nth-of-type(3) {
        font-family: 'Comfortaa Bold';
        margin-top: 20px;
      }

      &:nth-of-type(4) {
        display: flex;
        justify-content: center;
        margin-top: 20px;

        &>div {
          padding: 10px 15px;
          border: 2px solid #fff;
          font-family: 'Comfortaa Bold';
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }

  &>div[container=addlike] {
    width: 400px;

    &>div {
      &:nth-of-type(1) {
        background: rgba(0, 0, 0, .1);
        color: #fff;
        text-shadow: 0px 0px 5px rgba(0, 0, 0, .8);
        backdrop-filter: blur(7px);
        padding: 20px;
        box-sizing: border-box;
        text-align: left;

        &>div {
          &:nth-of-type(1) {
            color: rgba(255, 255, 255, .8)
          }

          &:nth-of-type(2) {
            font-size: 50px;
            margin-bottom: 20px;
            font-family: 'Comfortaa Bold';
          }

          &:nth-of-type(3) {
            font-family: 'Comfortaa Bold';
            margin-bottom: 10px;
          }

          &:nth-of-type(4) {
            font-family: 'Comfortaa Bold';
            margin-bottom: 10px;
            text-decoration: underline;

            &>a {
              color: #fff;

              &>svg {
                margin-right: 5px;
              }
            }
          }

          &:nth-of-type(5) {
            font-family: 'Comfortaa Bold';
            font-size: 20px;
          }
        }
      }

      &:nth-of-type(2) {
        height: 50px;
        width: 100%;
        display: flex;

        &>div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          &>svg {
            color: #fff;
            font-size: 30px;
            transition: transform .3s;
          }

          &:nth-of-type(1) {
            background: $colorLikeUp;

            &:hover svg {
              transform: scale(1.3);
            }
          }

          &:nth-of-type(2) {
            background: $colorLikeDown;

            &:hover svg {
              transform: scale(1.3);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 700px) {
  div[container=vote] {

    &>div[container=dislike],
    &>div[container=like],
    &>div[container=addlike] {
      justify-content: center;
      margin-left: 0px;
      padding-right: 0px;
      width: 100%;

      &>div {
        width: 100%;
      }
    }
  }
}
</style>
