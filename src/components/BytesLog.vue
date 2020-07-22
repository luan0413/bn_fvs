<template>
  <div class="grid BytesLog">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.ConfigManagement') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.BytesLog') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="searchBox">
        <el-form :model="searchLog" :rules="logRules" ref="logForm" label-width="70px" size="mini">
          <ul class="searchList">
            <li>
              <el-form-item :label="$t('message.UserName')">
                <el-input v-model="searchLog.yhmc" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.ControllerNum')" prop="kzqbsm" label-width="80px">
                <el-input v-model="searchLog.kzqbsm" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </li>
            <li class="time">
              <el-form-item :label="$t('message.Time')" label-width="50px">
                <el-date-picker v-model="logtime" type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.FunctionName')">
                <el-input v-model="searchLog.function" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </li>
            <li class="btn">
              <el-button type="primary" plain icon="el-icon-search" size="mini" @click="searchLogs()">
                {{ $t('message.Search') }}</el-button>
            </li>
          </ul>
        </el-form>
      </div>
      <div class="gridBox mt20">
        <el-table highlight-current-row :data="LogData" border>
          <el-table-column align="center" prop="yhmc" :label="$t('message.UserName')" width="100"></el-table-column>
          <el-table-column align="center" prop="function" :label="$t('message.FunctionName')" width="150">
          </el-table-column>
          <el-table-column align="center" prop="kzqbsm" :label="$t('message.ControllerNum')" width="120">
          </el-table-column>
          <el-table-column align="center" prop="send" :label="$t('message.InputParameter')"></el-table-column>
          <el-table-column align="center" prop="result" :label="$t('message.OutputResult')"></el-table-column>
          <el-table-column align="center" prop="receive" :label="$t('message.OutputParameter')"></el-table-column>
          <el-table-column align="center" prop="timesm" :label="$t('message.Time')" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" width="80" :label="$t('message.Operation')">
            <template slot-scope="scope">
              <el-button size="mini" class="tableBtnImg" @click="showDetail(scope.$index, scope.row)">
                <img src="./img/details.png" :alt="$t('message.Details')" :title="$t('message.Details')">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changeLogs" :current-page="pageNum" :page-size="pageSize"
          layout="total, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </section>
    <el-dialog :title="$t('message.Details')" :visible.sync="logDialog" :close-on-click-modal='false' width="900px">
      <div style="padding-bottom: 0;">
        <el-form :model="log" ref="logForm" label-width="80px" size="mini">
          <ul class="nameFormBox log">
            <li>
              <el-form-item :label="$t('message.UserName')" prop="yhmc">
                <el-input v-model="log.yhmc" readonly></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.FunctionName')" prop="function">
                <el-input v-model="log.function" readonly></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.Time')" prop="timesm">
                <el-input v-model="log.timesm" readonly></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.ControllerNum')" prop="kzqbsm">
                <el-input v-model="log.kzqbsm" readonly></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.OutputResult')" prop="result">
                <el-input v-model="log.result" readonly></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.InputParameter')" prop="send">
                <el-input type="textarea" v-model="log.send" readonly></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.OutputParameter')" prop="receive">
                <el-input type="textarea" v-model="log.receive" readonly></el-input>
              </el-form-item>
            </li>

          </ul>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm" size="mini">{{ $t('message.Confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Log from "./js/Log.js";
  export default {
    data() {
      return {
        logtime: '', //搜索框时间
        //搜索框
        searchLog: {
          yhmc: '',
          kzqbsm: '',
          function: ''
        },
        logRules: {
          kzqbsm: this.filterRules(null, true, null, null, 'kzqbsm'),
        },

        LogData: [], //表格数据
        pageSize: 10, //每页显示数据条数
        totalCount: 0, //总条数
        pageNum: 1, //当前页

        logDialog: false, //弹窗
        log: {
          yhmc: '',
          function: '',
          timesm: '',
          input: '',
          send: '',
          receive: '',
          exception: '',
        },
      };
    },
    mounted: function () {
      this.loadLog();
    },
    methods: {
      //初始化数据
      loadLog() {
        let startTime, endTime;
        if (this.logtime != null && this.logtime != undefined && this.logtime != '' && this.logtime != NaN) {
          startTime = this.logtime[0];
          endTime = this.logtime[1];
        }
        var data = {
          yhmc: this.searchLog.yhmc,
          function: this.searchLog.function,
          kzqbsm: this.searchLog.kzqbsm,
          startTime: startTime,
          endTime: endTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        Log.getBytesLogs(data).then(value => {
          this.LogData = value.datas;
          this.totalCount = value.totalCount;
        });
      },
      //条件查询
      searchLogs() {
        this.loadLog();
      },
      //详情
      showDetail(index, row) {
        this.log = row;
        this.logDialog = true;
      },
      confirm() {
        this.logDialog = false;
      },
      //分页
      changeLogs(page) {
        this.pageNum = page;
        this.loadLog();
      }
    }
  }

</script>
