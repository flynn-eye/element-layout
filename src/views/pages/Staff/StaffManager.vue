<template>
  <div>
    <el-row type="flex">
      <el-card style="min-height:600px;width:250px;min-width:220px;">
        <scroll
          v-loading="scrollLoading"
          @ScrollItemClick="ScrollItemClick"
          :list="department"
          title="部门选择"
        />
      </el-card>
      <el-card style="width:100vw;overflow-x:hidden;margin-left:8px">
        <el-form>
          <el-form-item label="搜索：">
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
        </el-form>
        <el-form inline>
          <el-form-item label="工号：">
            <el-input
              size="mini"
              prefix-icon="el-icon-data-analysis"
              type="text"
              v-model="queryParams.empNo"
              autocomplete="off"
              placeholder="工号"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input
              size="mini"
              style="width:100px"
              prefix-icon="el-icon-data-analysis"
              type="text"
              v-model="queryParams.empName"
              autocomplete="off"
              placeholder="姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="职级：">
            <el-select size="mini" v-model="queryParams.rankId" placeholder="选择职级">
              <el-option
                v-for="(item,key) in  selectOption"
                :key="key"
                :label="item.rankName"
                :value="item.rankId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <el-button size="small" type="primary" @click="queryWithFilter(1)">查询</el-button>
            <el-button size="small" @click="restQuery">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button
          @click="addEmp(null,1)"
          v-if="queryParams.deptCode!==null"
          size="small"
          type="primary"
        >添加部长</el-button>
        <el-button
          size="small"
          type="success"
        >
          <a href="http://192.168.43.59:8080/overtime/exportOvertimes" style="color:white">下载所有加班信息</a>
          </el-button>
        <el-table
          :expand-row-keys="expand"
          :row-key="getRowkey"
          @expand-change="expandChange"
          v-loading="tableLoading"
          :data="dataSource"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form>
                <el-form-item label="操作：">
                  <el-button
                    @click="addEmp(scope.row,2)"
                    v-if="scope.row.rank.rankId!==1"
                    size="small"
                    type="primary"
                  >添加</el-button>
                  <!-- <el-button @click="updateEmp(scope.row)" size="small" type="success">更新</el-button> -->
                  <el-button @click="delEmp(scope.row)" size="small" type="danger">删除</el-button>
                  <el-button @click="overTimeDetail(scope.row)" size="small" type="warning">员工详情</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="工号" prop="empNo"></el-table-column>
          <el-table-column label="员工姓名" prop="empName"></el-table-column>
          <el-table-column label="职级" prop="rank.rankName"></el-table-column>
          <el-table-column label="部门" prop="dept.deptName"></el-table-column>
          <el-table-column label="所属线路" prop="dept.line"></el-table-column>
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
    </el-row>
    <!-- dialog -->
    <el-dialog width="600px" :title="dialogConfig.title" :visible.sync="dialogConfig.visible">
      <el-row type="flex" justify="center">
        <el-form>
          <el-form-item label="部门名称：">
            <el-input
              disabled
              prefix-icon="el-icon-data-analysis"
              type="text"
              v-model="dialogForm.deptName"
              autocomplete="off"
              placeholder="部门名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="员工名称：">
            <el-input
              prefix-icon="el-icon-data-analysis"
              type="text"
              v-model="dialogForm.empName"
              autocomplete="off"
              placeholder="员工名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="员工工号：">
            <el-input
              prefix-icon="el-icon-data-analysis"
              type="text"
              v-model="dialogForm.empNo"
              autocomplete="off"
              placeholder="员工工号"
            ></el-input>
          </el-form-item>
          <el-form-item label="领导名称：">
            <el-input
              disabled
              prefix-icon="el-icon-data-analysis"
              type="text"
              v-model="dialogForm.leaderName"
              autocomplete="off"
              placeholder="领导名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="职级名称：">
            <el-select v-model="dialogForm.rankId" placeholder="选择职级">
              <el-option
                v-for="(item,key) in  selectOption"
                :key="key"
                :label="item.rankName"
                :value="item.rankId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <el-button size="small" type="primary" @click="submitEmp">提交</el-button>
            <el-button
              size="small"
              @click="()=>{this.dialogConfig.visible=false;this.restDialogForm()}"
            >取消</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapMutations } from "vuex";
import scroll from "@/components/scroll";
export default {
  name: "StaffManager",
  components: {
    scroll
  },
  mounted() {
    this.scrollLoading = true;
    this.$store.dispatch("rankManager/getRankList").then(res => {
      this.selectOption = res.data.ranks;
    });
    this.$store
      .dispatch("staffManager/departmentListWithoutPage")
      .then(res => {
        setTimeout(() => {
          this.department = res.data;
          this.department.unshift({
            deptCode: null,
            deptName: "全部",
            line: null
          });
          this.scrollLoading = false;
        }, 0.5 * 1000);
      });
    this.queryWithFilter(1);
  },
  data() {
    return {
      searchValue: "",
      dialogForm: {
        deptCode: null,
        deptName: "",
        empName: "",
        empNo: null,
        leader: null, //leader  empNo INT
        leaderName: "",
        password: null,
        rankId: null,
        rankName: ""
      },
      dialogConfig: {
        mode: "", //添加模式 1添加最高职级部长 ,2添加员工，3更新员工，
        title: "", //添加员工，更新员工
        visible: false
      },
      paginationConfig: {
        cupagirrentPage: 1,
        total: 0,
        pageSize: 0
      },
      scrollLoading: false,
      tableLoading: false,
      dataSource: [],
      queryParams: {
        deptName: null,
        deptCode: null,
        empName: "",
        empNo: null,
        pageNum: 1,
        rankId: null
      },
      department: [],
      selectOption: [],
      expand: []
    };
  },
  methods: {
    ...mapMutations("staffManager", { SETstaffDetail: "SETstaffDetail" }),
    querySearchAsync(queryString, cb) {
      let param = {};
      let temp = this.searchValue.substr(0, 1);
      if (temp >= "0" && temp <= "9") {
        param.empNo = this.searchValue;
      } else {
        param.empName = this.searchValue;
      }
      this.$store.dispatch("staffManager/handleSearch", param).then(res => {
        this.$store.state.staffManager.searchResult = res.data;
        let val = res.data.map((item, index) => {
          return {
            value: "姓名:" + item.empName + " " + "工号:" + item.empNo,
            index: index
          };
        });
        cb(val);
      });
    },
    handleSelect(item) {
      this.dataSource = [
        this.$store.state.staffManager.searchResult[item.index]
      ];
    },
    restDialogForm() {
      this.dialogForm = {
        deptCode: null,
        deptName: "",
        empName: "",
        empNo: null,
        leader: null, //leader  empNo INT
        leaderName: "",
        password: null,
        rankId: null,
        rankName: ""
      };
    },
    overTimeDetail(row) {
      //加班细节
      this.$store.commit("staffManager/SETlocation", {
        name: "员工详情"
      }),
        this.$router.push("/pageLayout/StaffLayout/StaffDetail");
      this.SETstaffDetail(row);
    },
    submitEmp() {
      if (this.dialogConfig.mode === 3) {
      } else {
        this.$store
          .dispatch("staffManager/addStaff", this.dialogForm)
          .then(res => {
            this.restDialogForm();
            this.dialogConfig.visible = false;
            if (res.code === "200") {
              Message({
                message: res.message,
                type: "success"
              });
              this.queryWithFilter(1);
            } else {
              Message({
                message: res.message,
                type: "warning"
              });
            }
          });
      }
    },
    updateEmp(row) {
      this.restDialogForm();
      this.dialogForm.deptCode = row.dept.deptCode;
      this.dialogForm.deptName = row.dept.deptName;
      if (row.rank.rankId !== 4) {
        this.dialogForm.leaderName = row.parentEmployee.empName;
        this.dialogForm.leader = row.parentEmployee.empNo;
      }
      this.dialogForm.empNo = row.empNo;
      this.dialogForm.empName = row.empName;
      this.dialogConfig.title = "更新员工";
      this.dialogConfig.mode = 3;
      this.dialogConfig.visible = true;
      // this.SETstaffDetail(row);
      // this.$store.commit("staffManager/SETlocation", {
      //   name: "更新员工"
      // }),
      // this.$router.push('/pageLayout/StaffLayout/UpdateStaff')
    },
    delEmp(row) {
      this.$store.dispatch("staffManager/delStaff", row.empNo).then(res => {
        if (res.code === "200") {
          Message({
            message: res.message,
            type: "success"
          });
          this.queryWithFilter(parseInt(this.paginationConfig.currentPage));
        } else {
          Message({
            message: res.message,
            type: "warning"
          });
        }
      });
    },
    addEmp(row, mode) {
      this.restDialogForm();
      this.dialogConfig.mode = mode;
      this.dialogConfig.title = "添加员工";
      this.dialogConfig.visible = true;
      if (row === null) {
        //添加部长
        this.dialogForm.deptCode = this.queryParams.deptCode;
        this.dialogForm.deptName = this.queryParams.deptName;
      } else {
        //else
        this.dialogForm.deptCode = row.dept.deptCode;
        this.dialogForm.deptName = row.dept.deptName;
        this.dialogForm.leader = row.empNo;
        this.dialogForm.leaderName = row.empName;
      }
    },
    getRowkey(row) {
      row.id = row.empNo;
      return row.empNo;
    },
    expandChange(row, expandedRows) {
      if (this.expand[0] === row.empNo) {
        this.expand = [];
      } else {
        this.expand = [row.empNo];
      }
    },
    restQueryParams() {
      this.searchValue = "";
      this.queryParams = {
        deptName: null,
        deptCode: null,
        empName: "",
        empNo: null,
        pageNum: 1,
        rankId: null
      };
    },
    restQuery() {
      this.restQueryParams();
      this.queryWithFilter(1);
    },
    queryWithFilter(pageNum) {
      this.expand = [];
      this.tableLoading = true;
      this.queryParams.pageNum = pageNum;
      this.$store
        .dispatch("staffManager/getStaff", this.queryParams)
        .then(res => {
          setTimeout(() => {
            this.dataSource = res.data.list;
            this.paginationConfig.total = res.data.total;
            this.paginationConfig.pageSize = res.data.pageSize;
            this.tableLoading = false;
          }, 0.5 * 1000);
        });
    },
    ScrollItemClick(row) {
      this.restQueryParams();
      this.queryParams.deptName = row.deptName;
      this.queryParams.deptCode = row.deptCode;
      this.queryWithFilter(1);
    },
    currentChange(pageNum) {
      this.paginationConfig.currentPage = pageNum;
      this.queryWithFilter(pageNum);
    }
  }
};
</script>

<style lang='scss'>
</style>