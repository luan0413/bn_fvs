<template>
  <div class="changeTxetBox Controller">
    <div class="fogLeftBox">
      <div class="changeBoxleftTitle">
        <span>{{ $t('message.AreaControllerList') }}</span>
        <el-button class="fr mr20" plain icon="el-icon-plus" @click="initController">{{ $t('message.Insert') }}
        </el-button>
      </div>
      <div class="searchBox">
        <el-table :data="controllers" ref="controllerTable" :show-header=false height="206" highlight-current-row
          @current-change="changeController" style="width: 100%">
          <el-table-column prop="kzqmc">
          </el-table-column>
          <el-table-column :label="$t('message.Operation')" width="120" header-align="left" align="left">
            <template slot-scope="scope">
              <el-button size="mini" class="tableBtnImg" @click="enableController(scope.$index, scope.row)">
                <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
              </el-button>
              <el-button size="mini" class="tableBtnImg" @click="deleteController(scope.$index, scope.row)">
                <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="fogRightBox">
      <div class="changeBoxRightTitle">
        {{ $t('message.AreaControllerDetail') }}
      </div>
      <div class="changeBoxRightContent searchBox">
        <el-form :model="controller" :rules="controllerRules" ref="controllerForm" :disabled="controllerDisabled"
          label-width="100px" size="mini">
          <div style="padding-top: 10px;">
            <ul style="width: 64%;float: left;">
              <li class="lampList">
                <el-form-item :label="$t('message.DeviceName')" prop="kzqmc">
                  <el-input v-model="controller.kzqmc" :title="controller.kzqmc"
                    :placeholder="$t('message.PleaseInput')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.ControllerNum')" prop="kzqbsm" label-width="80px">
                  <el-input v-model="controller.kzqbsm" type="number" :placeholder="$t('message.PleaseInput')">
                  </el-input>
                </el-form-item>
              </li>
              <li class="lampList">
                <el-form-item :label="$t('message.LampAddress')">
                  <el-input readonly v-model="controller.ksdz" :placeholder="$t('message.StartAddress')">
                  </el-input>
                </el-form-item>
                <el-form-item label="~" label-width="15px">
                  <el-input readonly v-model="controller.jsdz" :placeholder="$t('message.StopAddress')">
                  </el-input>
                </el-form-item>
                <el-button plain icon="el-icon-more" :disabled="controllerDisabled" @click="showAddressDialog(0)"
                  title="编辑雾灯地址" style="font-size: 12px;padding: 4px;margin-top: 3px;"></el-button>
              </li>
              <li class="lampList">
                <el-form-item :label="$t('message.LampAddress')">
                  <el-input readonly v-model="controller.ksdz1" :placeholder="$t('message.StartAddress')">
                  </el-input>
                </el-form-item>
                <el-form-item label="~" label-width="15px">
                  <el-input readonly v-model="controller.jsdz1" :placeholder="$t('message.StopAddress')">
                  </el-input>
                </el-form-item>
                <el-button plain icon="el-icon-more" :disabled="controllerDisabled" @click="showAddressDialog(1)"
                  title="编辑雾灯地址" style="font-size: 12px;padding: 4px;margin-top: 3px;"></el-button>
              </li>
              <li class="lampList">
                <el-form-item :label="$t('message.LampAddress')">
                  <el-input readonly v-model="controller.ksdz2" :placeholder="$t('message.StartAddress')">
                  </el-input>
                </el-form-item>
                <el-form-item label="~" label-width="15px">
                  <el-input readonly v-model="controller.jsdz2" :placeholder="$t('message.StopAddress')">
                  </el-input>
                </el-form-item>
                <el-button plain icon="el-icon-more" :disabled="controllerDisabled" @click="showAddressDialog(2)"
                  title="编辑雾灯地址" style="font-size: 12px;padding: 4px;margin-top: 3px;"></el-button>
              </li>
              <li class="lampList">
                <el-form-item :label="$t('message.LampAddress')">
                  <el-input readonly v-model="controller.ksdz3" :placeholder="$t('message.StartAddress')">
                  </el-input>
                </el-form-item>
                <el-form-item label="~" label-width="15px">
                  <el-input readonly v-model="controller.jsdz3" :placeholder="$t('message.StopAddress')">
                  </el-input>
                </el-form-item>
                <el-button plain icon="el-icon-more" :disabled="controllerDisabled" @click="showAddressDialog(3)"
                  title="编辑雾灯地址" style="font-size: 12px;padding: 4px;margin-top: 3px;"></el-button>
              </li>
            </ul>
            <ul style="width: 36%;float: left;">
              <li class="lampList">
                <el-form-item :label="$t('message.PollingInterval')" prop="wdxjjg">
                  <el-input v-model="controller.wdxjjg" type="number" :placeholder="$t('message.PleaseInput')">
                  </el-input>
                </el-form-item>
              </li>
              <li class="lampList">
                <el-form-item :label="$t('message.LampNum')">
                  <el-input readonly v-model="controller.wdsl"></el-input>
                </el-form-item>
              </li>
              <li class="lampList">
                <el-form-item label="端口">
                  <el-input v-model="controller.kzqdk" :placeholder="$t('message.PleaseInput')" type="number">
                  </el-input>
                </el-form-item>
              </li>
              <li class="lampList">
                <el-form-item :label="$t('message.LinkedSwitch')" prop="kzqldkg">
                  <el-radio-group v-model="controller.kzqldkg">
                    <el-radio v-for="item in linkedSwitch" :key="item.dm" :label="item.dm">{{item.dmsm}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </li>
              <li class="lampList">
                <el-form-item :label="$t('message.LampAlarm')" prop="wdbj">
                  <el-radio-group v-model="controller.wdbj">
                    <el-radio v-for="item in lampAlarm" :key="item.dm" :label="item.dm">{{item.dmsm}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </li>
            </ul>
          </div>
        </el-form>
        <div class="fogRightBtn">
          <el-button plain icon="el-icon-refresh" :disabled="controllerDisabled" @click="cancelController">
            {{ $t('message.Cancel') }}</el-button>
          <el-button plain icon="el-icon-document" :disabled="controllerDisabled" type="primary"
            @click="saveController">{{ $t('message.Save') }}</el-button>
          <el-button plain icon="el-icon-upload" type="primary" @click="queryController">{{ $t('message.Upload') }}
          </el-button>
          <el-button plain icon="el-icon-download" :disabled="uploadDisabled" type="primary" @click="setController">
            {{ $t('message.Issue') }}</el-button>
        </div>
      </div>
    </div>


    <el-dialog :title="$t('message.Update')+$t('message.LampAddress')" :visible.sync="addAddressDialog" width="460px">
      <span>
        <div>
          <el-radio-group v-model="lampAddress.type">
            <el-radio v-for="item in lampAddressType" :key="item.dm" :label="item.dm">{{item.dmsm}}</el-radio>
          </el-radio-group>
        </div>
        <div class="lampAddress of mt10">
          <ul class="searchList">
            <span class="lampLabel">{{ $t('message.StatrStopNum') }}</span>
            <li class="fl">
              <el-input v-model="lampAddress.ksdz" style="width: 150px;padding: 0 8px;"
                :placeholder="$t('message.StartAddress')" type="number" min="1" max="9999" size="mini"></el-input>
            </li>
            <span class="lampPoint fl">~</span>
            <li class="fl">
              <el-input v-model="lampAddress.jsdz" style="width: 150px;padding-left: 8px;"
                :placeholder="$t('message.StopAddress')" type="number" min="1" max="9999" size="mini"></el-input>
            </li>
            <li class="fl ml20">
              <el-button type="primary" icon="el-icon-plus" style="padding: 4px 10px" :title="$t('message.Insert')"
                size="mini" @click="addAddress()"></el-button>
            </li>
          </ul>
        </div>
        <div class="gridBox mt10">
          <el-table :data="lampAddresses" border style="width: 100%">
            <el-table-column prop="ksdz" :label="$t('message.StartAddress')" min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="jsdz" :label="$t('message.StopAddress')" min-width="80" align="center">
            </el-table-column>
            <el-table-column :label="$t('message.Type')" min-width="80" align="center">
              <template slot-scope="scope">
                <span v-for="item in lampAddressType" :key="item.dm" :label="item.dm"
                  v-if="scope.row.type == item.dm">{{item.dmsm}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('message.Operation')" width="80" align="center">
              <template slot-scope="scope">
                <el-button size="mini" class="tableBtnImg" @click="deleteAddress(scope.$index, scope.row)">
                  <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setLampAddress()" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="addAddressDialog = false" size="mini">{{ $t('message.Cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Controller from "./js/Controller.js";
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";

  export default {
    data() {
      return {
        lampAlarm: [], //是否使用雾灯报警字典
        useRadar: [], //是否使用雷达字典
        linkedSwitch: [], //是否使用联动开关字典
        lampAddressType: [], //雾灯地址段类型字典
        addAddressDialog: false, //雾灯编码弹窗
        // addAddressDialog1: false, //雾灯编码弹窗
        //当前编辑的雾灯地址
        lampAddress: {
          type: Dictionary.LampAddressType.AB,
          ksdz: '',
          jsdz: '',
          kzqbm: 0
        },
        //雾灯地址集合
        lampAddresses: [],
        lampAddresses1: [],
        lampAddresses2: [],
        lampAddresses3: [],
        lampAddressesNum: '',
        wqbm: "", //雾区编码
        controllers: [], //控制器集合
        selectedController: {}, //当前选中的控制器
        //添加和更新的控制器
        controller: {
          kzqbm: "",
          kzqbsm: "",
          kzqmc: "",
          kzqldkg: "1",
          wdbj: 1,
          wdxjjg: "",
          sfsyld: "1",
          ksdz: "",
          jsdz: "",
          wdsl: "",
          wqbm: "",
          kzqdk: "6003",
          lampAddresses: [],
          lampAddresses1: [],
          lampAddresses2: [],
          lampAddresses3: [],
        },
        //校验规则
        controllerRules: {
          kzqmc: this.filterRules('设备名称', true, 50, 1),
          kzqbsm: this.filterRules('控制器标识码', true, 50, 1),
          wdxjjg: this.filterRules('巡检间隔', true, null, null, 'intervalTime'),
          // kzqdk: this.filterRules('端口', true, 50, 1),
        },
        //更新区域是否可用
        controllerDisabled: true,
        //是否当前正在进行更新操作
        controllerUpdating: false,
        //是否当前正在进行添加操作
        controllerInserting: false,
        //上传按钮是否可用
        uploadDisabled: false,
        setLampNum: 1,
      }
    },
    mounted: function () {
      this.loadLampAlarm();
      this.loadUseRadar();
      this.loadLinkedSwitch();
      this.loadLampAddressType();
    },
    methods: {
      //读取雾灯报警字典
      loadLampAlarm() {
        var data = {
          dmlb: Dictionary.CodeType.LampAlarm,
        };
        Code.getCodes(data).then(value => {
          this.lampAlarm = value.datas;
        })
      },
      //读取是否使用雷达字典
      loadUseRadar() {
        var data = {
          dmlb: Dictionary.CodeType.UseRadar,
        };
        Code.getCodes(data).then(value => {
          this.useRadar = value.datas;
        })
      },
      //读取开关字典
      loadLinkedSwitch() {
        var data = {
          dmlb: Dictionary.CodeType.LinkedSwitch,
        };
        Code.getCodes(data).then(value => {
          this.linkedSwitch = value.datas;
        })
      },
      //读取雾灯地址段类型字典
      loadLampAddressType() {
        var data = {
          dmlb: Dictionary.CodeType.LampAddressType,
        };
        Code.getCodes(data).then(value => {
          this.lampAddressType = value.datas;
        })
      },

      //读取雾区中的控制器集合
      loadControllersInFogArea(wqbm) {

        this.wqbm = wqbm;
        var queryParameter = {
          wqbm: wqbm
        };

        Controller.getControllers(queryParameter).then(value => {

          this.controllers = value;

          for (var i = 0; i < value.length; ++i) {
            this.controllers[i].kzqbsm = this.controllers[i].kzqbsm.toString();
            this.controllers[i].kzqldkg = this.controllers[i].kzqldkg;
            this.controllers[i].wdbj = this.controllers[i].wdbj;
            this.controllers[i].sfsyld = this.controllers[i].sfsyld;
          }
          if (value.length == 0) {
            this.changeController(null);
          } else {
            var that = this;
            setTimeout(function () {
              that.$refs["controllerTable"].setCurrentRow(value[0]);
            }, 0);
          }
        });
      },
      //显示雾灯地址编辑弹出框
      showAddressDialog(num) {
        this.setLampNum = num;
        this.lampAddress.type = 0;
        this.lampAddress.ksdz = "";
        this.lampAddress.jsdz = "";
        this.addAddressDialog = true;
        this.lampAddresses = [];
        if (num == 0) {
          for (var i = 0; i < this.controller.lampAddresses.length; ++i) {
            if (this.controller.lampAddresses[i]) {
              this.lampAddresses.push(this.controller.lampAddresses[i]);
            }

          }
        } else if (num == 1) {
          for (var i = 0; i < this.controller.lampAddresses1.length; ++i) {
            if (this.controller.lampAddresses1[i]) {
              this.lampAddresses.push(this.controller.lampAddresses1[i]);
            }

          }
        } else if (num == 2) {
          for (var i = 0; i < this.controller.lampAddresses2.length; ++i) {
            if (this.controller.lampAddresses2[i]) {
              this.lampAddresses.push(this.controller.lampAddresses2[i]);
            }

          }
        } else if (num == 3) {
          for (var i = 0; i < this.controller.lampAddresses3.length; ++i) {
            if (this.controller.lampAddresses3[i]) {
              this.lampAddresses.push(this.controller.lampAddresses3[i]);
            }

          }
        }
        // console.log(this.lampAddresses)
      },
      //添加雾灯地址
      addAddress() {
        if (parseInt(this.lampAddress.ksdz) <= 0 ||
          parseInt(this.lampAddress.jsdz) <= 0 ||
          parseInt(this.lampAddress.ksdz) > 9999 ||
          parseInt(this.lampAddress.jsdz) > 9999) {
          this.$alert("雾灯地址必须在1-9999之间", '编辑雾灯地址', {
            confirmButtonText: '确定'
          });
          return;
        }

        if (parseInt(this.lampAddress.ksdz) > parseInt(this.lampAddress.jsdz)) {
          this.$alert("结束地址不能小于开始地址", '编辑雾灯地址', {
            confirmButtonText: '确定'
          });
          return;
        }

        if (this.setLampNum == 0) {
          if (this.controller.lampAddresses1.length>0 && Number(this.lampAddress.jsdz) >= this.controller.lampAddresses1[this.controller.lampAddresses1.length - 1]
            .ksdz) {
            this.$alert("第一段雾灯结束地址不能大于等于第二段雾灯开始地址", '编辑雾灯地址', {
              confirmButtonText: '确定'
            });
            return;
          }
          for (var i = 0; i < this.lampAddresses.length; ++i) {
            //这里的确定条件比较好写所以这样来写，比较明确
            if (!(parseInt(this.lampAddress.ksdz) > parseInt(this.lampAddresses[i].jsdz) || parseInt(this.lampAddress
                .jsdz) < parseInt(this.lampAddresses[i].ksdz))) {
              this.$alert("雾灯地址不能有重叠", '编辑雾灯地址', {
                confirmButtonText: '确定'
              });
              return;
            }
          }
        } else if (this.setLampNum == 1) {
          if (this.controller.lampAddresses.length>0 && Number(this.lampAddress.ksdz) <= this.controller.lampAddresses[this.controller.lampAddresses.length - 1]
            .jsdz) {
            this.$alert("第二段雾灯开始地址不能小于等于第一段雾灯结束地址", '编辑雾灯地址', {
              confirmButtonText: '确定'
            });
            return;
          }
          if (this.controller.lampAddresses2.length>0 && Number(this.lampAddress.jsdz) >= this.controller.lampAddresses2[this.controller.lampAddresses2.length - 1]
            .ksdz) {
            this.$alert("第二段雾灯结束地址不能大于等于第三段雾灯开始地址", '编辑雾灯地址', {
              confirmButtonText: '确定'
            });
            return;
          }
          for (var i = 0; i < this.lampAddresses.length; ++i) {
            if (!(parseInt(this.lampAddress.ksdz) > parseInt(this.lampAddresses[i].jsdz) || parseInt(this.lampAddress
                .jsdz) < parseInt(this.lampAddresses[i].ksdz))) {
              this.$alert("雾灯地址不能有重叠", '编辑雾灯地址', {
                confirmButtonText: '确定'
              });
              return;
            }
          }
        } else if (this.setLampNum == 2) {
          if (this.controller.lampAddresses1.length>0 && Number(this.lampAddress.ksdz) <= this.controller.lampAddresses1[this.controller.lampAddresses1.length - 1]
            .jsdz) {
            this.$alert("第三段雾灯开始地址不能小于等于第二段雾灯结束地址", '编辑雾灯地址', {
              confirmButtonText: '确定'
            });
            return;
          }

          if (this.controller.lampAddresses3.length>0 && Number(this.lampAddress.jsdz) >= this.controller.lampAddresses3[this.controller.lampAddresses3.length - 1]
            .ksdz) {
            this.$alert("第三段雾灯结束地址不能大于等于第四段雾灯开始地址", '编辑雾灯地址', {
              confirmButtonText: '确定'
            });
            return;
          }
          for (var i = 0; i < this.lampAddresses.length; ++i) {
            if (!(parseInt(this.lampAddress.ksdz) > parseInt(this.lampAddresses[i].jsdz) || parseInt(this.lampAddress
                .jsdz) < parseInt(this.lampAddresses[i].ksdz))) {
              this.$alert("雾灯地址不能有重叠", '编辑雾灯地址', {
                confirmButtonText: '确定'
              });
              return;
            }
          }
        } else if (this.setLampNum == 3) {
            // console.log(this.controller.lampAddresses2)
          if (this.controller.lampAddresses2.length>0 && Number(this.lampAddress.ksdz) <= this.controller.lampAddresses2[this.controller.lampAddresses2.length - 1]
            .jsdz) {
            this.$alert("第四段雾灯开始地址不能小于等于第三段雾灯结束地址", '编辑雾灯地址', {
              confirmButtonText: '确定'
            });
            return;
          }
          for (var i = 0; i < this.lampAddresses.length; ++i) {
            if (!(parseInt(this.lampAddress.ksdz) > parseInt(this.lampAddresses[i].jsdz) || parseInt(this.lampAddress
                .jsdz) < parseInt(this.lampAddresses[i].ksdz))) {
              this.$alert("雾灯地址不能有重叠", '编辑雾灯地址', {
                confirmButtonText: '确定'
              });
              return;
            }
          }
        }
        this.lampAddresses.push({
          kzqbm: this.controller.kzqbm,
          type: this.lampAddress.type,
          ksdz: this.lampAddress.ksdz,
          jsdz: this.lampAddress.jsdz
        });
        this.lampAddress.ksdz = '';
        this.lampAddress.jsdz = '';

      },
      //删除雾灯地址
      deleteAddress(index, row) {
        this.lampAddresses.splice(index, 1);

      },
      getWdsl(lampAddresses) {
        let wdsl = 0;
        let min = 10000;
        let max = 0;
        for (var i = 0; i < lampAddresses.length; ++i) {

          var ksdz = parseInt(lampAddresses[i].ksdz);
          var jsdz = parseInt(lampAddresses[i].jsdz);
          var type = parseInt(lampAddresses[i].type);
          if (ksdz < min) {
            min = ksdz;
          }
          if (jsdz > max) {
            max = jsdz;
          }

          if (type == Dictionary.LampAddressType.AB) {
            wdsl += jsdz - ksdz + 1;
          } else if (type == Dictionary.LampAddressType.A) {
            for (var j = ksdz; j <= jsdz; ++j) {
              if (j % 2 == 1) {
                wdsl += 1;
              }
            }
          } else if (type == Dictionary.LampAddressType.B) {
            for (var j = ksdz; j <= jsdz; ++j) {
              if (j % 2 == 0) {
                wdsl += 1;
              }
            }
          }
        }
        return [wdsl, min, max];
      },
      //设定控制器的雾灯地址
      setLampAddress() {

        // var wdsl = 0; //雾灯数量
        let wdsl = this.getWdsl(this.lampAddresses)[0]
        let wdsl0 = this.getWdsl(this.controller.lampAddresses)[0]
        let wdsl1 = this.getWdsl(this.controller.lampAddresses1)[0]
        let wdsl2 = this.getWdsl(this.controller.lampAddresses2)[0]
        let wdsl3 = this.getWdsl(this.controller.lampAddresses3)[0]

        if (this.setLampNum == 0) {

          if (this.lampAddresses.length == 0) {
            this.controller.ksdz = 0;
            this.controller.jsdz = 0;
            this.controller.wdsl = 0 + wdsl1 + wdsl2 + wdsl3;
          } else {
            this.controller.ksdz = this.getWdsl(this.lampAddresses)[1];
            this.controller.jsdz = this.getWdsl(this.lampAddresses)[2];
            this.controller.wdsl = wdsl + wdsl1 + wdsl2 + wdsl3;
          }

          this.controller.lampAddresses = [];
          for (var i = 0; i < this.lampAddresses.length; ++i) {
            this.controller.lampAddresses.push(this.lampAddresses[i]);
          }

        } else if (this.setLampNum == 1) {

          if (this.lampAddresses.length == 0) {
            this.controller.ksdz1 = 0;
            this.controller.jsdz1 = 0;
            this.controller.wdsl = 0 + wdsl0 + wdsl2 + wdsl2;
          } else {
            this.controller.ksdz1 = this.getWdsl(this.lampAddresses)[1];
            this.controller.jsdz1 = this.getWdsl(this.lampAddresses)[2];
            this.controller.wdsl = wdsl + wdsl0 + wdsl2 + wdsl3;
          }

          this.controller.lampAddresses1 = [];
          for (var i = 0; i < this.lampAddresses.length; ++i) {
            this.controller.lampAddresses1.push(this.lampAddresses[i]);
          }

        } else if (this.setLampNum == 2) {

          if (this.lampAddresses.length == 0) {
            this.controller.ksdz2 = 0;
            this.controller.jsdz2 = 0;
            this.controller.wdsl = 0 + wdsl0 + wdsl1 + wdsl3;
          } else {
            this.controller.ksdz2 = this.getWdsl(this.lampAddresses)[1];
            this.controller.jsdz2 = this.getWdsl(this.lampAddresses)[2];
            this.controller.wdsl = wdsl + wdsl0 + wdsl1 + wdsl3;
          }

          this.controller.lampAddresses2 = [];
          for (var i = 0; i < this.lampAddresses.length; ++i) {
            this.controller.lampAddresses2.push(this.lampAddresses[i]);
          }

        } else if (this.setLampNum == 3) {

          if (this.lampAddresses.length == 0) {
            this.controller.ksdz3 = 0;
            this.controller.jsdz3 = 0;
            this.controller.wdsl = 0 + wdsl0 + wdsl1 + wdsl2;
          } else {
            this.controller.ksdz3 = this.getWdsl(this.lampAddresses)[1];
            this.controller.jsdz3 = this.getWdsl(this.lampAddresses)[2];
            this.controller.wdsl = wdsl + wdsl0 + wdsl1 + wdsl2;
          }

          this.controller.lampAddresses3 = [];
          for (var i = 0; i < this.lampAddresses.length; ++i) {
            this.controller.lampAddresses3.push(this.lampAddresses[i]);
          }
        }
        // console.log(this.controller.wdsl)
        this.addAddressDialog = false;
      },
      //修改当前选中的控制器
      changeController(controller) {
        if (controller == null) {
          this.copyController(this.controller, null);
        } else {
          this.$refs['controllerForm'].resetFields();
          this.controllerInserting = false;
          this.copyController(this.controller, controller);
        }
        this.selectedController = controller;
        this.controllerDisabled = true;
      },
      //复制控制器数据
      copyController(c1, c2) {
        if (c2 == null) {

          c1.kzqbm = "";
          c1.kzqmc = "";
          c1.kzqbsm = "";
          c1.kzqldkg = Dictionary.LampSwitchStatus.Open;
          c1.wdbj = Dictionary.LampWarningStatus.Open;
          c1.wdxjjg = "";
          c1.sfsyld = Dictionary.LampRadarStatus.Open;
          c1.ksdz = "";
          c1.jsdz = "";
          c1.ksdz1 = "";
          c1.jsdz1 = "";
          c1.ksdz2 = "";
          c1.jsdz2 = "";
          c1.ksdz3 = "";
          c1.jsdz3 = "";
          c1.wdsl = "";
          c1.kzqdk = "";
          c1.lampAddresses = [];
          c1.lampAddresses1 = [];
          c1.lampAddresses2 = [];
          c1.lampAddresses3 = [];
          c1.wqbm = this.wqbm;
        } else {
          c1.kzqbm = c2.kzqbm;
          c1.kzqmc = c2.kzqmc;
          c1.kzqbsm = c2.kzqbsm.toString();
          c1.kzqldkg = parseInt(c2.kzqldkg);
          c1.wdbj = parseInt(c2.wdbj);
          c1.wdxjjg = c2.wdxjjg;
          c1.kzqdk = c2.kzqdk;
          c1.sfsyld = parseInt(c2.sfsyld);
          c1.ksdz = c2.ksdz;
          c1.jsdz = c2.jsdz;
          c1.ksdz1 = c2.ksdz1;
          c1.jsdz1 = c2.jsdz1;
          c1.ksdz2 = c2.ksdz2;
          c1.jsdz2 = c2.jsdz2;
          c1.ksdz3 = c2.ksdz3;
          c1.jsdz3 = c2.jsdz3;
          c1.wdsl = c2.wdsl;
          c1.lampAddresses = [];
          c1.lampAddresses1 = [];
          c1.lampAddresses2 = new Array();
          c1.lampAddresses3 = new Array();
          for (var i = 0; i < c2.lampAddresses.length; ++i) {
            c1.lampAddresses.push(c2.lampAddresses[i]);
          }
          for (var i = 0; i < c2.lampAddresses1.length; ++i) {
            c1.lampAddresses1.push(c2.lampAddresses1[i]);
          }
          for (var i = 0; i < c2.lampAddresses2.length; ++i) {
            c1.lampAddresses2.push(c2.lampAddresses2[i]);
          }
          for (var i = 0; i < c2.lampAddresses3.length; i++) {
            c1.lampAddresses3.push(c2.lampAddresses3[i]);
          }
          c1.wqbm = this.wqbm;
        }
      },
      //准备更新控制器
      enableController(index, row) {
        if (this.controllerInserting == true) {

          this.$confirm('是否取消添加控制器?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelBtnStyle',
            confirmButtonClass: 'confirmBtnStyle',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {

            this.copyController(this.controller, row);
            this.controllerDisabled = false;
            this.uploadDisabled = true;
            this.controllerUpdating = true;
            this.controllerInserting = false;
          }).catch(() => {});
        } else if (this.controllerUpdating == true) {
          this.controllerDisabled = false;
          this.uploadDisabled = true;
        }
        //这里有一个问题，如果在选择控制器的时候点击的是不空行，而是点击的编辑按钮，此时会触发这个条件
        //copy正确，下面4个变量设置正确，
        //但是此时controllerDisabled对应的界面却没有变化，等于变量设置了，但是没效果
        //所以必须在上面的判断中再次设置关于界面是否禁用的变量
        //但是上面绝对不能再次copy，因为此时可能已经编辑过某个字段，如果在进行copy等于重置了
        //只有编辑会存在这种情况
        else {
          this.copyController(this.controller, row);
          this.controllerDisabled = false;
          this.uploadDisabled = true;
          this.controllerUpdating = true;
          this.controllerInserting = false;
        }
      },
      //初始化添加控制器
      initController() {
        if (this.controllerUpdating == true) {
          this.$confirm('是否取消编辑控制器?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelBtnStyle',
            confirmButtonClass: 'confirmBtnStyle',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            this.copyController(this.controller, null);
            this.controllerUpdating = false;
            this.uploadDisabled = true;
            this.controllerDisabled = false;
            this.controllerInserting = true;
          }).catch(() => {});
        } else if (this.controllerInserting == true) {
          return;
        } else {
          this.copyController(this.controller, null);
          this.controllerUpdating = false;
          this.uploadDisabled = true;
          this.controllerDisabled = false;
          this.controllerInserting = true;
        }
      },
      //取消更新或添加
      cancelController() {
        this.$confirm('是否取消保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.$refs['controllerForm'].resetFields();
          this.copyController(this.controller, this.selectedController);
          this.controllerDisabled = true;
          this.uploadDisabled = false;
          this.controllerUpdating = false;
          this.controllerInserting = false;
        }).catch(() => {});
      },
      //保存控制器
      saveController() {
        this.$refs['controllerForm'].validate((valid) => {
          if (valid) {
            if (this.controller.ksdz >= this.controller.jsdz) {
              this.$alert('雾灯开始地址必须小于雾灯结束地址', '控制器信息', {
                confirmButtonText: '确定'
              });
              return;
            }
            // console.log(this.controller)
            if (this.controllerUpdating == true) {
              Controller.updateController(this.controller).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {

                  this.copyController(this.selectedController, this.controller);
                  this.controllerDisabled = true;
                  this.uploadDisabled = false;
                  this.controllerUpdating = false;
                  this.controllerInserting = false;
                  this.$alert('操作成功', '控制器信息', {
                    confirmButtonText: '确定'
                  });
                } else {
                  this.$alert("操作失败，请联系管理员", '控制器信息', {
                    confirmButtonText: '确定'
                  });
                }
              });
            } else {
              Controller.insertController(this.controller).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {
                  var data = {
                    kzqbm: value.key,
                    kzqmc: this.controller.kzqmc,
                    kzqbsm: this.controller.kzqbsm,
                    kzqldkg: this.controller.kzqldkg,
                    wdbj: this.controller.wdbj,
                    gzms: this.controller.gzms,
                    wdxjjg: this.controller.wdxjjg,
                    kzqdk: this.controller.kzqdk,
                    sfsyld: this.controller.sfsyld,
                    ksdz: this.controller.ksdz,
                    jsdz: this.controller.jsdz,
                    ksdz1: this.controller.ksdz1,
                    jsdz1: this.controller.jsdz1,
                    ksdz2: this.controller.ksdz2,
                    jsdz2: this.controller.jsdz2,
                    ksdz3: this.controller.ksdz3,
                    jsdz3: this.controller.jsdz3,
                    wdsl: this.controller.wdsl,
                    lampAddresses: this.controller.lampAddresses,
                    lampAddresses1: this.controller.lampAddresses1,
                    lampAddresses2: this.controller.lampAddresses2,
                    lampAddresses3: this.controller.lampAddresses3,
                  };
                  this.controllers.push(data);

                  var that = this;
                  setTimeout(function () {
                    that.$refs["controllerTable"].setCurrentRow(that.controllers[that.controllers.length -
                      1]);
                    const targetTop = that.$refs["controllerTable"].$el.querySelectorAll(
                      '.el-table__body tr')[that.controllers.length - 1].getBoundingClientRect().top
                    const containerTop = that.$refs["controllerTable"].$el.querySelector('.el-table__body')
                      .getBoundingClientRect().top
                    const scrollParent = that.$refs["controllerTable"].$el.querySelector(
                      '.el-table__body-wrapper')
                    scrollParent.scrollTop = targetTop - containerTop
                  }, 0);
                  this.controllerDisabled = true;
                  this.uploadDisabled = false;
                  this.controllerUpdating = false;
                  this.controllerInserting = false;
                  this.$alert('操作成功', '控制器信息', {
                    confirmButtonText: '确定'
                  });
                } else {
                  this.$alert("操作失败，请联系管理员", '控制器信息', {
                    confirmButtonText: '确定'
                  });
                }
              });
            }
          }
        });
      },
      //删除控制器
      deleteController(index, row) {
        this.$confirm('是否删除区域控制器?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          var that = this;
          Controller.deleteController(row).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {
              that.controllers.splice(index, 1);
              if (index < that.controllers.length) {
                this.$refs['controllerTable'].setCurrentRow(that.controllers[index]);
              } else if (index - 1 >= 0 && index - 1 < that.controllers.length) {
                this.$refs['controllerTable'].setCurrentRow(that.controllers[index - 1]);
              }
              this.$alert('操作成功', '控制器信息', {
                confirmButtonText: '确定'
              });
            } else {
              this.$alert("操作失败，请联系管理员", '控制器信息', {
                confirmButtonText: '确定'
              });
            }
          });
        }).catch(() => {});
      },
      //上传控制器信息
      queryController() {
        if (this.controller.kzqbsm == "") {
          this.$alert("请先选择控制器", '控制器信息', {
            confirmButtonText: '确定'
          });
          return;
        }
        this.$confirm('是否上传区域控制器数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          // console.log(this.controller)
          Controller.queryController(this.controller).then(value => {
            if (value == null) {
              this.$alert("未找到设备或连接超时，请联系管理员", '控制器信息', {
                confirmButtonText: '确定'
              });
            } else {
              // console.log(value)
              this.controller.kzqldkg = value.kzqldkg;
              this.controller.wdbj = value.wdbj;
              this.controller.sfsyld = value.sfsyld;
              this.controller.wdxjjg = value.wdxjjg;
              this.controller.kzqdk = value.kzqdk;
              this.controller.ksdz = value.ksdz;
              this.controller.jsdz = value.jsdz;
              this.controller.ksdz1 = value.ksdz1;
              this.controller.jsdz1 = value.jsdz1;
              this.controller.ksdz2 = value.ksdz2;
              this.controller.jsdz2 = value.jsdz2;
              this.controller.ksdz3 = value.ksdz3;
              this.controller.jsdz3 = value.jsdz3;
              this.controllerDisabled = false;
              this.uploadDisabled = true;

              if (this.controllerInserting == false && this.controllerUpdating == false) {
                this.controllerUpdating = true;
              }
              this.$alert("上传成功", '控制器信息', {
                confirmButtonText: '确定'
              });
            }
          });
        });

      },
      //下发控制器信息
      setController() {
        if (this.controller.kzqbsm == "") {
          this.$alert("请先选择控制器", '控制器信息', {
            confirmButtonText: '确定'
          });
          return;
        }
        this.$confirm('是否下发区域控制器数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          var that = this;
          // console.log(this.controller)
          Controller.setController(this.controller).then(value => {
            // console.log(value)
            if (value.czjg == Dictionary.SendResult.Success) {
              this.$alert('操作成功', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.SendFailed) {
              this.$alert('操作失败', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Timeout) {
              this.$alert('与设备通信超时', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.Disconnection) {
              this.$alert('与设备通信连接断开', '设备控制', {
                confirmButtonText: '确定'
              });
            } else if (value.czjg == Dictionary.SendResult.NotFoundSocket) {
              this.$alert('未找到该设备', '设备控制', {
                confirmButtonText: '确定'
              });
            }
          });
        }).catch(() => {});
      }
    }
  }

</script>
