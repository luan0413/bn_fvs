<template>
  <div class="QueryDevices grid">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.ConfigManagement') }}</el-breadcrumb-item> -->
            <el-breadcrumb-item>{{ $t('message.StatisticalAnalysis') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.DeviceBreakdownAnalysis') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.QueryDevices') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div style="padding: 20px;width: 100%;">
        <div class="bana-information hauto">
          <div class="bana-title">{{ $t('message.ControllerInf') }}</div>
          <div class="bana-information-contents">
            <el-table :data="controllers" border height="194px" style="width: 99.9%;border-bottom: 1px solid #ebeef5;">
              <el-table-column align="center" prop="kzqbsm" label="控制器标识码"></el-table-column>
              <el-table-column align="center" prop="wdcxztsm" label="上次查询状态"></el-table-column>
              <el-table-column align="center" prop="gxsjsm" label="上次查询时间"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="bana-information hauto mt20">
          <div class="bana-title">{{ $t('message.RelayInf') }}</div>
          <div class="bana-information-contents">
            <el-table :data="relays" border height="194px" style="width: 99.9%;border-bottom: 1px solid #ebeef5;">
              <el-table-column align="center" prop="tag" :label="$t('message.RelayNum')"></el-table-column>
              <el-table-column align="center" prop="localAddress" :label="$t('message.LocalAddress')"></el-table-column>
              <el-table-column align="center" prop="remoteAddress" :label="$t('message.RemoteAddress')"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="btnBox">
          <el-button type="primary" class="fr mt20" style="padding: 4px 20px;" plain icon="el-icon-refresh" @click="refresh()">{{ $t('message.Refresh') }}</el-button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

  import FogArea from "./js/FogArea.js";
  import Dictionary from "./js/Dictionary.js";
import Controller from "./js/Controller.js";

  export default {
    data() {
      return {
        controllers: [],
        relays:[]
      }
    },
    mounted: function () {
      this.refresh();
    },
    methods: {

      refresh()
      {
        this.controllers=[];
        this.relays = [];

        var parameter = {
          token: this.$cookies.get('token'),
          data: {}
        };

        Controller.queryControllers(parameter).then(value => {
          this.controllers = value;
        });
        FogArea.getDeviceConnections(this.$cookies.get('token')).then(value => {

          for (var i = 0; i < value.length; ++i)
          {
            if (value[i].type == Dictionary.Sblx.Relay)
            {
              this.relays.push(value[i]);
            }
          }

        });
      }
    }
  }
</script>


