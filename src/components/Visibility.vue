<template>
  <div class="changeTxetBox Visibility">
    <div class="fogLeftBox">
      <div class="changeBoxleftTitle">
        <span>{{ $t('message.VisibilityDevice') }}</span>
        <el-button class="fr mr20" plain icon="el-icon-plus" @click="initVisibility">{{ $t('message.Insert') }}
        </el-button>
      </div>
      <el-table :data="visibilities" ref="visibilityTable" :show-header=false height="282" highlight-current-row
        @current-change="changeVisibility" style="width: 100%">
        <el-table-column prop="jcymc">
        </el-table-column>
        <el-table-column :label="$t('message.Operation')" width="120" header-align="left" align="left">
          <template slot-scope="scope">
            <el-button size="mini" class="tableBtnImg" @click="enableVisibility(scope.$index, scope.row)">
              <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
            </el-button>
            <el-button size="mini" class="tableBtnImg" @click="deleteVisibility(scope.$index, scope.row)">
              <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fogRightBox">
      <div class="changeBoxRightTitle">{{ $t('message.VisibilityDeviceDetails') }}</div>
      <div class="changeBoxRightContent searchBox">
        <el-form :model="visibility" :rules="visibilityRules" ref="visibilityForm" :disabled="visibilityDisabled"
          label-width="100px" size="mini">
          <ul class="searchList" style="min-height: 40px !important;">
            <li>
              <el-form-item :label="$t('message.DeviceName')" prop="jcymc">
                <el-input v-model="visibility.jcymc" :title="visibility.jcymc"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.AreaController')" prop="kzqbm">
                <el-select v-model="visibility.kzqbm" :placeholder="$t('message.PleaseSelect')"
                  @change="changeController">
                  <el-option v-for="item in controllers" :key="item.kzqbm" :label="item.kzqmc" :value="item.kzqbm">
                  </el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.Communication')" prop="txcs">
                <el-input v-model="visibility.txcs"></el-input>
              </el-form-item>
            </li>
          </ul>
          <ul class="searchList" style="min-height: 40px !important;">
            <li>
              <el-form-item :label="$t('message.AlarmThresholdDn')" prop="bjfzxx">
                <el-input v-model="visibility.bjfzxx"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.AlarmThresholdUp')" prop="bjfzsx">
                <el-input v-model="visibility.bjfzsx"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.WorkPattern')" prop="gzms">
                <el-select v-model="visibility.gzms" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in gzmsCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="控制器" prop="kzqbm">
                <el-select v-model="visibility.kzqbmlist" :placeholder="$t('message.PleaseSelect')" multiple clearable
                  collapse-tags>
                  <el-option v-for="(item,index) in controllerCode" :key="item.kzqbm" :label="item.kzqmc"
                    :value="item.kzqbm">
                  </el-option>
                </el-select>
              </el-form-item>
            </li>
          </ul>
        </el-form>
        <div class="fogRightBtn mt50">
          <el-button plain icon="el-icon-document" :disabled="visibilityDisabled" type="primary"
            @click="saveVisibility">{{ $t('message.Save') }}</el-button>
          <el-button plain icon="el-icon-refresh" :disabled="visibilityDisabled" @click="cancelVisibility">
            {{ $t('message.Cancel') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Visibility from "./js/Visibility.js";
  import Controller from "./js/Controller.js";
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";

  export default {
    data() {
      return {
        gzmsCodes: [], //工作模式字典集合
        //雾区编码
        wqbm: "",
        //控制器集合
        controllers: [],
        // kzqbmlist: [],
        controllerCode: [],
        //检测仪集合
        visibilities: [],
        //更新和添加的检测仪
        visibility: {
          jcybm: "",
          jcymc: "",
          txcs: "",
          gzms: [],
          bjfzxx: "",
          bjfzsx: "",
          kzqbm: "",
          controllers: [],
          kzqbmlist: []
        },
        //当前选中的检测仪
        selectedVisibility: {},
        //检测仪数据校验
        visibilityRules: {
          jcymc: this.filterRules('设备名称', true, 50, 1),
          kzqbm: this.filterRules('区域控制器', true)
        },
        //更新区域是否可用
        visibilityDisabled: true,
        //更新还是添加
        visibilityUpdating: false,
        visibilityInserting: false,
      }
    },
    mounted: function () {
      this.loadCodes();
    },

    methods: {
      //读取字典
      loadCodes() {
        //设备类型
        var data = {
          dmlb: Dictionary.CodeType.WorkPattern,
        }

        Code.getCodes(data).then(value => {
          this.gzmsCodes = value.datas;
        })
      },
      changeController(val) {
        // console.log(val)
        this.getControllers(val)
      },
      getControllers(kzqbm) {
        let value = this.controllers
        this.visibility.kzqbmlist = []
        this.controllerCode = []
        if (value && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].kzqbm !== kzqbm) {
              this.controllerCode.push(value[i])
              if (value[i].zfnjd) {
                this.visibility.kzqbmlist.push(value[i].kzqbm)
              }
            }
          }
        }
      },
      //读取雾区中的检测仪
      loadVisibilitiesInFogArea(wqbm) {

        this.wqbm = wqbm;

        var queryParameter = {
          wqbm: wqbm
        };
        Controller.getControllers(queryParameter).then(value => {
          this.controllers = value;
          this.visibility.kzqbmlist = []
          this.controllerCode = []
          if (value && value.length > 0) {
            for (let i = 0; i < value.length; i++) {

              if (value[i].kzqbm !== this.visibility.kzqbm) {
                this.controllerCode.push(value[i])
                if (value[i].zfnjd) {
                  this.visibility.kzqbmlist.push(value[i].kzqbm)
                }
              }
            }
          }
        });


        Visibility.getVisibilities(queryParameter).then(value => {

          this.visibilities = value;
          for (var i = 0; i < value.length; ++i) {
            if (this.visibilities[i].gzms == 0) {
              this.visibilities[i].gzms = "";
            }
          }
          if (value.length == 0) {
            this.changeVisibility(null);
          } else {
            var that = this;
            setTimeout(function () {
              that.$refs["visibilityTable"].setCurrentRow(value[0]);
            }, 0);
          }
        });
      },
      //复制检测仪
      copyVisibility(v1, v2) {
        if (v2 == null) {
          v1.jcybm = "";
          v1.jcymc = "";
          v1.txcs = "";
          v1.gzms = "";
          v1.bjfzxx = "";
          v1.bjfzsx = "";
          v1.kzqbm = "";
          v1.controllers = [];
        } else {
          v1.jcybm = v2.jcybm;
          v1.jcymc = v2.jcymc;
          v1.txcs = v2.txcs;
          v1.gzms = v2.gzms;
          v1.bjfzxx = v2.bjfzxx;
          v1.bjfzsx = v2.bjfzsx;
          v1.kzqbm = v2.kzqbm;
          v1.controllers = this.visibility.kzqbmlist ? this.visibility.kzqbmlist : [];
          //   console.log(v1)
        }
      },
      //修改当前选中检测仪
      changeVisibility(visibility) {
        if (visibility == null) {
          this.copyVisibility(this.visibility, null);
        } else {
          this.$refs['visibilityForm'].resetFields();
          this.visibilityInserting = false;
          this.copyVisibility(this.visibility, visibility);
        }
        this.visibilityDisabled = true;
        this.selectedVisibility = visibility;
      },
      //初始化新增检测仪
      initVisibility() {
        if (this.visibilities.length > 0) {
          this.$alert("雾区中已经存在检测仪！", '检测仪信息', {
            confirmButtonText: '确定'
          });
          return;
        }
        if (this.visibilityUpdating == true) {
          this.$confirm('是否取消编辑?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelBtnStyle',
            confirmButtonClass: 'confirmBtnStyle',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            this.copyVisibility(this.visibility, null);
            this.visibilityUpdating = false;
            this.visibilityDisabled = false;
            this.visibilityInserting = true;
          }).catch(() => {});
        } else {
          this.copyVisibility(this.visibility, null);
          this.visibilityUpdating = false;
          this.visibilityDisabled = false;
          this.visibilityInserting = true;
        }
        console.log(this.visibility)
      },
      //准备更新检测仪
      enableVisibility(index, row) {

        if (this.visibilityInserting == true) {
          this.$confirm('是否取消新增?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelBtnStyle',
            confirmButtonClass: 'confirmBtnStyle',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            this.copyVisibility(this.visibility, row);
            this.visibilityUpdating = true;
            this.visibilityDisabled = false;
            this.visibilityInserting = false;
          }).catch(() => {});
        } else if (this.visibilityUpdating == true) {
          this.visibilityDisabled = false;
        } else {
          this.copyVisibility(this.visibility, row);
          this.visibilityUpdating = true;
          this.visibilityDisabled = false;
          this.visibilityInserting = false;
        }

      },
      //取消编辑检测仪
      cancelVisibility() {
        this.$confirm('是否取消编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.$refs['visibilityForm'].resetFields();
          this.copyVisibility(this.visibility, this.selectedVisibility);
          this.visibilityDisabled = true;
        }).catch(() => {});
      },
      //保存检测仪
      saveVisibility() {
        this.$refs['visibilityForm'].validate((valid) => {
          if (valid) {
            let controllers = []
            for (let i = 0; i < this.controllers.length; i++) {
              if (this.visibility.kzqbmlist.indexOf(this.controllers[i].kzqbm) == -1) {
                controllers.push({
                  kzqbm: this.controllers[i].kzqbm,
                  zfnjd: false
                })
              } else {
                controllers.push({
                  kzqbm: this.controllers[i].kzqbm,
                  zfnjd: true
                })
              }

            }
            this.visibility.controllers = controllers

            if (this.visibilityUpdating == true) {
              Visibility.updateVisibility(this.visibility).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {

                  this.copyVisibility(this.selectedVisibility, this.visibility);
                  this.$alert('操作成功', '检测仪信息', {
                    confirmButtonText: '确定'
                  });
                  this.visibilityDisabled = true;
                } else {
                  this.$alert("操作失败，请联系管理员", '检测仪信息', {
                    confirmButtonText: '确定'
                  });
                }

              });
            } else {

              Visibility.insertVisibility(this.visibility).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {
                  var data = {
                    jcybm: value.key,
                    jcymc: this.visibility.jcymc,
                    txcs: this.visibility.txcs,
                    bjfzxx: this.visibility.bjfzxx,
                    bjfzsx: this.visibility.bjfzsx,
                    gzms: this.visibility.gzms,
                    kzqbm: this.visibility.kzqbm,
                    controllers: this.visibility.controllers,
                  };
                  this.visibilities.push(data);
                  var that = this;
                  setTimeout(function () {
                    that.$refs["visibilityTable"].setCurrentRow(that.visibilities[that.visibilities
                      .length - 1]);
                    const targetTop = that.$refs["visibilityTable"].$el.querySelectorAll(
                      '.el-table__body tr')[that.visibilities.length - 1].getBoundingClientRect().top
                    const containerTop = that.$refs["visibilityTable"].$el.querySelector(
                      '.el-table__body').getBoundingClientRect().top
                    const scrollParent = that.$refs["visibilityTable"].$el.querySelector(
                      '.el-table__body-wrapper')
                    scrollParent.scrollTop = targetTop - containerTop
                  }, 0);
                  this.visibilityDisabled = true;
                  this.$alert('操作成功', '检测仪信息', {
                    confirmButtonText: '确定'
                  });
                } else {
                  this.$alert("操作失败，请联系管理员", '检测仪信息', {
                    confirmButtonText: '确定'
                  });
                }
              });
            }

          }
        });
      },
      //删除检测仪
      deleteVisibility(index, row) {
        this.$confirm('是否删除能见度检测仪?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          var that = this;
          Visibility.deleteVisibility(row).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {
              that.visibilities.splice(index, 1);
              if (index < that.visibilities.length) {
                this.$refs['visibilityTable'].setCurrentRow(that.visibilities[index]);
              } else if (index - 1 >= 0 && index - 1 < that.visibilities.length) {
                this.$refs['visibilityTable'].setCurrentRow(that.visibilities[index - 1]);
              }
              this.$alert('操作成功', '检测仪信息', {
                confirmButtonText: '确定'
              });
            } else {
              this.$alert("操作失败，请联系管理员", '检测仪信息', {
                confirmButtonText: '确定'
              });
            }
          });
        }).catch(() => {});
      }
    }
  }

</script>
