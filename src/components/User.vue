<template>
  <div class="User grid">
    <section class="section">
      <div class="navBox">
        <!--面包屑导航-->
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.UserJurisdiction') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.User') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <!--搜索框-->
      <div class="searchBox">
        <el-form label-width="100px" size="mini">
          <ul class="searchList">
            <li>
              <el-form-item :label="$t('message.UserName')">
                <el-input v-model="yhmc"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item>
                <el-button type="primary" plain icon="el-icon-refresh" size="mini" @click="clear()">{{ $t('message.Reset') }}</el-button>
                <el-button type="primary" plain icon="el-icon-search" @click="searchUsers">{{ $t('message.Search') }}</el-button>
              </el-form-item>
            </li>
          </ul>
        </el-form>
      </div>
      <!--操作按钮-->
      <div class="btnBox">
        <el-button type="primary" class="operateBtn" plain icon="el-icon-plus" @click="showNewUserDialog()">{{ $t('message.Insert') }}</el-button>
      </div>
      <!--table-->
      <div class="gridBox">
        <el-table :data="userData" border @selection-change="changeSelectedUsers">
          <el-table-column align="center" prop="yhmc" :label="$t('message.UserName')" show-overflow-tooltip width="200"></el-table-column>
          <el-table-column align="center" prop="xm" :label="$t('message.PersonName')" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="jgmc" label="机构名称" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" header-align="center" prop="rolessm" label="所属角色" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" width="200" :label="$t('message.Operation')">
            <template slot-scope="scope">
              <el-button size="mini" class="tableBtnImg" @click="showUpdateUserDialog(scope.$index, scope.row)">
                <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
              </el-button>
              <el-button size="mini" class="tableBtnImg" @click="showUpdateUserPassword(scope.$index, scope.row)">
                <img src="./img/password.png" :alt="$t('message.UpdatePassword')" :title="$t('message.UpdatePassword')">
              </el-button>
              <el-button size="mini" class="tableBtnImg" @click="deleteUser(scope.$index, scope.row)">
                <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination @current-change="changePage" :current-page="pageNum" :page-size="pageSize" :total="totalCount" layout="total,prev, pager, next, jumper">
        </el-pagination>
      </div>
    </section>
    <!--新增用户弹窗-->
    <el-dialog :title="$t('message.Insert')" :visible.sync="newUserDialog" :close-on-click-modal='false' width="300px">
      <span>
        <el-form :model="newUser" :rules="userRules" ref="newUserForm" label-width="60px" size="mini">
          <el-form-item :label="$t('message.UserName')" prop="yhmc">
            <el-input v-model="newUser.yhmc"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.Password')" prop="dlmm">
            <el-input v-model="newUser.dlmm" type="password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.Password')" prop="dlmmyz">
            <el-input v-model="newUser.dlmmyz" type="password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.PersonName')" prop="rybm">
            <el-select v-model="newUser.rybm"
                       @change="changePerson"
                       placeholder="请选择人员姓名">
              <el-option v-for="item in persons" :key="item.rybm" :label="item.xm" :value="item.rybm"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('message.DepartmentNum')" prop="jgbm">
            <el-cascader :options="departments" :props="departmentProps" v-model="newUser.jgbms"
                          change-on-select :show-all-levels='false' @change="selectDialogJgbm"
                          clearable :placeholder="$t('message.PleaseSelect')"></el-cascader>
          </el-form-item>
          <el-form-item :label="$t('message.RelationshipRole')" prop="roleIds">
            <el-select v-model="newUser.roleIds" multiple placeholder="请选择角色">
              <el-option v-for="item in roles" :key="item.jsbm" :label="item.jsmc" :value="item.jsbm"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="insertUser" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="newUserDialog = false" size="mini">{{ $t('message.Cancel') }}</el-button>
      </span>
    </el-dialog>
    <!--修改用户弹窗-->
    <el-dialog :title="$t('message.Update')" :visible.sync="updateUserDialog" :close-on-click-modal='false' width="300px">
      <span>
        <el-form :model="editUser" :rules="userRules" ref="updateUserForm" label-width="60px" size="mini">
          <el-form-item :label="$t('message.UserName')" prop="yhmc">
            <el-input v-model="editUser.yhmc" disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.PersonName')" prop="rybm">
            <el-select v-model="editUser.rybm"
                       placeholder="请选择人员姓名"
                       @change="changePerson">
              <el-option v-for="item in persons" :key="item.rybm" :label="item.xm" :value="item.rybm"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="机构名称" prop="jgmc">
            <el-input v-model="editUser.jgmc" disabled></el-input>
          </el-form-item> -->
          <el-form-item :label="$t('message.DepartmentNum')" prop="jgbm">
            <el-cascader :options="departments" :props="departmentProps" v-model="editUser.jgbms"
                          change-on-select :show-all-levels='false' @change="selectDialogJgbm"
                          clearable :placeholder="$t('message.PleaseSelect')"></el-cascader>
          </el-form-item>
          <el-form-item :label="$t('message.RelationshipRole')" prop="roleIds">
            <el-select v-model="editUser.roleIds" multiple placeholder="请选择">
              <el-option v-for="item in roles" :key="item.jsbm" :label="item.jsmc" :value="item.jsbm"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateUser" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="updateUserDialog = false" size="mini" style='margin-right: 10px;'>{{ $t('message.Cancel') }}</el-button>
      </span>
    </el-dialog>
    <!--修改密码弹窗-->
    <el-dialog :title="$t('message.UpdatePassword')" :visible.sync="updateUserPassword" :close-on-click-modal='false' width="300px">
      <span>
        <el-form :model="editUser" :rules="userRules" ref="userPasswordForm" label-width="60px" size="mini">
          <el-form-item :label="$t('message.Password')" prop="dlmm">
            <el-input v-model="editUser.dlmm" type="password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.ConfirmPassword')" prop="dlmmyz">
            <el-input v-model="editUser.dlmmyz" type="password"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePassword" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="updateUserPassword = false" size="mini" style='margin-right: 10px;'>{{ $t('message.Cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import User from "./js/User.js";
  import Role from "./js/Role.js";
  import Dictionary from "./js/Dictionary.js";
  import Person from "./js/Person.js";
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
        //搜索框数据
        yhmc: "",
        //下拉框人员名称
        persons: [],
        //角色集合
        roles: [],
        //table数据
        userData: [],
        //分页数据
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        //密码
        UserPassword: {
          password: "",
          confirmpassword: ""
        },
        //新增和更新数据
        newUser: {
          yhmc: "",
          dlmm: "",
          rybm: "",
          roles: [],
          roleIds: [],
          jgbms: [],
          jgbm: '',
        },
        //新增和更新数据
        editUser: {
          yhmc: "",
          rybm: "",
          roles: [],
          roleIds: [],
          jgbms: [],
          jgbm: '',
        },
        //数据校验
        userRules: {
          yhmc: this.filterRules('用户名', true),
          dlmm: this.filterRules('密码', true, 16, 1),
          dlmmyz: this.filterRules('密码校验', true, 16, 1),
          // rybm: this.filterRules('人员信息', false),
          roleIds: this.filterRules('角色', false),
        },
        //是否显示弹出框
        newUserDialog: false,
        updateUserDialog: false,
        updateUserPassword: false,
        //当前选中的用户
        selectedUsers: [],
        //当前点击的用户
        selectedUser: {}
      };
    },
    mounted: function () {
      this.loadUsers();
      this.loadPersons();
      this.loadRoles();
      this.loadDepartments();
    },
    methods: {
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
      //选择编辑的机构编码
      selectDialogJgbm(value) {
        if(this.newUserDialog){
          this.newUser.jgbm = value[value.length - 1];
        }else{
          this.editUser.jgbm = value[value.length - 1];
        }
      },
      loadUsers() {
        //初始化查询数据
        var data = {
          yhmc: this.yhmc,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        //查询数据
        User.getUsers(data).then(value => {
          this.userData = value.datas;
          this.totalCount = value.totalCount;
        });
      },
      //初始化人员名称
      loadPersons() {
        var data = {}
        Person.getPersons(data).then(value => {
          this.persons = value.datas;
        })
      },
      //初始化角色
      loadRoles() {
        var data = {};
        Role.getRoles(data).then(value => {
          this.roles = value.datas;
        });
      },
      //查询用户
      searchUsers() {
        // this.pageNum = 1;
        this.loadUsers();
      },
      //重置
      clear(){
        this.yhmc = '';
        this.loadUsers();
      },
      //显示新增用户弹出框
      showNewUserDialog() {
        this.newUser = {
          yhmc: "",
          dlmm: "",
          dlmmyz: "",
          rybm: "",
          roles: [],
          roleIds: [],
          jgbm: Dictionary.DepartmentTag.None,
          jgbms: [],
        };
        this.newUserDialog = true;
        if (this.$refs['newUserForm'] != undefined){
          this.$refs['newUserForm'].resetFields();
        }
      },
      //显示更新用户弹出框
      showUpdateUserDialog(index, row) {
        if (row.yhmc == "admin") {
          this.$alert('管理员用户不能编辑', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          }).catch(() => { });
          return;
        };
        this.editUser = {
          yhmc: row.yhmc,
          rybm: row.rybm == (0||-1) ? "" : row.rybm,
          // jgmc: row.jgmc,
          roleIds: [],
          roles: [],
          jgbm: row.jgbm,
          jgbms:[],
        }
        for (var i = 0; i < this.departments.length; ++i) {

          if (this.setDepartmentPath(this.departments[i], this.editUser.jgbm) == true) {
            break;
          }
        }
        for (var i = 0; i < row.roles.length; ++i) {
          this.editUser.roleIds.push(row.roles[i].jsbm);
        }
        this.selectedUser = row;
        this.updateUserDialog = true;
        if (this.$refs['updateUserForm'] != undefined){
          this.$refs['updateUserForm'].resetFields();
        }
      },
      setDepartmentPath(department, jgbm) {
        this.editUser.jgbms.push(department.jgbm);
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
          this.editUser.jgbms.pop();
          return false;
        }
      },
      //显示更改密码弹窗
      showUpdateUserPassword(index, row) {
        this.editUser = {
          yhmc: row.yhmc,
        }
        this.selectedUser = row;
        this.updateUserPassword = true;
        if (this.$refs['userPasswordForm'] != undefined){
          this.$refs['userPasswordForm'].resetFields();
        }
      },
      //新增用户
      insertUser() {
        this.$refs['newUserForm'].validate((valid) => {
          if (valid) {
            if (this.newUser.dlmm != this.newUser.dlmmyz) {
              this.$alert('密码输入不一致', '用户信息', {
                confirmButtonText: '确定'
              });
              return;
            }
            for (var i = 0; i < this.newUser.roleIds.length; ++i) {
              this.newUser.roles.push({
                jsbm: this.newUser.roleIds[i]
              });
            }
            this.newUser.rybm = this.newUser.rybm == "" ? -1 :  this.newUser.rybm
            User.insertUser(this.newUser).then(value => {
              if (value.czjg == Dictionary.DatabaseResult.Success) {
                this.loadUsers();
                this.newUserDialog = false;
                this.$alert('操作成功', '用户信息', {
                  confirmButtonText: '确定',
                });
              }
              else {
                this.$alert("操作失败，请联系管理员", '用户信息', {
                  confirmButtonText: '确定'
                });
              }
            })
          }
        });
      },
      //更新用户
      updateUser() {
        this.$refs['updateUserForm'].validate((valid) => {
          if (valid) {
            for (var i = 0; i < this.editUser.roleIds.length; ++i) {
              this.editUser.roles.push({
                jsbm: this.editUser.roleIds[i]
              });
            }
            this.editUser.rybm = this.editUser.rybm == "" ? -1 :  this.editUser.rybm
            this.editUser.jgbm = this.editUser.jgbm == (""||undefined||null) ? -1 :  this.editUser.jgbm
            User.updateUser(this.editUser).then(value => {
              if (value.czjg == Dictionary.DatabaseResult.Success) {
                //更新成功后更新当前点击的用户
                this.loadUsers();
                this.updateUserDialog = false;
                this.$alert('操作成功', '用户信息', {
                  confirmButtonText: '确定',
                });
              }
              else {
                this.$alert("操作失败，请联系管理员", '用户信息', {
                  confirmButtonText: '确定'
                });
              }
            })
          }
        });
      },
      //更新用户密码
      updatePassword() {
        this.$refs['userPasswordForm'].validate((valid) => {
          if (valid) {
            if (this.editUser.dlmm != this.editUser.dlmmyz) {
              this.$alert('密码输入不一致', '用户信息', {
                confirmButtonText: '确定'
              });
              return;
            }
            User.updatePasswordByAdmin(this.editUser).then(value => {
              if (value.czjg == Dictionary.DatabaseResult.Success) {
                this.updateUserPassword = false;
                this.$alert('操作成功', '用户信息', {
                  confirmButtonText: '确定',
                });
              }
              else {
                this.$alert("操作失败，请联系管理员", '用户信息', {
                  confirmButtonText: '确定'
                });
              }
            })
          }
        });
      },
      //删除用户
      deleteUser(index, row) {
        //判断用户名admin不可删除
        if (row.yhmc == "admin") {
          this.$alert('管理员用户不能删除', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          }).catch(() => { });
          return;
        };
        this.$confirm('是否删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: 'warning'
        }).then(() => {
          User.deleteUser(row).then(value => {
            if (value.czjg == Dictionary.DatabaseResult.Success) {
              //如果需要切换到上一页则切换
              if (this.userData.length == 1 && this.pageNum > 1) {
                this.pageNum -= 1;
              }
              //不需要切换重新读取当页数据
              else {
                this.loadUsers();
              }
              this.$alert('操作成功', '用户信息', {
                confirmButtonText: '确定'
              });
            }
            else {
              this.$alert("操作失败，请联系管理员", '用户信息', {
                confirmButtonText: '确定'
              });
            }
          }).catch(() => { });
        }, () => {
        });
      },
      //记录当前选中的用户集合
      changeSelectedUsers(userData) {
        this.selectedUsers = userData;
      },
      //改变当前页
      changePage(page) {
        this.pageNum = page;
        this.loadUsers();
      },
      //改变选中人员
      changePerson(rybm){
        for (var i = 0; i < this.persons.length; ++i)
        {
          if (this.persons[i].rybm == rybm)
          {
            this.editUser.jgmc = this.persons[i].jgmc;
            break;
          }
        }
      }
    }
  }
</script>
