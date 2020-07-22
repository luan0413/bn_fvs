<template>
  <div class="Code grid">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.UserJurisdiction') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.Code') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="searchBox">
        <el-form :model="searchCode" label-width="100px" size="mini">
          <ul class="searchList">
            <li>
              <el-form-item :label="$t('message.CodesCategory')">
                <el-select v-model="searchCode.dmlb" @change="loadCodes()" :placeholder="$t('message.PleaseSelect')">
                  <el-option :label="$t('message.All')" value=""></el-option>
                  <el-option v-for="item in dmlbData" :key="item.dmlb" :label="item.dmlbsm" :value="item.dmlb">
                  </el-option>
                </el-select>
              </el-form-item>
            </li>
          </ul>
        </el-form>
      </div>
      <div class="btnBox">
        <el-button type="primary" class="operateBtn" plain icon="el-icon-plus" @click="showCodeDialogs()">
          {{ $t('message.Insert') }}</el-button>
      </div>
      <div class="gridBox">
        <el-table :data="CodeData" border style="width: 100%">
          <el-table-column align="center" prop="dmlbsm" :label="$t('message.CodesCategory')" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" prop="dm" :label="$t('message.Codes')" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" prop="dmsm" :label="$t('message.CodesExplain')" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" width="120" :label="$t('message.Operation')">
            <template slot-scope="scope">
              <el-button size="mini" class="tableBtnImg" @click="showUpdateDialogs(scope.$index, scope.row)">
                <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
              </el-button>
              <el-button size="mini" class="tableBtnImg" @click="deleteCode(scope.$index, scope.row)">
                <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changeCode" :current-page="pageNum" :page-size="pageSize"
          layout="total, prev, pager, next, jumper" :total="totalCount"></el-pagination>
      </div>

    </section>
    <el-dialog :title="title" :visible.sync="showCodeDialog" :close-on-click-modal='false' width="300px">
      <span>
        <el-form :model="updateCodeForm" :rules="codeRules" ref="updateCodeForms" label-width="60px" size="mini">
          <el-form-item :label="$t('message.CodesCategory')" prop="dmlb">
            <el-select v-model="updateCodeForm.dmlb" :disabled="dmlbDis" :placeholder="$t('message.PleaseSelect')">
              <el-option v-for="item in dmlbData" :key="item.dmlb" :label="item.dmlbsm" :value="item.dmlb"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('message.Codes')" prop="dm">
            <el-input v-model="updateCodeForm.dm" :disabled="dmDis" :placeholder="$t('message.PleaseInput')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.CodesExplain')" prop="dmsm">
            <el-input v-model="updateCodeForm.dmsm" :placeholder="$t('message.PleaseInput')"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveCode()" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="showCodeDialog = false" size="mini" style='margin-right: 10px;'>{{ $t('message.Cancel') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Code from "./js/Code.js";
  import Dictionary from "./js/Dictionary.js";

  export default {
    data() {
      return {
        dmlbData: [], //下拉框

        //搜索框
        searchCode: {
          dmlb: '',
        },
        title: '',
        isUpdate: false, //判断当前是新增还是编辑
        dmlbDis: false, //代码类别是否可编辑
        dmDis: false, //代码是否可编辑
        //新增字典
        updateCodeForm: {
          dmlb: '',
          dm: '',
          dmsm: '',
        },
        codeRules: {
          dmlb: this.filterRules('代码类别', true),
          dm: this.filterRules('代码', true),
          dmsm: this.filterRules('代码说明', true)
        },
        //修改字典
        updateForm: {
          dmlb: '',
          dm: '',
          dmsm: '',
        },

        pageSize: 10, //每页显示数据条数
        totalCount: 0, //总条数
        pageNum: 1, //当前页
        showCodeDialog: false, //字典新增弹窗
        CodeData: [], //表格数据
        selectedCode: {} //当前点击的用户
      };
    },
    mounted: function () {
      this.loadCodes();
      this.loadCodeTypes();
    },
    methods: {
      //初始化数据
      loadCodes() {
        var data = {
          dmlb: this.searchCode.dmlb,
          pageSize: this.pageSize,
          pageNum: this.pageNum,
        };
        Code.getCodes(data).then(value => {
          this.CodeData = value.datas;
          this.totalCount = value.totalCount;
        });

      },
      //初始化代码类别
      loadCodeTypes() {
        Code.getCodeTypes(this.$cookies.get('token')).then(value => {
          this.dmlbData = value;
        })
      },
      //新增弹窗
      showCodeDialogs() {
        this.updateCodeForm = {};
        if (this.searchCode != "") {
          this.updateCodeForm.dmlb = this.searchCode.dmlb;
        }
        this.title = '新增';
        this.isUpdate = false;
        this.dmlbDis = false;
        this.dmDis = false;
        this.showCodeDialog = true;
        if (this.$refs['updateCodeForms'] != undefined) {
          this.$refs['updateCodeForms'].resetFields();
        }
      },
      //修改弹窗
      showUpdateDialogs(index, row) {
        this.title = '编辑';
        this.isUpdate = true;
        this.dmlbDis = true;
        this.dmDis = true;
        this.showCodeDialog = true;
        if (this.$refs['updateCodeForms'] != undefined) {
          this.$refs['updateCodeForms'].resetFields();
        }

        this.updateCodeForm = {
          dmlb: row.dmlb,
          dm: row.dm,
          dmsm: row.dmsm
        }
        this.selectedCode = row;
      },
      //保存
      saveCode() {
        if (this.isUpdate) {
          this.$refs['updateCodeForms'].validate((valid) => {
            if (valid) {
              Code.updateCode(this.updateCodeForm).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {

                  //更新成功后更新当前点击的用户
                  this.selectedCode.dmlb = this.updateCodeForm.dmlb;
                  this.selectedCode.dm = this.updateCodeForm.dm;
                  this.selectedCode.dmsm = this.updateCodeForm.dmsm;
                  this.loadCodes();
                  this.showCodeDialog = false;
                  this.$alert('操作成功', '字典信息', {
                    confirmButtonText: '确定',
                  });
                } else {
                  this.$alert("操作失败，请联系管理员", '字典信息', {
                    confirmButtonText: '确定'
                  });
                }
              })
            }
          })
        } else {
          var data = {
            dmlb: this.updateCodeForm.dmlb,
            dm: this.updateCodeForm.dm,
            dmsm: this.updateCodeForm.dmsm,
          }
          this.$refs['updateCodeForms'].validate((valid) => {
            if (valid) {
              Code.insertCode(data).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {
                  this.loadCodes();
                  this.showCodeDialog = false;
                  this.$alert('操作成功', '字典信息', {
                    confirmButtonText: '确定',
                  });
                } else {
                  this.$alert("操作失败，请联系管理员", '字典信息', {
                    confirmButtonText: '确定'
                  });
                }
              })
              this.showCodeDialog = false
            }
          })
        }
      },
      //删除
      deleteCode(index, row) {
        this.$confirm('是否删除字典?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {
          Code.deleteCode(row).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {
              //如果需要切换到上一页则切换
              if (this.CodeData.length == 1 && this.currentPage > 1) {
                this.pageNum -= 1;
              }
              //不需要切换重新读取当页数据
              else {
                this.loadCodes();
              }
              this.$alert('操作成功', '字典信息', {
                confirmButtonText: '确定'
              });
            } else {
              this.$alert("操作失败，请联系管理员", '字典信息', {
                confirmButtonText: '确定'
              });
            }
          })
        }, () => {

        });
      },
      //分页
      changeCode(val) {
        this.pageNum = val;
        this.loadCodes();
      }
    }
  }

</script>
