<template>
  <div id="mainContent">
    <keep-alive :include="includePageNames">
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

import Login from "./components/js/Login.js";
import axios from "axios"

export default {
  data() {
    return {
      includePageNames:[],
      username: "",
      token: ""
    };
  },
  watch: {
    $route(to, from) {
      this.validate(to);
      if(to.path == "/"){
          this.$store.state.includePageNames = []
          // console.log(this.$store.state.includePageNames)
        }
        this.includePageNames = this.$store.state.includePageNames;
        // console.log(this.$store.state.includePageNames)
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.validate(this.$router.history.current.path);
  },
  methods: {
    validate(to) {

      let data=this.$cookies.get("token");
      if(data==""||data==null) return

      Login.validate(this.$cookies.get("token")).then(value => {
        if (value.czjg==0)
        {
          if (this.$route.path == "/")
          {
            this.$route.push("/fvs/fogareamonitor")
          }
        }
        else
        {

          this.$router.push('/');
        }
      });

    }

  },
  name: 'App'
}
</script>
<style>
@import "./components/css/common.css";
@import "./components/css/FogAreaMonitor.css";
@import "./components/css/DeviceMonitor.css";
@import "./components/css/Statistics.css";
@import "./components/css/SystemConfig.css";
</style>

