<template>
  <div id="map" style='width: 100%;height: 100%;'></div>
</template>

<script>
  import MapApi from "./js/Map.js";
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        map: {}

      };
    },
    created() {

    },
    mounted: function () {
      this.map = MapApi.onLoad(this.map)//加载并获取对象
      //将地图对象共享至vuex中
      this.$store.commit('saveobj',this.map)
    },
    methods: {

    },
  }
</script>
