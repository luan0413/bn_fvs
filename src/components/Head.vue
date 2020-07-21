<template>
  <header class="header">
    <el-menu class="fr" mode="horizontal" @select="handleSelect1">
      <el-submenu index="5">
        <template slot="title">
          {{yhmc}}
        </template>
        <el-menu-item index="1">
          <i class="el-icon-edit"></i>{{ $t('message.UpdatePassword') }}
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-back"></i>{{ $t('message.Exit') }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <el-menu :default-active="activeIndex" mode="horizontal" class="fr" @select="handleSelect">
      <el-menu-item index="1" :style="{display: FogAreaMonitorDis}">{{ $t('message.FogAreaMonitor') }}</el-menu-item>
      <el-menu-item index="2" :style="{display: DeviceMonitorDis}">{{ $t('message.DeviceMonitor') }}</el-menu-item>
      <el-menu-item index="3" :style="{display: StatisticalAnalysisDis}">{{ $t('message.StatisticalAnalysis') }}</el-menu-item>
      <el-menu-item index="4" :style="{display: SystemConfigDis}">{{ $t('message.SystemConfig') }}</el-menu-item>
    </el-menu>
    <el-dialog :title="$t('message.UpdatePassword')" :visible.sync="updatePasswordDialog" width="300px">
      <span>
        <el-form :model="pwd" :rules="pwdRules" ref="pwdForm" label-width="80px" size="mini">
          <el-form-item :label="$t('message.OldPassword')" prop="oldDlmm">
            <el-input v-model="pwd.oldDlmm" type="password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.Password')" prop="dlmm">
            <el-input v-model="pwd.dlmm" type="password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.ConfirmPassword')" prop="dlmmyz">
            <el-input v-model="pwd.dlmmyz" type="password"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePasswords" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="updatePasswordDialog = false" size="mini">{{ $t('message.Cancel') }}</el-button>
      </span>
    </el-dialog>
  </header>
</template>

<script>
  import User from "./js/User.js";
  import Function from "./js/Function.js";

export default {
  //当前菜单选中的序号
  props: ['activeIndex'],
  data() {
    return {
      FogAreaMonitorDis: "none",
      DeviceMonitorDis: "none",
      StatisticalAnalysisDis: "none",
      SystemConfigDis: "none",
      Statisticstree: [],
      SystemConfigtree: [],
      yhmc: "",
      updatePasswordDialog: false,
      pwd: {
        token: "",
        oldDlmm: '',
        dlmm: '',
        dlmmyz: '',
      },
      pwdRules: {
        oldDlmm: this.filterRules('原密码', true, 16, 1),
        dlmm: this.filterRules('新密码', true, 16, 1),
        dlmmyz: this.filterRules('新密码校验', true, 16, 1),
      }
    };
  },
  mounted: function () {
    this.yhmc = this.$cookies.get("yhmc");
    this.loadUser();
  },
  methods: {
    loadUser() {

      var parameter = {
        yhmc: this.$cookies.get('yhmc')
      };
      User.getUser(parameter).then(value => {
        let menuData = [];
        for (var i = 0; i < value.functions.length; ++i) {
          if (value.functions[i].gnbm == "01010000") {
            this.FogAreaMonitorDis = 'block';
          } else if (value.functions[i].gnbm == "01020000") {
            this.DeviceMonitorDis = 'block';
          } else if (value.functions[i].gnbm == "01030000" || value.functions[i].gnbm.charAt(3) == "3") {
            this.StatisticalAnalysisDis = 'block';
          } else if (value.functions[i].gnbm == "01040000" || value.functions[i].gnbm.charAt(3) == "4") {
            this.SystemConfigDis = 'block';
          }

          if (value.functions[i].gnbm.charAt(3) == "3" && value.functions[i].gnbm != "01030000") {
            this.Statisticstree.push(Function.StatisticsRouters[value.functions[i].gnbm]);
          }
          if (value.functions[i].gnbm.charAt(3) == "4" && value.functions[i].gnbm != "01040000") {
            this.SystemConfigtree.push(Function.FunctionRouters[value.functions[i].gnbm]);
          }
        }
      });
    },
    //导航
    handleSelect(index, path) {
      // console.log(this.SystemConfigtree[0])
      if (index == "1") {
        // window.location.href = "/fvs/#/fogareamonitor"
        this.$router.push('/fogareamonitor')
      }
      else if (index == "2") {
        // window.location.href = "/fvs/#/devicemonitor"
        this.$router.push('/devicemonitor')
      }
      else if (index == "3") {
        // window.location.href = "/fvs/#/statistics/devicestatistics"
        this.$router.push('/statistics' + this.Statisticstree[0])
      }
      else if (index == "4") {
        // window.location.href = "/fvs/#/systemConfig" + this.SystemConfigtree[0]
        this.$router.push("/systemconfig" + this.SystemConfigtree[0])
      }
    },
    handleSelect1(index, path) {

      if (index == "1") {
        this.pwd.oldDlmm = "";
        this.pwd.dlmm = "";
        this.pwd.dlmmyz = "";
        this.updatePasswordDialog = true;
      }
      else if (index == "2") {
        this.$confirm('是否退出当前用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {

          this.$cookies.set("token", "");
          this.$cookies.set("yhmc", "");
          // window.location.href = "/fvs/#/";
          this.$router.push("/");
        }).catch(() => { });

      }
    },
    //更新密码
    updatePasswords() {
      this.$refs['pwdForm'].validate((valid) => {
        if (valid) {
          if (this.pwd.dlmm != this.pwd.dlmmyz) {
            this.$alert('密码输入不一致', '用户信息', {
              confirmButtonText: '确定'
            });
            return;
          }

          User.updatePasswordByUser(this.pwd).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {

              this.updateUserPassword = false;
              this.$cookies.set("token", "");
              this.$cookies.set("yhmc", "");
              this.$alert('修改密码成功，请重新登陆', '用户信息', {
                confirmButtonText: '确定',
              }).then(value => {
                // window.location.href = "/fvs/#/";
                this.$router.push("/");
              });
            }
            else {
              this.$alert("操作失败，请联系管理员", '用户信息', {
                confirmButtonText: '确定'
              });
            }
          })
        }
      });
    }
  }
}
</script>
