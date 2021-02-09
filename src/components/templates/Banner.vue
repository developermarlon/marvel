<template>
<div>
  <div container="center-carousel">
    <div container="shadow"></div>
    <!-- "ease", "linear", "ease-in", "ease-out", "ease-in-out" -->
    <Carousel :scrollPerPage="true" :autoplay="true" :loop="true" :autoplayTimeout="20000" :centerMode="true" :autoplayHoverPause="false" :paginationSize="17" :paginationPadding="5" :paginationActiveColor="'rgb(20, 20, 20)'" :speed="400" :perPageCustom="[[1, 1]]">
      <Slide v-for="(superhero, idx) in list" :key="idx">
        <div container="center-image">
          <img :src="server.get()+superhero.photo" alt="">

          <Vote v-bind="{superhero}"/>
          <div container="porcentage">
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
      </Slide>
    </Carousel>

  </div>
</div>
</template>

<script>
import {
  Carousel,
  Slide
} from 'vue-carousel'
import banner1 from '../../assets/images/banner/banner1.jpg'
import Vote from '../templates/Vote.vue'
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
  data() {
    return {
      server,
      images: {
        banner1
      }
    }
  },
  components: {
    Carousel,
    Slide,
    Vote
  },
  methods: {
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
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters('superheros', [
      'list',
      'votes'
    ]),
    
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/colors.scss';

div[container=center-carousel] {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #171717;
  position: relative;
  box-shadow: 0px 50px 40px -10px rgba(0,0,0,.4);

  &>div[container=shadow] {
    height: 5px;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: $primaryHight;
    z-index: 48;

    box-shadow: 0px 0px 100px 120px $primaryHight, 0px 0px 20px 20px $primaryHight;
  }

  >>>.VueCarousel {
    width: 100%;
    height: 100vh;

    &>div.VueCarousel-pagination {
      position: absolute;
      bottom: 50px;
      left: 0px;

      &>div.VueCarousel-dot-container {
        margin-top: 0px !important;

        &>button {
          background: #000;
          outline: none;
          margin-top: 0px !important;
          border: 3px solid rgba(255, 255, 255, .5);
          padding: 0px !important;
          margin: 5px;

          &.VueCarousel-dot--active {
            // background: $primaryHight !important;
          }
        }
      }
    }

    &>div.VueCarousel-wrapper {
      &>div.VueCarousel-inner {
        &>div.VueCarousel-slide {
          cursor: move;
          overflow: hidden;
          max-width: 100%;

          &>div[container=center-image] {
            width: auto;
            height: auto;
            display: flex;
            justify-content: safe center;
            align-items: center;
            flex-wrap: nowrap;
            position: relative;

            &>img {
              width: auto;
              height: 100vh;
            }

            &>div[container=porcentage] {
              width: 100%;
              height: 40px;
              overflow: hidden;
              background: #2a2a2a;
              position: absolute;
              overflow: hidden;
              bottom: -1px;
              left: 0px;
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;

              &>div {
                height: 100%;

                &>div {
                  height: 100%;
                  color: #fff;
                  font-family: 'Comfortaa Bold';
                  display: flex;
                  align-items: center;
                  font-size: 30px;
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
                  background: $colorLikeDown;

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
      }
    }
  }
}

@media (max-width: 700px) {
  div[container=center-carousel] {
    >>>.VueCarousel {
      &>div.VueCarousel-wrapper {
        &>div.VueCarousel-inner {
          &>div.VueCarousel-slide {
            &>div[container=center-image] {
              &>div[container=porcentage] {
                &>div {
                  &>div {
                    font-size: 20px;
                  }
                }
              }

              &>div[container=vote] {
                justify-content: center;
                margin-left: 0px;
                padding-right: 18px;
                width: 100%;

                &>div {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
