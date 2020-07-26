<template>
  <div>
    <el-card>
      <el-form inline>
        <el-form-item label="开始时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            size="mini"
            v-model="queryForm.projectStartDate"
            :editable="false"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            size="mini"
            :editable="false"
            v-model="queryForm.projectEndDate"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="项目名称：">
          <el-input size="mini" v-model="queryForm.projectName" placeholder="输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button size="mini" type="primary" @click="query">查询</el-button>
          <el-button size="mini" type="primary" @click="rest">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="tableLoading" :data="dataSource">
        <el-table-column type="index" prop="projectName"></el-table-column>
        <el-table-column label="项目名" prop="projectName"></el-table-column>
        <el-table-column label="负责人" prop="employee.empName"></el-table-column>
        <el-table-column label="开始时间" prop="projectStartDate"></el-table-column>
        <el-table-column label="结束时间" prop="projectEndDate"></el-table-column>
        <el-table-column label="所属部门" prop="employee.dept.deptName"></el-table-column>
        <el-table-column label="状态" prop="projectState">
          <template slot-scope="scope">
            <div v-if="scope.row.projectState===0">未通过</div>
            <div v-if="scope.row.projectState===1">已创建</div>
            <div v-if="scope.row.projectState===2">审核通过</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a @click="getDetail(scope)">查看</a>
            <!-- <el-dropdown>
              <span>
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="getDetail(scope)">查看</span>
                </el-dropdown-item>
                <el-dropdown-item>更改</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <el-pagination
          background
          :total="paginationConfig.total"
          :current-page="paginationConfig.currentPage"
          :page-size="paginationConfig.pageSize"
          @current-change="currentChange"
          layout="prev, pager, next,jumper, total"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapMutations } from "vuex";
export default {
  name: "ProjectManager",
  mounted() {
    this.getProjectList(1);
  },
  data() {
    return {
      dataSource: [],
      tableLoading: false,
      paginationConfig: {
        currentPage: 1,
        total: 0,
        pageSize: 0
      },
      queryForm: {
        page: 1, //页码
        projectStartDate: null,
        projectEndDate: null,
        projectName: ""
      }
    };
  },
  methods: {
    getDetail(scope) {
      this.$store.commit("projectManager/SETlocation", {
        name: "项目详情"
      }),
       this.$store.commit("projectManager/SETprojectDetail", scope.row),
        this.$router.push("/pageLayout/projectLayout/projectDetail");
    },
    rest() {
      this.queryForm = {
        page: 1, //页码
        startTime: null,
        endTime: null,
        name: ""
      };
      this.getProjectList(1);
    },
    currentChange(pageNum) {
      this.paginationConfig.currentPage = pageNum;
      this.getProjectList(pageNum);
    },
    query() {
      this.getProjectList(1);
    },
    getProjectList(pageNum) {
      this.queryForm.page = pageNum;
      this.tableLoading = true;
      let date = {};
      this.$store
        .dispatch("projectManager/getProjectList", {
          ...this.queryForm,
          ...date
        })
        .then(res => {
          setTimeout(() => {
            if (res.code === "200") {
              this.paginationConfig.total = res.data.total;
              this.paginationConfig.currentPage = res.data.pageNum;
              this.paginationConfig.pageSize = res.data.pageSize;
              this.dataSource = res.data.list;
            } else {
            }
            this.tableLoading = false;
          }, 0.5 * 1000);
        });
    }
  }
};
</script>

<style lang='scss'>
</style>