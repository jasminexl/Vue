<template>
    <div class="wrapper">
      <div class="content">
        <header>
          <span>Girls</span>
        </header>
        <main>
          <section class="option">
            <el-input size="small" v-model="qid"></el-input>
            <button @click="queryId" style="margin-right: 50px">ID查询</button>
            <el-input size="small" v-model="qage"></el-input>
            <button @click="queryAge">年龄查询</button>
          </section>
          <section class="result">
            <table class="datatable">
              <thead>
              <tr>
                <th>编号</th>
                <th>年龄</th>
                <th>公司</th>
                <th>姓名</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-show="!isquery" v-for="(girl, index) in girlList" :class="{odd: index % 2 === 1}">
                <td>{{girl.id}}</td>
                <td>
                  <span>{{girl.age}}</span>
                </td>
                <td>
                  <span>{{girl.company ? girl.company : '未知'}}</span>
                </td>
                <td>
                  <span>{{girl.name ? girl.name : '未知'}}</span>
                </td>
                <td>
                  <button :id="index" @click="popEdit(index)">编辑</button>
                  <button :id="index" @click="del(girlList[index].id)">删除</button>
                </td>
              </tr>
              <tr v-show="isquery">
                <td>{{girlList.id}}</td>
                <td>
                  <span>{{girlList.age}}</span>
                </td>
                <td>
                  <span>{{girlList.company ? girlList.company : '未知'}}</span>
                </td>
                <td>
                  <span>{{girlList.name ? girlList.name : '未知'}}</span>
                </td>
                <td>
                  <button @click="popEdit('')">编辑</button>
                  <button @click="del(girlList.id)">删除</button>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="add">
              <button @click="popAdd">添加</button>
            </div>
          </section>
        </main>
      </div>
      <div class="popupbg" v-show="isadd || isedit" @click="unPop"></div>
      <div class="popup" id="popup">
        <div v-show="isadd" class="addgirl">
          <span>添加</span>
          <input type="text" placeholder="请输入age" v-model="age"/>
          <input type="text" placeholder="请输入company" v-model="company"/>
          <input type="text" placeholder="请输入name" v-model="girlname"/>
          <button @click="add">提交</button>
        </div>
        <div v-show="isedit" class="editgirl">
          <span>编辑</span>
          <input type="text" placeholder="id" v-model="girlid"/>
          <input type="text" placeholder="age" v-model="age"/>
          <input type="text" placeholder="company" v-model="company"/>
          <input type="text" placeholder="name" v-model="girlname"/>
          <button @click="edit">提交</button>
        </div>
      </div>
    </div>
</template>

<script>
  import Loading from '../commom/loading'
  export default {
    components: {
      Loading
    },
    name: 'ordertest',
    data () {
      return {
        girlid: '',
        girlname: '',
        age: '',
        company: '',
        qid: '',
        qage: '',
        isadd: false,
        isedit: false,
        isquery: false,
        girlList: {},
        editid: ''
      }
    },
    created () {
      this.getData()
    },
    mounted () {
    },
    methods: {
      // 获得数据
      getData () {
        this.$http.get('/girl/getGirls')
          .then((res) => {
            console.log(res)
            console.log(res.data)
            this.girlList = res.data
            // if (!this.girlList[1]) {
            //   this.isquery = true
            // } else {
            //   this.isquery = false
            // }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 通过ID查询
      queryId () {
        if (this.qid) {
          this.$http.get('/girl/getGirl', {
            params: {
              id: this.qid
            }
          })
            .then((res) => {
              console.log(res.data)
              this.girlList = res.data
              this.qid = ''
              this.isquery = true
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
              } else if (err.request) {
                console.log(err.request)
              } else {
                console.log('Error', err.message)
              }
              console.log(err.config)
            })
        } else {
          alert('请输入要查询的ID')
        }
      },
      // 通过age查询
      queryAge () {
        if (this.qage) {
          this.$http.get('/girl/findByAge', {
            params: {
              age: this.qage
            }
          })
            .then((res) => {
              console.log(res.data)
              this.girlList = res.data
              this.qage = ''
              if (!this.girlList[1].id) {
                this.isquery = true
              }
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
              } else if (err.request) {
                console.log(err.request)
              } else {
                console.log('Error', err.message)
              }
              console.log(err.config)
            })
        } else {
          alert('请输入要查询的年龄')
        }
      },
      // 添加弹窗
      popAdd () {
        this.isadd = true
        this.girlid = ''
        this.age = ''
        this.cupSize = ''
        this.girlname = ''
        document.getElementById('popup').style.display = 'block'
      },
      // 编辑弹窗
      popEdit (index) {
        console.log(index)
        if (index || index === 0) {
          this.girlid = this.girlList[index].id
          this.age = this.girlList[index].age
          this.company = this.girlList[index].company
          this.girlname = this.girlList[index].name
        } else {
          this.girlid = this.girlList.id
          this.age = this.girlList.age
          this.company = this.girlList.company
          this.girlname = this.girlList.name
        }
        this.isedit = true
        document.getElementById('popup').style.display = 'block'
      },
      // 关闭弹窗
      unPop () {
        this.isedit = false
        this.isadd = false
        document.getElementById('popup').style.display = 'none'
      },
      // 添加girl
      add () {
        if (this.girlname && this.age && this.company) {
          if (this.age > 17) {
            this.$http.post('/girl/addGirl01', {
              name: this.girlname,
              age: this.age,
              company: this.company
            })
              .then((res) => {
                console.log(res.data)
                this.getData()
              })
              .catch((err) => {
                if (err.response) {
                  console.log(err.response.data)
                  console.log(err.response.status)
                  console.log(err.response.headers)
                  if (err.response.status === 500) {
                    alert('未成年少女禁止入内！')
                  }
                } else if (err.request) {
                } else {
                  console.log('Error', err.message)
                }
                console.log(err.config)
              })
            this.unPop()
          } else {
            alert('未成年少女禁止入内！')
          }
        } else {
          alert('请填写完整信息！')
        }
      },
      // 编辑girl
      edit () {
        if (this.girlname && this.age && this.company) {
          if (this.age > 17) {
            this.$http.put('/girl/putGirl', {
              id: this.girlid,
              name: this.girlname,
              age: this.age,
              company: this.company
            })
              .then((res) => {
                console.log(res.data)
                this.getData()
              })
              .catch((err) => {
                if (err.response) {
                  console.log(err.response.data)
                  console.log(err.response.status)
                  console.log(err.response.headers)
                } else if (err.request) {
                } else {
                  console.log('Error', err.message)
                }
                console.log(err.config)
              })
            this.unPop()
          } else {
            alert('未成年少女禁止入内！')
          }
        } else {
          alert('请填写完整信息！')
        }
      },
      // 删除girl
      del (id) {
        let r = confirm('确认删除此girl吗？')
        if (r === true) {
          this.$http.delete('/girl/delGirl', {
            params: {
              id: id
            }
          })
            .then((res) => {
              console.log(res.data)
              this.getData()
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
              } else if (err.request) {
                console.log(err.request)
              } else {
                console.log('Error', err.message)
              }
              console.log(err.config)
            })
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/base.css";
  .add {
    margin-top: 10px;
    margin-left: 20px;
  }
  .add button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }

</style>
