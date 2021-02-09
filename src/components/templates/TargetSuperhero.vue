<template>
<div container="general_container">
  <div>
    <img :src="server.get()+superhero.photo" alt="">
    <div container="info">
      <div>
        <div v-if="modal_like !== null" container="like" :like="[modal_like === true ? 'true' : 'false']">
          <icon v-if="modal_like === true" :icon="['fas', 'thumbs-up']" />
          <icon v-else :icon="['fas', 'thumbs-down']" />
        </div>
        <div container="name">
          {{superhero.name}}
        </div>
      </div>
      <div>
        <div>{{superhero.description}}</div>
      </div>
      <div>
        <div>
          Ver detalle
        </div>
        <div>
          1 mes atras<br />Lorem impsu
        </div>
      </div>
    </div>
  </div>
  <div>
    <div :style="{width: getPorcentage(superhero.id_superhero).porcentage_like+'% !important'}">
      <div>
        <icon :icon="['fas', 'thumbs-up']" />
        {{getPorcentage(superhero.id_superhero).text_porcentage_like()}}
      </div>
    </div>
    <div>
      <div>
        {{getPorcentage(superhero.id_superhero).text_porcentage_dislike()}}
        <icon :icon="['fas', 'thumbs-down']" />
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
      server,
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
    ...mapActions([
      'processOn',
      'processOff'
    ]),
    getPorcentage(id) {
      const superhero = this.list.filter((superhero) => superhero.id_superhero === id)

      if (superhero[0].votes.length > 0) {
        const resultVotesLike = superhero[0].votes.filter((vote) => vote.like === true)
        const resultVotesDislike = superhero[0].votes.filter((vote) => vote.like === false)
        return {
          text_porcentage_like: function () {
            return parseInt(this.porcentage_like) + '%'
          },
          text_porcentage_dislike: function () {
            return parseInt(this.porcentage_dislike) + '%'
          },
          porcentage_like: (resultVotesLike.length / superhero[0].votes.length) * 100,
          porcentage_dislike: (resultVotesDislike.length / superhero[0].votes.length) * 100,
        }
      } else {
        return {
          text_porcentage_like: function () {
            return '0%'
          },
          text_porcentage_dislike: function () {
            return '0%'
          },
          porcentage_like: 50,
          porcentage_dislike: 50,
        }
      }
    },
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
          this.vote_egain = false

        }
      })
    },
    dislike(id) {
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
          this.vote_egain = false

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

div[container=general_container] {
  width: 300px;
  height: auto;
  $borderRadius: 35px;
  overflow: hidden;
  position: relative;
  border-radius: $borderRadius;

  box-shadow: 0px 30px 30px -10px rgba(0, 0, 0, .5);

  &>div {
    &:nth-of-type(1) {
      background: #2a2a2a;
      color: #fff;
      text-shadow: 0px 0px 5px rgba(0, 0, 0, .8);
      backdrop-filter: blur(5px);
      padding: 0px;
      box-sizing: border-box;
      text-align: left;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      overflow: hidden;
      border-radius: $borderRadius $borderRadius 0px 0px;

      &>img {
        width: 170%;
        margin-bottom: -10px;

      }

      &>div[container=info] {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;
        background: rgba(0,0,0,.3);

        &>div {
          width: 100%;

          &:nth-of-type(1) {
            
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 10px;

            & > div{
              
              &[container=like]{
                width: 40px;
                height: 40px;
                border-radius: 30px;
                box-shadow: 0px 10px 10px -5px rgba(0,0,0,.5);
                display: flex;
                justify-content: center;
                align-items: center;

                &[like=true]{
                  background: $colorLikeUp;
                }
                &[like=false]{
                  background: $colorLikeDown;
                }
              }
              &[container=name]{
                font-family: 'Comfortaa Bold';
                font-weight: bold;
                color: #fff;
                padding-left: 15px;
                box-sizing: border-box;
                font-size: 25px;
              }
            }

          }

          &:nth-of-type(2) {
            & > div{
              font-size: 10px;
              font-weight: bold;
              text-shadow: 0px 0px 4px rgba(0,0,0,1);
            }
          }

          &:nth-of-type(3) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            margin-bottom: 10px;
            & > div{
              &:nth-of-type(1){
                padding: 7px 10px;
                border: 2px solid #fff;
                font-weight: bold;
              }
              &:nth-of-type(2){
                font-size: 12px;
                text-align: right;
                font-weight: bold;
              }
            }
          }

        }
      }

    }

    &:nth-of-type(2) {
      width: 100%;
      height: 40px;
      overflow: hidden;
      background: #2a2a2a;
      overflow: hidden;
      bottom: 0px;
      left: 0px;
      display: flex;
      position: relative;
      justify-content: flex-start;
      flex-wrap: wrap;
      border-radius: 0px 0px $borderRadius $borderRadius;

      &>div {
        height: 100%;

        &>div {
          height: 100%;
          color: #fff;
          font-family: 'Comfortaa Bold';
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        &:nth-of-type(1) {
          background: $colorLikeUp;
          transition: width 1s;

          &>div {
            margin-right: 15px;
            justify-content: flex-end;

            &>svg {
              margin-right: 10px;
            }
          }
        }

        &:nth-of-type(2) {
          flex: 1;
          background: rgba(255,255,255,.15);

          &>div {
            margin-left: 15px;
            justify-content: flex-start;

            &>svg {
              margin-left: 10px;
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
