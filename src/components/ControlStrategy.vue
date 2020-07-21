<template>
  <div class="ControlStrategy">
    <section class="section">
      <div class="navBox">
          <div class="breadcrumbBox">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ $t('message.ConfigManagement') }}</el-breadcrumb-item>
              <el-breadcrumb-item>控制策略配置</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
      <el-row class="contentBox">
        <el-col :span="6" >
          <el-card class="box-card">
            <div slot="header" class="headerTitle">
              <span>控制策略列表</span>
            </div>
            <el-menu  :default-active="activeClbm">
              <el-menu-item v-for="item in StrategiesDatas" :key="item.clbm" :index="item.clbm.toString()">
                <div slot="title" @click="selectStrategies(item)">{{item.clmc }}</div>
              </el-menu-item>
            </el-menu>
            <!-- <div v-for="item in StrategiesDatas" :key="item.clbm" @click="selectStrategies(item)" class="itemBox">
              {{item.clmc }}
            </div> -->
          </el-card>
        </el-col>
        <el-col :span="18" style="padding-left: 20px;">
          <el-card class="box-card">
            <div slot="header" class="headerTitle">
              <span>控制策略编辑</span>
            </div>
            <el-form :model="Strategies" :rules="StrategiesRules" ref="StrategiesForm" label-width="110px">
              <el-form-item label="策略名称">
                <el-input v-model="Strategies.clmc" readonly></el-input>
              </el-form-item>

              <el-form-item :label="$t('message.LightGread')" prop="lddj" v-if="Strategies.wdlddjbjzt">
                <el-select v-model="Strategies.wdlddj" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in lddjCodes" :key="item.dm" :label="item.dm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('message.FoglightLuminance')" prop="wdld" v-if="Strategies.wdldbjzt">
                <el-input v-model="Strategies.wdld" type="number" min="1" max="127" step="1" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('message.FlickerFrequency')" v-if="Strategies.ssplbjzt">
                <el-select v-model="Strategies.sspl" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in ssplCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="占空比" v-if="Strategies.zkbbjzt">
                <el-select v-model="Strategies.zkb" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('message.LightsONDuration')+'(ms)'" prop="ldsc" v-if="Strategies.ldscbjzt">
                <el-input v-model="Strategies.ldsc" type="number" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item :label="$t('message.LightsOFFDuration')+'(ms)'" prop="mdsc" v-if="Strategies.mdscbjzt">
                <el-input v-model="Strategies.mdsc" type="number" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item :label="$t('message.RedTimeLengthening')+'(s)'" prop="hdys" v-if="Strategies.hdysbjzt">
                <el-input v-model="Strategies.hdys" type="number" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item :label="$t('message.DeadZoneDuration')+'(s)'" prop="mqys" v-if="Strategies.mqysbjzt">
                <el-input v-model="Strategies.mqys" type="number" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item :label="$t('message.RedLightsNumber')" prop="hsjsdzsl" v-if="Strategies.hsjsdzslbjzt">
                <el-input v-model="Strategies.hsjsdzsl" type="number" auto-complete="off"  min="0" max="50"></el-input>
              </el-form-item>
              <el-form-item label="策略描述">
                <el-input type="textarea" v-model="Strategies.clms"></el-input>
              </el-form-item>
              <el-form-item class="wall">
                <el-button type="primary" @click="saveStrategies" class="fr">保存</el-button>
                <!-- <el-button>取消</el-button> -->
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
import Dictionary from "./js/Dictionary.js";
import Code from "./js/Code.js";
import ControlStrategy from './js/ControlStrategy.js'
export default {
  data(){
    return{
      activeClbm: "1",//左侧菜单高亮显示
      StrategiesDatas:[],
      Strategies:{},
      // ldmdsc: '',
      lddjCodes: '',
      StrategiesRules: {
        wdld: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
        ldsc: this.filterRules('亮灯时长', true, null, null, 'time'),
        mdsc: this.filterRules('灭灯时长', true, null, null, 'time'),
        hdys: this.filterRules('红灯延时', true, null, null, 'time'),
        mqys: this.filterRules('盲区延时', true, null, null, 'time'),
        hsjsdzsl: this.filterRules('红色警示灯数量', true, null, null, 'time'),
      },
      zkbCodes: [{
          dmsm: '1:2',
          dm: '1',
        },
        {
          dmsm: '1:3',
          dm: '2',
        },
        {
          dmsm: '1:4',
          dm: '3',
        },
      ],
      ssplCodes: [
        {
          dmsm: '常亮',
          dm: '1',
        },{
          dmsm: '30次/min',
          dm: '2',
        },{
          dmsm: '60次/min',
          dm: '3',
        },{
          dmsm: '120次/min',
          dm: '4',
        },{
          dmsm: '240次/min',
          dm: '5',
        },
      ],

    }
  },
  mounted(){
    this.loadCodes();
    this.loadStrategies();
  },
  methods: {
    loadStrategies() {
      var data = { }
      //查询数据
      ControlStrategy.getStrategies(data).then(value => {
        // console.log(value)
        this.StrategiesDatas = value;
        this.Strategies = value[0];
      });
    },
    //读取字典
    loadCodes(){

      Code.getCodes({
        dmlb: Dictionary.CodeType.LampLevel,
      }).then(value => {
        this.lddjCodes = value.datas;
      });
      Code.getCodes({
        dmlb: Dictionary.CodeType.ssplCode,
      }).then(value => {
        this.ssplCodes = value.datas;
      });
      Code.getCodes({
        dmlb: Dictionary.CodeType.zkbCode,
      }).then(value => {
        this.zkbCodes = value.datas;
      });
    },
    //切换左侧列表
    selectStrategies(val){
      // console.log(val);
      this.Strategies = val;
      this.activeClbm = val.clbm.toString();
    },
    //保存数据
    saveStrategies(){
      // console.log(this.Strategies)
      ControlStrategy.updateStrategy(this.Strategies).then(value => {

        this.$refs['StrategiesForm'].validate((valid) => {
          if(valid){
            this.$confirm('是否确认修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass: 'cancelBtnStyle',
              confirmButtonClass: 'confirmBtnStyle',
              type: 'warning'
            }).then(() => {

              if(value.czjg == 0){
                this.$alert('操作成功', '提示', {
                  confirmButtonText: '确定'
                }).catch(() => {});
              }else{
                this.$alert('操作失败', '提示', {
                  confirmButtonText: '确定'
                }).catch(() => {});
              }
            })
          }
        })

      });
    },
    //亮度等级
    // changeLampGrade(lddj){
    //   for(let i = 0;i< this.lddjCodes.length; i++){
    //     if(this.lddjCodes[i].dm == this.Strategies.wdlddj){
    //       this.lddj = this.lddjCodes[i].dmsm;
    //     }
    //   }
    //   this.Strategies.wdld = this.lddj;
    // },
    //亮灯灭灯时长选择
    // changeLamp(ldmdsc){
    //   this.Strategies.ldsc = ldmdsc;
    //   this.Strategies.mdsc = ldmdsc*3;
    // },

  }
}
</script>

