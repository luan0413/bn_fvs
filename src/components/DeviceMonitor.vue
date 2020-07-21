<template>
  <div>
    <Head :activeIndex="actives" />
    <div class="content DeviceMonitor">
      <nav class="nav">
        <div class="navBox" v-show="sideflag">
          <!--设备监控左侧列表-->
          <div class="leftMenuBox">
            <div class="leftMenuTitle">
              <span class="fl">
                <i class="el-icon-document"></i>{{$t('message.DeviceMonitor')}}</span>
              <!-- 筛选按钮 -->
              <div class="showmenu" style="" @click="showmenu">{{$t('message.Filtrate')}}</div>
              <span class="refresh" @click="selectUpdate">
                <i class="el-icon-refresh"></i>{{$t('message.Updating')}}
              </span>
              <div class="leftmenu" ref="leftmenu">
                <div>
                  <!--雾灯标注状态-->
                  <span class="ml10 mt10" style="color: #666;">{{$t('message.Lamp')}}{{$t('message.LabelState')}}</span>
                  <el-radio-group v-model="labelStatus">
                    <div>
                      <el-radio v-model="labelStatus" label="1" class="allRadio">{{$t('message.All')}}</el-radio>
                      <el-radio v-model="labelStatus" label="2" class="listRadio">{{$t('message.Label')}}</el-radio>
                      <el-radio v-model="labelStatus" label="3" class="listRadio">{{$t('message.Unlabeled')}}</el-radio>
                    </div>
                  </el-radio-group>
                </div>
                <div class="hrRadio">
                  <!--雾灯设备状态-->
                  <span class="ml10 mt10" style="color: #666;">{{$t('message.Lamp')}}{{$t('message.DeviceState')}}</span>
                  <el-radio-group v-model="deviceStatus">
                    <el-radio v-model="deviceStatus" label="1" size="mini" class="allRadio">{{$t('message.All')}}</el-radio>
                    <el-radio v-model="deviceStatus" label="2" size="mini" class="listRadio">{{$t('message.Normal')}}</el-radio>
                    <el-radio v-model="deviceStatus" label="3" size="mini" class="listRadio">{{$t('message.Breakdown')}}</el-radio>
                  </el-radio-group>
                </div>
                <div class="btn">
                  <button class="btnsure el-icon-check" @click="confirm" style="color:green"></button>
                  <button class="btnclear el-icon-close " @click="unconfirm"></button>
                </div>
              </div>
            </div>
            <div class="leftTreeBox" ref="leftTreeBox">
              <el-tree :props="props" :load="loadNode" lazy ref="tree" :expand-on-click-node='false' @node-click="selectNode" @node-collapse="selectclose" @node-expand="selectopen">
                <span slot-scope="{ node, data }" style="position: relative;">
                  <span class="iconImg iconImgVisibility" v-if="data.type == sblx.Visibility && data.sbzt == sbzt.Normal"></span>
                  <span class="iconImg iconImgDisVisibility" v-if="data.type == sblx.Visibility && data.sbzt == sbzt.Error"></span>
                  <span class="iconImg iconImgController" v-if="data.type == sblx.Controller && data.sbzt == sbzt.Normal"></span>
                  <span class="iconImg iconImgDisController" v-if="data.type == sblx.Controller && data.sbzt == sbzt.Error"></span>
                  <span class="iconImg iconImgLamp" v-if="data.type == sblx.Lamp && data.sbzt == sbzt.Normal"></span>
                  <span class="iconImg iconImgDisLamp" v-if="data.type == sblx.Lamp && data.sbzt == sbzt.Error"></span>

                  <!-- <span class="iconImg iconImgAtmospherium" v-if="data.type == sblx.Meteo && data.sbzt == sbzt.Normal"></span>
                  <span class="iconImg iconImgDisAtmospherium" v-if="data.type == sblx.Meteo && data.sbzt == sbzt.Error"></span> -->
                  <span class="iconImg iconImgAtmospherium" v-if="data.type == sblx.Meteo"></span>

                  <!-- <span class="iconImg iconImgHorn" v-if="data.type == sblx.Horn && data.sbzt == sbzt.Normal"></span>
                  <span class="iconImg iconImgDisHorn" v-if="data.type == sblx.Horn && data.sbzt == sbzt.Error"></span> -->
                  <span class="iconImg iconImgHorn" v-if="data.type == sblx.Horn"></span>

                  <!-- <span class="iconImg iconImgScreen" v-if="data.type == sblx.Screen && data.sbzt == sbzt.Normal"></span>
                  <span class="iconImg iconImgDisScreen" v-if="data.type == sblx.Screen && data.sbzt == sbzt.Error"></span> -->
                  <span class="iconImg iconImgScreen" v-if="data.type == sblx.Screen"></span>

                  <!-- <span class="iconImg iconImgAlarm" v-if="data.type == sblx.Light && data.sbzt == sbzt.Normal"></span>
                  <span class="iconImg iconImgDisAlarm" v-if="data.type == sblx.Light && data.sbzt == sbzt.Error"></span> -->
                  <span class="iconImg iconImgAlarm" v-if="data.type == sblx.Light"></span>

                  <span class="el-tree-text" :title="node.label">{{ node.label }}</span>
                </span>
              </el-tree>
            </div>
          </div>
        </div>
        <div class="navBoxBar" @click="side" ref="navbox"><img src="./img/right.png" alt="" v-if="!sideflag"><img src="./img/left.png" alt="" v-else></div>
      </nav>
      <section class="section" style="min-width: 1080px !important;">
        <div class="connmand differcommand">
          <input type="button" @click=" jog(selectinfo)" class="navbutton" :title="$t('message.Roam')" ref="jog" />
          <input type="button" @click=" zoomInCommand" class="navbutton" :title="$t('message.Amplification')" />
          <input type="button" @click="zoomOutCommand" class="navbutton" :title="$t('message.Shrink')" />
          <input type="button" @click="fullScreen" class="navbutton" :title="$t('message.FullScreen')" ref="full" />
          <input type="button" @click="measure" class="navbutton" :title="$t('message.MeasureDistance')" />
          <input type="button" @click="area" class="navbutton" :title="$t('message.MeasureArea')" />
          <input type="button" @click="editPoint(selectinfo)" class="navbutton" :title="$t('message.DeviceLable')" />
          <div class="select" @click="layerSelectshow">
            {{$t('message.Device')}}{{$t('message.Filtrate')}}
            <span style="margin-left:2px;" class="el-icon-arrow-down" v-if="selectDown"></span>
            <span style="margin-left:2px;" class="el-icon-arrow-up" v-else></span>
          </div>
          <div class="selectdilog" v-show="showSelect">
            <el-checkbox-group v-model="checkList" size="mini">
              <el-checkbox label="1">
                <span>{{$t('message.VisibilityDevice')}}</span>
              </el-checkbox>
              <el-checkbox label="2">
                <span class="mr10">{{$t('message.Controller')}}</span>
              </el-checkbox>
              <el-checkbox label="3">
                <span class="mr10">{{$t('message.Lamp')}}</span>
              </el-checkbox>
              <el-checkbox label="4">
                <span class="mr10">{{$t('message.Atmospherium')}}</span>
              </el-checkbox>
              <el-checkbox label="5">
                <span class="mr10">{{$t('message.Horn')}}</span>
              </el-checkbox>
              <el-checkbox label="6">
                <span>{{$t('message.SpeedScreen')}}</span>
              </el-checkbox>
              <el-checkbox label="7">
                <span>{{$t('message.AlarmLight')}}</span>
              </el-checkbox>
            </el-checkbox-group>
            <div class="btn">
              <button class="btnsure el-icon-check" @click="selectSure" style="color:green"></button>
              <button class="btnclear  el-icon-close" @click="selectClear" style="color:red"></button>

            </div>
          </div>
        </div>
        <div class="map-box-kong"></div>
        <div class="map-box" ref="mapbox">
          <Map/>
        </div>
        <div class="tab-box">
          <div class="tabBox" v-show="showtabbar" ref="showtabbar">
            <el-tabs v-model="activeName" type="card" closable @tab-remove="removeTab" @tab-click="selectTab">
              <el-tab-pane v-for="(item) in tabs" :key="item.name" :label="item.title" :name="item.name">
                <div class="panalBox">
                  <div v-show="isDevice" class="isDevices">
                    <!--号角，气象仪-->
                    <div class="bana-information">
                      <div class="bana-title">{{$t('message.BasicMessage')}}</div>
                      <div class="bana-information-content">
                        <ul class="inf information">
                          <li>
                            <span>{{$t('message.DeviceName')}}：</span>
                            <input type="text" readonly v-model="sbmc" />
                          </li>
                          <li>
                            <span>{{$t('message.FogArea')}}：</span>
                            <input type="text" readonly v-model="wqmc" />
                          </li>
                          <li>
                            <span>通讯参数：</span>
                            <input type="text" readonly v-model="txcs" />
                          </li>
                          <li>
                            <span>IP地址：</span>
                            <input type="text" readonly v-model="ipdz" />
                          </li>
                        </ul>
                        <ul class="inf information">
                          <li>
                            <span>端口：</span>
                            <input type="text" readonly v-model="dk" />
                          </li>
                          <li>
                            <span>设备状态：</span>
                            <input type="text" readonly v-model="sbztsm" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- <div class="bana-information bana-inf-right">
                      <div class="bana-title">设备控制</div>
                      <div class="bana-information-content mt20">
                        <el-button type="success" plain icon="el-icon-circle-check-outline" @click="open">{{$t('message.ON')}}</el-button>
                        <el-button type="danger" plain icon="el-icon-circle-close-outline" @click="close">{{$t('message.OFF')}}</el-button>
                       </div>
                    </div> -->
                  </div>
                  <div v-show="isVisibility" class="isVisibilitys">
                    <!--能见度检测仪-->
                    <div class="bana-information">
                      <div class="bana-title">{{$t('message.VisibilityDevice')}}{{$t('message.Message')}}</div>
                      <div class="bana-information-content">
                        <ul class="inf information">
                          <li>
                            <span>{{$t('message.DeviceName')}}：</span>
                            <input type="text" readonly v-model="sbmc" />
                          </li>
                          <li class="spa">
                            <span>{{$t('message.RelevanceController')}}：</span>
                            <input type="text" readonly v-model="kzqmc" />
                          </li>
                          <li>
                            <span>{{$t('message.FogArea')}}：</span>
                            <input type="text" readonly v-model="wqmc" />
                          </li>
                          <li class="spa">
                            <span>{{$t('message.DeviceState')}}：</span>
                            <input type="text" readonly v-model="sbztsm" />
                          </li>
                        </ul>
                        <!-- <ul class="inf information">
                        </ul> -->
                      </div>
                    </div>
                    <!-- <div class="bana-information bana-inf-right">
                      <div class="bana-title">设备控制</div>
                      <div class="bana-information-content mt20">
                        <el-button type="success" plain icon="el-icon-circle-check-outline" @click="open">{{$t('message.ON')}}</el-button>
                        <el-button type="danger" plain icon="el-icon-circle-close-outline" @click="close">{{$t('message.OFF')}}</el-button>
                        <el-button type="primary" plain icon="el-icon-refresh" @click="restart">{{$t('message.Resetart')}}</el-button>
                      </div>
                    </div> -->
                  </div>
                  <div v-show="isController" class="isControllers">
                    <!--区域控制器-->
                    <div class="bana-information">
                      <div class="bana-title">{{$t('message.BasicMessage')}}</div>
                      <div class="bana-information-content">
                        <ul class="inf information">
                          <li>
                            <span>{{$t('message.DeviceName')}}：</span>
                            <input type="text" readonly v-model="sbmc" :title="sbmc" />
                          </li>
                          <li class="spa">
                            <span>{{$t('message.ControllerNum')}}：</span>
                            <input type="text" readonly v-model="kzqbsm" :title="kzqbsm" />
                          </li>
                          <li class="spa">
                            <span>{{$t('message.FogArea')}}：</span>
                            <input type="text" readonly v-model="wqmc" :title="wqmc" />
                          </li>
                          <li>
                            <span>{{$t('message.DeviceState')}}：</span>
                            <input type="text" readonly v-model="sbztsm" :title="sbztsm" />
                          </li>
                        </ul>
                        <ul class="inf information">
                          <li class="spa">
                            <span>{{$t('message.updateTime')}}：</span>
                            <input type="text" readonly v-model="gxsjsm" :title="gxsjsm" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- <div class="bana-information bana-inf-right">
                      <div class="bana-title">设备控制</div>
                      <div class="bana-information-content mt20">
                        <el-button type="success" plain icon="el-icon-circle-check-outline" @click="open">{{$t('message.ON')}}</el-button>
                        <el-button type="danger" plain icon="el-icon-circle-close-outline" @click="close">{{$t('message.OFF')}}</el-button>
                        <el-button type="primary" plain icon="el-icon-refresh" @click="restart">{{$t('message.Resetart')}}</el-button>
                      </div>
                    </div> -->
                  </div>
                  <div v-show="isLamp" class="isLamps" style="display: flex;">
                    <!--雾灯-->
                    <div class="bana-information lamp" style="flex-grow: 1;">
                      <div class="bana-title">{{$t('message.BasicMessage')}}</div>
                      <div class="bana-information-content" style="padding-left: 0;">
                        <ul class="inf">
                          <li>
                            <span>{{$t('message.DeviceId')}}：</span>
                            <input type="text" readonly v-model="wdbm" :title="wdbm" />
                            <span class="unit"></span>
                          </li>
                          <li>
                            <span>{{$t('message.BatteryVoltage')}}：</span>
                            <input type="text" readonly v-model="xdcdy" :title="xdcdy" />
                            <span class="unit">v</span>
                          </li>
                          <li>
                            <span>{{$t('message.SolarPowerVoltage')}}：</span>
                            <input type="text" readonly v-model="tyndy" :title="tyndy" />
                            <span class="unit">v</span>
                          </li>
                          <li>
                            <span>{{$t('message.FoglightTemperature')}}：</span>
                            <input type="text" readonly v-model="wdwd" :title="wdwd" />
                            <span class="unit">℃</span>
                          </li>
                        </ul>
                        <ul class="inf">
                          <li>
                            <span>{{$t('message.DoorState')}}：</span>
                            <input type="text" readonly v-model="mztsm" :title="mztsm" />
                            <span class="unit"></span>
                          </li>
                          <li>
                            <span>{{$t('message.TemperatureState')}}：</span>
                            <input type="text" readonly v-model="wdztsm" :title="wdztsm" />
                            <span class="unit"></span>
                          </li>
                          <li>
                            <span>{{$t('message.VoltageState')}}：</span>
                            <input type="text" readonly v-model="dyztsm" :title="dyztsm" />
                            <span class="unit"></span>
                          </li>
                          <li>
                            <span>{{$t('message.DevicePairing')}}：</span>
                            <input type="text" readonly v-model="sbpdsm" :title="sbpdsm" />
                            <span class="unit"></span>
                          </li>
                        </ul>
                        <ul class="inf">
                          <li>
                            <span>{{$t('message.RadarState')}}：</span>
                            <input type="text" readonly v-model="ldztsm" :title="ldztsm" />
                            <span class="unit"></span>
                          </li>

                          <li>
                            <span>{{$t('message.LEDLightState')}}：</span>
                            <input type="text" readonly v-model="ledztsm" :title="ledztsm" />
                            <span class="unit"></span>
                          </li>
                          <li>
                            <span>{{$t('message.FoglightState')}}：</span>
                            <input type="text" readonly v-model="wdljztsm" :title="wdljztsm" />
                            <span class="unit"></span>
                          </li>
                          <li>
                            <span>{{$t('message.DeviceState')}}：</span>
                            <input type="text" readonly v-model="sbztsm" :title="sbztsm" />
                            <span class="unit"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- <div class="bana-information bana-inf-right">
                      <div class="bana-title">设备控制</div>
                      <div class="bana-information-content mt20"> -->
                      <!-- </div>
                    </div> -->
                    <div style="width: 130px;min-width: 140px;padding-left: 10px;">
                        <el-button type="primary" plain icon="el-icon-refresh" @click="queryLamp" style="margin-top: 85px;">更新雾灯状态</el-button>

                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="tabBoxBar"></div>
          <div class="tabBoxBar" @click="showtab"><img src="./img/top.png" alt="" v-if="!showtabbar"><img src="./img/bottom.png" alt="" v-else></div>

        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FogArea from "./js/FogArea.js";
import LinkDevice from "./js/LinkDevice.js";
import Controller from "./js/Controller.js";
import Login from "./js/Login.js";
import Map from '@/components/Map'
import Head from '@/components/Head'
import sloveMap from './js/sloveMap.js'
import Dictionary from './js/Dictionary.js'
import Code from "./js/Code.js";
export default {
  name: 'DeviceMonitor',
  components: {
    Map,
    Head
  },
  data() {
    return {
      actives: '2',
      selectDown: true,
      showSelect: false, //设备筛选下拉框状态
      checkList: ["1", "2", "3", "4", "5", "6", "7"], //设备筛选下拉框选中值
      inputurl: require("./img/full.jpg"),
      fullflag: false, //全屏状态数据
      sideflag: true, //左侧状态数据
      showtabbar: false, //底部状态数据
      tabbarflag: false, //底部是否显示数据
      data: [], //树数据
      dataone: [],
      mapobj: null, //地图对象
      forflage: true, //截流
      selectinfo: null, //选择的数据信息
      //包含坐标信息的各设备数据
      vis: [], //能见度检测仪
      speed: [], //限速屏
      horn: [], //号角
      foglamp: [], //雾灯
      alarmlamp: [], //警灯
      controll: [], //控制器
      meteorological: [], //气象仪
      pointserach: [], //图层中搜索到的总数据点
      fogareaInfo: [], //雾区信息
      openControll: [], //树节点开启的控制器
      closeControll: [], //树节点关闭的控制器
      gisLayername: { //gis存储图层名
        controller: "dv_fvs_controller", //控制器
        lamp: "dv_fvs_lamp", //雾灯
        visibility: "dv_fvs_visibility", //能见度检测仪
        linkdevice: "dv_fvs_linkdevice", //联动设备
        fogarea: "base_fvs_fogarea", //雾区图层
      },
      treeArray: [], //树节点开启关闭时的存储数据
      treeFlag: true,
      //树属性映射
      props: {
        children: "children",
        label: "name",
        isLeaf: "leaf"
      },
      //树不同层级的数据
      levelzero: [],
      levelone: [],
      leveltwo: [],
      //树节点信息
      treeNode: [],
      //作为数据更新的树节点
      dataNode: [],
      resolve: null,
      //设备编辑状态
      editflag: false,
      //标注键再次点击取消状态
      uneditflag: false,
      //是否显示雾灯
      selectflag: false,
      //雾区集合
      fogarea: [],
      //tab标签数据集合
      tabs: [],
      //当前tab是否是设备
      isDevice: false,
      //当前tab是否是雾灯
      isLamp: false,
      //当前tab是否是区域控制器
      isController: false,
      //当前tab是否是能见度检测仪
      isVisibility: false,
      //当前tab名称
      activeName: "",
      //设备编码
      sbbm: "",
      //检测仪编码
      jcybm: "",
      //设备名称
      sbmc: "",
      //设备状态
      sbztsm: "",
      //ip
      ipdz: "",
      //端口
      dk: "",
      //通讯参数
      txcs: "",
      //雾灯编码
      wdbm: "",
      //蓄电池电压
      xdcdy: "",
      //太阳能电压
      tyndy: "",
      //雾灯温度
      wdwd: "",
      //门状态
      mztsm: "",
      //雾灯状态
      wdztsm: "",
      //电压状态
      dyztsm: "",
      //led状态
      ledztsm: "",
      //雷达状态
      ldztsm: "",
      //设备配对
      sbpdsm: "",
      //雾灯连接状态
      wdljztsm: "",
      //限速值
      xsz: "1000",
      //雾灯操作
      wdkz: 3,
      //控制器标识码
      kzqbsm: '',
      //控制器更新时间
      gxsjsm: "-",
      //标注状态
      labelStatus: '1',
      //设备状态
      deviceStatus: '1',
      //控制器名称
      kzqmc: "",
      //当前选中的雾灯
      lamp: {},
      controllerWorkMode: [],//雾灯工作模式字典,
      sblx: {
        Visibility: Dictionary.Sblx.Visibility,
        Controller: Dictionary.Sblx.Controller,
        Lamp: Dictionary.Sblx.Lamp,
        Meteo: Dictionary.Sblx.Meteo,
        Horn: Dictionary.Sblx.Horn,
        Screen: Dictionary.Sblx.Screen,
        Light: Dictionary.Sblx.Light,
        FogArea: Dictionary.Sblx.FogArea
      },
      sbzt: {
        Normal: Dictionary.Sbzt.Normal,
        Error: Dictionary.Sbzt.Error,
      }
    };
  },
  mounted: function () {
    this.mapobj = this.$store.state.mapobj;
    this.mapLevelchange(); //地图层级改变
    this.searchFogarea() //雾区坐标信息查询
    this.loadControllerWorkMode();
    this.mapobj.onViewLoadEvent(this.mapobj, this.fogareasonViewLoadEvent);//地图加载完成事件
  },
  methods: {
    //读取工作模式字典
    loadControllerWorkMode() {
      var data = {
        dmlb: Dictionary.CodeType.ControllerWorkMode
      };

      Code.getCodes(data).then(value => {
        this.controllerWorkMode = value.datas;
      })
    },
    //读取树节点,实现懒加载效果
    loadNode(node, resolve) {
      // console.log(node)
      if (node.level === 0) {
        this.resolve = resolve

        FogArea.getFogAreas().then(value => {
          for (let i = 0; i < value.length; ++i) { //绘制图层
            sloveMap.getElementLayer(value[i].wqbm, this.mapobj)
          }
          this.levelzero = value //存储雾区节点信息
          return resolve(this.levelzero);
        });
      }
      //子节点读取设备
      else if (node.level == 1) {
        this.levelFun = resolve
        //gis图层查询信息
        let searchVisibility = sloveMap.selectinfo(this.gisLayername.visibility);
        let searchLinkdevice = sloveMap.selectinfo(this.gisLayername.linkdevice);
        let searchController = sloveMap.selectinfo(this.gisLayername.controller);
        let that = this;
        var queryParameter = {
          wqbm: node.data.wqbm,
        };
        FogArea.getDevices(queryParameter).then(value => { //获取对应雾区设备信息
          that.levelone = value;
          this.lamps = {};
          for (var i = 0; i < that.levelone.length; ++i) {
            if (that.levelone[i].type == Dictionary.Sblx.Controller) {
              that.levelone[i].name = that.levelone[i].name + "(" + that.levelone[i].errorCount + "/" + (that.levelone[i].goodCount + that.levelone[i].errorCount) + ")";
            }
            that.levelone[i].num = 0 //默认设备点未标记（0）
          }

          searchVisibility.sendRequest(function (data, config) { //能见度检测仪信息查询
            let rowList = data[0].rowList;
            if (rowList.length == 0) {
              window.console.log("没有查到数据！");
            }
            //保证每个数组都对应当前雾区
            that.vis = []
            for (let i in that.levelone) {
              that.levelone[i].edite = 0; //设置点的编辑状态
              for (let j = 0; j < rowList.length; j++) {
                if (rowList[j].values.JCYMC === (that.levelone[i].id)) {
                  that.levelone[i].shape = rowList[j].values.SHAPE
                  that.levelone[i].num = 1 //默认设备点已标记（1）
                }
              }
            }
          })
          searchLinkdevice.sendRequest(function (data, config) { //联动设备信息查询
            let rowList = data[0].rowList;
            if (rowList.length == 0) {
              window.console.log("没有查到数据！");
            }
            //保证每个数组都对应当前雾区
            that.meteorological = []
            that.horn = []
            that.alarmlamp = []
            that.speed = []
            for (let i in that.levelone) {
              that.levelone[i].edite = 0; //设置点的编辑状态
              for (let j = 0; j < rowList.length; j++) {
                if (rowList[j].values.SBMC === (that.levelone[i].id)) {
                  that.levelone[i].shape = rowList[j].values.SHAPE
                  that.levelone[i].num = 1
                }
              }
            }
          })
          searchController.sendRequest(function (data, config) { //控制器信息查询
            let rowList = data[0].rowList;
            if (rowList.length == 0) {
              window.console.log("没有查到数据！");
            }
            that.controll = []
            for (let i in that.levelone) {
              that.levelone[i].edite = 0; //设置点的编辑状态
              for (let j = 0; j < rowList.length; j++) {
                if (rowList[j].values.KZQMC === (that.levelone[i].id)) {
                  that.levelone[i].shape = rowList[j].values.SHAPE
                  that.levelone[i].num = 1
                }
              }
            }
            that.markpoint(that.levelone)
            return resolve(that.levelone);
          })
        });
      } else if (node.level == 2) {
        if (node.data.type == Dictionary.Sblx.Controller) {
          var controller = {
            kzqbm: node.data.kzqbm
          };
          Controller.getLamps(controller).then(value => {

            if (value == null) {
              return resolve([]);
            }
            node.data.name = value.name + "(" + value.errorCount + "/" + (value.goodCount + value.errorCount) + ")";
            this.leveltwo = value.lamps;
            for (let i = 0; i < this.leveltwo.length; i++) { //给上初始的设备点编辑状态
              this.leveltwo[i].num = 0
            }

            let searchLamp = sloveMap.selectinfo(this.gisLayername.lamp);
            var that = this;
            searchLamp.sendRequest(function (data, config) { //点信息查询
              let rowList = data[0].rowList;
              if (rowList.length == 0) {
                window.console.log("没有查到数据！");
              }
              for (let j in that.leveltwo) {
                for (let k = 0; k < rowList.length; k++) {
                  if (rowList[k].values.KZQMC == that.leveltwo[j].id) {
                    that.leveltwo[j].shape = rowList[k].values.SHAPE;
                    that.leveltwo[j].num = 1;
                  }
                }
              }


              if (that.deviceStatus == 2) { //筛选----正常
                that.leveltwo = that.leveltwo.filter(item => {
                  return item.sbzt == Dictionary.Sbzt.Normal;
                })
              } else if (that.deviceStatus == 3) { //筛选----故障
                that.leveltwo = that.leveltwo.filter(item => {
                  return item.sbzt == Dictionary.Sbzt.Error;
                })
              }
              if (that.labelStatus == 2) { //筛选----标注
                that.leveltwo = that.leveltwo.filter(item => {
                  return item.num == 1
                })
              } else if (that.labelStatus == 3) { //筛选----未标注
                that.leveltwo = that.leveltwo.filter(item => {
                  return item.num == 0
                })
              }

              that.markpoint(that.leveltwo)
              return resolve(that.leveltwo);
            });

          });
        }
      }
    },
    //显示筛选
    showmenu() {
      this.$refs.leftmenu.style.display = 'block';
    },
    unconfirm() { //筛选取消按钮
      this.labelStatus = '1';
      this.deviceStatus = '1';
      this.$refs.leftmenu.style.display = 'none';
    },
    confirm() { //筛选确认按钮
      this.selectUpdate()
    },
    layerSelectshow() { //设备图层筛选显示
      this.showSelect = true;
      this.selectDown = false
    },
    selectClear() { //设备图层筛选——取消
      this.showSelect = false;
      this.checkList = ["1", "2", "3", "4", "5", "6", "7"] //初始化
      this.selectDown = true
    },
    selectSure() { //设备图层筛选——确定
      this.showSelect = false;
      this.selectLayer(this.checkList)
      this.selectDown = true
    },
    selectLayer(checkList) { //选择图层
      if (checkList.length == 0) {
        for (let i = 1; i < this.mapobj.getLayerCount(); i++) { //将所有图层隐藏
          this.mapobj.getLayerByIndex(i).setVisible(false)
        }
        return
      }
      let layerArray = [];
      for (let i = 0; i < this.treeArray.length; i++) { //将树节点打开的图层显示
        if (this.treeArray[i].type == Dictionary.Sblx.Controller) { //雾灯图层显示
          for (let j = 0; j < this.treeArray.length; j++) {
            if (this.treeArray[j].type == Dictionary.Sblx.FogArea && this.treeArray[j].wqbm == this.treeArray[i].wqbm) {
              let layerNameL = this.treeArray[i].wqbm + '+' + this.treeArray[i].kzqbm + '+' + Dictionary.Sblx.Lamp;
              let layerLamp = sloveMap.getElementLayer(layerNameL, this.mapobj);
              layerArray.push(layerLamp)
            }
          }
        }
        if (this.treeArray[i].type == Dictionary.Sblx.FogArea) { //
          let layerNameV = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Visibility
          let layerNameC = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Controller
          let layerNameM = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Meteo
          let layerNameH = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Horn
          let layerNameS = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Screen
          let layerNameL = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Light
          let layerServiceV = sloveMap.getElementLayer(layerNameV, this.mapobj)
          let layerServiceC = sloveMap.getElementLayer(layerNameC, this.mapobj)
          let layerServiceM = sloveMap.getElementLayer(layerNameM, this.mapobj)
          let layerServiceH = sloveMap.getElementLayer(layerNameH, this.mapobj)
          let layerServiceS = sloveMap.getElementLayer(layerNameS, this.mapobj)
          let layerServiceL = sloveMap.getElementLayer(layerNameL, this.mapobj)
          layerArray.push(layerServiceV)
          layerArray.push(layerServiceC)
          layerArray.push(layerServiceM)
          layerArray.push(layerServiceH)
          layerArray.push(layerServiceS)
          layerArray.push(layerServiceL)
        }
      }
      for (let j = 0; j < layerArray.length; j++) {
        layerArray[j].setVisible(false)
        let layerName = layerArray[j].getLayerENName()
        if (!isNaN(layerName)) {
          continue
        } else {
          for (let k = 0; k < checkList.length; k++) {
            if (layerName.charAt(layerName.length - 1) == checkList[k]) { //选择了，就让对应的显示
              layerArray[j].setVisible(true)
            }
          }

        }
        this.mapobj.refresh();
      }
    },
    selectUpdate() { //筛选更新
      this.$refs.leftmenu.style.display = 'none';
      if (this.treeNode.length > 0) {
        this.loadNode(this.treeNode[0].parent, this.resolve) //重新添加树节点
        let treeArr = this.treeNode[0].parent.childNodes;
        for (let i = 0; i < treeArr.length; i++) { //删除原先树节点
          this.$refs.tree.remove(treeArr[i]);
          i--;
        }
        this.treeNode = [] //保存树节点清空
        // 清除地图上点数据
        for (let i = 1; i < this.mapobj.getLayerCount(); i++) { //将所有图层元素清除
          this.mapobj.getLayerByIndex(i).removeAllElement()
        }
      }
    },
    treeUpdate(data) { //树形控件数据更新
      //  思路：知道当前node，改变node上面数据（tree尽量避免增加和删除操作），loadNode加载一次就可以（需要注意与设备筛选的冲突）
      //  雾区节点--->（子节点）--设备节点-->(子节点)--雾灯节点
      if (this.treeNode.length != 0) { //已经筛选更新了，树已经重新加载，不需要自己重新加载树
        // 取最新状态下存储的节点数据
        let node = this.dataNode[this.dataNode.length - 1];
        let parents = []
        if (node.level == 2) {
          parents = node.parent.parent.childNodes; //对应着雾区节点
        }
        if (node.level == 1) {
          parents = node.parent.childNodes; //对应着雾区节点
        }
        if (data.type == Dictionary.Sblx.Lamp) {//
          for (let i = 0; i < parents.length; i++) {
            if (parents[i].data.wqbm == data.wqbm) {
              let childs = parents[i].childNodes;
              for (let j = 0; j < childs.length; j++) {//对应雾区节点下面的子节点（设备节点）
                if (childs[j].data.type == Dictionary.Sblx.Controller && childs[j].data.kzqbm == data.kzqbm) {
                  let childsLamp = childs[j].childNodes;
                  for (let k = 0; k < childsLamp.length; k++) {//对应设备节点下面的子节点（雾灯节点）
                    if (childsLamp[k].data.id == data.id) {
                      childsLamp[k].data.wdljztsm = "hhahaha";
                      this.loadNode(childsLamp[k].parent.parent, this.resolve) //重新添加树节点（添加的是雾区节点）
                    }
                  }
                }
              }
            }
          }
        } else {//数据是非雾灯
          for (let i = 0; i < parents.length; i++) {
            if (parents[i].data.wqbm == data.wqbm) {//找到雾区编码相同的雾区节点
              for (let j = 0; j < parents[i].childNodes.length; j++) {//对应雾区节点下面的子节点（设备节点）
                if (parents[i].childNodes[j].data.id == data.id) {
                  parents[i].childNodes[j].data.njdsfz = 100
                  this.loadNode(parents, this.resolve) //重新添加树节点（添加的是雾区节点）
                }
              }
            }
          }
        }

      }
    },
    selectopen(data, node) { //判断节点层级,开启
      //开启时添加数据
      this.treeNode.push(node) //添加树节点信息
      this.dataNode.push(node) //添加更新数据的树节点信息
      this.selectinfo = data;
      if (data.type == Dictionary.Sblx.FogArea) { //点击雾区节点，定位至该节点
        for (let i = 0; i < this.fogareaInfo.length; i++) {
          if (data.wqbm == this.fogareaInfo[i].WQBM) {
            let geo = DPS.Factory.createGeometry(this.fogareaInfo[i].SHAPE);
            this.mapobj.zoomByLevel(13)
            this.mapobj.zoomToGeometry(geo);
            let CenterPoint = this.mapobj.getMapCenterPoint()
            this.mapobj.zoomByLevelCenter(15, CenterPoint)
          }
        }
        this.mapobj.refresh()
      }
      let flag = false;
      this.treeArray.forEach((item, index) => {
        if (item.id === data.id) {
          flag = true;
        }
      })
      if (!flag) {
        this.treeArray.push(data)
      }

      if (data.type == Dictionary.Sblx.Controller) {
        if (data.num == 1) {
          let geo = DPS.Factory.createGeometry(data.shape);
          this.mapobj.zoomByLevelCenter(17, geo)
        }
      }
      this.gpspoint(data)
      this.selectLayer(this.checkList);
    },
    selectclose(data, node) { //判断节点层级,关闭
      this.selectinfo = data;
      this.treeArray.forEach((item, index) => {
        if (item.id === data.id) {
          this.treeArray.splice(index, 1)
        }
      })

      if (data.type == Dictionary.Sblx.Controller) { //雾灯关闭
        this.gpspoint(data)
        let layerName = data.wqbm + '+' + data.kzqbm + '+' + Dictionary.Sblx.Lamp
        let layerService = sloveMap.getElementLayer(layerName, this.mapobj)
        layerService.setVisible(false);
        if (data.num == 1) {
          let geo = DPS.Factory.createGeometry(data.shape);
          this.mapobj.zoomByLevelCenter(17, geo)
        }
      } else { //其他设备关闭
        let layerNameV = data.wqbm + '+' + Dictionary.Sblx.Visibility
        let layerNameC = data.wqbm + '+' + Dictionary.Sblx.Controller
        let layerNameM = data.wqbm + '+' + Dictionary.Sblx.Meteo
        let layerNameH = data.wqbm + '+' + Dictionary.Sblx.Horn
        let layerNameS = data.wqbm + '+' + Dictionary.Sblx.Screen
        let layerNameL = data.wqbm + '+' + Dictionary.Sblx.Light
        let layerServiceV = sloveMap.getElementLayer(layerNameV, this.mapobj)
        layerServiceV.setVisible(false);
        let layerServiceC = sloveMap.getElementLayer(layerNameC, this.mapobj)
        layerServiceC.setVisible(false);
        let layerServiceM = sloveMap.getElementLayer(layerNameM, this.mapobj)
        layerServiceM.setVisible(false);
        let layerServiceH = sloveMap.getElementLayer(layerNameH, this.mapobj)
        layerServiceH.setVisible(false);
        let layerServiceS = sloveMap.getElementLayer(layerNameS, this.mapobj)
        layerServiceS.setVisible(false);
        let layerServiceL = sloveMap.getElementLayer(layerNameL, this.mapobj)
        layerServiceL.setVisible(false);
      }
    },
    //选择节点
    selectNode(data) {
      this.selectinfo = data;
      // console.log(data)
      this.gpspoint(data)
      //根据选中的节点添加tab
      if (this.selectinfo.leaf == false && this.selectinfo.type != Dictionary.Sblx.Controller) {
        return;
      }
      var found = false;
      for (var k = 0; k < this.tabs.length; k++) {
        if (this.tabs[k].name == this.selectinfo.id) {
          found = true;
          break;
        }
      }
      if (found == false) {
        var title;
        // if (this.selectinfo.type == Dictionary.Sblx.Visibility) {
        //   title = this.selectinfo.name; //能见度检测仪
        // } else if (this.selectinfo.type == Dictionary.Sblx.Controller) {
        //   title = this.selectinfo.kzqmc; //区域控制器
        // } else if (this.selectinfo.type == Dictionary.Sblx.Lamp) {
        //   title = this.selectinfo.kzqmc + "-" + this.selectinfo.name; //雾灯
        // } else if (this.selectinfo.type == Dictionary.Sblx.Meteo) {
        //   title = this.selectinfo.name; //气象仪
        // } else if (this.selectinfo.type == Dictionary.Sblx.Horn) {
        //   title = this.selectinfo.name; //号角
        // } else if (this.selectinfo.type == Dictionary.Sblx.Screen) {
        //   title = this.selectinfo.name; //限速屏
        // } else if (this.selectinfo.type == Dictionary.Sblx.Light) {
        //   title = this.selectinfo.name; //报警灯
        // }else if(this.selectinfo.type == Dictionary.Sblx.Camera){
        //   title = this.selectinfo.name; //相机
        // }
        title = this.selectinfo.name;
        this.tabs.push({
          title: title,
          name: this.selectinfo.id,
          data: this.selectinfo,
          info: this.selectinfo
        });
      }
      this.tabbarflag = true;
      this.showtabbar = true;
      this.setTabContent(this.selectinfo.id);

    },
    //选中tab
    selectTab(tab) {

      var data;
      for (var k = 0; k < this.tabs.length; k++) {
        if (this.tabs[k].name == tab.name) {
          data = this.tabs[k].data;
          break;
        }
      }
      this.setTabContent(tab.name);
      this.selectNode(data);
    },
    //移除tab
    removeTab(targetName) {
      var tabs = this.tabs;
      //找到下一个要高亮的tab
      var activeName = this.activeName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      var data;
      for (var k = 0; k < this.tabs.length; k++) {
        if (this.tabs[k].name == targetName) {
          data = this.tabs[k].data;
          break;
        }
      }
      if (data.type != Dictionary.Sblx.Lamp) {
        let layerNameV = data.wqbm + '+' + Dictionary.Sblx.Visibility
        let layerNameC = data.wqbm + '+' + Dictionary.Sblx.Controller
        let layerNameM = data.wqbm + '+' + Dictionary.Sblx.Meteo
        let layerNameH = data.wqbm + '+' + Dictionary.Sblx.Horn
        let layerNameS = data.wqbm + '+' + Dictionary.Sblx.Screen
        let layerNameL = data.wqbm + '+' + Dictionary.Sblx.Light
        let layerServiceV = sloveMap.getElementLayer(layerNameV, this.mapobj)
        layerServiceV.unselectAllElement();
        let layerServiceC = sloveMap.getElementLayer(layerNameC, this.mapobj)
        layerServiceC.unselectAllElement();
        let layerServiceM = sloveMap.getElementLayer(layerNameM, this.mapobj)
        layerServiceM.unselectAllElement();
        let layerServiceH = sloveMap.getElementLayer(layerNameH, this.mapobj)
        layerServiceH.unselectAllElement();
        let layerServiceS = sloveMap.getElementLayer(layerNameS, this.mapobj)
        layerServiceS.unselectAllElement();
        let layerServiceL = sloveMap.getElementLayer(layerNameL, this.mapobj)
        layerServiceL.unselectAllElement();
      } else {
        let layerName = data.wqbm + '+' + data.kzqbm + '+' + Dictionary.Sblx.Lamp
        let layer = sloveMap.getElementLayer(layerName, this.mapobj);
        layer.unselectAllElement();
      }
      //移除tab
      this.tabs = tabs.filter(tab => tab.name !== targetName);
      if (this.tabs.length == 0) {
        this.showtabbar = false;
        this.tabbarflag = false;
        this.$refs.mapbox.style.bottom = 0 + 'px';
      } else {
        //设置高亮tab的内容
        this.setTabContent(activeName);
      }
    },
    //设置高亮tab内容
    setTabContent(activeName) {

      var data;
      for (var k = 0; k < this.tabs.length; k++) {
        if (this.tabs[k].name == activeName) {
          data = this.tabs[k].data;
          break;
        }
      }
      this.sbmc = data.name;
      this.wqmc = data.wqmc;
      this.sbztsm = data.sbztsm;
      this.activeName = data.id;

      this.isLamp = false;
      this.isDevice = false;
      this.isController = false;

      if (data.type == Dictionary.Sblx.Lamp) {
        this.lamp = data;
        this.wdbm = data.wdbm;
        this.xdcdy = data.xdcdysm;
        this.tyndy = data.tyndysm;
        this.wdwd = data.wdwd;
        this.mztsm = data.mztsm;
        this.wdztsm = data.wdztsm;
        this.dyztsm = data.dyztsm;
        this.ledztsm = data.ledztsm;
        this.ldztsm = data.ldztsm;
        this.sbpdsm = data.sbpdsm;
        this.wdljztsm = data.wdljztsm;
        this.isLamp = true;
        this.isDevice = false;
        this.isController = false;
        this.isVisibility = false;
      } else if (data.type == Dictionary.Sblx.Controller) {
        this.sbbm = data.kzqbm;
        this.sbmc = data.kzqmc;
        this.kzqbsm = data.kzqbsm;
        this.gxsjsm = data.gxsjsm;
        this.isController = true;
        this.isLamp = false;
        this.isDevice = false;
        this.isVisibility = false;
      }
      else if (data.type == Dictionary.Sblx.Visibility) {
        this.kzqmc = data.kzqmc;
        this.isVisibility = true;
        this.isLamp = false;
        this.isDevice = false;
        this.isController = false;
      }
      //设备
      else {
        this.sbbm = data.sbbm;
        this.sbztsm = "正常";
        if (data.ipdz == "") {
          this.ipdz = "-";
        }
        else {
          this.ipdz = data.ipdz;
        }
        if (data.fwdk == 0) {
          this.dk = "-";
        }
        else {
          this.dk = data.fwdk;
        }
        if (data.txcs == "") {
          this.txcs = "-";
        }
        else {
          this.txcs = data.txcs;
        }
        this.isDevice = true;
        this.isLamp = false;
        this.isController = false;
        this.isVisibility = false;
      }
    },
    //查询单个雾灯状态
    queryLamp() {

      var data = {
        kzqbm: this.lamp.kzqbm,
        kzqbsm:this.lamp.kzqbsm,
        wdbm: this.lamp.wdbm,
        kzqdk: this.lamp.kzqdk,
      };
      // console.log(data)
      // console.log(this.lamp)
      Controller.queryLamp(data).then(value => {

        // console.log(value);
        if (value == null || value == '') {
          this.$alert('查询失败', '设备控制', {
            confirmButtonText: '确定'
          });
        }
        else {

          this.xdcdy = value.xdcdysm;
          this.tyndy = value.tyndysm;
          this.wdwd = value.wdwd;
          this.mztsm = value.mztsm;
          this.wdztsm = value.wdztsm;
          this.dyztsm = value.dyztsm;
          this.ledztsm = value.ledztsm;
          this.ldztsm = value.ldztsm;
          this.sbpdsm = value.sbpdsm;
          this.wdljztsm = value.wdljztsm;
          this.sbztsm = value.sbztsm;

          this.lamp.xdcdy = value.xdcdysm;
          this.lamp.tyndy = value.tyndysm;
          this.lamp.wdwd = value.wdwd;
          this.lamp.mztsm = value.mztsm;
          this.lamp.wdztsm = value.wdztsm;
          this.lamp.dyztsm = value.dyztsm;
          this.lamp.ledztsm = value.ledztsm;
          this.lamp.ldztsm = value.ldztsm;
          this.lamp.sbpdsm = value.sbpdsm;
          this.lamp.wdljztsm = value.wdljztsm;
          this.lamp.sbztsm = value.sbztsm;

          this.$alert('查询成功', '设备控制', {
            confirmButtonText: '确定'
          });
        }

      });
    },
    //打开
    open() {
      this.$alert('功能尚未开放', '设备控制', {
        confirmButtonText: '确定'
      });

    },
    //关闭
    close() {
      this.$alert('功能尚未开放', '设备控制', {
        confirmButtonText: '确定'
      });

    },
    //重启
    restart() {
      this.$alert('功能尚未开放', '设备控制', {
        confirmButtonText: '确定'
      });
      //var data;
      //for (var k = 0; k < this.tabs.length; k++) {
      //  if (this.tabs[k].name == this.activeName) {
      //    data = this.tabs[k].data;
      //    break;
      //  }
      //}
      //if (data.type == Dictionary.Sblx.Controller) {
      //  this.$confirm('是否下发设备重启命令?', '提示', {
      //    confirmButtonText: '确定',
      //    cancelButtonText: '取消',
      //    cancelButtonClass: 'cancelBtnStyle',
      //    confirmButtonClass: 'confirmBtnStyle',
      //    type: 'warning'
      //  }).then(() => {

      //    Controller.restartController(data).then(value => {

      //      if (value.czjg == Dictionary.SendResult.Success) {

      //        this.$alert('操作成功', '设备控制', {
      //          confirmButtonText: '确定'
      //        });
      //      } else if (value.czjg == Dictionary.SendResult.SendFailed) {
      //        this.$alert('操作失败', '设备控制', {
      //          confirmButtonText: '确定'
      //        });
      //      } else if (value.czjg == Dictionary.SendResult.Timeout) {
      //        this.$alert('与设备通信超时', '设备控制', {
      //          confirmButtonText: '确定'
      //        });
      //      } else if (value.czjg == Dictionary.SendResult.Disconnection) {
      //        this.$alert('与设备通信连接断开', '设备控制', {
      //          confirmButtonText: '确定'
      //        });
      //      } else if (value.czjg == Dictionary.SendResult.NotFoundSocket) {
      //        this.$alert('未找到该设备', '设备控制', {
      //          confirmButtonText: '确定'
      //        });
      //      }
      //    });
      //  }).catch(() => { });
      //} else {
      //  this.$alert('功能尚未开放', '设备控制', {
      //    confirmButtonText: '确定'
      //  });
      //}
    },
    side() { //左侧边栏显示
      this.sideflag = !this.sideflag;
      if (this.sideflag) {
        this.$refs.mapbox.style.left = 240 + 'px';
      } else {
        this.$refs.mapbox.style.left = 0 + 'px';
        this.mapobj.refresh()
      }
    },
    showtab() { //底部显示
      this.showtabbar = !this.showtabbar;
      if (this.showtabbar) {
        this.$refs.mapbox.style.bottom = 181 + 'px'
      } else {
        this.$refs.mapbox.style.bottom = 0 + 'px'
        this.mapobj.refresh()
      }
    },
    zoomInCommand() { //放大
      sloveMap.zoomInCommand(this.mapobj)
    },
    zoomOutCommand() { //缩小
      sloveMap.zoomOutCommand(this.mapobj)
    },
    fullScreen() { //全屏
      this.fullflag = !this.fullflag;
      if (this.fullflag) {
        this.showtabbar = false;
        this.sideflag = false;
        this.$refs.mapbox.style.bottom = 0 + 'px';
        this.$refs.mapbox.style.left = 0 + 'px';
        this.$refs.full.title = "退出全图"
        this.mapobj.refresh()
      } else {
        if (this.tabbarflag) {
          this.showtabbar = true;
          this.$refs.mapbox.style.bottom = 181 + 'px'
        } else {
          this.$refs.mapbox.style.bottom = 0 + 'px'
        }
        this.sideflag = true;
        this.$refs.mapbox.style.left = 240 + 'px';
        this.$refs.full.title = "全图"
      }

    },
    zoomToPoint() { //定位
      sloveMap.drawMulPoint(this.mapobj)
    },
    editPoint(pointobj) { //编辑点
      if (!pointobj) {
        this.$refs.jog.focus();
        return
      }
      if (this.uneditflag) {
        this.mapobj.panTool();
        this.uneditflag = false;
        // if(pointobj.num==1)
        this.$refs.jog.focus();
        this.redraw(pointobj)
        return
      }
      let that = this;
      let symbol = DPS.Factory.createMarkerSymbol();
      let gislayer = ""; //gis图层名
      let sql = ""; //筛选语句
      let fields = ""; //存储键
      let fieldValues = pointobj.id.toString(); //存储值
      const BaseMapUrl = 'http://' + window.config.BaseMapUrl
      if (pointobj.type == Dictionary.Sblx.Visibility) { //能见度检测仪
        sql = "JCYMC=" + pointobj.id;
        fields = "JCYMC";
        gislayer = this.gisLayername.visibility
        
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_VISIBILITY/visibility_dis_normal.png");

        } else {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_VISIBILITY/visibility_normal.png");
        }
      } else if (pointobj.type == Dictionary.Sblx.Controller) { //控制器
        sql = "KZQMC=" + pointobj.id;
        fields = "KZQMC";
        gislayer = this.gisLayername.controller
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_CONTROLLER/controller_dis_normal.png");

        } else {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_CONTROLLER/controller_normal.png");

        }

      } else if (pointobj.type == Dictionary.Sblx.Screen) { //限速屏
        sql = "SBMC=" + pointobj.id;
        fields = "SBMC";
        gislayer = this.gisLayername.linkdevice
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/screen_dis_normal.png");

        } else {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/screen_normal.png");

        }

      } else if (pointobj.type == Dictionary.Sblx.Meteo) { //气象仪
        sql = "SBMC=" + pointobj.id;
        fields = "SBMC";
        gislayer = this.gisLayername.linkdevice
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/atmospherium_dis_normal.png");

        } else {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/atmospherium_normal.png");

        }
      } else if (pointobj.type == Dictionary.Sblx.Horn) { //号角
        sql = "SBMC=" + pointobj.id;
        fields = "SBMC";
        gislayer = this.gisLayername.linkdevice
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/horn_dis_normal.png");
        } else {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/horn_normal.png");
        }


      } else if (pointobj.type == Dictionary.Sblx.Light) { //警灯
        sql = "SBMC=" + pointobj.id;
        fields = "SBMC";
        gislayer = this.gisLayername.linkdevice
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/alarm_dis_normal.png");
        } else {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LINKDEVICE/alarm_normal.png");
        }

      } else if (pointobj.type == Dictionary.Sblx.Lamp) { //雾灯
        sql = "KZQMC=" + pointobj.id;
        fields = "KZQMC";
        gislayer = this.gisLayername.lamp;
        if (pointobj.sbzt == Dictionary.Sbzt.Error) {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LAMP/lamp_dis_normal.png");
        } else {
          symbol.setUrl(BaseMapUrl + "/DPS_LayerStyle/images/DV_FVS_LAMP/lamp_normal.png");
        }
      } else {
        return
      }
      symbol.setWidth(14);
      symbol.setHeight(14);
      this.mapobj.pointobj = pointobj;
      if (pointobj.num == 1) {
        this.editflag = true; //编辑状态，用于漫游判断
        let layername = ""
        if (pointobj.type == Dictionary.Sblx.Lamp) {
          layername = pointobj.wqbm + '+' + pointobj.kzqbm + '+' + Dictionary.Sblx.Lamp
        } else if (pointobj.type == Dictionary.Sblx.Visibility) {
          layername = pointobj.wqbm + '+' + Dictionary.Sblx.Visibility
        } else if (pointobj.type == Dictionary.Sblx.Controller) {
          layername = pointobj.wqbm + '+' + Dictionary.Sblx.Controller
        } else if (pointobj.type == Dictionary.Sblx.Meteo) {
          layername = pointobj.wqbm + '+' + Dictionary.Sblx.Meteo
        } else if (pointobj.type == Dictionary.Sblx.Horn) {
          layername = pointobj.wqbm + '+' + Dictionary.Sblx.Horn
        } else if (pointobj.type == Dictionary.Sblx.Screen) {
          layername = pointobj.wqbm + '+' + Dictionary.Sblx.Screen
        } else if (pointobj.type == Dictionary.Sblx.Light) {
          layername = pointobj.wqbm + '+' + Dictionary.Sblx.Light
        }
        let layer = sloveMap.getElementLayer(layername, this.mapobj);
        let elementArray = layer.getAllElement()
        for (let i = 0; i < elementArray.length; i++) {
          if (elementArray[i]._mTag === pointobj.id) {
            layer.removeElementByID(elementArray[i]._mID)
            that.uneditflag = true;
          }
        }

      }
      this.mapobj.trackPointBySymbol(this.mapobj, symbol, trackPointByMarkerResult); //绘制图标
      function trackPointByMarkerResult(sender, eArgs) { //绘制图标回调函数
        let me = sender;
        me.pointobj.shape = eArgs.getGeoPoint().generateWKTString();
        let obj = sloveMap.drawMarker(me, me.pointobj) //绘制的图标对象
        let id = obj.getID()
        let wkt = eArgs.getGeoPoint().generateWKTString();
        let layername = ""
        if (me.pointobj.type == Dictionary.Sblx.Lamp) {
          layername = me.pointobj.wqbm + '+' + me.pointobj.kzqbm + '+' + Dictionary.Sblx.Lamp
        } else if (me.pointobj.type == Dictionary.Sblx.Visibility) {
          layername = me.pointobj.wqbm + '+' + Dictionary.Sblx.Visibility
        } else if (me.pointobj.type == Dictionary.Sblx.Controller) {
          layername = me.pointobj.wqbm + '+' + Dictionary.Sblx.Controller
        } else if (me.pointobj.type == Dictionary.Sblx.Meteo) {
          layername = me.pointobj.wqbm + '+' + Dictionary.Sblx.Meteo
        } else if (me.pointobj.type == Dictionary.Sblx.Horn) {
          layername = me.pointobj.wqbm + '+' + Dictionary.Sblx.Horn
        } else if (me.pointobj.type == Dictionary.Sblx.Screen) {
          layername = me.pointobj.wqbm + '+' + Dictionary.Sblx.Screen
        } else if (me.pointobj.type == Dictionary.Sblx.Light) {
          layername = me.pointobj.wqbm + '+' + Dictionary.Sblx.Light
        }
        if (me.pointobj.type != Dictionary.Sblx.Lamp) {
          let layerNameV = me.pointobj.wqbm + '+' + Dictionary.Sblx.Visibility
          let layerNameC = me.pointobj.wqbm + '+' + Dictionary.Sblx.Controller
          let layerNameM = me.pointobj.wqbm + '+' + Dictionary.Sblx.Meteo
          let layerNameH = me.pointobj.wqbm + '+' + Dictionary.Sblx.Horn
          let layerNameS = me.pointobj.wqbm + '+' + Dictionary.Sblx.Screen
          let layerNameL = me.pointobj.wqbm + '+' + Dictionary.Sblx.Light
          let layerServiceV = sloveMap.getElementLayer(layerNameV, me)
          layerServiceV.unselectAllElement();
          let layerServiceC = sloveMap.getElementLayer(layerNameC, me)
          layerServiceC.unselectAllElement();
          let layerServiceM = sloveMap.getElementLayer(layerNameM, me)
          layerServiceM.unselectAllElement();
          let layerServiceH = sloveMap.getElementLayer(layerNameH, me)
          layerServiceH.unselectAllElement();
          let layerServiceS = sloveMap.getElementLayer(layerNameS, me)
          layerServiceS.unselectAllElement();
          let layerServiceL = sloveMap.getElementLayer(layerNameL, me)
          layerServiceL.unselectAllElement();
        } else {
          let layerName = me.pointobj.wqbm + '+' + me.pointobj.kzqbm + '+' + Dictionary.Sblx.Lamp
          let layerL = sloveMap.getElementLayer(layerName, me);
          layerL.unselectAllElement();
        }
        let layer = sloveMap.getElementLayer(layername, me); //获取图层对象
        layer.selectedElementByID(id);
        that.$refs.jog.focus();
        if (me.pointobj.num == 0) { //地图上没有该点，需要涉及到点添加操作
          var insertData = new VD.MapData({
            serviceMethod: "insert",
            returnType: 1,
            layerName: gislayer,
            wktStr: wkt,
            fields: fields,
            fieldValues: fieldValues,
            chartset: document.charset
          });
          insertData.sendRequest(function (data, config) {
            if (data.Result == 'Success') {
              window.console.log('添加数据成功');
              that.uneditflag = false;
              if (me.pointobj.type == Dictionary.Sblx.Lamp) {
                for (let i in that.leveltwo) {
                  if (me.pointobj.id == that.leveltwo[i].id) { //改变状态
                    that.leveltwo[i].num = 1;
                  }
                }
              } else if (me.pointobj.type != 0) {
                for (let i in that.levelone) {
                  if (me.pointobj.id == that.levelone[i].id) { //改变状态
                    that.levelone[i].num = 1;
                  }
                }
              }
              return;
            }
          });

        } else if (me.pointobj.num == 1) { //地图上有该点
          var mapData = new VD.MapData({
            serviceMethod: "update",
            returnType: 1,
            sqlWhere: sql,
            layerName: gislayer,
            wktStr: wkt,
            fields: fields,
            fieldValues: fieldValues
          });
          mapData.sendRequest(function (data, config) {
            if (data.Result == 'Success') {
              window.console.log("修改成功"); //数据访问更新服务返回的错误信息
              that.uneditflag = false;
              // 注意保存新点选中状态
              if (me.pointobj.type == Dictionary.Sblx.Lamp) {
                for (let i in that.leveltwo) {
                  if (me.pointobj.id == that.leveltwo[i].id) { //改变状态
                    that.leveltwo[i].num = 1
                  }
                }
              } else if (me.pointobj.type != Dictionary.Sblx.Lamp) {
                for (let i in that.levelone) {
                  if (me.pointobj.id == that.levelone[i].id) { //改变状态
                    that.levelone[i].num = 1
                  }
                }
              }
              return;
            }
          });
        }
      }
    },
    jog(selectinfo) { //漫游

      this.mapobj.panTool();
      if (this.uneditflag) { //如果此时存在
        this.redraw(selectinfo)
        this.uneditflag = false;
      }
    },
    redraw(selectinfo) { //重新绘制点，
      sloveMap.drawMarker(this.mapobj, selectinfo)
      let layerName = ""
      if (selectinfo.type == Dictionary.Sblx.Lamp) {
        layerName = selectinfo.wqbm + '+' + selectinfo.kzqbm + '+' + Dictionary.Sblx.Lamp
      } else if (selectinfo.type == Dictionary.Sblx.Visibility) {
        layerName = selectinfo.wqbm + '+' + Dictionary.Sblx.Visibility
      } else if (selectinfo.type == Dictionary.Sblx.Controller) {
        layerName = selectinfo.wqbm + '+' + Dictionary.Sblx.Controller
      } else if (selectinfo.type == Dictionary.Sblx.Meteo) {
        layerName = selectinfo.wqbm + '+' + Dictionary.Sblx.Meteo
      } else if (selectinfo.type == Dictionary.Sblx.Horn) {
        layerName = selectinfo.wqbm + '+' + Dictionary.Sblx.Horn
      } else if (selectinfo.type == Dictionary.Sblx.Screen) {
        layerName = selectinfo.wqbm + '+' + Dictionary.Sblx.Screen
      } else if (selectinfo.type == Dictionary.Sblx.Light) {
        layerName = selectinfo.wqbm + '+' + Dictionary.Sblx.Light
      } else { //选择雾区情况
        return
      }
      let layer = sloveMap.getElementLayer(layerName, this.mapobj)
      let elementArray = layer.getAllElement()
      elementArray.forEach(function (value) {
        if (value._mTag == selectinfo.id) {
          layer.selectedElementByID(value._mID)
          return
        }
      })
    },
    area() { //面积测量
      this.mapobj.measureAreaTool();
    },
    measure() { //距离测量
      this.mapobj.measureLengthTool()
    },
    markpoint(pointobj) { //绘制标记点
      // console.log(pointobj)
      this.mapobj.onHighlightElementClickEvent(this.mapobj, this.clickEvent);
      if (pointobj.length > 0) {
        for (let i = 0; i < pointobj.length; i++) {
          if (pointobj[i].num == 1) {
            sloveMap.drawMarker(this.mapobj, pointobj[i])
          }
        }
      }
    },
    doubleEvent(sender, eArgs) {//鼠标双击之后的事件
      this.$refs.jog.focus()
    },
    gpspoint(data) { //定位至该点,并选择该点
      if (this.checkList.length == 0) {
        for (let i = 1; i < this.mapobj.getLayerCount(); i++) { //将所有图层隐藏
          this.mapobj.getLayerByIndex(i).setVisible(false)
        }
        return
      }
      for (let i = 1; i < this.mapobj.getLayerCount(); i++) { //将所有图层隐藏
        //默认地图的序列号为0，所以只需要从一开始将所有序列号对应的图层隐藏
        this.mapobj.getLayerByIndex(i).setVisible(false)
      }
      for (let i = 0; i < this.treeArray.length; i++) { //将树节点打开的图层显示
        // this.mapobj.getLayerByIndex(i).setVisible(false)
        if (this.treeArray[i].type == Dictionary.Sblx.Controller) { //雾灯图层显示
          let layerNameL = this.treeArray[i].wqbm + '+' + this.treeArray[i].kzqbm + '+' + Dictionary.Sblx.Lamp;
          let layerLamp = sloveMap.getElementLayer(layerNameL, this.mapobj);
          layerLamp.unselectAllElement();
          for (let j = 0; j < this.treeArray.length; j++) {
            if (this.treeArray[j].type == Dictionary.Sblx.FogArea && this.treeArray[j].wqbm == this.treeArray[i].wqbm) {
              layerLamp.setVisible(true);
            }
          }
        }
        if (this.treeArray[i].type == Dictionary.Sblx.FogArea) { //
          let layerNameV = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Visibility
          let layerNameC = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Controller
          let layerNameM = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Meteo
          let layerNameH = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Horn
          let layerNameS = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Screen
          let layerNameL = this.treeArray[i].wqbm + '+' + Dictionary.Sblx.Light
          let layerServiceV = sloveMap.getElementLayer(layerNameV, this.mapobj)
          layerServiceV.setVisible(true);
          layerServiceV.unselectAllElement();
          let layerServiceC = sloveMap.getElementLayer(layerNameC, this.mapobj)
          layerServiceC.setVisible(true);
          layerServiceC.unselectAllElement();
          let layerServiceM = sloveMap.getElementLayer(layerNameM, this.mapobj)
          layerServiceM.setVisible(true);
          layerServiceM.unselectAllElement();
          let layerServiceH = sloveMap.getElementLayer(layerNameH, this.mapobj)
          layerServiceH.setVisible(true);
          layerServiceH.unselectAllElement();
          let layerServiceS = sloveMap.getElementLayer(layerNameS, this.mapobj)
          layerServiceS.setVisible(true);
          layerServiceS.unselectAllElement();
          let layerServiceL = sloveMap.getElementLayer(layerNameL, this.mapobj)
          layerServiceL.setVisible(true);
          layerServiceL.unselectAllElement();
        }

      }
      this.selectLayer(this.checkList)
      let layerName = ""
      if (data.type == Dictionary.Sblx.Lamp) {
        layerName = data.wqbm + '+' + data.kzqbm + '+' + Dictionary.Sblx.Lamp
      } else if (data.type == Dictionary.Sblx.Visibility) {
        layerName = data.wqbm + '+' + Dictionary.Sblx.Visibility
      } else if (data.type == Dictionary.Sblx.Controller) {
        layerName = data.wqbm + '+' + Dictionary.Sblx.Controller
      } else if (data.type == Dictionary.Sblx.Meteo) {
        layerName = data.wqbm + '+' + Dictionary.Sblx.Meteo
      } else if (data.type == Dictionary.Sblx.Horn) {
        layerName = data.wqbm + '+' + Dictionary.Sblx.Horn
      } else if (data.type == Dictionary.Sblx.Screen) {
        layerName = data.wqbm + '+' + Dictionary.Sblx.Screen
      } else if (data.type == Dictionary.Sblx.Light) {
        layerName = data.wqbm + '+' + Dictionary.Sblx.Light
      } else { //选择雾区情况
        return
      }
      let layer = sloveMap.getElementLayer(layerName, this.mapobj);
      layer.setVisible(true);
      layer.unselectAllElement();
      layer.getAllElement().forEach(function (value) { //定位元素设置选中状态
        if (value._mTag == data.id) {
          layer.selectedElementByID(value._mID)
        }
      })
      if (data.num == 1) {
        let geo = DPS.Factory.createGeometry(data.shape);
        this.mapobj.zoomByLevelCenter(17, geo)
      }
      // 地图刷新
      this.selectLayer(this.checkList)
      this.mapobj.refresh();
    },
    fogareasonViewLoadEvent(sender, eArgs) {//地图加载完
      sloveMap.changeNavImage(this.mapobj)
      this.mapLevelchange()
    },
    mapLevelchange() {
      // 地图等级变化，图标大 mapLevelchange小变化
      this.mapobj.onMapLevelChangedEvent(this.mapobj, changeLevel);
      let that = this;

      function changeLevel(sender, eArgs) {
        let level = eArgs.getLevel();
        for (let i = 0; i < that.treeArray.length; i++) {

          if (that.treeArray[i].type == Dictionary.Sblx.Controller || that.treeArray[i].type == Dictionary.Sblx.Lamp) {
            let layerName = that.treeArray[i].wqbm + '+' + that.treeArray[i].kzqbm + '+' + Dictionary.Sblx.Lamp;
            let layerLamp = sloveMap.getElementLayer(layerName, that.mapobj)
            let elementLamp = layerLamp.getAllElement();
            if (elementLamp.length > 0) {
              that.setSymbol(elementLamp, level)
            }
          } else {
            let layerNameV = that.treeArray[i].wqbm + '+' + Dictionary.Sblx.Visibility
            let layerNameC = that.treeArray[i].wqbm + '+' + Dictionary.Sblx.Controller
            let layerNameM = that.treeArray[i].wqbm + '+' + Dictionary.Sblx.Meteo
            let layerNameH = that.treeArray[i].wqbm + '+' + Dictionary.Sblx.Horn
            let layerNameS = that.treeArray[i].wqbm + '+' + Dictionary.Sblx.Screen
            let layerNameL = that.treeArray[i].wqbm + '+' + Dictionary.Sblx.Light
            let layerServiceV = sloveMap.getElementLayer(layerNameV, that.mapobj)
            let layerServiceC = sloveMap.getElementLayer(layerNameC, that.mapobj)
            let layerServiceM = sloveMap.getElementLayer(layerNameM, that.mapobj)
            let layerServiceH = sloveMap.getElementLayer(layerNameH, that.mapobj)
            let layerServiceS = sloveMap.getElementLayer(layerNameS, that.mapobj)
            let layerServiceL = sloveMap.getElementLayer(layerNameL, that.mapobj)
            let elementServiceV = layerServiceV.getAllElement();
            if (elementServiceV.length > 0) {
              that.setSymbol(elementServiceV, level)
            }
            let elementServiceC = layerServiceC.getAllElement();
            if (elementServiceC.length > 0) {
              that.setSymbol(elementServiceC, level)
            }
            let elementServiceM = layerServiceM.getAllElement();
            if (elementServiceM.length > 0) {
              that.setSymbol(elementServiceM, level)
            }
            let elementServiceH = layerServiceH.getAllElement();
            if (elementServiceH.length > 0) {
              that.setSymbol(elementServiceH, level)
            }
            let elementServiceS = layerServiceS.getAllElement();
            if (elementServiceS.length > 0) {
              that.setSymbol(elementServiceS, level)
            }
            let elementServiceL = layerServiceL.getAllElement();
            if (elementServiceL.length > 0) {
              that.setSymbol(elementServiceL, level)
            }
          }
          that.mapobj.refresh()
        }
      }
    },
    setSymbol(elements, level) { //地图等级变化，图标样式
      for (let i = 0; i < elements.length; i++) {
        let tempHighlightSymbol = elements[i].getHighlightSymbol();
        let tempSelectedSymbol = elements[i].getSelectedSymbol();
        let tempNormalSymbol = elements[i].getNormalSymbol();

        if (level == 18) {
          tempNormalSymbol.setWidth(14);
          tempNormalSymbol.setHeight(14);
          tempHighlightSymbol.setWidth(14);
          tempHighlightSymbol.setHeight(14);
          tempSelectedSymbol.setWidth(14);
          tempSelectedSymbol.setHeight(14);
        } else if (level == 17) {
          tempNormalSymbol.setWidth(11);
          tempNormalSymbol.setHeight(11);
          tempHighlightSymbol.setWidth(11);
          tempHighlightSymbol.setHeight(11);
          tempSelectedSymbol.setWidth(11);
          tempSelectedSymbol.setHeight(11);
        } else if (level == 16) {
          tempNormalSymbol.setWidth(8);
          tempNormalSymbol.setHeight(8);
          tempHighlightSymbol.setWidth(8);
          tempHighlightSymbol.setHeight(8);
          tempSelectedSymbol.setWidth(8);
          tempSelectedSymbol.setHeight(8);
        } else if (level == 15) {
          tempNormalSymbol.setWidth(6);
          tempNormalSymbol.setHeight(6);
          tempHighlightSymbol.setWidth(6);
          tempHighlightSymbol.setHeight(6);
          tempSelectedSymbol.setWidth(6);
          tempSelectedSymbol.setHeight(6);
        } else if (level == 14) {
          tempNormalSymbol.setWidth(3);
          tempNormalSymbol.setHeight(3);
          tempHighlightSymbol.setWidth(3);
          tempHighlightSymbol.setHeight(3);
          tempSelectedSymbol.setWidth(3);
          tempSelectedSymbol.setHeight(3);
        } else if (level == 13) {
          tempNormalSymbol.setWidth(1);
          tempNormalSymbol.setHeight(1);
          tempHighlightSymbol.setWidth(1);
          tempHighlightSymbol.setHeight(1);
          tempSelectedSymbol.setWidth(1);
          tempSelectedSymbol.setHeight(1);
        } else if (level <= 12) {
          tempNormalSymbol.setWidth(0);
          tempNormalSymbol.setHeight(0);
          tempHighlightSymbol.setWidth(0);
          tempHighlightSymbol.setHeight(0);
          tempSelectedSymbol.setWidth(0);
          tempSelectedSymbol.setHeight(0);
        }
        if (i == (elements.length - 1)) {
          return true
        }
      }
    },
    clickEvent(sender, eArgs) { //地图元素单击事件
      this.selectNode(eArgs._mAttributes.pointobj)
    },
    searchFogarea() { //获取雾区面坐标信息
      this.$refs.jog.focus();
      this.mapobj.onMouseDoubleClickEvent(this.mapobj, this.doubleEvent)
      let searchfogarea = sloveMap.selectinfo(this.gisLayername.fogarea);
      let that = this;
      searchfogarea.sendRequest(function (data, config) { //面信息查询
        let rowList = data[0].rowList;
        if (rowList.length == 0) {
          alert("没有查到数据！");
          return;
        }
        for (let i = 0; i < rowList.length; i++) { //遍历绘制
          that.fogareaInfo.push(rowList[i].values)
        }

      });
    },
  },
  activated() {
    this.actives = '2';
  },
  deactivated() {
    this.actives = '';
    // this.$destroy();
    this.selectUpdate();
  },
  //     watch:{
  //     $route(to,from){
  //       console.log(to.path);
  //       if(to.path == "/fvs/#/"){
  //         this.$store.state.includePageNames = []
  //          console.log(this.$store.state.includePageNames)
  //       }
  //   }
  // },
};
</script>


