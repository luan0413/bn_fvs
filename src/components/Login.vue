<template>
  <div class="login_bg">
    <div class="loginBox">
      <div class="title"></div>
      <div class="formBox">
        <el-form :model="user" :rules="loginRules" ref="userForm" label-width="30px" size="small">
          <el-form-item :label="$t('message.Account')" prop="yhmc" class="user same">
            <i class="one1"></i>
            <el-input v-model="user.yhmc" class="one" autofocus></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.Password')" prop="dlmm" class="pass same" @keyup.enter.native="login">
            <i class="two1"></i>
            <span class="eye" @click="open">
              <img :src="this.src" alt="">
            </span>
            <el-input v-model="user.dlmm" type="password" class="two" v-if="!this.flag"></el-input>
            <el-input v-model="user.dlmm" class="two" v-else></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="login" class="login">{{ $t('message.Login') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>

  import Login from "./js/Login.js";

  export default {
    data() {
      return {
        user: {
          yhmc: '',
          dlmm: ''
        },
        loginRules: {
          yhmc: this.filterRules('用户名',true),
          dlmm: this.filterRules('密码', true, 16, 1),
        },
        flag: false,
        src: require("./img/close.png")
      };
    },
    methods: {
      login() {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {

            Login.login(this.user).then(value => {
              if (value == null) {
                this.$alert('用户名或密码错误', '登陆信息', {
                  confirmButtonText: '确定'
                }).catch(function (error) {
                  console.log(error);
                });
              }
              else {
                this.$cookies.set("token", value.token, "1d");
                this.$cookies.set("yhmc", value.yhmc, "1d");
                this.$store.state.includePageNames = ['FogAreaMonitor','DeviceMonitor'];
                this.$router.push('/fogareamonitor');
                // window.location.href = "/fvs/#/fogareamonitor";
              }
            });
          }
        });
      },
      open() {//密码框显示
        this.flag = !this.flag;
        this.src = this.flag ? require("./img/open.png") : require("./img/close.png")
      }
    }
  }
</script>


