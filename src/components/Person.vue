<template>
  <div class="Person grid">
    <section class="section">

      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.UserJurisdiction') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.PersonManagement') }}</el-breadcrumb-item>

          </el-breadcrumb>
        </div>
      </div>
      <div class="searchBox">
        <el-form :inline="true" :model="searchPerson" label-width="80px" size="mini">
          <ul class="searchList">
            <li>
              <el-form-item :label="$t('message.Name')">
                <el-input  v-model="searchPerson.xm" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.Sex')">
                <el-select v-model="searchPerson.xb" :placeholder="$t('message.PleaseSelect')">
                  <el-option v-for="item in sexCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.DepartmentNum')">
                <el-cascader :options="departments"
                             :props="departmentProps"
                             change-on-select
                             :show-all-levels='false'
                             @change="selectSearchJgbm"
                             clearable
                             :placeholder="$t('message.PleaseSelect')"></el-cascader>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.PoliceNum')">
                <el-input v-model="searchPerson.jh" :placeholder="$t('message.PleaseInput')"></el-input>
              </el-form-item>
            </li>
            <li class="fr">
              <el-form-item>
                <el-button type="primary" plain icon="el-icon-refresh" size="mini" style="margin-left: 80px;" @click='resetSearch'>重置</el-button>
                <el-button type="primary" plain icon="el-icon-search" size="mini" @click="loadPersons">{{ $t('message.Search') }}</el-button>
              </el-form-item>
            </li>
          </ul>
        </el-form>
      </div>
      <!--操作按钮-->
      <div class="btnBox">
        <el-button type="primary" class="operateBtn" size="small" plain icon="el-icon-plus" @click="insertPerson">新增人员</el-button>
      </div>
      <div class="gridBox mt10">
        <el-table :data="persons" border style="width: 100%">
          <el-table-column prop="xm" :label="$t('message.Name')"  align="center" min-width="180"></el-table-column>
          <el-table-column prop="xbsm" :label="$t('message.Sex')" align="center" min-width="180"></el-table-column>
          <el-table-column prop="jgmc" :label="$t('message.DepartmentNum')" align="center" min-width="180"></el-table-column>
          <el-table-column prop="jh" :label="$t('message.PoliceNum')" align="center" min-width="180"></el-table-column>
          <el-table-column align="center" width="120" :label="$t('message.Operation')">
            <template slot-scope="scope">
              <el-button size="mini" class="tableBtnImg" @click="updatePerson(scope.$index, scope.row)">
                <img src="./img/edit.png" alt="$t('message.Update')" title="$t('message.Update')">
              </el-button>
              <el-button size="mini" class="tableBtnImg" @click="deletePerson(scope.$index, scope.row)">
                <img src="./img/delete.png" alt="$t('message.Delete')" title="$t('message.Delete')">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changePage" :current-page="pageNum"	:page-size="pageSize"
                       :total="totalCount"	layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </section>
    <!-- 新增人员弹窗 -->
    <div class="newUserdialog">
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal='false' width="600px">
        <el-form :inline="true" :model="person" :rules="personRules" ref="personForm" size="mini" label-width="70px">
          <el-row>
            <el-col :span="12">
              <div class="dialoginp">
                <el-form-item :label="$t('message.Name')" prop="xm">
                  <el-input v-model="person.xm" :placeholder="$t('message.PleaseInput')"></el-input>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.Sex')" prop="xb">
                  <el-select v-model="person.xb" :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in sexCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.DepartmentNum')" prop="jgbm">
                  <el-cascader :options="departments" :props="departmentProps" v-model="person.jgbms"
                               change-on-select :show-all-levels='false' @change="selectDialogJgbm"
                                clearable :placeholder="$t('message.PleaseSelect')"></el-cascader>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.PoliceNum')" prop="jh">
                    <el-input v-model="person.jh" :placeholder="$t('message.PleaseInput')"></el-input>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.IdCard')" prop="sfzh">
                    <el-input v-model="person.sfzh" :placeholder="$t('message.PleaseInput')"></el-input>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.DateOfBirth')" prop="csrq">
                  <el-date-picker v-model="person.csrq" type="date" :placeholder="$t('message.PleaseSelect')" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.PersonType')" prop="rylx">
                  <el-select v-model="person.rylx" clearable :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in personTypeCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <!-- <div class="personImg">
                <img src="./img/fogarea.png" :alt="$t('message.PersonPhoto')">
              </div>
              <div class="dialoginp" style="margin-top: 10px;">
                <el-form-item :label="$t('message.PersonPhoto')" class="updateImg">
                  <el-input type="file" :placeholder="$t('message.PleaseSelect')"></el-input>
                </el-form-item>
                <el-button size="mini" style="padding: 5px 24px;margin-top: 3px;">{{ $t('message.Upload') }}</el-button>
              </div> -->
              <div class="dialoginp">
                <el-form-item :label="$t('message.AdministrativePost')"  prop="xzjb">
                  <el-select v-model="person.xzjb" clearable :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in administrativeLevelCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.PoliceRank')" prop="jx">
                  <el-select v-model="person.jx" clearable :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in policeRankCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.OfficePhone')"  prop="bgdh">
                  <el-input v-model="person.bgdh" :placeholder="$t('message.PleaseInput')"></el-input>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.Phone')" prop="sj">
                  <el-input v-model="person.sj" :placeholder="$t('message.PleaseInput')"></el-input>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.EMail')" prop="dzyx">
                    <el-input v-model="person.dzyx" :placeholder="$t('message.PleaseInput')"></el-input>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.OrganizationType')" prop="bzlx">
                  <el-select v-model="person.bzlx" clearable :placeholder="$t('message.PleaseSelect')">
                    <el-option v-for="item in organizationTypeCodes" :key="item.dm" :label="item.dmsm" :value="item.dm"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="dialoginp">
                <el-form-item :label="$t('message.PresentOccupation')" prop="xrzw">
                    <el-input v-model="person.xrzw" :placeholder="$t('message.PleaseInput')"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="height: 40px;margin-right: 10px;">
            <el-button type="primary" @click="savePerson" size="mini">{{ $t('message.Save') }}</el-button>
            <el-button @click="dialogVisible = false" size="mini" style='margin-right: 10px;'>{{ $t('message.Cancel') }}</el-button>
        </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
  import Dictionary from "./js/Dictionary.js";
  import Code from "./js/Code.js";
  import Person from "./js/Person.js";
  import Department from "./js/Department.js";
  export default {
    data() {
      return {
        //人员集合
        persons: [],
        //搜索人员
        searchPerson: {
          xm: "",
          xb: "",
          jgbm: 0,
          jh: "",
          jgbms: []
        },
        //新增和编辑人员
        person: {},

        sexCodes: [],//性别字典
        personTypeCodes: [],//人员类型字典
        organizationTypeCodes: [],//编制类型字典
        administrativeLevelCodes: [],//行政级别字典
        policeRankCodes: [],//警衔字典

        //分页信息
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,

        //机构树数据
        departments: [],
        //字段映射
        departmentProps: {
          children: 'children',
          label: 'jgmc',
          value: 'jgbm'
        },
        dialogTitle: '',//弹出框标题
        //数据校检
        personRules: {
          xm: this.filterRules('姓名', true),
          jgbm: this.filterRules('所属机构', true),
        },
        //对话框是否显示
        dialogVisible: false,
        //当前编辑状态
        personInserting: false,
        psersonUpdating: false,
      }
    },
    mounted: function () {
      this.loadCodes();
      this.loadDepartments();
      this.loadPersons();
    },
    methods: {
      //读取字典
      loadCodes() {
        //性别
        Code.getCodes({
          dmlb: Dictionary.CodeType.PersonSex,
        }).then(value => {
          this.sexCodes = value.datas;
        });

        //人员类型
        Code.getCodes({
          dmlb: Dictionary.CodeType.PersonType,
        }).then(value => {
          this.personTypeCodes = value.datas;
        });

        //编制类型
        Code.getCodes({
          dmlb: Dictionary.CodeType.OrganizationType,
        }).then(value => {
          this.organizationTypeCodes = value.datas;
        });

        //行政级别
        Code.getCodes({
          dmlb: Dictionary.CodeType.PolAdministrationLevel,
        }).then(value => {
          this.administrativeLevelCodes = value.datas;
        });

        //读取警衔
        Code.getCodes({
          dmlb: Dictionary.CodeType.PoliceRank,
        }).then(value => {
          this.policeRankCodes = value.datas;
        });

      },
      //读取部门集合
      loadDepartments()
      {
        Department.getDepartmentTree().then(value => {
          if (value == null) {
            this.departments = [];
          }
          else {
            this.departments = [value];
          }
        });
      },
      //读取人员集合
      loadPersons() {

        var data = {
          parameter: this.searchPerson,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        Person.getPersons(data).then(value => {

          this.persons = value.datas;
          this.totalCount = value.totalCount;

        });
      },
      //选择搜索的机构编码
      selectSearchJgbm(value)
      {
        this.searchPerson.jgbm = value[value.length - 1];
      },
      //选择编辑的机构编码
      selectDialogJgbm(value) {
        this.person.jgbm = value[value.length - 1];
      },
      //重置搜索数据
      resetSearch()
      {
        this.searchPerson = {
          xm: "",
          xb: "",
          jgbm: Dictionary.DepartmentTag.All,
          jh: "",
          jgbms:[]
        };
        this.loadPersons();
      },
      //改变页码
      changePage(value) {
        this.pageNum = value;
        this.loadPersons();
      },
      insertPerson()
      {
        this.person = {
          xm: "",
          xb: "",
          jgbm: Dictionary.DepartmentTag.None,
          jgbms: [],
          jh: "",
          sfzh: "",
          csrq: "",
          rylx: "",
          xzjb: "",
          jx: "",
          bzlx: "",
          bgdh: "",
          xrzw: "",
          sj: "",
          dzyx:""
        };
        this.personInserting = true;
        this.dialogTitle = "新增人员";
        this.dialogVisible = true;
      },
      updatePerson(index,row)
      {
        this.person = {
          rybm: row.rybm,
          xm: row.xm,
          xb: row.xb==0?"":row.xb,
          jgbm: row.jgbm,
          jgbms:[],
          jh: row.jh,
          sfzh: row.sfzh,
          csrq: row.csrq,
          rylx: row.rylx==0?"":row.rylx,
          xzjb: row.xzjb == 0 ? "" : row.xzjb,
          jx: row.jx==0?"":row.jx,
          bzlx: row.bzlx==0?"":row.bzlx,
          bgdh: row.bgdh,
          xrzw: row.xrzw,
          sj: row.sj,
          dzyx: row.dzyx
        };

        for (var i = 0; i < this.departments.length; ++i) {

          if (this.setDepartmentPath(this.departments[i], this.person.jgbm) == true) {
            break;
          }
        }

        this.personUpdating = true;
        this.dialogTitle = "编辑人员";
        this.dialogVisible = true;
      },
      setDepartmentPath(department, jgbm) {

        this.person.jgbms.push(department.jgbm);
        if (department.jgbm == jgbm){
          return true;
        }
        else{
          if (department.children != null){
            for (var i = 0; i < department.children.length; ++i) {
              if (this.setDepartmentPath(department.children[i], jgbm) == true) {
                return true;
              }
            }
          }
          this.person.jgbms.pop();
          return false;
        }
      },
      savePerson()
      {
        if (this.personInserting == true){
          this.$refs['personForm'].validate((valid) => {
            if (valid) {

              Person.insertPerson(this.person).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {

                  var newPage = Math.ceil((this.totalCount + 1) / this.pageSize);
                  if (newPage == this.pageNum){
                    this.loadPersons();
                  }
                  else{
                    this.pageNum = newPage;
                  }


                  this.personInserting = false;
                  this.dialogVisible = false;
                  this.$alert('操作成功', '人员信息', {
                    confirmButtonText: '确定'
                  });
                }
                else {
                  this.$alert("操作失败，请联系管理员", '人员信息', {
                    confirmButtonText: '确定'
                  });
                }
              });
            }
          })
        }
        else if (this.personUpdating == true){
          this.$refs['personForm'].validate((valid) => {
            if (valid) {

              Person.updatePerson(this.person).then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {

                  this.loadPersons();
                  this.personUpdating = false;
                  this.dialogVisible = false;
                  this.$alert('操作成功', '人员信息', {
                    confirmButtonText: '确定'
                  });
                }
                else {
                  this.$alert("操作失败，请联系管理员", '人员信息', {
                    confirmButtonText: '确定'
                  });
                }
              });
            }
          })
        }
      },
      deletePerson(index, row){
        this.$confirm('是否删除当前用户？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmBtnStyle',
          cancelButtonClass: 'cancelBtnStyle',
          type: 'warning'
        }).then(() => {

          Person.deletePerson(row).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {

              if (this.persons.length == 1 && this.pageNum > 1) {
                this.pageNum -= 1;
              }
              else
              {
                this.loadPersons();
              }
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
        });
      },
    },
  }
</script>




