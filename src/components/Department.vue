<template>
  <div class="Department section">
    <div class="navBox">
      <div class="breadcrumbBox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('message.UserJurisdiction') }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('message.DepartmentList') }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div style="padding: 0 20px;">
      <!-- 左侧内容 -->
      <div class="leftBox">
        <div class="lefttitle"><span>{{ $t('message.OrganizationList') }}</span></div>
        <div style="padding: 10px;">
          <el-input v-model="searchJgmc" :placeholder="$t('message.PleaseInput')" size="small"></el-input>
        </div>
        <div class="leftbtn">
          <el-button type="primary" size="mini" @click="searchDepartment">{{ $t('message.Search') }}</el-button>
          <el-button type="primary" size="mini" @click="insertDepartment">{{ $t('message.Insert') }}</el-button>
          <el-button type="primary" size="mini" @click="updateDepartment">{{ $t('message.Update') }}</el-button>
          <el-button type="primary" size="mini" @click="deleteDepartment">{{ $t('message.Delete') }}</el-button>
        </div>
        <div class="lefttree">
          <el-tree ref="departmentTree"
                   :data="departments"
                   :props="departmentProps"
                   @node-click="selectDepartment"
                   v-model="selectedDepartment"
                   node-key="jgbm"
                   :default-expanded-keys="expandedKeys"
                   :expand-on-click-node='false'
                   :filter-node-method="filterDepartment"></el-tree>
        </div>
      </div>
      <!-- 右侧表格 -->
      <div class="rightBox" ref="rightBox">
        <div class="righttitle"><span>{{ $t('message.DetailsInf') }}</span></div>
        <table class="tableone" :data="selectedDepartment">
          <tr>
            <td style="width:20%">{{ $t('message.DepartmentName') }}</td>
            <td style="width:30%">{{selectedDepartment.jgmc}}</td>
            <td style="width:20%">{{ $t('message.DepartmentType') }}</td>
            <td style="width:30%">{{selectedDepartment.jglxsm}}</td>
          </tr>
          <tr>
            <td>{{ $t('message.AdministrationGread') }}</td>
            <td>{{selectedDepartment.xzjbsm}}</td>
            <td>{{ $t('message.HigherUnit') }}</td>
            <td>{{selectedDepartment.sjdwsm}}</td>
          </tr>
          <tr>
            <td>{{ $t('message.BusinessDescribe') }}</td>
            <td>{{selectedDepartment.ywms}}</td>
            <td>{{ $t('message.DepartmentFunction') }}</td>
            <td>{{selectedDepartment.jgzn}}</td>
          </tr>
          <tr>
            <td>{{ $t('message.OrganizationNum') }}</td>
            <td>{{selectedDepartment.bzrs}}</td>
            <td>{{ $t('message.Principal') }}</td>
            <td>{{selectedDepartment.fzr}}</td>
          </tr>
          <tr>
            <td>{{ $t('message.PrincipalPhone') }}</td>
            <td>{{selectedDepartment.fzrsj}}</td>
            <td>{{ $t('message.PrincipalCall') }}</td>
            <td>{{selectedDepartment.fzrdh}}</td>
          </tr>
          <tr>
            <td>{{ $t('message.beOnDutyCall') }}</td>
            <td>{{selectedDepartment.zbdh}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal='false' width="44%">
      <el-form :inline="true" :model="department" :rules="departmentRules" ref="departmentForm" label-width="80px" label-position="right" size="mini">
        <el-row>
          <el-col :span="12">
            <div class="dialoginp">
              <el-form-item :label="$t('message.DepartmentName')" prop="jgmc">
                <el-input v-model="department.jgmc" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </div>
            <div class="dialoginp">
              <el-form-item :label="$t('message.HigherUnit')" prop="sjdw">
                <el-cascader :options="departments"
                             :props="departmentProps"
                             v-model="department.sjdws"
                             change-on-select
                             :show-all-levels='false'
                             @change="selectSjdw"
                             clearable
                             :placeholder="$t('message.PleaseSelect')"></el-cascader>
              </el-form-item>
            </div>
            <div class="dialoginp">
              <el-form-item :label="$t('message.BusinessDescribe')">
                <el-input v-model="department.ywms" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </div>
            <div class="dialoginp">
              <el-form-item :label="$t('message.Principal')">
                <el-input v-model="department.fzr" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </div>
            <div class="dialoginp">
              <el-form-item :label="$t('message.PrincipalPhone')">
                <el-input v-model="department.fzrsj" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </div>
            <div class="dialoginp">
              <el-form-item :label="$t('message.beOnDutyCall')">
                <el-input v-model="department.zbdh" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="dialoginp">
              <el-form-item :label="$t('message.DepartmentType')" prop="jglx">
                <el-select v-model="department.jglx" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in jglxCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="dialoginp">
              <el-form-item :label="$t('message.AdministrationGread')" prop="xzjb">
                <el-select v-model="department.xzjb" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in xzjbCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="dialoginp">
              <el-form-item :label="$t('message.DepartmentFunction')">
                <el-input v-model="department.jgzn" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </div>
            <div class="dialoginp">
              <el-form-item :label="$t('message.OrganizationNum')">
                <el-input v-model.number="department.bzrs" type="number" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </div>
            <div class="dialoginp">
              <el-form-item :label="$t('message.PrincipalCall')">
                <el-input v-model="department.fzrdh" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-right:20px;">
        <el-button type="primary" @click="saveDepartment" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="dialogVisible = false" size="mini" style="margin-right: 10px;">{{ $t('message.Cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";
  import Department from "./js/Department.js";
  export default {
    data() {
      return {

        //机构树数据
        departments: [],
        //字段映射
        departmentProps: {
          children: 'children',
          label: 'jgmc',
          value: 'jgbm'
        },
        //弹框数据
        department: {
          jgbm: '',
          jgmc: '',
          jglx: '',
          xzjb: '',
          sjdws: [],
          sjdw: 0,
          jgzn: '',
          ywms: '',
          bzrs: '',
          fzr: '',
          fzrdh: '',
          fzrsj: '',
          zbdh: '',
        },
        //当前树选中机构
        selectedDepartment: {
          jgbm:0
        },
        //是否显示弹窗
        dialogVisible: false,
        //是否正在添加
        departmentInserting: false,
        //是否正在更新
        departmentUpdating: false,
        //机构类型字典
        jglxCodes: [],
        //行政类别字典
        xzjbCodes: [],
        //搜索框数据
        searchJgmc: '',
        //弹出框标题
        dialogTitle: '',
        //校验
        departmentRules: {
          jgmc: this.filterRules('机构名称', true),
          sjdw: this.filterRules('上级单位', true),
        },
        //默认展开节点
        expandedKeys:[]

      };
    },
    mounted: function () {
      this.loadDepartments();
      this.loadCodes();
      this.$refs.rightBox.style.height = window.innerHeight - 90 + "px";
    },
    methods: {

      //读取机构类型字典
      loadCodes() {
        var data = {
          dmlb: Dictionary.CodeType.InstitutionalType,
        }
        Code.getCodes(data).then(value => {
          this.jglxCodes = value.datas;
        })

        data = {
          dmlb: Dictionary.CodeType.PolAdministrationLevel,
        }
        Code.getCodes(data).then(value => {
          this.xzjbCodes = value.datas;
        })
      },
      //读取部门数据
      loadDepartments() {

        Department.getDepartmentTree().then(value => {
          if (value == null){
            this.departments = [];
            this.selectDepartment = {
              jgbm: Dictionary.DepartmentTag.None
            };
          }
          else{
            this.departments = [value];
            this.selectedDepartment = value;
            this.expandedKeys = [value.jgbm];
          }
        });


      },
      // 新增按钮
      insertDepartment() {
        if (this.$refs['departmentForm'] != undefined){
          this.$refs['departmentForm'].resetFields();
        }
        this.department = {
          jgmc: "",
          jglx: "",
          sjdw: this.selectedDepartment.jgbm,
          sjdws:[],
          xzjb: "",
          jgzn: "",
          ywms: "",
          bzrs: "",
          fzr: "",
          fzrdh: "",
          fzrsj: "",
          zbdh: ""
        };

        for (var i = 0; i < this.departments.length; ++i) {

          if (this.setDepartmentPath(this.departments[i], this.department.sjdw) == true) {
            break;
          }
        }
        this.dialogTitle = "新增";
        this.departmentInserting = true;
        this.dialogVisible = true;
      },
      //编辑按钮
      updateDepartment() {

        if (this.$refs['departmentForm'] != undefined){
          this.$refs['departmentForm'].resetFields();
        }

        if (this.selectedDepartment.jgbm == Dictionary.DepartmentTag.None) {
          this.$alert('请先选择一个机构', '机构信息', {
            confirmButtonText: '确定'
          });
          return;
        }

        if (this.selectedDepartment.jgbm == Dictionary.DepartmentTag.All)
        {
          this.$alert('全部机构节点不能编辑', '机构信息', {
            confirmButtonText: '确定'
          });
          return;
        }

        this.department = {
          jgbm: this.selectedDepartment.jgbm,
          jgmc: this.selectedDepartment.jgmc,
          jglx: this.selectedDepartment.jglx == 0 ? "" : this.selectedDepartment.jglx,
          sjdws: [],
          sjdw: this.selectedDepartment.sjdw,
          xzjb: this.selectedDepartment.xzjb == 0 ? "" : this.selectedDepartment.xzjb,
          jgzn: this.selectedDepartment.jgzn,
          ywms: this.selectedDepartment.ywms,
          bzrs: this.selectedDepartment.bzrs == 0 ? "" : this.selectedDepartment.bzrs,
          fzr: this.selectedDepartment.fzr,
          fzrdh: this.selectedDepartment.fzrdh,
          fzrsj: this.selectedDepartment.fzrsj,
          zbdh: this.selectedDepartment.zbdh
        }


        for (var i = 0; i < this.departments.length; ++i) {

          if (this.setDepartmentPath(this.departments[i], this.department.sjdw) == true) {
            break;
          }
        }

        this.dialogTitle = "编辑";
        this.departmentUpdating = true;
        this.dialogVisible = true;
      },
      setDepartmentPath(department, sjdw) {
        this.department.sjdws.push(department.jgbm);
        if (department.jgbm == sjdw) {
          return true;
        }
        else {
          if (department.children != null) {
            for (var i = 0; i < department.children.length; ++i) {
              if (this.setDepartmentPath(department.children[i], sjdw) == true) {
                return true;
              }
            }
          }
          this.department.sjdws.pop();
          return false;
        }
      },
      //保存机构
      saveDepartment() {
        if (this.departmentInserting == true) {
          this.$refs['departmentForm'].validate((valid) => {
            if (valid) {

              Department.insertDepartment(this.department).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {

                  this.loadDepartments();
                  this.departmentInserting = false;
                  this.dialogVisible = false;

                  this.$alert('操作成功', '机构信息', {
                    confirmButtonText: '确定'
                  });
                }
                else {
                  this.$alert("操作失败，请联系管理员", '机构信息', {
                    confirmButtonText: '确定'
                  });
                }
              });
            }
          })

        }
        else if (this.departmentUpdating == true){
          if (this.department.jgbm == this.department.sjdw){
            this.$alert('不能选择自己作为上级单位', '机构信息', {
              confirmButtonText: '确定'
            });
            return;
          }
          this.$refs['departmentForm'].validate((valid) => {
            if (valid) {
              Department.updateDepartment(this.department).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {

                  this.loadDepartments();
                  this.departmentUpdating = false;
                  this.dialogVisible = false;

                  this.$alert('操作成功', '机构信息', {
                    confirmButtonText: '确定'
                  });
                }
                else {
                  this.$alert("操作失败，请联系管理员", '机构信息', {
                    confirmButtonText: '确定'
                  });
                }
              });

            }
          })
        }
      },
      //删除部门
      deleteDepartment()
      {
        console.log(this.selectedDepartment.jgbm);
        console.log(this.selectedDepartment.jgbm==Dictionary.DepartmentTag.All);

        if (this.selectedDepartment.jgbm == Dictionary.DepartmentTag.None) {
          this.$alert('请先选择一个机构', '机构信息', {
            confirmButtonText: '确定'
          });
          return;
        }

        if (this.selectedDepartment.jgbm==Dictionary.DepartmentTag.All) {
          this.$alert('全部机构节点不能删除', '机构信息', {
            confirmButtonText: '确定'
          });
          return;
        }

        this.$confirm('是否删除机构及所有子机构？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {

          Department.deleteDepartment(this.selectedDepartment).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {

              this.loadDepartments();
              this.selectedDepartment = '';
              this.$alert('操作成功', '机构信息', {
                confirmButtonText: '确定'
              });
            }
            else {
              this.$alert("操作失败，请联系管理员", '机构信息', {
                confirmButtonText: '确定'
              });
            }
          });
        }).catch(() => { });
      },
      //选择上级单位
      selectSjdw(value) {
        this.department.sjdw = value[value.length - 1];
      },
      //树中选择部门
      selectDepartment(data){
        this.selectedDepartment = data;
      },
      //点击查询按钮
      searchDepartment()
      {
        this.$refs.departmentTree.filter(this.searchJgmc);
      },
      //筛选部门
      filterDepartment(value, data) {
        return data.jgmc.indexOf(value) !== -1;
      },

    }
  }
</script>

