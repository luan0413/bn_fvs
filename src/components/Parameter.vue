<template>
  <div class="Parameter grid">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.UserJurisdiction') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.Parameter') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="gridBox mt20">
        <el-table	:data="ParameterData"	border>
          <el-table-column align="center" prop="csbm"	:label="$t('message.ParameterName')"	width="200"></el-table-column>
          <el-table-column align="center"	prop="csz"	:label="$t('message.ParameterValue')"	width="200"></el-table-column>
          <el-table-column align="center" prop="csms"	:label="$t('message.ParameterDescribe')" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" width="120" :label="$t('message.Operation')">
            <template slot-scope="scope">
              <el-button	size="mini"	class="tableBtnImg"	@click="showUpdateDialog(scope.$index, scope.row)">
                <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination	@current-change="changeLogs" :current-page="pageNum"	:page-size="pageSize"
          layout="total, prev, pager, next, jumper"	:total="totalCount">
        </el-pagination>
      </div>
      </section>
      <el-dialog :title="$t('message.Update')" :visible.sync="updataParameter" width="300px">
        <span>
          <el-form :model="updateForm" :rules="updaterules" ref="updateForms" label-width="60px" size="mini">
            <el-form-item :label="$t('message.ParameterName')" prop="csbm">
              <el-input v-model="updateForm.csbm" disabled=""></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.ParameterValue')" prop="csz">
              <el-input v-model="updateForm.csz"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.ParameterDescribe')" prop="csms">
              <el-input type="textarea" resize="none" v-model="updateForm.csms"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updataParameters()" size="mini">{{ $t('message.Save') }}</el-button>
          <el-button @click="updataParameter = false" size="mini" style='margin-right: 10px;'>{{ $t('message.Cancel') }}</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
  import Parameter from "./js/Parameter.js";
  import Dictionary from "./js/Dictionary.js";
  export default {
    data() {
      return {
        updataParameter: false,//弹窗
        //弹窗model
        updateForm: {
          csbm: '',
          csz: '',
          csms: '',
          // cslx:""
        },
        //弹窗校验规则
        updaterules: {
          csz: this.filterRules('参数值',true),
        },

        ParameterData: [],//表格数据
        pageSize: 10,//每页显示数据条数
        totalCount: 0,//总条数
				pageNum: 1,//当前页

        selectedParameter: {}//当前点击的用户
      };
    },
		mounted: function () {
      this.LoadParameter();
    },
    methods: {
      //初始化数据
      LoadParameter() {
        var data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        Parameter.getParameters(data).then(value => {
          this.ParameterData = value.datas;
          this.totalCount = value.totalCount;
        });
      },
      //显示编辑弹窗
      showUpdateDialog(index,row){
        this.updateForm = {
          csbm: row.csbm,
          csz: row.csz,
          csms: row.csms,
          // cslx: row.cslx
        };
        this.updataParameter = true;
        if (this.$refs['updateForms'] != undefined){
          this.$refs['updateForms'].resetFields();
        }
      },
      //编辑参数列表
      updataParameters(){
        this.$refs['updateForms'].validate((valid) => {
          if (valid) {
            // console.log(this.updateForm)
            Parameter.updateParameter(this.updateForm).then(value => {
              // console.log(value)
              if (value.czjg == Dictionary.DatabaseResult.Success) {

                //更新成功后更新当前点击的用户
                this.selectedParameter.csbm = this.updateForm.csbm;
                this.selectedParameter.csz = this.updateForm.csz;
                this.selectedParameter.csms = this.updateForm.csms;
                // this.selectedParameter.cslx = this.updateForm.cslx;

                this.LoadParameter();
                this.updataParameter = false;
                this.$alert('操作成功', '系统参数信息', {
                  confirmButtonText: '确定',
                });
              }
              else {
                this.$alert("操作失败，请联系管理员", '系统参数信息', {
                  confirmButtonText: '确定'
                });
              }

            })
          }
        })

      },
			//分页
			changeLogs(page){
        this.pageNum = page;
        this.LoadParameter();
      }
		}
  }
</script>
