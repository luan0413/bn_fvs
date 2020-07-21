<template>
  <div class="changeTxetBox LinkDevice">
    <div class="fogLeftBox">
      <div class="changeBoxleftTitle">
        <span>{{ $t('message.DeviceList') }}</span>
        <el-button class="fr mr20" plain icon="el-icon-plus" @click="initLinkDevice">{{ $t('message.Insert') }}</el-button>
      </div>
      <el-table :data="linkDevices" ref="linkDeviceTable" height="180" :show-header=false highlight-current-row @current-change="changeLinkDevice" style="width: 100%">
        <el-table-column prop="sbmc">
        </el-table-column>
        <el-table-column :label="$t('message.Operation')" width="120" header-align="left" align="left">
          <template slot-scope="scope">
            <el-button size="mini" class="tableBtnImg" @click="enableLinkDevice(scope.$index, scope.row)">
              <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
            </el-button>
            <el-button size="mini" class="tableBtnImg" @click="deleteLinkDevice(scope.$index, scope.row)">
              <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fogRightBox">
      <div class="changeBoxRightTitle">
        {{ $t('message.DeviceInf') }}
      </div>
      <div class="changeBoxRightContent searchBox">
        <el-form :model="linkDevice" :rules="linkDeviceRules" ref="linkDeviceForm" :disabled="linkDeviceDisabled" label-width="100px" size="mini">
          <ul class="searchList" style="min-height: 40px !important;">
            <li>
              <el-form-item :label="$t('message.DeviceName')" prop="sbmc">
                <el-input v-model="linkDevice.sbmc" :title="linkDevice.sbmc"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.DeviceType')" prop="sblx">
                <el-select v-model="linkDevice.sblx" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in sblxCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.Communication')" prop="txcs">
                <el-input v-model="linkDevice.txcs"></el-input>
              </el-form-item>
            </li>

          </ul>
          <ul class="searchList" style="min-height: 40px !important;">
            <li>
              <el-form-item :label="$t('message.Specification')" prop="ggxh">
                <el-input v-model="linkDevice.ggxh"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.DeviceManufacturers')" prop="sbcj">
                <el-select v-model="linkDevice.sbcj" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in sbcjCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.IPAddress')" prop="ipdz">
                <el-input v-model="linkDevice.ipdz"></el-input>
              </el-form-item>
            </li>
          </ul>
          <ul class="searchList" style="min-height: 40px !important;">
            <li>
              <el-form-item :label="$t('message.AccessPort')" prop="fwdk">
                <el-input v-model="linkDevice.fwdk"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.LoginNumber')" prop="dlzh">
                <el-input v-model="linkDevice.dlzh"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.ManagementPassword')" prop="glmm">
                <el-input v-model="linkDevice.glmm"></el-input>
              </el-form-item>
            </li>
          </ul>
        </el-form>
        <div class="fogRightBtn" style="margin-right: 30px;">
          <el-button plain icon="el-icon-document" :disabled="linkDeviceDisabled" type="primary" @click="saveLinkDevice">{{ $t('message.Save') }}</el-button>
          <el-button plain icon="el-icon-refresh" :disabled="linkDeviceDisabled" @click="cancelLinkDevice">{{ $t('message.Cancel') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import LinkDevice from "./js/LinkDevice.js";
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";

  export default {
    data() {
      return {
        sblxCodes: [],//设备类型
        sbcjCodes: [],//设备厂家
        //雾区编码
        wqbm: "",
        //设备集合
        linkDevices: [],
        //当前选中设备
        selectedLinkDevice: {},
        //添加和更新的设备
        linkDevice: {
          sbbm: "",
          sbmc: "",
          sblx: "",
          ggxh: "",
          sbcj: "",
          ipdz: "",
          fwdk: "",
          dlzh: "",
          glmm: "",
          txcs: "",
          wqbm: "",
        },
        //设备数据校验
        linkDeviceRules: {
          sbmc: this.filterRules('设备名称', true, 50, 1),
          sblx: this.filterRules('设备类型', true)
        },
        //更新区域是否可用
        linkDeviceDisabled: true,
        //更新还是添加
        linkDeviceUpdating: false,
        linkDeviceInserting: false,
      }
    },
    mounted: function(){
      this.loadCodes();
    },

    methods: {
      //读取字典
      loadCodes(){
        //设备类型
        var data = {
          dmlb: Dictionary.CodeType.DeviceType,
        }

        Code.getCodes(data).then(value => {
          let sblxArr = [];
          for(let i=0;i<value.datas.length;i++){
            if(value.datas[i].dm >=4){
              sblxArr.push(value.datas[i])
            }
          }
          this.sblxCodes = sblxArr;
        })
        //设备厂家
        var data = {
          dmlb: Dictionary.CodeType.DeviceManufacturers,
        }
        Code.getCodes(data).then(value => {
          this.sbcjCodes = value.datas;
        })
      },

      //读取雾区中的设备集合
      loadLinkDevicesInFogArea(wqbm) {

        this.wqbm = wqbm;
        var queryParameter =
          {
            wqbm: wqbm
          };
        LinkDevice.getLinkDevices(queryParameter).then(value => {
          this.linkDevices = value;
          for (var i= 0; i < this.linkDevices.length;++i)
          {
            if (this.linkDevices[i].sbcj == 0)
            {
              this.linkDevices[i].sbcj = "";
            }
        }
          if (value.length == 0) {
            this.changeLinkDevice(null);
          }
          else {
            var that = this;
            setTimeout(function () {
              that.$refs["linkDeviceTable"].setCurrentRow(value[0]);
            }, 0);
          }
        });
      },
      //复制设备数据
      copyLinkDevice(l1, l2) {

        if (l2 == null) {
          l1.sbbm = "";
          l1.sbmc = "";
          l1.sblx = "";
          l1.ggxh = "";
          l1.sbcj = "";
          l1.ipdz = "";
          l1.fwdk = "";
          l1.dlzh = "";
          l1.glmm = "";
          l1.txcs = "";
          l1.wqbm = this.wqbm;
        }
        else {
          l1.sbbm = l2.sbbm;
          l1.sbmc = l2.sbmc;
          l1.sblx = l2.sblx;
          l1.ggxh = l2.ggxh;
          l1.sbcj = l2.sbcj;
          l1.ipdz = l2.ipdz;
          l1.fwdk = l2.fwdk;
          l1.dlzh = l2.dlzh;
          l1.glmm = l2.glmm;
          l1.txcs = l2.txcs;
          l1.wqbm = this.wqbm;
        }
      },
      //修改当前选中设备
      changeLinkDevice(linkDevice) {
        if (linkDevice == null) {
          this.copyLinkDevice(this.linkDevice, null);
        }
        else {
          this.$refs['linkDeviceForm'].resetFields();
          this.linkDeviceInserting = false;
          this.copyLinkDevice(this.linkDevice, linkDevice);
        }
        this.selectedLinkDevice = linkDevice;
        this.linkDeviceDisabled = true;
      },
      //初始化添加设备
      initLinkDevice() {
        if (this.linkDeviceUpdating == true) {
          this.$confirm('是否取消编辑?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelBtnStyle',
            confirmButtonClass: 'confirmBtnStyle',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            this.copyLinkDevice(this.linkDevice, null);
            this.linkDeviceUpdating = false;
            this.linkDeviceDisabled = false;
            this.linkDeviceInserting = true;
          }).catch(() => { });
        }else if (this.linkDeviceInserting == true) {
          return;
        }
        else {
          this.copyLinkDevice(this.linkDevice, null);
          this.linkDeviceUpdating = false;
          this.linkDeviceDisabled = false;
          this.linkDeviceInserting = true;
        }
      },
      //准备更新设备
      enableLinkDevice(index, row) {
        if (this.linkDeviceInserting == true) {
          this.$confirm('是否取消新增?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            cancelButtonClass: 'cancelBtnStyle',
            confirmButtonClass: 'confirmBtnStyle',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            this.copyLinkDevice(this.linkDevice, row);
            this.linkDeviceUpdating = true;
            this.linkDeviceDisabled = false;
            this.linkDeviceInserting = false;
          }).catch(() => { });
        }
        else if (this.linkDeviceUpdating == true) {
          this.linkDeviceDisabled = false;
        }
        else {
          this.copyLinkDevice(this.linkDevice, row);
          this.linkDeviceUpdating = true;
          this.linkDeviceDisabled = false;
          this.linkDeviceInserting = false;
        }
      },
      //取消编辑设备
      cancelLinkDevice() {
        this.$confirm('是否取消编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          this.$refs['linkDeviceForm'].resetFields();
          this.copyLinkDevice(this.linkDevice, this.selectedLinkDevice);
          this.linkDeviceInserting = false;
          this.linkDeviceUpdating = false;
          this.linkDeviceDisabled = true;
        }).catch(() => { });
      },
      //保存设备
      saveLinkDevice() {
        this.$refs['linkDeviceForm'].validate((valid) => {
          if (valid) {

            if (this.linkDeviceUpdating == true) {
              LinkDevice.updateLinkDevice(this.linkDevice).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {

                  this.copyLinkDevice(this.selectedLinkDevice, this.linkDevice);
                  this.linkDeviceDisabled = true;
                  this.linkDeviceInserting = false;
                  this.linkDeviceUpdating = false;
                  this.$alert('操作成功', '联动设备信息', {
                    confirmButtonText: '确定'
                  });
                }
                else {
                  this.$alert("操作失败，请联系管理员", '联动设备信息', {
                    confirmButtonText: '确定'
                  });
                }
              });
            }
            else {

              LinkDevice.insertLinkDevice(this.linkDevice).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {

                  var data = {
                    sbbm: value.key,
                    sbmc: this.linkDevice.sbmc,
                    sblx: this.linkDevice.sblx,
                    ggxh: this.linkDevice.ggxh,
                    sbcj: this.linkDevice.sbcj,
                    ipdz: this.linkDevice.ipdz,
                    fwdk: this.linkDevice.fwdk,
                    dlzh: this.linkDevice.dlzh,
                    glmm: this.linkDevice.glmm,
                    txcs: this.linkDevice.txcs
                  };
                  this.linkDevices.push(data);
                  this.linkDeviceDisabled = true;
                  this.linkDeviceInserting = false;
                  this.linkDeviceUpdating = false;
                  var that = this;
                  setTimeout(function () {
                    that.$refs["linkDeviceTable"].setCurrentRow(that.linkDevices[that.linkDevices.length - 1]);
                    const targetTop = that.$refs["linkDeviceTable"].$el.querySelectorAll('.el-table__body tr')[that.linkDevices.length - 1].getBoundingClientRect().top
                    const containerTop = that.$refs["linkDeviceTable"].$el.querySelector('.el-table__body').getBoundingClientRect().top
                    const scrollParent = that.$refs["linkDeviceTable"].$el.querySelector('.el-table__body-wrapper')
                    scrollParent.scrollTop = targetTop - containerTop
                  }, 0);
                  this.$alert('操作成功', '联动设备信息', {
                    confirmButtonText: '确定'
                  });
                }
                else {
                  this.$alert("操作失败，请联系管理员", '联动设备信息', {
                    confirmButtonText: '确定'
                  });
                }
              });
            }
          }
        });
      },
      //删除设备
      deleteLinkDevice(index, row) {
        this.$confirm('是否删除关联设备?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          var that = this;
          LinkDevice.deleteLinkDevice(row).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {
              that.linkDevices.splice(index, 1);
              if (index < that.linkDevices.length) {
                this.$refs['linkDeviceTable'].setCurrentRow(that.linkDevices[index]);
              }
              else if (index - 1 >= 0 && index - 1 < that.linkDevices.length) {
                this.$refs['linkDeviceTable'].setCurrentRow(that.linkDevices[index - 1]);
              }
              this.$alert('操作成功', '联动设备信息', {
                confirmButtonText: '确定'
              });
            }
            else {
              this.$alert("操作失败，请联系管理员", '联动设备信息', {
                confirmButtonText: '确定'
              });
            }
          }).catch(() => { });
        }, () => {

        });
      }
    }
  }

</script>
