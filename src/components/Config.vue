<template>
  <div calss="Config">
    <section class="section sysmon">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.ConfigManagement') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.FogAreaConfig') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="fixedBox">
        <div class="stepBox">
          <el-steps :active="activeStepIndex" finish-status="success" align-center>
            <el-step :title="$t('message.AreaController')"></el-step>
            <el-step :title="$t('message.VisibilityDevice')"></el-step>
            <el-step :title="$t('message.LinkDevice')"></el-step>
          </el-steps>
        </div>
        <div class="fogBox">
          <div class="fogLeftBox">
            <div class="fogLefetitle">
              <span>{{ $t('message.FogAreaList') }}</span>
              <el-button plain icon="el-icon-plus" @click="initFogArea">{{ $t('message.Insert') }}</el-button>
            </div>
            <el-table highlight-current-row :data="fogAreas" ref="fogAreaTable" :show-header=false
                      height="180" @current-change="changeFogArea" style="width: 100%">
              <el-table-column prop="wqmc">
              </el-table-column>
              <el-table-column :label="$t('message.Operation')" width="120">
                <template slot-scope="scope">
                  <el-button size="mini" class="tableBtnImg" @click="enableFogArea(scope.$index, scope.row)">
                    <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
                  </el-button>
                  <el-button size="mini" class="tableBtnImg" @click="deleteFogArea(scope.$index, scope.row)">
                    <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="fogRightBox">
            <div class="fogRightBoxTitle">{{ $t('message.FogAreaDetail') }}</div>
            <div class="fogRightContent searchBox mt10">
              <el-form :model="fogArea" :rules="fogAreaFormRules" ref="fogAreaForm"
                       :disabled="fogAreaDisabled" label-width="100px" size="mini">
                <ul class="searchList">
                  <li>
                    <el-form-item :label="$t('message.FogAreaName')" prop="wqmc">
                      <el-input v-model="fogArea.wqmc" :title="fogArea.wqmc" :placeholder="$t('message.PleaseInput')"></el-input>
                    </el-form-item>
                  </li>
                  <!-- <li>
                    <el-form-item :label="$t('message.LightGread')" prop="wdlddj">
                      <el-select v-model="fogArea.wdlddj" :placeholder="$t('message.PleaseSelect')" @change="changeLampGrade(fogArea.wdlddj)">
                        <el-option v-for="item in lddjs" :key="item.dm" :label="item.dm" :value="item.dm"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item :label="$t('message.FoglightLuminance')" prop="wdld">
                      <el-input v-model="fogArea.wdld" type="number" min="1" max="100" step="1" readonly></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item :label="$t('message.FlickerFrequency')" >
                      <el-select v-model="ldmdsc" :placeholder="$t('message.PleaseSelect')" @change="changeLamp(ldmdsc)">
                        <el-option label="30次/分钟" value="500"></el-option>
                        <el-option label="60次/分钟" value="250"></el-option>
                        <el-option label="120次/分钟" value="125"></el-option>
                        <el-option label="240次/分钟" value="63"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item :label="$t('message.LightsONDuration')+'(ms)'" prop="ldsc">
                      <el-input v-model="fogArea.ldsc" type="number" :placeholder="$t('message.PleaseInput')"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item :label="$t('message.LightsOFFDuration')+'(ms)'" prop="mdsc">
                      <el-input v-model="fogArea.mdsc" type="number" :placeholder="$t('message.PleaseInput')"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item :label="$t('message.RedTimeLengthening')+'(s)'" prop="hdys">
                      <el-input v-model="fogArea.hdys" type="number" :placeholder="$t('message.PleaseInput')"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item :label="$t('message.DeadZoneDuration')+'(s)'" prop="mqys">
                      <el-input v-model="fogArea.mqys" type="number" :placeholder="$t('message.PleaseInput')"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item :label="$t('message.RedLightsNumber')" prop="hsjsdzsl">
                      <el-input v-model="fogArea.hsjsdzsl" type="number" :placeholder="$t('message.PleaseInput')"></el-input>
                    </el-form-item>
                  </li> -->
                  <li>
                    <el-form-item :label="$t('message.RelayNum')" prop="jdqbsm">
                      <el-input v-model.number="fogArea.jdqbsm" type="number" :placeholder="$t('message.PleaseInput')"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <el-form-item :label="$t('message.DepartmentNum')" prop="jgbm">
                      <el-cascader :options="departments" :props="departmentProps" v-model="fogArea.jgbms"
                                   change-on-select :show-all-levels='false' @change="selectJgbm"
                                   clearable :placeholder="$t('message.PleaseSelect')"></el-cascader>
                    </el-form-item>
                   </li>
                   <!-- <li>
                     <el-form-item label="访问周期" prop="fwzq">
                       <el-input v-model="fogArea.fwzq" type="number" :placeholder="$t('message.PleaseInput')">
                       </el-input>
                     </el-form-item>
                   </li>
                   <li>
                     <el-form-item label="开灯阀值" prop="kdfz">
                       <el-input v-model="fogArea.kdfz" type="number" :placeholder="$t('message.PleaseInput')">
                       </el-input>
                     </el-form-item>
                   </li>
                   <li>
                     <el-form-item label="关灯阀值" prop="gdfz">
                       <el-input v-model="fogArea.gdfz" type="number" :placeholder="$t('message.PleaseInput')">
                       </el-input>
                     </el-form-item>
                   </li>
                   <li>
                     <el-form-item label="确认次数" prop="qrcs">
                       <el-input v-model="fogArea.qrcs" type="number" :placeholder="$t('message.PleaseInput')">
                       </el-input>
                     </el-form-item>
                   </li> -->
                </ul>
              </el-form>
              <div class="fogRightBtn" style="margin-top: 80px;">
                <el-button plain icon="el-icon-document" :disabled="fogAreaDisabled" type="primary" @click="saveFogArea">{{ $t('message.Save') }}</el-button>
                <el-button plain icon="el-icon-refresh" :disabled="fogAreaDisabled" @click="cancelFogArea">{{ $t('message.Cancel') }}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="changeBox">
        <div v-show="showController" class="changeContentBox">
          <Controller ref="controller"/>
        </div>
        <div v-show="showVisibility" class="changeContentBox">
          <Visibility ref="visibility"/>
        </div>
        <div v-show="showLinkDevice" class="changeContentBox">
          <LinkDevice ref="linkDevice"/>
        </div>
        <div v-show="showConfigStata" class="changeContentBox">
          <ConfigStata ref="ConfigStata"/>
        </div>
        <div class="stepBtn mt20">
          <el-button :disabled="preDisabled" @click="step(-1)">{{ $t('message.LastStep') }}</el-button>
          <el-button :disabled="nextDisabled" @click="step(1)">{{ $t('message.NextStep') }}</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import FogArea from "./js/FogArea.js";
  import Controller from './Controller';
  import Visibility from './Visibility';
  import LinkDevice from './LinkDevice';
  import ConfigStata from './ConfigStata';
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";
  import Department from "./js/Department.js";

  export default {
    components: {
      Controller,
      Visibility,
      LinkDevice,
      ConfigStata
    },
        data() {
          return {
            //table雾区集合
            fogAreas: [],
            //闪烁频率
            ldmdsc: "",
            lddjs: [],//亮度等级集合
            lddj: "",//亮度等级
            //当前添加和更新的雾区数据
            fogArea: {
              wqbm : "",
              wqmc : "",
              gzms: "",
              wdlddj: "",
              wdld: "",
              ldsc: "",
              mdsc: "",
              hdys: "",
              mqys: "",
              hsjsdzsl: "",
              jdqbsm: "",
              jgbm: "",
              jgbms:[]
            },
            //雾区校验
            fogAreaFormRules: {
              wqmc:this.filterRules('雾区名称', true, 50, 1),
              gzms: this.filterRules('工作模式', false),
              wdld:this.filterRules('雾灯亮度', true, null, null, 'wdld'),
              ldsc:this.filterRules('亮灯时长', true, null, null, 'time'),
              mdsc:this.filterRules('灭灯时长', true, null, null, 'time'),
              hdys:this.filterRules('红灯延时', true, null, null, 'time'),
              mqys: this.filterRules('盲区延时', true, null, null, 'time'),
              hsjsdzsl: this.filterRules('红色警示灯数量', true, null, null, 'time'),
            //   fwzq: this.filterRules('访问周期', true, null, null, 'time'),
            //   kdfz: this.filterRules('开灯阈值', true, null, null, 'time'),
            //   gdf: this.filterRules('关灯阈值', true, null, null, 'time'),
            //   qrcs: this.filterRules('确认次数', true, null, null, 'time'),
            },
            //当前选中的雾区
            selectedFogArea: {},
            //雾区编辑区域是否可用
            fogAreaDisabled: true,
            //当前是更新还是添加数据
            fogAreaUpdating: false,
            fogAreaInserting: false,
            //步骤
            activeSteps: ["Controller","Relay", "Visibility","LinkDevice","ConfigStata"],
            //当前选中的步骤
            activeStepIndex: 0,
            //是否显示子组件
            showController: true,
            showVisibility: false,
            showLinkDevice: false,
            showConfigStata: false,
            //步骤按钮禁用
            preDisabled: true,
            nextDisabled: false,
            //机构树数据
            departments: [],
            //字段映射
            departmentProps: {
              children: 'children',
              label: 'jgmc',
              value: 'jgbm'
            },
				}
    	},
        mounted: function () {
          this.loadFogAreas();
          this.loadCode();
          this.loadDepartments();
        },
        methods: {
          //读取雾区集合
          loadFogAreas() {

            FogArea.getFogAreas().then(value => {
              this.fogAreas = value;
              //如果有数据显示第一条，否则清空右侧区域
              if (value.length == 0)
              {
                this.changeFogArea(null);
              }
              else
              {
                var that = this;
                // console.log(that.$refs["fogAreaTable"])
                setTimeout(function () {
                  that.$refs["fogAreaTable"].setCurrentRow(value[0]);
                }, 0);
              }
            });
          },
          //读取部门集合
          loadDepartments() {
            Department.getDepartmentTree().then(value => {
              if (value == null)
              {
                this.departments =[];
              }
              else
              {
                this.departments = [value];
              }
            });
          },

          //读取工作模式字典
          loadCode(){
            var data = {
              dmlb: Dictionary.CodeType.LampLevel,
            };
            Code.getCodes(data).then(value => {
              this.lddjs = value.datas;
            })
          },
          //亮度等级
          changeLampGrade(lddj){
            for(let i = 0;i< this.lddjs.length; i++){
              if(this.lddjs[i].dm == this.fogArea.wdlddj){
                this.lddj = this.lddjs[i].dmsm;
              }
            }
            this.fogArea.wdld = this.lddj;
          },

          //复制雾区数据
          copyFogArea(f1, f2)
          {
            if (f2 == null)
            {
              f1.wqbm = "";
              f1.wqmc = "";
              f1.gzms = "";
              f1.wdlddj = "";
              f1.wdld = "";
              f1.ldsc = "";
              f1.mdsc = "";
              f1.hdys = "";
              f1.mqys = "";
              f1.hsjsdzsl = "";
              f1.jdqbsm = "";
              f1.jgbm = 0;
              f1.jgbms = [];
            //   f1.fwzq = ""
            //   f1.kdfz = "";
            //   f1.gdfz = "";
            //   f1.qrcs = "";
            }
            else
            {
              f1.wqbm = f2.wqbm;
              f1.wqmc = f2.wqmc;
              f1.gzms = f2.gzms;
              f1.wdlddj = f2.wdlddj;
              f1.wdld = f2.wdld;
              f1.ldsc = f2.ldsc;
              f1.mdsc = f2.mdsc;
              f1.hdys = f2.hdys;
              f1.mqys = f2.mqys;
              f1.hsjsdzsl = f2.hsjsdzsl;
              f1.jdqbsm = f2.jdqbsm;
              f1.jgbm = f2.jgbm;
              f1.jgbms = f2.jgbms;
            //   f1.fwzq = Number(f2.fwzq);
            //   f1.kdfz = Number(f2.kdfz);
            //   f1.gdfz = Number(f2.gdfz);
            //   f1.qrcs = Number(f2.qrcs);
            }
          },
          //修改当前雾区信息
          changeFogArea(fogArea) {
            if (fogArea == null)
            {
              this.copyFogArea(this.fogArea, null);
            }
            else
            {

              this.$refs['fogAreaForm'].resetFields();
              this.fogAreaInserting = false;
              this.copyFogArea(this.fogArea, fogArea);
              this.fogArea.jgbms = [];
              for (var i = 0; i < this.departments.length; ++i) {

                if (this.setDepartmentPath(this.departments[i], this.fogArea.jgbm) == true) {
                  break;
                }
              }
              fogArea.jgbms = this.fogArea.jgbms;

              //根据当前下侧显示的组件，刷新组件的数据
              if (this.showController)
              {
                this.$refs.controller.loadControllersInFogArea(fogArea.wqbm);
              }
              if (this.showVisibility) {
                this.$refs.visibility.loadVisibilitiesInFogArea(fogArea.wqbm);
              }
              if (this.showLinkDevice) {
                this.$refs.linkDevice.loadLinkDevicesInFogArea(fogArea.wqbm);
              }
            }
            this.selectedFogArea = fogArea;
            this.fogAreaDisabled = true;
          },
          setDepartmentPath(department, jgbm) {

            this.fogArea.jgbms.push(department.jgbm);
            if (department.jgbm == jgbm) {
              return true;
            }
            else {
              if (department.children != null) {
                for (var i = 0; i < department.children.length; ++i) {
                  if (this.setDepartmentPath(department.children[i], jgbm) == true) {
                    return true;
                  }
                }
              }
              this.fogArea.jgbms.pop();
              return false;
            }
          },
          //选择机构编码
          selectJgbm(value) {
            this.fogArea.jgbm = value[value.length - 1];
          },
          //准备更新雾区
          enableFogArea(index,row)
          {
            if (this.fogAreaInserting == true) {
              this.$confirm('是否取消新增?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                cancelButtonClass: 'cancelBtnStyle',
                confirmButtonClass: 'confirmBtnStyle',
                type: 'warning',
                closeOnClickModal: false
              }).then(() => {
                this.copyFogArea(this.fogArea, row);
                this.fogAreaUpdating = true;
                this.fogAreaDisabled = false;
                this.fogAreaInserting = false;
              }).catch(() => { });
            }
            else if (this.fogAreaUpdating == true){
              this.fogAreaDisabled = false;
            }
            else {
              this.copyFogArea(this.fogArea, row);
              this.fogAreaUpdating = true;
              this.fogAreaDisabled = false;
              this.fogAreaInserting = false;
            }
          },
          //初始化添加雾区
          initFogArea()
          {
            if (this.fogAreaUpdating == true)
            {
              this.$confirm('是否取消编辑?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                cancelButtonClass: 'cancelBtnStyle',
                confirmButtonClass: 'confirmBtnStyle',
                type: 'warning',
                closeOnClickModal: false
              }).then(() => {
                this.ldmdsc = '';
                this.copyFogArea(this.fogArea, null);
                this.fogAreaUpdating = false;
                this.fogAreaDisabled = false;
                this.fogAreaInserting = true;
              }).catch(() => { });
            }
            else
            {
              this.ldmdsc = '';
              this.copyFogArea(this.fogArea, null);
              this.fogAreaUpdating = false;
              this.fogAreaDisabled = false;
              this.fogAreaInserting = false;
            }
          },
          //取消添加或更新
          cancelFogArea() {
            this.$confirm('是否取消编辑?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass: 'cancelBtnStyle',
              confirmButtonClass: 'confirmBtnStyle',
              type: 'warning',
              closeOnClickModal: false
            }).then(() => {
              this.$refs['fogAreaForm'].resetFields();
              this.copyFogArea(this.fogArea, this.selectedFogArea);
              this.fogAreaDisabled = true;
              this.fogAreaUpdating = false;
              this.fogAreaIserting = false;
            }).catch(() => { });

          },
          //保存雾区信息
          saveFogArea()
          {
            this.$refs['fogAreaForm'].validate((valid) => {
              if (valid) {
                //更新
                // this.fogArea.fwzq = Number(this.fogArea.fwzq)
                // this.fogArea.kdfz = Number(this.fogArea.kdfz)
                // this.fogArea.gdfz = Number(this.fogArea.gdfz)
                // this.fogArea.qrcs = Number(this.fogArea.qrcs)
                if (this.fogAreaUpdating == true)
                {
                    
                  FogArea.updateFogArea(this.fogArea).then(value => {
                    if (value.czjg == Dictionary.DatabaseResult.Success) {
                      //更新成功了修改当前选中的雾区数据
                      this.copyFogArea(this.selectedFogArea, this.fogArea);
                      this.fogAreaDisabled = true;
                      this.fogAreaUpdating = false;
                      this.fogAreaInserting = false;
                      this.$alert('操作成功', '雾区信息', {
                        confirmButtonText: '确定'
                      });
                    }
                    else {
                      this.$alert("操作失败，请联系管理员", '雾区信息', {
                        confirmButtonText: '确定'
                      });
                    }
                  });
                }
                //添加
                else
                {
                  FogArea.insertFogArea(this.fogArea).then(value => {
                    if (value.czjg == Dictionary.DatabaseResult.Success) {
                      //添加成功后向集合中添加数据
                      var data = {
                        wqbm: value.key,
                        wqmc: this.fogArea.wqmc,
                        gzms: this.fogArea.gzms,
                        wdlddj: this.fogArea.wdlddj,
                        wdld: this.fogArea.wdld,
                        ldsc: this.fogArea.ldsc,
                        mdsc: this.fogArea.mdsc,
                        hdys: this.fogArea.hdys,
                        mqys: this.fogArea.mqys,
                        hsjsdzsl: this.fogArea.hsjsdzsl,
                        jdqbsm: this.fogArea.jdqbsm,
                        jgbm: this.fogArea.jgbm,
                        jgbms: this.fogArea.jgbms,
                        // fwzq: Number(this.fogArea.fwzq),
                        // kdfz: Number(this.fogArea.kdfz),
                        // gdfz: Number(this.fogArea.gdfz),
                        // qrcs: Number(this.fogArea.qrcs),
                      };

                      this.fogAreas.push(data);
                      var that = this;
                      //滚动条到底
                      setTimeout(function () {
                        that.$refs["fogAreaTable"].setCurrentRow(that.fogAreas[that.fogAreas.length - 1]);
                        const targetTop = that.$refs["fogAreaTable"].$el.querySelectorAll('.el-table__body tr')[that.fogAreas.length - 1].getBoundingClientRect().top
                        const containerTop = that.$refs["fogAreaTable"].$el.querySelector('.el-table__body').getBoundingClientRect().top
                        const scrollParent = that.$refs["fogAreaTable"].$el.querySelector('.el-table__body-wrapper')
                        scrollParent.scrollTop = targetTop - containerTop
                      }, 0);
                      this.fogAreaDialogVisible = false;
                      this.fogAreaUpdating = false;
                      this.fogAreaInserting = false;
                      this.$alert('操作成功', '雾区信息', {
                        confirmButtonText: '确定'
                      });
                    }
                    else {
                      this.$alert("操作失败，请联系管理员", '雾区信息', {
                        confirmButtonText: '确定'
                      });
                    }
                  });
                }
              }
            });
          },
          deleteFogArea(index, row) {
            this.$confirm('是否删除雾区及雾区下所有设备?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass: 'cancelBtnStyle',
              confirmButtonClass: 'confirmBtnStyle',
              type: 'warning',
              closeOnClickModal: false
            }).then(() => {
              var that = this;
              FogArea.deleteFogArea(row).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {
                  //删除成功后删除集合中的数据
                  that.fogAreas.splice(index, 1);
                  //判断要高亮的序号
                  if (index < that.fogAreas.length)
                  {
                    this.$refs['fogAreaTable'].setCurrentRow(that.fogAreas[index]);
                  }
                  else if (index - 1 >= 0 && index - 1 < that.fogAreas.length)
                  {
                    this.$refs['fogAreaTable'].setCurrentRow(that.fogAreas[index - 1]);
                  }
                  this.$alert('操作成功', '雾区信息', {
                    confirmButtonText: '确定'
                  });
                }
                else {
                  this.$alert("操作失败，请联系管理员", '雾区信息', {
                    confirmButtonText: '确定'
                  });
                }
              });
            }).catch(() => { });
          },
          //步骤按钮
          step(i)
          {
            this.activeStepIndex += i;
            this.preDisabled = this.activeStepIndex == 0;
            this.nextDisabled = this.activeStepIndex == 3;
            this.showController = this.activeStepIndex == 0;
            this.showVisibility = this.activeStepIndex == 1;
            this.showLinkDevice = this.activeStepIndex == 2;
            this.showConfigStata = this.activeStepIndex == 3;
            //根据选中的步骤刷新组件数据
             if (this.showController)
              {
                this.$refs.controller.loadControllersInFogArea(this.fogArea.wqbm);
              }
              if (this.showVisibility) {
                this.$refs.visibility.loadVisibilitiesInFogArea(this.fogArea.wqbm);
              }
              if (this.showLinkDevice) {
                this.$refs.linkDevice.loadLinkDevicesInFogArea(this.fogArea.wqbm);
              }
          },
          //亮灯灭灯时长选择
          changeLamp(ldmdsc){
            this.fogArea.ldsc = ldmdsc;
            this.fogArea.mdsc = ldmdsc*3;
          },
        }
    }

</script>


