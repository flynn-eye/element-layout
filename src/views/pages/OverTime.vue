<template>
  <el-card>
    <el-form inline>
      <el-form-item label="部门：">
        <el-select size="mini" v-model="queryForm.deptCode" placeholder="选择职级">
          <el-option
            v-for="(item,key) in  selectOption"
            :key="key"
            :label="item.deptName"
            :value="item.deptCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工：">
        <el-autocomplete
          :trigger-on-focus="false"
          prefix-icon="el-icon-search"
          size="mini"
          v-model="searchValue"
          :fetch-suggestions="querySearchAsync"
          placeholder="输入工号或者姓名搜索"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label>
        <el-button size="small" type="primary" @click="query(1)">提交</el-button>
        <el-button size="small" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
      <el-button
          size="small"
          type="success"
        >
          <a href="http://192.168.43.59:8080/overtime/exportOvertimes" style="color:white">下载所有加班信息</a>
          </el-button>
    <el-table v-loading="tableLoading" :data="dataSource">
      <el-table-column type="index"></el-table-column>
      <el-table-column label prop="employee.empName"></el-table-column>
      <el-table-column label prop="employee.dept.deptName"></el-table-column>
      <el-table-column label prop="overtimeStartDate"></el-table-column>
      <el-table-column label prop="overtimeEndDate"></el-table-column>
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
</template>

<script>
export default {
  name: "OverTime",
  mounted() {
    this.$store
      .dispatch("staffManager/departmentListWithoutPage")
      .then((res) => {
        this.selectOption = res.data;
      });
    this.query(1);
  },
  data() {
    return {
      paginationConfig: {
        currentPage: 1,
        total: 0,
        pageSize: 0,
      },
      selectOption: null,
      searchValue: "",
      dataSource: [],
      tableLoading: false,
      queryForm: {
        deptCode: "",
        empNo: "",
        pageNum:1
      },
    };
  },
  methods: {
    currentChange(pageNum) {
      this.paginationConfig.currentPage = pageNum;
      this.query(pageNum);
    },
    query(pageNum) {
      this.queryForm.pageNum = pageNum;
      this.paginationConfig.currentPage = pageNum
      this.$store
        .dispatch("staffManager/getOvertimeWithPage", this.queryForm)
        .then((res) => {
          this.dataSource = res.data.pageInfo.list;
          this.paginationConfig.total = res.data.pageInfo.total;
          this.paginationConfig.pageSize = res.data.pageInfo.pageSize;
          console.log(res.data);
        });
    },
    handleSelect(item) {
      let arr = item.value.split("工号:");
      console.log(arr[1]);
      this.queryForm.empNo = arr[1]
      this.query(1)
    },
    reset() {
        this.searchValue = ''
      this.queryForm = {
        deptCode: "",
        empNo: "",
        pageNum:1
      },
      this.paginationConfig.currentPage = 1
      this.query(1)
    },
    querySearchAsync(queryString, cb) {
      let param = {};
      let temp = this.searchValue.substr(0, 1);
      if (temp >= "0" && temp <= "9") {
        param.empNo = this.searchValue;
      } else {
        param.empName = this.searchValue;
      }
      this.$store.dispatch("staffManager/handleSearch", param).then((res) => {
        this.$store.state.staffManager.searchResult = res.data;
        let val = res.data.map((item, index) => {
          return {
            value: "姓名:" + item.empName + " " + "工号:" + item.empNo,
            index: index,
          };
        });
        cb(val);
      });
    },
  },
};
</script>

<style>
</style>