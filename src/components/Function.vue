<template>
		<div class="grid">
      <section class="section">
				<div class="navBox">
					<div class="breadcrumbBox">
						<el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>{{ $t('message.SystemConfig') }}</el-breadcrumb-item>
							<el-breadcrumb-item>{{ $t('message.UserJurisdiction') }}</el-breadcrumb-item>
							<el-breadcrumb-item>{{ $t('message.Functions') }}</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
				</div>
				<div class="searchBox">
					<el-form :model="searchFunction"  label-width="100px" size="mini">
						<ul class="searchList">
							<li>
								<el-form-item :label="$t('message.FunctionsNum')" prop="id">
									<el-input v-model="searchFunction.gnbm"></el-input>
								</el-form-item>
							</li>
							<li>
								<el-form-item :label="$t('message.FunctionsName')" prop="name">
									<el-input v-model="searchFunction.gnmc"></el-input>
								</el-form-item>
							</li>
							<li>
								<el-form-item>
									<el-button type="primary" plain icon="el-icon-refresh" size="mini" @click="clear()">{{ $t('message.Reset') }}</el-button>
                  <el-button type="primary" plain icon="el-icon-search" @click="searchFunctions()">{{$t('message.Search')}}</el-button>
								</el-form-item>
							</li>
						</ul>
					</el-form>
				</div>
        <div class="gridBox mt20">
					<el-table :data="functions"	border style="width: 100%">
						<el-table-column align="center"	prop="gnbm"	:label="$t('message.FunctionsNum')" width="300px" show-overflow-tooltip></el-table-column>
            <el-table-column align="left" header-align="center" show-overflow-tooltip	prop="gnmc"	:label="$t('message.FunctionsName')"></el-table-column>
					</el-table>
					<el-pagination @current-change="changeFunctions" :current-page="pageNum"	:page-size="pageSize"
                         :total="totalCount"	layout="total, prev, pager, next, jumper"/>
				</div>
        </section>
		</div>
</template>
<script>
  import Function from "./js/Function.js";
  export default {
    data() {
      return {
        //功能集合
        functions: [],
        //分页
        pageSize: 10,
        pageNum: 1,
        totalCount: 0,
        //搜索数据
        searchFunction: {
          gnbm: '',
          gnmc: ''
        },
      };
    },
    mounted: function () {
      this.loadFunctions();
    },
    methods: {
      //读取功能集合
      loadFunctions() {

        var data={
            gnbm: this.searchFunction.gnbm,
            gnmc: this.searchFunction.gnmc,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
        };

        Function.getFunctions(data).then(value => {
          this.functions = value.datas;
          this.totalCount = value.totalCount;
        });
      },
      //搜索功能
      searchFunctions() {
        this.pageNum = 1;
        this.loadFunctions();
      },
      //重置
      clear(){
          this.searchFunction = {}
          this.loadFunctions();
      },
      //修改页面
      changeFunctions(page){
        this.pageNum = page;
        this.loadFunctions();
      }
    }
  }
</script>

