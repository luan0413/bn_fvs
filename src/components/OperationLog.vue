<template>
  <div class="grid SystemLog">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.ConfigManagement') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.SystemLog') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="searchBox">
        <el-form :model="searchLog" label-width="80px" size="mini">
          <ul class="searchList">
            <li>
              <el-form-item label="协议编号:">
                <el-input v-model="searchLog.protocolId"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.ControllerNum')">
                <el-input v-model="searchLog.kzqbsm" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </li>
            <!-- <li>
              <el-form-item :label="$t('message.OperationType')">
                <el-select v-model="searchLog.function" :placeholder="$t('message.PleaseSelect')">
                  <el-option :label="$t('message.All')" value="0"></el-option>
                  <el-option v-for="item in functions" :key="item.dm" :label="item.dmsm" :value="item.dm">
                  </el-option>
                </el-select>
              </el-form-item>
            </li> -->
            <li class="time">
              <el-form-item :label="$t('message.Time')">
                <el-date-picker v-model="logtime" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                  :range-separator="$t('message.To')" :start-placeholder="$t('message.StatrTime')" :end-placeholder="$t('message.EndTime')">
                </el-date-picker>
              </el-form-item>
            </li>
            <li class="btn">
              <el-button type="primary" plain icon="el-icon-refresh" size="mini" @click="clear()">{{ $t('message.Reset') }}</el-button>
              <el-button type="primary" plain icon="el-icon-search" size="mini" @click="searchLogs()">{{ $t('message.Search') }}</el-button>
            </li>
          </ul>
        </el-form>
      </div>
      <div class="gridBox mt20">
        <el-table highlight-current-row :data="logDatas" border>
          <!-- <el-table-column align="center" prop="function" :label="$t('message.FunctionName')" min-width="150"></el-table-column> -->
          <el-table-column align="center" prop="protocolId" label="协议编号:" min-width="100"></el-table-column>
          <el-table-column align="center" prop="kzqbsm" :label="$t('message.ControllerNum')" min-width="100"></el-table-column>
          <el-table-column align="center" prop="send" label="发送内容:" min-width="100"></el-table-column>
          <el-table-column align="center" prop="resultsm" label="发送结果:" min-width="100"></el-table-column>
          <el-table-column align="center" prop="receive" label="接收内容:" min-width="100"></el-table-column>
          <!-- <el-table-column align="center" prop="content" :label="$t('message.LogContent')"></el-table-column> -->
          <el-table-column align="center" prop="timesm" :label="$t('message.Time')" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" width="120" :label="$t('message.Operation')">
            <template slot-scope="scope">
              <el-button size="mini" class="tableBtnImg" @click="showDetail(scope.$index, scope.row)">
                <img src="./img/details.png" :alt="$t('message.Details')" :title="$t('message.Details')">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination	@current-change="changeLogs" :current-page="pageNum"	:page-size="pageSize"
          layout="total, prev, pager, next, jumper"	:total="totalCount">
        </el-pagination>
      </div>
      </section>
      <el-dialog :title="$t('message.Details')" :visible.sync="logDialog" width="600px">
        <div style="padding-bottom: 0;">
          <el-form :model="log" ref="logForm" label-width="80px" size="mini">
            <ul class="nameFormBox log">
              <li>
                <el-form-item label="协议编号：" prop="protocolId">
                  <el-input v-model="log.protocolId" readonly></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item :label="$t('message.ControllerNum')" prop="kzqbsm">
                  <el-input v-model="log.kzqbsm" readonly></el-input>
                </el-form-item>
              </li>
              <!-- <li>
                <el-form-item :label="$t('message.OperationType')" prop="function">
                  <el-input v-model="log.function" readonly></el-input>
                </el-form-item>
              </li> -->
              <li>
                <el-form-item :label="$t('message.Time')" prop="timesm">
                  <el-input v-model="log.timesm" readonly></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="发送结果" prop="resultsm">
                  <el-input v-model="log.resultsm" readonly></el-input>
                </el-form-item>
              </li>
              <li class="wall">
                <el-form-item label="发送内容" prop="send">
                  <el-input type="textarea" v-model="log.send" :title="log.send" readonly></el-input>
                </el-form-item>
              </li>
              <li class="wall">
                <el-form-item label="接收内容" prop="receive">
                  <el-input type="textarea" v-model="log.receive" :title="log.receive" readonly></el-input>
                </el-form-item>
              </li>
            </ul>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" class="mr10" @click="confirm" size="mini">{{ $t('message.Sure') }}</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";
  import Log from "./js/Log.js";
  export default {
    data() {
      return {
        logtime: '',//搜索框时间
        //搜索框
        searchLog: {
          function: "0"
        },
        logDatas: [],//表格数据
        pageSize: 10, //每页显示数据条数
        totalCount: 0,//总条数
        pageNum: 1,//当前页

        functions: [],

        logDialog: false,//弹窗
        log: {
          function: '',
          timesm: '',
          input: '',
          output: '',
          exception: '',
        },

      };
    },
		mounted: function () {
      this.loadLog();
      this.logCodes();
    },
    methods: {
      logCodes()
      {
        var data = {
          dmlb: Dictionary.CodeType.SystemLog
        };
        Code.getCodes(data).then(value => {
          this.functions = value.datas;
        });
      },
      //初始化数据
      loadLog() {
        let startTime,endTime;
        if(this.logtime != null && this.logtime != undefined && this.logtime != '' && this.logtime != NaN){
          startTime = this.logtime[0];
          endTime = this.logtime[1];
        }else {
            startTime = '';
            endTime = '';
        }
        var data = {
          kzqbsm: this.searchLog.kzqbsm,
          protocolId: this.searchLog.protocolId,
          startTime: startTime,
          endTime: endTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };
        Log.getSocketLogs(data).then(value => {
          this.logDatas = value.datas;
          this.totalCount = value.totalCount;
        });
      },
      //条件查询
      searchLogs(){
        this.loadLog();
      },
      //重置
      clear(){
        this.searchLog = {
          kzqbsm: '',
          function: "0",
        }
        this.logtime = null;
        this.loadLog();
      },
      //详情
      showDetail(index, row) {
        this.log = row;
        this.logDialog = true;
      },
      confirm()
      {
        this.logDialog = false;
      },
			//分页
			changeLogs(page){
        this.pageNum = page;
        this.loadLog();
      }
		}
  }
</script>

