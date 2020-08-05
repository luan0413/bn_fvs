<template>
    <div class="SerialPort grid">
        <section class="section">
            <div class="navBox">
                <!--面包屑导航-->
                <div class="breadcrumbBox">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ $t('message.UserJurisdiction') }}</el-breadcrumb-item>
                    <el-breadcrumb-item>网络调试</el-breadcrumb-item>
                </el-breadcrumb>
                </div>
            </div>
            <el-row class="contentBox">
                <el-col :span="12" >
                    <el-card class="box-card boxCardLeft" style="height: 334px;">
                        <div slot="header" class="headerTitle">
                            <span>控制器列表</span>
                        </div>
                        <el-table :data="controllers" ref="controllerTable" height="296"
                                highlight-current-row style="width: 100%" @selection-change="selectionController">
                            <el-table-column align="center" type="selection" min-width="35"></el-table-column>
                            <el-table-column prop="kzqbsm" label="控制器标识码" min-width="40" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="kzqmc" label="控制器名称" min-width="60" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="wqmc" label="所属雾区" min-width="100" header-align="center" align="left"></el-table-column>
                        </el-table>
                    </el-card>
                    <el-card class="box-card mt20" style="height: 370px;">
                        <div slot="header" class="headerTitle">
                            <span>策略</span>
                        </div>
                        <div>
                            <el-radio-group :disabled="lampControlDisabled" v-model="kzcl" @change="shortcut">
                                <el-radio v-for="item in StrategiesDatas" :key="item.clbm" :label="item.clbm">{{item.clmc }}</el-radio>
                            </el-radio-group>
                            <div class="mt10" style="display: flex;">
                                <span style="color: #666;">策略描述：</span>
                                <input v-model="clms" type="textarea" readonly style="color: #666;flex-grow: 1;" />
                            </div>
                        </div>
                        <div>
                            <el-form :disabled="lampConfigDisabled" :model="lamp" :rules="lampRules" ref="lampForm" size="mini" label-width="120px">
                                <ul class="lamp of mt20">
                                    <li>
                                        <el-form-item :label="$t('message.LightGread')+'：'" v-if="lampZt.wdlddjxszt">
                                            <el-select v-model="lamp.wdlddj" :placeholder="$t('message.PleaseSelect')" @change="changeWdld(0)" v-if="lamp.sspl != 1">
                                                <el-option v-for="item in lddjCodes" :key="item.dm" :label="item.dm" :value="item.dm"></el-option>
                                            </el-select>
                                            <el-select v-model="lamp.wdlddj" :placeholder="$t('message.PleaseSelect')" @change="changeWdld(1)" v-else>
                                                <el-option v-for="item in lddjCodes1" :key="item.dm" :label="item.dm" :value="item.dm"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item :label="$t('message.FoglightLuminance')+'：'" prop="wdld" v-if="lampZt.wdldxszt">
                                            <el-input v-model.number="lamp.wdld" type="number" min="1" max="99" step="1"></el-input>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item :label="$t('message.FlickerFrequency')+'：'" v-if="lampZt.ssplxszt">
                                            <el-select v-model="lamp.sspl" @change="changeSspl" :placeholder="$t('message.PleaseSelect')">
                                                <el-option v-for="item in ssplCodes" :key="item.dm" :label="item.dmsm" :value="item.dm">{{item.dmsm}}</el-option>
                                            </el-select>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="占空比：" v-if="lampZt.zkbxszt">
                                            <el-select v-model="lamp.zkb" @change="changeZkb" :placeholder="$t('message.PleaseSelect')">
                                                <el-option v-for="item in zkbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item :label="$t('message.LightsONDuration')+'：'" prop="ldsc" v-if="lampZt.ldscxszt">
                                            <el-input v-model.number="lamp.ldsc" type="number" min="1" max="99999"
                                              step="1"></el-input>
                                            <span class="unit">ms</span>
                                        </el-form-item>
                                    </li>

                                    <li>
                                        <el-form-item :label="$t('message.LightsOFFDuration')+'：'" prop="mdsc" v-if="lampZt.mdscxszt">
                                            <el-input v-model.number="lamp.mdsc" type="number" min="1" max="99999" step="1"></el-input>
                                            <span class="unit">ms</span>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item :label="$t('message.RedTimeLengthening')+'：'" prop="hdys" v-if="lampZt.hdysxszt">
                                            <el-input v-model.number="lamp.hdys" type="number" min="1" max="99999" step="1"></el-input>
                                            <span class="unit">s</span>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item :label="$t('message.DeadZoneDuration')+'：'" prop="mqys" v-if="lampZt.mqysxszt">
                                            <el-input v-model.number="lamp.mqys" type="number" min="1" max="99999" step="1"></el-input>
                                            <span class="unit">s</span>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item :label="$t('message.RedLightsNumber')+'：'" prop="hsjsdzsl" v-if="lampZt.hsjsdzslxszt">
                                            <el-input v-model.number="lamp.hsjsdzsl" type="number" min="0" max="50" step="1"></el-input>
                                            <span class="unit">{{ $t('message.Ge') }}</span>
                                        </el-form-item>
                                    </li>
                                    <li>
                                        <el-form-item label="雾灯状态：" v-if="kzcl == 6">
                                            <el-select v-model="lamp.wdkz" :placeholder="$t('message.PleaseSelect')">
                                                <el-option v-for="item in ControllerWorkModeCustom" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </li>
                                </ul>
                            </el-form>
                        </div>
                        <el-button type="primary" size="mini" class="fr mb20" @click="send03">生成03协议</el-button>
                    </el-card>
                     <el-card class="box-card mt20">
                        <div style="display: flex;">
                            <div style="width: 40px;line-height:24px;">重启</div>
                            <el-input v-model="ksdz" style="width: 150px;" :placeholder="$t('message.StartAddress')" size="mini"></el-input>
                            <div style="width: 30px;line-height:24px;padding: 0 10px;">~</div>
                            <el-input v-model="jsdz" style="width: 150px;" :placeholder="$t('message.StopAddress')" size="mini"></el-input>
                            <div style="flex: 1;"></div>
                            <el-button type="primary" size="mini" @click="send05">生成05协议</el-button>
                        </div>
                        
                     </el-card>
                 </el-col>
                 <el-col :span="12" style="padding-left: 20px;">
                    <div>
                        <el-radio-group v-model="codeData" @change="changeCode">
                            <el-radio v-for="item in codeDatas" :key="item.key" :label="item.key">{{item.val }}</el-radio>
                        </el-radio-group>
                    </div>
                    <el-card class="box-card mt20" style="height: 585px;overflow: auto;">
                        <div slot="header" class="headerTitle">
                            <span>接收结果</span>
                        </div>
                        <div v-text="protocolResult" style="white-space: pre-wrap;"></div>
                     </el-card>
                    <el-card class="box-card mt20">
                        <div slot="header" class="headerTitle">
                            <span>发送数据</span>
                        </div>
                        <el-input v-model="protocol" style="width: 100%;" placeholder="生成的协议"></el-input>
                        <el-button type="primary" size="small" class="fr mt20 mb20" @click="sendCommand">发送</el-button>
                    </el-card>
                 </el-col>
             </el-row>
        </section>
    </div>
</template>

<script>
import FogArea from "./js/FogArea.js";
import Controller from "./js/Controller.js";
import ControlStrategy from './js/ControlStrategy.js'
import Dictionary from "./js/Dictionary.js";
import Code from "./js/Code.js";

export default {
    data(){
        return{
            controllers: [],//控制器集合
            selectedController: [], //当前选中的控制器

            lddjCodes: [],//亮度等级集合  1-10
            lddjCodes1: [],//1-5
            ssplCodes: [],
            zkbCodes: [],
            total: 0,
            protocol: '',//生成的协议
            protocolResult: '',//返回结果
            protocolResultSave: '',
            sendProtocol: '',//发送的协议，十六进制，转asc用
            receiveProtocol: '',//接收的协议，十六进制，转asc用
            loading: false,//发送加载

            ksdz: "",//雾灯开始地址
            jsdz: "",//雾灯结束地址

            codeData: 1,//编码类型
            codeDatas: [
                {
                    key: 1,
                    val: 'hex'
                },{
                    key: 2,
                    val: 'asc ii'
                }
            ],//结果编码类型

            //添加和更新的控制器
            controller: {},
            ControllerWorkModeCustom: [],//自定义下的雾灯工作模式

            clms: '',//控制描述
            kzcl: '',//控制策略
            StrategiesDatas: [],//当前策略数据
            lamp: {},
            lampZt: {},

            kzclIndex: '',//当前选择的模式

            lampControlDisabled: false,
            lampConfigDisabled: false,

            //雾灯参数校验
            lampRules: {
                wdld: this.filterRules('雾灯亮度', true, null, null, 'wdld'),
                ldsc: this.filterRules('亮灯时长', true, null, null, 'time'),
                mdsc: this.filterRules('灭灯时长', true, null, null, 'time'),
                hdys: this.filterRules('红灯延时', true, null, null, 'time'),
                mqys: this.filterRules('盲区延时', true, null, null, 'time'),
                hsjsdzsl: this.filterRules('红色警示灯数量', true, null, null, 'alarm')
            },
        }
    },
    mounted() {
        this.init();
        this.loadStrategies();
        this.loadControllers();
    },
    methods: {
        init(){
            Code.getCodes({
                dmlb: Dictionary.CodeType.LampLevel,
            }).then(value => {
                this.lddjCodes = value.datas;

                for(let i = 0;i<value.datas.length;i++){
                if(value.datas[i].dm <= 5){
                    this.lddjCodes1.push(value.datas[i])
                }
                }
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

            Code.getCodes({
                dmlb: Dictionary.CodeType.ControllerWorkMode
            }).then(value => {
                
                for (i = 0; i < value.datas.length; i++) {
                if (value.datas[i].dm == 1 ||
                    value.datas[i].dm == 2 ||
                    value.datas[i].dm == 3 ||
                    value.datas[i].dm == 4 ) {
                    this.ControllerWorkModeCustom.push(value.datas[i])
                }
                }
                
            });
        },
        loadStrategies() {
            var data = {}
            //查询数据
            ControlStrategy.getStrategies(data).then(value => {
                this.StrategiesDatas = value;
            });
        },
        //改变编码类型
        changeCode(val){
            
            this.codeData = val;

            if(val == 2){
                this.protocolResultSave = this.protocolResult;
                if(this.protocolResult == null || this.protocolResult == '' || this.protocolResult == undefined){
                    return;
                }else{
                    // var receiveProtocol = this.protocolResult.split('-');
                    // var sendProtocol = receiveProtocol[0].split('+');
                   
                    // this.sendProtocol = this.changeAscII(sendProtocol[1].replace(/(^\s*)|(\s*$)/g, "").split(" "));
                    // this.receiveProtocol = this.changeAscII(receiveProtocol[1].replace(/(^\s*)|(\s*$)/g, "").split(" "));
                   
                    // this.protocolResult = sendProtocol[0]+'+ '+this.sendProtocol+'\n- '+this.receiveProtocol;

                    var sendProtocol = this.protocolResult.split('◆')[0].split('◇')[1].split(' □')[0].split(" ");
                    var receiveProtocol = this.protocolResult.split('◆')[1].replace(/(\s*$)/g, "").split(" ");//需要转asc的接收的参数
                    var sendProtocolTitle = this.protocolResult.split('◇')[0]+'◇';//
                    var receiveProtocolTitle = this.protocolResult.split('□')[1].split('◆')[0]+'◆';//
                    
                    this.sendProtocol = this.changeAscII(sendProtocol);
                    this.receiveProtocol = this.changeAscII(receiveProtocol);

                    this.protocolResult = sendProtocolTitle+this.sendProtocol+' □'+receiveProtocolTitle+this.receiveProtocol;
                }
            }else{
                this.protocolResult = this.protocolResultSave;
            }

        },
        //hex --> ASC II
        changeAscII(arr){
            
            var arrCodes = [];
            for(let i = 0; i < arr.length; i++){
                arrCodes.push(String.fromCharCode('0x'+arr[i]));
                // console.log('0x'+arr[i])
                // console.log(String.fromCharCode('0x'+arr[i]))
            }
            
            return arrCodes.join(" ");

        },

        //快捷参数选择
        shortcut(val) {
            this.kzclIndex = val;
            for (let i = 0; i < this.StrategiesDatas.length; i++) {
                if (this.StrategiesDatas[i].clbm == val) {
                    this.clms = this.StrategiesDatas[i].clms;
                    // console.log(val)
                    this.lamp = {
                        wdlddj: this.StrategiesDatas[i].wdlddj,
                        wdld: this.StrategiesDatas[i].wdld,
                        ldsc: this.StrategiesDatas[i].ldsc,
                        mdsc: this.StrategiesDatas[i].mdsc,
                        hdys: this.StrategiesDatas[i].hdys,
                        mqys: this.StrategiesDatas[i].mqys,
                        hsjsdzsl: this.StrategiesDatas[i].hsjsdzsl,

                        wdkz: this.StrategiesDatas[i].wdkz,

                        sspl: this.StrategiesDatas[i].sspl,
                        ssplsm: this.StrategiesDatas[i].ssplsm,
                        zkb: this.StrategiesDatas[i].zkb,
                        zkbsm: this.StrategiesDatas[i].zkbsm,
                    }
                    // console.log(this.lamp)
                    this.lampZt = {
                        wdlddjxszt: this.StrategiesDatas[i].wdlddjxszt,
                        ssplxszt: this.StrategiesDatas[i].ssplxszt,
                        zkbxszt: this.StrategiesDatas[i].zkbxszt,
                        wdkzxszt: this.StrategiesDatas[i].wdkzxszt,
                        wdldxszt: this.StrategiesDatas[i].wdldxszt,
                        ldscxszt: this.StrategiesDatas[i].ldscxszt,
                        mdscxszt: this.StrategiesDatas[i].mdscxszt,
                        hdysxszt: this.StrategiesDatas[i].hdysxszt,
                        mqysxszt: this.StrategiesDatas[i].mqysxszt,
                        hsjsdzslxszt: this.StrategiesDatas[i].hsjsdzslxszt,
                    }
                    if(this.StrategiesDatas[i].sspl == 1){
                        this.total = 0;
                        this.lamp.ldsc = 1000;
                        this.lamp.mdsc = 0;
                    }else if(this.StrategiesDatas[i].sspl == 2){
                        this.total = 2000;
                    }else if(this.StrategiesDatas[i].sspl == 3){
                        this.total = 1000;
                    }else if(this.StrategiesDatas[i].sspl == 4){
                        this.total = 500;
                    }else if(this.StrategiesDatas[i].sspl == 5){
                        this.total = 250;
                    }

                }
            }

        },
 
        //读取控制器集合
        loadControllers() {

            var queryParameter = {};
            Controller.getControllers(queryParameter).then(value => {

                this.controllers = value;
                
            });
        },
        //當前選擇發生變化時
        selectionController(val){
            this.selectedController = val;
        },
        //发送
        sendCommand(){
            
            if (this.selectedController.length == 0) {
                this.$alert("请至少选择一个控制器", '控制器信息', {
                    confirmButtonText: '确定'
                });
                return;
            }
            
            this.loading = true;

            var item1 = [];
            for(var i=0;i<this.selectedController.length;i++){
                item1.push({
                    "kzqbsm": this.selectedController[i].kzqbsm,
                    "kzqdk": this.selectedController[i].kzqdk
                })
            }

            var data = {
                item1: item1,
                item2: this.protocol,
            }
            Controller.sendCommand(data).then(value => {
                if(value){
                    this.loading = false;
                    
                    if(this.codeData == 1){
                        this.protocolResult = value;
                    }else if(this.codeData == 2){
                        this.protocolResultSave = value;
                        if(value == null || value == '' || value == undefined){
                            return;
                        }else{
                            // var receiveProtocol = value.split('-');
                            // var sendProtocol = receiveProtocol[0].split('+');
                        
                            // this.sendProtocol = this.changeAscII(sendProtocol[1].replace(/(^\s*)|(\s*$)/g, "").split(" "));
                            // this.receiveProtocol = this.changeAscII(receiveProtocol[1].replace(/(^\s*)|(\s*$)/g, "").split(" "));
                        
                            // this.protocolResult = sendProtocol[0]+'+ '+this.sendProtocol+'\n- '+this.receiveProtocol;

                            var sendProtocol = value.split('◆')[0].split('◇')[1].split(' □')[0].split(" ");
                            var receiveProtocol = value.split('◆')[1].replace(/(\s*$)/g, "").split(" ");
                            var sendProtocolTitle = value.split('◇')[0]+'◇';//
                            var receiveProtocolTitle = value.split('□')[1].split('◆')[0]+'◆';//
                            
                            this.sendProtocol = this.changeAscII(sendProtocol);
                            this.receiveProtocol = this.changeAscII(receiveProtocol);

                            this.protocolResult = sendProtocolTitle+this.sendProtocol+' □'+receiveProtocolTitle+this.receiveProtocol;

                        }
                    }

                }
            })
        },
        //补零
        getNum(num){
            var t = (num+'').length,
            s = '';
            for(var i=0; i<2-t; i++){
            s += '0';
            }
            return s+num;
        },
        //下发03协议
        send03(){
            if(this.kzcl == ''){
                this.$alert("请选择策略", '控策略信息', {
                    confirmButtonText: '确定'
                });
                return;
            }else{
               
                let wdkz,wdld,ldsc,ldsc1,mdsc,mdsc1,hdys,mqys,hsjsdzsl;
                wdkz = this.getNum(Number(this.lamp.wdkz).toString(16));
                if(this.lamp.wdkz == Dictionary.ControllerWorkMode.FlashRed || this.lamp.wdkz == Dictionary.ControllerWorkMode.FlashYellow || this.lamp.wdkz == Dictionary.ControllerWorkMode.Detection){
                   
                    if(this.kzclIndex == 1){
                        this.changeWdld(1);
                    }else if(this.kzclIndex == 2 || this.kzclIndex == 3 || this.kzclIndex == 4 ){
                        this.changeWdld(1);
                        this.changeSspl();
                    }
                    
                    // console.log(this.lamp.wdkz+'***'+this.lamp.wdld+'***'+this.lamp.ldsc+'***'+this.lamp.mdsc+'***'+this.lamp.hdys+'***'+this.lamp.mqys+'***'+this.lamp.hsjsdzsl)
                    // console.log(parseInt(this.lamp.ldsc%128)+'***'+parseInt(this.lamp.ldsc/128)+'***'+parseInt(this.lamp.mdsc%128)+'***'+parseInt(this.lamp.mdsc/128))
                    wdld = this.getNum(parseInt(this.lamp.wdld).toString(16));
                    ldsc = this.getNum((parseInt(this.lamp.ldsc%128)).toString(16));
                    ldsc1 = this.getNum(parseInt(this.lamp.ldsc/128).toString(16));
                    mdsc = this.getNum((parseInt(this.lamp.mdsc%128)).toString(16));
                    mdsc1 = this.getNum(parseInt(this.lamp.mdsc/128).toString(16));
                    hdys = this.getNum(parseInt(this.lamp.hdys).toString(16));
                    mqys = this.getNum(parseInt(this.lamp.mqys).toString(16));
                    hsjsdzsl = this.getNum(parseInt(this.lamp.hsjsdzsl).toString(16));
                    
                    this.protocol = '03 '+wdkz+' '+wdld+' '+ldsc+' '+ldsc1+' '+mdsc+' '+mdsc1+' '+hdys+' '+mqys+' '+hsjsdzsl+' '+'FF';
                }else{
                    
                    this.protocol = '03 '+wdkz+' FF';
                }
                
            }
        },
        //下发05协议
        send05(){
            
            if(this.ksdz == '' || this.jsdz == '' ){
                this.$alert("雾灯地址不能为空", '雾灯地址信息', {
                    confirmButtonText: '确定'
                });
                this.protocol = '';
                return;
            }else if(Number(this.ksdz) < 0 || Number(this.jsdz) < 0){
                this.$alert("雾灯地址不能为负数", '雾灯地址信息', {
                    confirmButtonText: '确定'
                });
                this.protocol = '';
                return;
            }else if(Number(this.ksdz) > Number(this.jsdz)){
                this.$alert("结束地址需要大于开始地址", '雾灯地址信息', {
                    confirmButtonText: '确定'
                });
                this.protocol = '';
                return;
            }
            let ksdz,ksdz1,jsdz,jsdz1;
            
            ksdz = this.getNum(parseInt(this.ksdz%128).toString(16));
            ksdz1 = this.getNum(parseInt(this.ksdz/128).toString(16));
            jsdz = this.getNum(parseInt(this.jsdz%128).toString(16));
            jsdz1 = this.getNum(parseInt(this.jsdz/128).toString(16));
           
            this.protocol = '05 '+ksdz+' '+ksdz1+' '+jsdz+' '+jsdz1+' FF';
        },
        //通过修改亮度等级，修改雾灯亮度
        changeWdld(num){
            if(num == 0){//10
                for(var i=0;i<this.lddjCodes.length;i++){
                    if(this.lamp.wdlddj == this.lddjCodes[i].dm){
                        this.lamp.wdld = this.lddjCodes[i].dmsm;
                    }
                }
            }else if(num == 1){//5
                for(var i=0;i<this.lddjCodes1.length;i++){
                    if(this.lamp.wdlddj == this.lddjCodes1[i].dm){
                        this.lamp.wdld = this.lddjCodes1[i].dmsm;
                    }
                }
            }

        },
        //通过修改占空比，修改其他参数
        changeZkb(){
          
            for(var i=0;i<this.zkbCodes.length;i++){
                if(this.lamp.zkb == this.zkbCodes[i].dm){
                    this.lamp.zkbsm = this.zkbCodes[i].dmsm;
                }
            }
            if(this.total == 0){
                this.lamp.ldsc = 1000;
                this.lamp.mdsc = 0;
            }else{
                
                if(this.lamp.zkb == 1){
                    this.lamp.ldsc = parseInt(this.total/2);
                    this.lamp.mdsc = this.total - this.lamp.ldsc;
                }else if(this.lamp.zkb == 2){
                    this.lamp.ldsc = parseInt(this.total/3);
                    this.lamp.mdsc = this.total - this.lamp.ldsc;
                }else if(this.lamp.zkb == 3){
                    this.lamp.ldsc = parseInt(this.total/4);
                    this.lamp.mdsc = this.total - this.lamp.ldsc;
                }

            }
        },
        //通过修改闪烁频率，修改其他参数
        changeSspl(){

            for(var i=0;i<this.ssplCodes.length;i++){
                if(this.lamp.sspl == this.ssplCodes[i].dm){
                    this.lamp.ssplsm = this.ssplCodes[i].dmsm;
                }
            }
            if(this.lamp.sspl == 1){
                this.total = 0;
                this.lamp.ldsc = 1000;
                this.lamp.mdsc = 0;
            }else if(this.lamp.sspl == 2){
                this.total = 2000;
            }else if(this.lamp.sspl == 3){
                this.total = 1000;
            }else if(this.lamp.sspl == 4){
                this.total = 500;
            }else if(this.lamp.sspl == 5){
                this.total = 250;
            }
            this.changeZkb();
            
        },

    },
}
</script>
