<template>
  <div class="Role grid">
    <section class="section">
      <div class="navBox">
        <div class="breadcrumbBox">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.UserJurisdiction') }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $t('message.Role') }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="searchBox">
        <el-form label-width="100px" size="mini">
          <ul class="searchList">
            <li>
              <el-form-item :label="$t('message.RoleName')">
                <el-input v-model="jsmc"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item>
                <el-button type="primary" plain icon="el-icon-refresh" size="mini" @click="clear()">{{ $t('message.Reset') }}</el-button>
                <el-button type="primary" plain icon="el-icon-search" @click="searchRole()">{{ $t('message.Search') }}</el-button>
              </el-form-item>
            </li>
          </ul>
        </el-form>
      </div>
      <div class="btnBox">
        <el-button type="primary" class="operateBtn" plain icon="el-icon-plus" @click="showNewDialog">{{ $t('message.Insert') }}</el-button>
      </div>
      <div class="gridBox">
        <el-table :data="roles" border style="width: 100%" @selection-change="changeSelectedRoles">
          <el-table-column align="center" prop="jsmc" :label="$t('message.RoleName')" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="jsms" :label="$t('message.RoleDescribe')" width="240" show-overflow-tooltip></el-table-column>
          <el-table-column header-align="center" align="left" prop="functionssm" :label="$t('message.LinkingFunction')" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" width="120" :label="$t('message.Operation')">
            <template slot-scope="scope">
              <el-button size="mini" class="tableBtnImg" @click="showUpdateDialog(scope.$index, scope.row)">
                <img src="./img/edit.png" :alt="$t('message.Update')" :title="$t('message.Update')">
              </el-button>
              <el-button size="mini"	class="tableBtnImg"	@click="deleteRole(scope.$index, scope.row)">
                <img src="./img/delete.png" :alt="$t('message.Delete')" :title="$t('message.Delete')">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="changeCurrentPage" :current-page="pageNum" :page-size="pageSize" :total="totalCount" layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </section>
    <!--新增,编辑弹窗-->
    <el-dialog :title="title" :visible.sync="roleDialog" height="580px" width="580px" top="50px">
      <div>
        <el-form :model="role" :rules="roleRules" ref="newRoleForm" label-width="80px" size="mini">
          <ul class="nameFormBox">
            <li>
              <el-form-item :label="$t('message.RoleName')" prop="jsmc">
                <el-input :disabled="isUpdating" v-model="role.jsmc"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item :label="$t('message.RoleDescribe')" prop="jsms">
                <el-input v-model="role.jsms"></el-input>
              </el-form-item>
            </li>
          </ul>
          <div class="bana-information hauto functionBox">
            <div class="bana-title">{{ $t('message.LinkingFunction') }}</div>
            <div class="bana-information-content">
              <ul class="checkedBox">
                <li>
                  <el-checkbox v-model="checkedFogarea" class="parentNode">{{ $t('message.FogAreaMonitor') }}</el-checkbox>
                </li>
                <li>
                  <el-checkbox v-model="checkedDevice" class="parentNode">{{ $t('message.DeviceMonitor') }}</el-checkbox>
                </li>
                <li>
                  <el-checkbox :indeterminate="isIndeterminate3" v-model="checkedAnalysis" @change="checkedFunAllChange3" class="parentNode">{{ $t('message.StatisticalAnalysis') }}</el-checkbox>
                  <el-checkbox-group v-model="checkedFunctions3" @change="handleCheckedChange3">
                    <el-checkbox v-for="fun in functions3" :label="fun.gnmc" :key="fun.gnbm">{{fun.gnmc}}</el-checkbox>
                  </el-checkbox-group>
                </li>
                <li>
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkedFunAll" @change="checkedFunAllChange" class="parentNode">{{ $t('message.SystemConfig') }}</el-checkbox>
                  <el-checkbox-group v-model="checkedFunctions" @change="handleCheckedChange">
                    <el-checkbox v-for="fun in functions" :label="fun.gnmc" :key="fun.gnbm">{{fun.gnmc}}</el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveRole" size="mini">{{ $t('message.Save') }}</el-button>
        <el-button @click="roleDialog = false" size="mini">{{ $t('message.Cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Role from "./js/Role.js";
  import User from "./js/User.js";
  import Function from "./js/Function.js";
  import Dictionary from "./js/Dictionary.js";
  export default {
    data() {
      return {
        jsmc: "", //搜索框，角色名称

        pageSize: 10, //分页显示条数
        pageNum: 1, //当前页
        totalCount: 0, //总条数

        //弹窗里复选框各种状态
        checkedFunAll: false, //复选框是否全选
        // checkedAnalysis: false,
        checkedFunctions: [], //复选框被选中的集合
        checkedFunctions3: [], //复选框被选中的集合
        isIndeterminate: false, //复选框不确定状态
        isIndeterminate3: false, //复选框不确定状态
        checkedFogarea: false, //复选框雾区监测
        checkedDevice: false, //复选框设备监控
        checkedAnalysis: false, //复选框统计分析

        title: "", //弹窗标题
        roleDialog: false, //弹出框
        isUpdating: false, //当前是更新还是添加
        role: {}, //新增和更新的角色
        roles: [], //角色集合
        selectedRoles: [], //当前选中的角色集合
        functions: [], //功能集合
        functions3: [],
        //功能字段映射
        functionProps: {
          children: "children",
          label: "gnmc"
        },
        //角色数据校验
        roleRules: {
          jsmc: this.filterRules("角色名称", true, 50, 1)
        }
      };
    },
    mounted: function() {
      this.loadRoles();
      this.loadFunctions();
    },
    methods: {
      //读取角色
      loadRoles() {
        var data = {
          jsmc: this.jsmc,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };

        Role.getRoles(data, this.$cookies.get("token")).then(value => {
          this.roles = value.datas;
          this.totalCount = value.totalCount;
        });
      },
      //修改当前页码
      changeCurrentPage(pageNum) {
        this.pageNum = pageNum;
        this.loadRoles();
      },
      //搜索角色
      searchRole() {
        this.pageNum = 1;
        this.loadRoles();
      },
      //重置
      clear(){
        this.jsmc = ""
        this.loadRoles();},
      //修改当前选中的角色集合
      changeSelectedRoles(roles) {
        this.selectedRoles = roles;
      },
      //显示添加对话框
      showNewDialog() {
        this.role = {
          functions: [],
          jsmc: "",
          jsms: ""
        };

        this.title = "新增角色";
        this.checkedFunctions = [];
        this.checkedFunctions3 = [];
        this.checkedFogarea = false;
        this.checkedDevice = false;
        this.checkedAnalysis = false;
        this.checkedFunAll = false;
        // this.checkedAnalysis = false;
        this.isIndeterminate = false;
        this.isIndeterminate3 = false;
        this.isUpdating = false;
        this.roleDialog = true;
      },
      //显示更新对话框
      showUpdateDialog(index, row) {
        this.role = {
          jsbm: row.jsbm,
          jsmc: row.jsmc,
          jsms: row.jsms
        };
        this.checkedFogarea = false;
        this.checkedDevice = false;
        // this.checkedAnalysis = false;
        this.checkedFunctions = [];
        this.checkedFunctions3 = [];
        for (var i = 0; i < row.functions.length; ++i) {
          if (row.functions[i].gnbm.charAt(3) == "1") {
            this.checkedFogarea = true;
          } else if (row.functions[i].gnbm.charAt(3) == "2") {
            this.checkedDevice = true;
          } else if (row.functions[i].gnbm.charAt(3) == "3") {
            // this.checkedAnalysis = true;
            this.checkedFunctions3.push(row.functions[i].gnmc);
          } else {
            this.checkedFunctions.push(row.functions[i].gnmc);
          }
        }
        if (this.checkedFunctions3.length < this.functions3.length) {
          if (this.checkedFunctions3.length == 0) {
            this.isIndeterminate3 = false;
            this.checkedAnalysis = false;
          } else {
            this.isIndeterminate3 = true;
          }
        } else if (this.checkedFunctions3.length == this.functions3.length) {
          this.checkedAnalysis = true;
        }

        if (this.checkedFunctions.length < this.functions.length) {
          if (this.checkedFunctions.length == 0) {
            this.isIndeterminate = false;
            this.checkedFunAll = false;
          } else {
            this.isIndeterminate = true;
          }
        } else if (this.checkedFunctions.length == this.functions.length) {
          this.checkedFunAll = true;
        }
        this.title = "编辑角色";
        this.isUpdating = true;
        this.roleDialog = true;
      },
      //保存角色
      saveRole() {
        this.$refs["newRoleForm"].validate(valid => {
          if (valid) {
            this.role.functions = [];
            if (this.checkedFogarea == true) {
              this.role.functions.push({
                gnbm: "01010000",
                gnmc: "雾区监测"
              });
            }
            if (this.checkedDevice == true) {
              this.role.functions.push({
                gnbm: "01020000",
                gnmc: "设备监控"
              });
            }
            // if (this.checkedAnalysis == true) {
            //   this.role.functions.push({
            //     gnbm: "01030000",
            //     gnmc: "统计分析"
            //   });
            // }

            for (var i = 0; i < this.checkedFunctions3.length; ++i) {
              for (var j = 0; j < this.functions3.length; ++j) {
                if (this.checkedFunctions3[i] == this.functions3[j].gnmc) {
                  this.role.functions.push(this.functions3[j]);
                  break;
                }
              }
            }

            for (var i = 0; i < this.checkedFunctions.length; ++i) {
              for (var j = 0; j < this.functions.length; ++j) {
                if (this.checkedFunctions[i] == this.functions[j].gnmc) {
                  this.role.functions.push(this.functions[j]);
                  break;
                }
              }
            }
            // console.log(this.role);
            if (this.isUpdating == true) {
              Role.updateRole(this.role, this.$cookies.get("token")).then(
                value => {
                  if (value.czjg == Dictionary.DatabaseResult.Success) {
                    this.loadRoles();
                    this.roleDialog = false;
                    this.$alert("操作成功", "角色信息", {
                      confirmButtonText: "确定"
                    });
                  } else {
                    this.$alert("操作失败，请联系管理员", "角色信息", {
                      confirmButtonText: "确定"
                    });
                  }
                }
              );
            } else {
              Role.insertRole(this.role, this.$cookies.get("token")).then(
                value => {
                  if (value.czjg == Dictionary.DatabaseResult.Success) {
                    this.totalCount += 1;
                    var newPage = Math.ceil(this.totalCount / this.pageSize);
                    if (newPage == this.pageNum){
                      this.loadRoles();
                    }
                    else{
                      this.pageNum = newPage;
                    }

                    this.roleDialog = false;
                    this.$alert("操作成功", "角色信息", {
                      confirmButtonText: "确定"
                    });
                  } else {
                    this.$alert("操作失败，请联系管理员", "角色信息", {
                      confirmButtonText: "确定"
                    });
                  }
                }
              );
            }
          }
        });
      },
      //删除角色
      deleteRole(index, row) {
        this.$confirm("是否删除角色?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: 'cancelBtnStyle',
          confirmButtonClass: 'confirmBtnStyle',
          type: "warning"
        }).then(
          () => {
            Role.deleteRole(row, this.$cookies.get("token"))
              .then(value => {
                if (value.czjg == Dictionary.DatabaseResult.Success) {
                  if (this.roles.length == 1 && this.pageNum > 1) {
                    this.pageNum -= 1;
                  } else {
                    this.loadRoles();
                  }
                  this.$alert("操作成功", "联动设备信息", {
                    confirmButtonText: "确定"
                  });
                } else {
                  this.$alert("操作失败，请联系管理员", "联动设备信息", {
                    confirmButtonText: "确定"
                  });
                }
              })
              .catch(() => {});
          },
          () => {}
        );
      },
      //读取功能
      loadFunctions() {
        var data = {};
        //这里只筛选出了系统配置的一级别的功能
        Function.getFunctions(data, this.$cookies.get("token")).then(value => {
          this.functions = [];
          for (var i = 0; i < value.datas.length; ++i) {
            if (
              (value.datas[i].gnbm.charAt(3) == "4" &&
                value.datas[i].gnbm.charAt(4) != "0") ||
              (value.datas[i].gnbm.charAt(3) == "4" && value.datas[i].gnbm.charAt(5) != "0")
            ) {
              this.functions.push(value.datas[i]);
            }else if(
                (value.datas[i].gnbm.charAt(3) == "3" && value.datas[i].gnbm.charAt(4) != "0") ||
                (value.datas[i].gnbm.charAt(3) == "3" && value.datas[i].gnbm.charAt(5) != "0")
            ){
                this.functions3.push(value.datas[i]);
            }
          }
        });
      },
      //修改当前选中的功能
      changeSelectedFunctions(data, checked, indeterminate) {
        if (checked == true) {
          this.role.functions.push(data);
        } else {
          this.role.functions = this.role.functions.filter(
            func => func.gnbm !== data.gnbm
          );
        }
      },
      //复选框方法
      checkedFunAllChange(val) {
        this.checkedFunctions = [];
        if (val) {
          for (var i = 0; i < this.functions.length; ++i) {
            this.checkedFunctions.push(this.functions[i].gnmc);
          }
        }
        this.isIndeterminate = false;
      },
      handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkedFunAll = checkedCount === this.functions.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.functions.length;
      },
      //复选框方法
      checkedFunAllChange3(val) {
        this.checkedFunctions3 = [];
        if (val) {
          for (var i = 0; i < this.functions3.length; ++i) {
            this.checkedFunctions3.push(this.functions3[i].gnmc);
          }
        }
        this.isIndeterminate3 = false;
      },
      handleCheckedChange3(value) {
        let checkedCount = value.length;
        this.checkedAnalysis = checkedCount === this.functions3.length;
        this.isIndeterminate3 =
          checkedCount > 0 && checkedCount < this.functions3.length;
      }
    }
  };
</script>

