<template>
  <div>
    <el-card style="min-height:600px;">
      <el-form inline>
        <el-form-item label="部门编号:">
          <el-input
            size="mini"
            prefix-icon="el-icon-data-analysis"
            type="text"
            v-model="queryParams.deptCode"
            autocomplete="off"
            placeholder="部门编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门名称:">
          <el-input
            size="mini"
            prefix-icon="el-icon-data-analysis"
            type="text"
            v-model="queryParams.deptName"
            autocomplete="off"
            placeholder="部门编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门线路:">
          <el-select size="mini" v-model="queryParams.line" placeholder>
            <el-option
              v-for="(item,key) in  selectOption"
              :key="key"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="queryWithFilter">查询</el-button>
          <el-button size="small" @click="restQueryParams">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button size="small" type="primary" @click="showAddDepartForm">添加部门</el-button>
      <el-table v-loading="tableLoading" :data="datasource" style="margin-bottom:20px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="部门编号" prop="deptCode"></el-table-column>
        <el-table-column label="部门名称" prop="deptName"></el-table-column>
        <el-table-column label="部门线路" prop="line"></el-table-column>
        <el-table-column label="操作" prop="oper">
          <template slot-scope="scope">
            <el-dropdown>
              <a href="javascript:void(0);" >删除</a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <a href="javascript:void(0);" @click="delDept(scope.row.deptCode)">确定删除</a>
                </el-dropdown-item>
                <el-dropdown-item>取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <a @click="updateDept(scope.row)" style="margin:0px 10px 0px 10px">更新</a>
            <a @click="showDetail(scope.row)">查看</a>
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
    <!-- 添加部门 -->
    <el-dialog title="添加部门" :visible.sync="addDepartFormVisible" width="30%">
      <el-form label-position="left">
        <el-form-item label="部门编号:">
          <el-input
            style="width:55%"
            prefix-icon="el-icon-data-analysis"
            type="text"
            v-model="addDepartForm.deptCode"
            autocomplete="off"
            placeholder="部门编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门名称:">
          <el-input
            style="width:55%"
            prefix-icon="el-icon-data-analysis"
            type="text"
            v-model="addDepartForm.deptName"
            autocomplete="off"
            placeholder="部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门线路:">
          <el-select style="width:55%" v-model="addDepartForm.line" placeholder>
            <el-option
              v-for="(item,key) in  selectOption"
              :key="key"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>{addDepartFormVisible = false;this.resetAddDepartForm()}">取 消</el-button>
        <el-button type="primary" @click="addDepart">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 更新部门 -->
    <el-dialog title="更新部门" :visible.sync="updateDepartFormVisible" width="30%">
      <el-form label-position="left">
        <el-form-item label="部门编号:">
          <el-input
            disabled
            style="width:55%"
            prefix-icon="el-icon-data-analysis"
            type="text"
            v-model="updateDepartForm.deptCode"
            autocomplete="off"
            placeholder="部门编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门名称:">
          <el-input
            style="width:55%"
            prefix-icon="el-icon-data-analysis"
            type="text"
            v-model="updateDepartForm.deptName"
            autocomplete="off"
            placeholder="部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门线路:">
          <el-select style="width:55%" v-model="updateDepartForm.line" placeholder>
            <el-option
              v-for="(item,key) in  selectOption"
              :key="key"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>{updateDepartFormVisible = false;this.resetupdateDepartForm()}">取 消</el-button>
        <el-button type="primary" @click="submitUpdateDepart">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapMutations } from "vuex";
export default {
  name: "DepartmentManager",
  mounted() {
    this.departmentList(1);
  },
  data() {
    return {
      queryParams: {
        deptCode: "",
        deptName: "",
        line: "",
        pageNum: 1
      },
      updateDepartForm: {
        deptCode: "",
        deptName: "",
        line: ""
      },
      updateDepartFormVisible: false,
      selectOption: [
        {
          value: "总裁直管线",
          label: "总裁直管线"
        },
        {
          value: "信息战略中心",
          label: "信息战略中心"
        }
      ],
      tableLoading: false,
      addDepartFormVisible: false,
      addDepartForm: {
        deptCode: "",
        deptName: "",
        line: ""
      },
      datasource: [],
      paginationConfig: {
        currentPage: 1,
        total: 0,
        pageSize: 0
      }
    };
  },
  methods: {
    showDetail(row){
      this.$router.push('/pageLayout/DepartmentLayout/departmentDetail')
      console.log(row)
    },
    resetupdateDepartForm() {
      this.updateDepartForm = {
        deptCode: "",
        deptName: "",
        line: ""
      };
    },
    submitUpdateDepart() {
      this.$store
        .dispatch("departmentManager/updateDept", this.updateDepartForm)
        .then(res => {
          if (res.code === "200") {
            Message({
              message: res.message,
              type: "success"
            });
            this.updateDepartFormVisible = false;
            this.departmentList(this.paginationConfig.currentPage);
          } else {
            Message({
              message: res.message,
              type: "warning"
            });
          }
        });
    },
    queryWithFilter() {
      this.queryParams.pageNum = 1;
      this.departmentList(1);
    },
    restQueryParams() {
      this.queryParams = {
        deptCode: "",
        deptName: "",
        line: "",
        pageNum: 1
      };
      this.departmentList(1);
    },
    delDept(deptCode) {
      this.$store.dispatch("departmentManager/delDept", deptCode).then(res => {
        if (res.code === "200") {
          Message({
            message: res.message,
            type: "success"
          });
          this.departmentList(this.paginationConfig.currentPage);
        } else {
          Message({
            message: res.message,
            type: "warning"
          });
        }
      });
    },
    addDepart() {
      this.$store
        .dispatch("departmentManager/addDepartment", this.addDepartForm)
        .then(res => {
          this.resetAddDepartForm();
          this.addDepartFormVisible = false;
          if (res.code === "200") {
            Message({
              message: res.message,
              type: "success"
            });
            this.departmentList(this.paginationConfig.currentPage);
          } else {
            Message({
              message: res.message,
              type: "warning"
            });
          }
        });
    },
    departmentList(pageNum) {
      this.tableLoading = true;
      this.queryParams.pageNum = pageNum;
      this.$store
        .dispatch("departmentManager/departmentList", this.queryParams)
        .then(res => {
          setTimeout(() => {
            this.tableLoading = false;
            this.datasource = res.data.list;
            this.paginationConfig.total = res.data.total;
            this.paginationConfig.pageSize = res.data.pageSize;
          }, 0.5 * 1000);
        });
    },
    currentChange(pageNum) {
      this.paginationConfig.currentPage = pageNum;
      this.departmentList(pageNum);
    },
    showAddDepartForm() {
      this.addDepartFormVisible = true;
      this.resetAddDepartForm();
    },
    resetAddDepartForm() {
      this.addDepartForm = {
        deptCode: "",
        deptName: "",
        line: ""
      };
    },
    updateDept(row) {
      this.updateDepartFormVisible = true;
      this.updateDepartForm = {
        ...row
      };
    }
  }
};
</script>
<style lang="scss" scoped>
</style>