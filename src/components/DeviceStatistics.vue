<template>
  <div class="DeviceStatistics">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.StatisticalAnalysis') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.DeviceBreakdownAnalysis') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.LampBreakdownAnalysis') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div ref="contentBox" class="contentBox">
        <div style="width: 30%;float: left;padding-left: 20px;">

          <el-table :data="pointData" :height="pointHeight" style="width: 100%;margin-top: 20px;border: 1px solid #ddd;">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="tableBoxs">
                  <div class="item">
                    <div class="itemContent tr" style="border-top: 1px solid #ddd;">{{props.row.zczt}}</div>
                    <div class="itemContent tr" >{{props.row.slzt}}</div>
                    <div class="itemContent tr" >{{props.row.mbqzt}}</div>
                    <div class="itemContent tr" >{{props.row.wdggzt}}</div>
                    <div class="itemContent tr" >{{props.row.dydzt}}</div>
                  </div>
                  <div class="item">
                    <div class="itemContent borderR tl" style="border-top: 1px solid #ddd;">{{props.row.zcValue}}</div>
                    <div class="itemContent borderR tl">{{props.row.slValue}}</div>
                    <div class="itemContent borderR tl">{{props.row.mbqValue}}</div>
                    <div class="itemContent borderR tl">{{props.row.wdggValue}}</div>
                    <div class="itemContent borderR tl">{{props.row.dydValue}}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="wqmc" :label="$t('message.FogAreaName')" min-width="100"></el-table-column>
          </el-table>
        </div>
        <div style="width: 70%;float: left;">

          <div class="echartsBarBox" ref="echartsBarBox">
            <!-- border: '1px solid #ebeef5 -->
            <div id="deviceBar"  ref="echartsBarBoxs" :style="{width: '100%', border: '1px solid #ddd',}"></div>
          </div>
          <div class="echartsPieBox" ref="echartsPieBox">
            <div class="echartsPieBoxs">
              <div class="echartsPieTitle">{{ $t('message.LampBreakdownAnalysis') }}</div>
              <ul class="echartsPieBoxItem" ref="echartsPieBoxs"></ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>
<script>
  import FogArea from "./js/FogArea.js";
  export default {
    data(){
      return{
        DeviceStatisticeData: '',//设备故障数据
        pointData: [],
        pointHeight: '',
      }
    },
    created(){
      this.pointHeight = window.innerHeight - 128 + "px";
    },
    mounted() {
      let data = {}
      FogArea.getDeviceStatistics(data).then(value => {
        if (value == null) {
          this.$alert('未找到统计数据！', '统计分析', {
            confirmButtonText: '确定',
          });
          return;
        }
        this.DeviceStatisticeData = value;
        console.log()
        let datas = [];
        let devicePieObj;
        for (let j = 0; j < value.line.series[0].yAxis.length; j++) {
          devicePieObj = document.createElement('div');
          devicePieObj.setAttribute('class', 'devicePie');
          devicePieObj.setAttribute('id', 'devicePie' + j);
          console.log(devicePieObj)
          if (this.$refs.echartsPieBoxs != undefined){
            this.$refs.echartsPieBoxs.appendChild(devicePieObj)
          }

        }
        this.$refs.contentBox.style.height = window.innerHeight - 156 + 'px';
        this.$refs.echartsBarBoxs.style.height = (window.innerHeight - 180)*0.6 + 'px';
        this.$refs.echartsPieBoxs.style.height = (window.innerHeight - 180)*0.4 + 'px';
        this.drawLine();
        this.drawLinepoint();
      })

    },
    methods: {
      drawLine(){
        let data = {}
        let series = [];
        for(let i = 0; i < this.DeviceStatisticeData.line.series.length; i++){
          series.push({
            name: this.DeviceStatisticeData.line.series[i].name,
            type: 'bar',
            data: this.DeviceStatisticeData.line.series[i].yAxis
          })
        }
        // 基于准备好的dom，初始化echarts实例
        let deviceBar = this.$echarts.init(document.getElementById('deviceBar'))
        // 绘制图表
        deviceBar.clear();
        deviceBar.setOption({
          title: { text: '雾灯故障数量统计' },
            tooltip: {
              trigger: "axis",
              textStyle: {
                fontSize: 12,
              },
            },
            color: ['#7ed96f', '#e5323e'],
            legend: {
              data: ['正常', '故障', ],
              right: 50,
              top: 20
            },
            xAxis: {
              // name: '雾区名称',
              type:"category",
              axisLabel:{
                interval:0,
                rotate:30,
                margin:6,
                textStyle:{
                  color:"#222"
                }
              },
              textStyle: {
                fontSize: 12,
              },
              data: this.DeviceStatisticeData.line.xAxis,
            },
            grid: { // 控制图的大小，调整下面这些值就可以，
              x: 100, x2: 60, y2: 100,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
            },
            yAxis: {

            },
            series: series,
        });


      },
      drawLinepoint() {
        let data = {}
        let color = ['#7ed96f','#ff0000','#ff9900','#f9ce22','#fbfb37'];//绿，红，橘红，橘黄，黄
        let legendData = ['正常','失联','门被撬','温度过高','电池电压过低'];

        let pointTableData = [];
        for (var i = 0; i < this.DeviceStatisticeData.pie.xAxis.length; ++i)
        {
          var datas = [];
          let colors = [];
          let legendDatas = [];
          pointTableData.push({
            wqmc: this.DeviceStatisticeData.pie.xAxis[i],
            zczt: this.DeviceStatisticeData.pie.series[0].name,
            zcValue: this.DeviceStatisticeData.pie.series[0].yAxis[i],
            slzt: this.DeviceStatisticeData.pie.series[1].name,
            slValue: this.DeviceStatisticeData.pie.series[1].yAxis[i],
            mbqzt: this.DeviceStatisticeData.pie.series[2].name,
            mbqValue: this.DeviceStatisticeData.pie.series[2].yAxis[i],
            wdggzt: this.DeviceStatisticeData.pie.series[3].name,
            wdggValue: this.DeviceStatisticeData.pie.series[3].yAxis[i],
            dydzt: this.DeviceStatisticeData.pie.series[4].name,
            dydValue: this.DeviceStatisticeData.pie.series[4].yAxis[i],

          })

          for (var j = 0; j < this.DeviceStatisticeData.pie.series.length; ++j)
          {

            if (this.DeviceStatisticeData.pie.series[j].yAxis[i] != 0)
            {
              datas.push({
                name: this.DeviceStatisticeData.pie.series[j].name,
                value: this.DeviceStatisticeData.pie.series[j].yAxis[i]
              });
              colors.push(color[j]);
              legendDatas.push(legendData[j]);
            }
          }
            let dom = document.getElementById('devicePie'+i)
            // 基于准备好的dom，初始化echarts实例，找到图形容器。
            let devicePie = this.$echarts.init(dom);
            // 绘制图表
            devicePie.clear();
            devicePie.setOption({
              title: {
                text: this.DeviceStatisticeData.line.xAxis[i],
                left: 'center',
                textStyle: {
                  fontSize: 12,
                }
              },
              tooltip: {
                trigger: "item",
                position: ['0%', '50%'],
                textStyle: {
                  fontSize: 12,
                },
                formatter: '{a} <br/> {b} : {c} ({d}%)'
              },
              color: colors,
              legend: {       //右侧提示状态图
                // type: 'scroll',
                orient: 'vertical',
                x: 'left',
                y: 'bottom',
                data: legendDatas,
                bottom: 0,
                right: '10%',
                itemWidth: 14,//图元宽
                itemHeight: 10,//图元高
                textGap: 3,//文字与图元距离
                itemGap: 3,//图元与图元之间距离
                textStyle:{
                  fontSize:12
                }
              },
              series: [{
                name: this.DeviceStatisticeData.line.xAxis[i],
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],   //调整位置
                label: {
                  normal: {
                    show: true,
                    position: 'inside',//百分数显示位置
                    fontSize:'15',//每部分占比fontSize
                    formatter:'{c}'
                  }
                },
                data: datas
              }]
            });

        }

        this.pointData = pointTableData;
			},
    },
  }
</script>

