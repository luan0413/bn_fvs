<template>
  <div class="grid OperationLog">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.ConfigManagement') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.OperationLog') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="searchBox">
        <el-form :model="searchLog" label-width="80px" size="mini">
          <ul class="searchList">
            <li>
              <el-form-item :label="$t('message.UserName')" prop="yhmc" label-width="60px">
                <el-input v-model="searchLog.yhmc" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </li>
            <!-- <li>
              <el-form-item :label="$t('message.ControllerNum')" prop="kzqbsm" label-width="80px">
                <el-input v-model="searchLog.kzqbsm" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </li> -->
            <li style='width: 22%;'>
              <el-form-item :label="$t('message.OperationType')" prop="function" label-width="60px">
                <el-select v-model="searchLog.function" :placeholder="$t('message.PleaseSelect')">
                  <el-option :label="$t('message.All')" value="0"></el-option>
                  <el-option v-for="item in functions" :key="item.dm" :label="item.dmsm" :value="item.dm">
                  </el-option>
                </el-select>
              </el-form-item>
            </li>
            <li class="time">
              <el-form-item :label="$t('message.Time')" label-width="30px">
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
          <el-table-column align="center" prop="yhmc" :label="$t('message.UserName')" width="100"></el-table-column>
          <!-- <el-table-column align="center" prop="kzqbsm" :label="$t('message.ControllerNum')" width="100"></el-table-column> -->
          <el-table-column align="center" prop="functionsm" :label="$t('message.OperationType')" width="150"></el-table-column>
          <el-table-column align="center" prop="content" :label="$t('message.LogContent')"></el-table-column>
          <!-- <el-table-column align="center" prop="resultsm" width="150" label="操作结果"></el-table-column> -->
          <el-table-column align="center" prop="timesm" :label="$t('message.Time')" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" width="80" :label="$t('message.Operation')">
            <template slot-scope="scope">
              <el-button size="mini" class="tableBtnImg" @click="showDetail(scope.$index, scope.row)">
                <img src="./img/details.png" :alt="$t('message.Details')" :title="$t('message.Details')">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changeLogs" :current-page="pageNum"	:page-size="pageSize"
          layout="total, prev, pager, next, jumper"	:total="totalCount">
        </el-pagination>
      </div>
      </section>
      <el-dialog title="详情" :visible.sync="logDialog" width="800px">
        <div style="padding-bottom: 0;">
          <el-form :model="log" ref="logForm" label-width="80px" size="mini">
            <ul class="nameFormBox log">
              <li style="width: 40%;">
                <el-form-item :label="$t('message.UserName')" prop="yhmc">
                  <el-input v-model="log.yhmc" readonly></el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('message.ControllerNum')" prop="kzqbsm">
                  <el-input v-model="log.kzqbsm" readonly></el-input>
                </el-form-item> -->
              <!-- </li>
              <li style="width: 50%;"> -->
                <el-form-item :label="$t('message.OperationType')" prop="function">
                  <el-input v-model="log.functionsm" readonly></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.Time')" prop="timesm">
                  <el-input v-model="log.timesm" readonly></el-input>
                </el-form-item>
              <li style="width: 60%;">
                <el-form-item :label="$t('message.LogContent')" prop="content">
                  <el-input type="textarea" v-model="log.content" readonly></el-input>
                </el-form-item>
                <!-- <el-form-item label="发送结果" prop="result">
                  <el-input type="textarea" v-model="log.resultsm" :title="log.result" readonly></el-input>
                </el-form-item>
                <el-form-item label="通信日志" prop="querySocketLogs">
                  <el-input type="textarea" v-model="querySocketLogsData" :title="querySocketLogsData" readonly></el-input>
                </el-form-item> -->
              </li>
            </ul>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="loadQuerySocketLogs()" size="mini" :disabled="clickFlag">获取通信日志</el-button>
          <el-button type="primary" @click="confirm" size="mini">{{ $t('message.Sure') }}</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="socketLogsTitle" :visible.sync="socketLogsDialog" width="1000px">
        <div>
          <el-table :data="socketLogsData" style="width: 100%" max-height="348">
            <el-table-column align="center" prop="protocolId" label="协议编号:" min-width="100"></el-table-column>
            <el-table-column align="center" prop="kzqbsm" :label="$t('message.ControllerNum')" width="100"></el-table-column>
            <el-table-column align="center" prop="send" label="发送内容:" min-width="100"></el-table-column>
            <el-table-column align="center" prop="resultsm" label="发送结果:" min-width="100"></el-table-column>
            <el-table-column align="center" prop="receive" label="接收内容:" min-width="100"></el-table-column>
            <el-table-column align="center" prop="timesm" :label="$t('message.Time')" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" width="80" :label="$t('message.Operation')">
              <template slot-scope="scope">
                <el-button size="mini" class="tableBtnImg" @click="showDetailSocketLogs(scope.$index, scope.row)">
                  <img src="./img/details.png" :alt="$t('message.Details')" :title="$t('message.Details')">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-pagination @current-change="changeLogs" :current-page="pageNum"	:page-size="pageSize" class="fr"
            layout="total, prev, pager, next, jumper"	:total="totalCount1">
          </el-pagination> -->
        </div>
        <!--  style="display: block;text-align: center;" mt50 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="socketLogsDialog = false" size="mini">{{ $t('message.Sure') }}</el-button>
          <!-- <el-button @click="socketLogsDialog = false" size="mini">取 消</el-button> -->
        </span>
      </el-dialog>
      <!-- 通信日志弹窗 -->
      <el-dialog :title="bytesLogTitle" :visible.sync="bytesLogDialog" width="600px">
        <div style="padding-bottom: 0;">
          <el-form :model="bytesLog" ref="logForm" label-width="80px" size="mini">
            <ul class="nameFormBox log">
              <li style="width: 50%;">
                <el-form-item label="协议编号">
                  <el-input v-model="bytesLog.protocolId" readonly></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.ControllerNum')">
                  <el-input v-model="bytesLog.kzqbsm" readonly></el-input>
                </el-form-item>
              <li style="width: 50%;">
                <el-form-item :label="$t('message.Time')">
                  <el-input v-model="bytesLog.timesm" readonly></el-input>
                </el-form-item>
                <el-form-item label="发送结果" prop="resultsm">
                  <el-input v-model="bytesLog.resultsm" readonly></el-input>
                </el-form-item>
              </li>
              <li style="width: 100%;">
                <el-form-item label="发送内容" prop="send">
                  <el-input type="textarea" v-model="bytesLog.send" :title="log.send" readonly></el-input>
                </el-form-item>
                <el-form-item label="接收内容" prop="receive">
                  <el-input type="textarea" v-model="bytesLog.receive" :title="log.receive" readonly></el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('message.LogContent')">
                  <el-input type="textarea" v-model="bytesLog.content" readonly></el-input>
                </el-form-item> -->
              </li>
            </ul>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="bytesLogDialog = false" size="mini">{{ $t('message.Sure') }}</el-button>
          <!-- <el-button @click="bytesLogDialog = false" size="mini">取 消</el-button> -->
        </span>
      </el-dialog>
  </div>
</template>
<script>
  import Log from "./js/Log.js";
  import Parameter from "./js/Parameter.js";
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";
  export default {
    data() {
      return {
        logtime: '',//搜索框时间
        //搜索框
        searchLog: {
          function: "0"
        },

        logDatas: [],//表格数据
        pageSize: 10,//每页显示数据条数
        totalCount: 0,//总条数
				pageNum: 1,//当前页

        functions: [],//方法名下拉框

        logDialog: false,//弹窗
        // querySocketLogsData: "",
        parametersData: "",
        ip: "",
        clickFlag: false,//防止多次重复点击
        log: {},
        joinId: '',//与系统日志关联编号
        socketLogsDialog: false,//通信日志弹窗
        socketLogsTitle: "",//弹窗标题
        socketLogsData: [],//通信日志数据
        // totalCount1: 0,//通信日志grid总条数
        bytesLogDialog: false,//通信日志弹窗
        bytesLog: {},//通信日志弹窗
        bytesLogTitle: '',
      };
    },
		mounted: function () {
      this.loadLog();
      this.logCodes();
      this.LoadParameter();
    },
    methods: {

      logCodes()
      {
        var data = {
          dmlb: Dictionary.CodeType.OperationLog
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
        }
        var data = {
          yhmc: this.searchLog.yhmc,
          // kzqbsm: this.searchLog.kzqbsm,
          function: this.searchLog.function,
          startTime: startTime,
          endTime: endTime,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        Log.getSystemLogs(data).then(value => {
          this.logDatas = value.datas;
          this.totalCount = value.totalCount;
        });
      },
      //条件查询
      searchLogs() {
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
      LoadParameter() {
        var data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        Parameter.getParameters(data).then(value => {
          this.ParameterData = value.datas;
          for(let i = 0; i < value.datas.length; i++){
            if(value.datas[i].csbm == 'ServiceIp'){
              this.ip = value.datas[i].csz;
            }
          }
        });
      },
      //读取通信日志
      loadQuerySocketLogs(){
        // if(this.log.timesm != null){
        //   var date = this.log.timesm.substring(0,10);
        //   date = date.replace('-','').replace('-','');
        // }
        var data = {
          // ip: this.ip,
          // date: date,
          // filter: this.log.timeStamp,
          pageNum:1,
	  	    pageSize:0,
          joinId: this.joinId,
        }
        Log.getSocketLogs(data).then(value => {
          // console.log(value);
          if(value != null){
            this.socketLogsDialog = true;
            this.socketLogsTitle = "通信日志";
            this.socketLogsData = value.datas;
            // this.totalCount1 = value.totalCount;

          }else{
            this.$alert('暂无通信日志', '提示', {
              confirmButtonText: '确定'
            });
          }
          // for(let i = 0; i< value.length;i++){
          //   this.querySocketLogsData += value[i];
          // }
          // this.clickFlag = true;
        });
      },
      //通信日志详情
      showDetailSocketLogs(index, row){
        this.bytesLogDialog = true;
        this.bytesLogTitle = '通信日志详情';
        this.bytesLog = row;
      },
      //详情
      showDetail(index, row) {
        // this.clickFlag = false;
        // this.querySocketLogsData = "";
        this.log = row;
        console.log(row.joinId)
        this.joinId = row.joinId;
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

