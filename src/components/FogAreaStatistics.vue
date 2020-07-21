<template>
  <div class="FogAreaStatistics">
    <section ref="contentbox" class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.StatisticalAnalysis') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.VisibilityAnalysis') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.VisibilityStatistical') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="searchBox">
        <el-form size="mini">
          <ul class="searchList">
            <li class="w265">
              <el-form-item :label="$t('message.FogAreaName')" label-width="70px">
                <el-select v-model="wqbms" multiple collapse-tags :placeholder="$t('message.PleaseSelect')" size="mini">
                  <el-option v-for="item in fogAreas" :key="item.wqbm" :label="item.wqmc" :value="item.wqbm">
                  </el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.TimeType')" label-width="90px">
                <el-select v-model="level" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in levels" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li class="time">
              <el-form-item :label="$t('message.Time')" label-width="50px">
                <el-date-picker v-if="level == visibilityStatisticsLevel.Day" v-model="date" type="date" :placeholder="$t('message.SelectDay')" value-format="yyyy-MM-dd"></el-date-picker>
                <el-date-picker v-else-if="level == visibilityStatisticsLevel.Month" v-model="month" type="month" :placeholder="$t('message.SelectMon')" value-format="yyyy-MM"></el-date-picker>
              </el-form-item>
            </li>
            <li class="btn">
              <el-button type="primary" plain size="mini" @click="statistics()">{{$t('message.Statistical')}}</el-button>
            </li>
          </ul>
        </el-form>
      </div>
      <div ref="contentBox" class="contentBox">
        <div class="tableBox">
          <el-table :data="fogAreaData" :height="tableHeight" style="width: 100%;border: 1px solid #ddd;">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="tableBoxs">
                  <div class="item">
                    <div class="itemTitle">{{$t('message.Time')}}({{props.row.unit}})</div>
                    <div class="itemContent" v-for='item in props.row.dates' v-bind:key="item">{{ item }}</div>
                  </div>
                  <div class="item">
                    <div class="itemTitle" >{{ $t('message.Visibility') }}({{ $t('message.Meter') }})</div>
                    <div class="itemContent borderR" v-for='item in props.row.njd' v-bind:key="item">{{ item }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="wqmc" :label="$t('message.FogAreaName')" min-width='120px' show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="date" :label="$t('message.Date')" min-width='80px' show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="echartsBox" >
          <div id="myChart" v-loading="loading" style="width:98%;float: left;" ref="myChart"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import FogArea from "./js/FogArea.js";
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";
export default {
  data() {
    return {
      //搜索框
      date: "", //天级别搜索框日期
      month: "", //月级别搜索框日期
      level: Dictionary.VisibilityStatisticsLevel.Day, //选择时间格式
      wqbms: [], //当前选中的雾区
      fogAreas: [], //雾区集合
      tableHeight: "",
      loading: false,
      levels: [],
      //table数据
      fogAreaData: [],
      loadData: [],
      wqbmList: [],
      visibilityStatisticsLevel: {
        Day: Dictionary.VisibilityStatisticsLevel.Day,
        Month: Dictionary.VisibilityStatisticsLevel.Month
      }
    };
  },
  created() {
    this.tableHeight = window.innerHeight - 190 + "px";
  },
  mounted() {
    this.$refs.contentBox.style.height = window.innerHeight - 150 + "px";
    this.$refs.myChart.style.height = window.innerHeight * 0.5 + "px";
    this.loadCodes();
    this.loadFogAreas();
  },
  methods: {

    loadCodes()
    {
      Code.getCodes({
        dmlb: Dictionary.CodeType.VisibilityStatisticsLevel
      }).then(value => {
        this.levels = value.datas;
      });
    },
    //读取雾区集合
     loadFogAreas() {
       FogArea.getFogAreas().then(value => {
        this.fogAreas = value;
        for (let k = 0; k < this.fogAreas.length; k++) {
          this.wqbmList.push(this.fogAreas[k].wqbm);
        }

        this.wqbms = this.wqbmList;

        this.level = Dictionary.VisibilityStatisticsLevel.Day;

        this.date=
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate();

        this.loadData = {
          item1: this.wqbms,
          item2: this.level,
          item3: this.date
        };

        this.month =
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1);
        this.statistics();
      });
    },

    //重新统计
     statistics() {
      let data;
      if (this.wqbms.length == 0) {
        this.$alert("请至少选择一个雾区！", "统计分析", {
          confirmButtonText: "确定"
        });
        return;
      }
      if (this.level == Dictionary.VisibilityStatisticsLevel.Day&&this.date == "") {
        this.$alert("请选择时间！", "统计分析", {
          confirmButtonText: "确定"
        });
        return;
      }
      if (this.level == Dictionary.VisibilityStatisticsLevel.Month && this.month == "") {
        this.$alert("请选择时间！", "统计分析", {
          confirmButtonText: "确定"
        });
        return;
      }
      this.loading = true;
      if (this.level == Dictionary.VisibilityStatisticsLevel.Day) {
        data = {
          wqbms: this.wqbms,
          level: this.level,
          date: this.date
        };
      }
      else if (this.level == Dictionary.VisibilityStatisticsLevel.Month) {
        data = {
          wqbms: this.wqbms,
          level: this.level,
          date: this.month
        };
      }
      let unit = ""; //横坐标单位
      let datas = [];
      let date;
      FogArea.getVisibilityStatistics(data, this.$cookies.get("token")).then(
        value => {
          if (value == null) {
            this.$alert("未找到统计数据！", "统计分析", {
              confirmButtonText: "确定"
            });
            return;
          }
          var series = [];
          for (var i = 0; i < value.series.length; ++i) {
            if (value.xAxis.length == 24) {
              unit = "时";
              date = this.date.substring(0, 9);
            } else if (value.xAxis.length >= 24) {
              unit = "日";
              date = this.date.substring(0, 6);
            }
            for (var j = 0; j < this.fogAreas.length; ++j) {
              if (this.fogAreas[j].wqbm == value.series[i].name) {

                datas.push({
                  wqmc: this.fogAreas[j].wqmc,
                  date: date,
                  dates: value.xAxis,
                  njd: value.series[i].yAxis,
                  unit: unit
                });
                this.fogAreaData = datas;
                series.push({
                  name: this.fogAreas[j].wqmc,
                  type: "line",
                  data: value.series[i].yAxis,
                  markLine: {
                    silent: true,
                    data: [
                      {
                        yAxis: 100
                      },
                      {
                        yAxis: 500
                      },
                      {
                        yAxis: 1000
                      }
                    ]
                  }
                });
                break;
              }
            }
          }

          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // 绘制图表
          myChart.clear();
          myChart.setOption({
            title: {
              text: "雾区能见度分析表",
              left: "center"
            },
            tooltip: {
              trigger: "axis",
              textStyle: {
                fontSize: 12,
              },
              formatter:function(a) {
                let axisValueStr = '<div>'+a[0].axisValueLabel+unit+'</div>';
                for(let i = 0;i<a.length; i++){
                  axisValueStr += '<div>'+a[i].seriesName+' : '+a[i].value+' 米</div>'
                }
                return axisValueStr;
              }
            },
            xAxis: {
              name: "时间",
              data: value.xAxis,
              axisLabel: {
                formatter: function(value, index) {
                  return value + unit;
                }
              }
            },
            yAxis: {
              name: "能见度(米)",
              splitLine: {
                show: false
              }
            },
            visualMap: {
              top: 0,
              right: 0,
              itemWidth: 14, //图元宽
              itemHeight: 10, //图元高
              textGap: 5, //文字与图元距离
              itemGap: 3, //图元与图元之间距离
              pieces: [
                {
                  gt: 0,
                  lte: 100,
                  color: "#ff0000"
                },
                {
                  gt: 100,
                  lte: 500,
                  color: "#ff9900"
                },
                {
                  gt: 500,
                  lte: 1000,
                  color: "#ffff00"
                },
                {
                  gt: 1000,
                  color: "#00ff00"
                }
              ]
            },
            series: series
          });
        }
      );
    }
  }
};
</script>


