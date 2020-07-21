<template>
  <div>
    <Head activeIndex="4" />
    <div class="content SystemConfig">
      <nav class="nav">
        <div class="navBox" v-show="sideflag">
          <!--系统管理左侧列表-->
          <div class="leftMenuBox">
            <div class="leftMenuTitle"><i class="el-icon-document"></i>{{ $t('message.SystemConfig') }}</div>
            <div class="leftTreeBox">
              <el-tree :data="treeDatas" :props="defaultProps" default-expand-all node-key="id" ref="tree" highlight-current @node-click="changeRouter">
              </el-tree>
            </div>
          </div>
        </div>
        <div class="navBoxBar" @click="side" ref="navbox"><img src="./img/right.png" alt="" v-if="!sideflag"><img src="./img/left.png" alt="" v-else></div>
      </nav>
      <div ref="contentbox" style="width: 100%;">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<script>
  import User from './js/User.js';
  import Head from './Head';
  import Function from './js/Function.js';

  export default {
    data() {
      return {
        sideflag: true,//左侧状态数据
        treeDatas:[],//左侧树数据
        //树映射
        defaultProps: {
          children: 'children',
          label: 'gnmc'
        },
      }
    },
    components: {
      Head,
    },
    mounted: function () {
      this.loadUser();
      this.setTreeHeightLight();
    },
    methods: {
      side() {//左侧边栏显示
        this.sideflag = !this.sideflag;
        let windowWidth =  window.screen.availWidth;
        if (this.sideflag) {
          this.$refs.contentbox.style.width = windowWidth - 240 + 'px';
        } else {
          this.$refs.contentbox.style.width = windowWidth + 'px';
        }
      },

      //读取用户权限
      loadUser(){
        var parameter = {
          yhmc: this.$cookies.get('yhmc')
        };
        User.getUser(parameter).then(value => {
          var systemNode = null;
          var configNode = null;
          var logNode = null;
          // console.log(value.functions)
          for (var i = 0; i < value.functions.length; ++i){
            var router = Function.FunctionRouters[value.functions[i].gnbm];
            if (value.functions[i].gnbm == "01040400" ||
              value.functions[i].gnbm == "01040500" ||
              value.functions[i].gnbm == "01040600" ||
              value.functions[i].gnbm == "01040700" ||
              value.functions[i].gnbm == "01040800" ||
              value.functions[i].gnbm == "01040900" ||
              value.functions[i].gnbm == "01041000" )
            {
              if (systemNode == null)
              {
                systemNode={
                  gnmc: '系统设置',
                  children: [],
                  router:""
                };
              }
              value.functions[i].router = router;
              systemNode.children.push(value.functions[i]);
            }
            else if (value.functions[i].gnbm == "01040100" ||
              value.functions[i].gnbm == "01040200" ||
              value.functions[i].gnbm == "01040300" ||
              value.functions[i].gnbm == "01041300" ||
              value.functions[i].gnbm == "01041400" )
            {
              if (configNode == null) {
                configNode = {
                  gnmc: '雾区管理',
                  children: [],
                  router: ""
                };
              }
              value.functions[i].router = router;
              configNode.children.push(value.functions[i]);
            }
            else if (value.functions[i].gnbm == "01041100" ||
              value.functions[i].gnbm == "01041200") {
              if (logNode == null) {
                logNode = {
                  gnmc: '日志查询',
                  children: [],
                  router: ""
                };
              }
              value.functions[i].router = router;
              logNode.children.push(value.functions[i]);
            }
          }
          //这里在向tree中push数据保证节点顺序
          if (configNode != null)
          {
            this.treeDatas.push(configNode);
          }
          if (systemNode != null)
          {
            this.treeDatas.push(systemNode);
          }
          if (logNode != null)
          {
            this.treeDatas.push(logNode);
          }
        });
      },

      setTreeHeightLight(){
        this.$refs.tree.setCurrentKey(1);
      },
      //点击左侧节点切换对应组件
      changeRouter(data, node, tree) {
        if(data.router != ""){
          this.$router.push('/systemconfig' + data.router);
        }
      },
      // 路由变化触发
      getPath(){
        let paths = this.$route.fullPath.substring(13); //获取当前路径
        let trees = [];
        let treess = []; //用户权限页面
        for(let i=0;i<this.treeDatas.length;i++){
          trees.push(this.treeDatas[i].children)
        }
        //将路由转成小写
        for(let i=0;i<trees.length;i++){
          for(let j = 0;j<trees[i].length;j++){
            treess.push(trees[i][j].router.toLowerCase())
          }
        }
        if(treess.indexOf(paths.toLowerCase()) !=-1){//判断路由是否存在
          this.$router.push('/systemconfig'+paths)
        }else{
          this.$router.push('/4399')
          this.$message({
            type: 'error',
            message: '对不起，您没有权限',
          });
        }
      }
    },
    watch:{
      "$route":"getPath"  //监听路由
    }
  }

</script>
