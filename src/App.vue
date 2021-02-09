<template>
  <div id="app">
    <router-view/>
    <loading :show="loading.show" :label="loading.label" />
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import loading from 'vue-full-loading'
export default {
  name: 'App',
  components: {
    loading
  },
  methods: {
    ...mapActions([
      'processOn',
      'processOff'
    ]),
  },
  computed: {
    ...mapGetters('user', [
      'sesion'
    ]),
    ...mapGetters([
      'loading'
    ])
  },
  mounted() {
  }
}
</script>

<style lang="scss">
@import './scss/colors.scss';

#app {
  font-family: 'Comfortaa Bold';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin-block-start: 0em;
  margin-block-end: 0em;
  font-family: 'Comfortaa Regular';
  user-select: none;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 13px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .5);
    border-radius: 0px;
    background: #2a2a2a;
    height: 200px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 32px;
    background: rgb(171, 21, 36);
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, .7);
  }
}

body {
  margin: 0px;
  background: $primaryLow;
}

@font-face {
  font-family: "Comfortaa Bold";
  src: local("Comfortaa Bold"),
    url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap') format("truetype");
}

@font-face {
  font-family: "Comfortaa Light";
  src: local("Comfortaa Light"),
    url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap') format("truetype");
}

@font-face {
  font-family: "Comfortaa Regular";
  src: local("Comfortaa Regular"),
    url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;500&display=swap') format("truetype");
}
</style>
