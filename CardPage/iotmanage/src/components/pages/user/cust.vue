<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>客户管理</span>
        </header>
        <div class="main-content">
          <div class="option">
            <div class="inline">
              <span>客户账户：</span>
              <div class="half">
                <el-input size="mini" placeholder="客户账户" v-model="query.custAccount" @keyup.enter.native="queryAccount" ></el-input>
              </div>
            </div>
            <div class="inline">
              <el-button class="button" type="primary" size="mini" :disabled="loading" @click="queryAccount">查询</el-button>
            </div>
          </div>
          <div class="result" v-loading="loading" element-loading-text="拼命加载中">
            <el-table :data="custData" border size="small" style="width: 100%">
              <el-table-column prop="id" label="客户ID"></el-table-column>
              <el-table-column prop="custAccount" label="客户账号"></el-table-column>
              <el-table-column prop="custMobile" label="客户手机号码"></el-table-column>
              <el-table-column prop="custMail" label="客户电子邮箱"></el-table-column>
              <el-table-column prop="updateTime" label="更新日期"></el-table-column>
              <el-table-column prop="insertTime" label="注册日期"></el-table-column>
              <el-table-column label="操作" width="100px" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="modify(scope.row)">修改密码</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="foot-page">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pagination.curpage"
                :page-size="pagination.pagesize"
                layout="total, prev, pager, next, jumper"
                :total="pagination.totalsize">
              </el-pagination>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
  import md5 from 'js-md5'
  export default {
    name: "cust",
    data () {
      return {
        loading: false,
        query: {
          custAccount: ''
        },
        custData: [],
        pagination: {
          curpage: 1,
          pagesize: 12,
          totalsize: null
        }
      }
    },
    created () {
      this.queryAccount()
    },
    methods: {
      queryAccount () {
        this.loading = true
        this.$ajax.get('/caihiot/api-user/user/getalluser', {
          params: {
            custAccount: this.query.custAccount,
            page: this.pagination.curpage,
            limit: this.pagination.pagesize
          }
        })
          .then((res) => {
            console.log(res.data)
            this.custData = res.data.list.list
            this.pagination.totalsize = res.data.list.totalCount
            this.pagination.pagesize = res.data.list.pageSize
            this.pagination.curpage = res.data.list.currPage
            this.loading = false
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
          })
      },
      modify (row) {
        this.$messageBox.prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'password',
          inputPlaceholder: '密码应为6~16位字母和数字',
          inputPattern: /^[a-zA-Z0-9]{6,16}$/,
          inputErrorMessage: '密码应为6~16位字母和数字'
        }).then(({ value }) => {
          this.$ajax.get("/caihiot/api-user/user/changepswadmin", {
            params: {
              id: row.id,
              newpsw: md5(value)
            }
          })
            .then((res) => {
              console.log(res.data)
              this.$message.success("修改密码成功")
              this.queryAccount()
            })
            .catch((err) => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      handleCurrentChange (val) {
        console.log('val', val)
        this.pagination.curpage = val
        this.queryAccount()
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/base.css";
</style>
