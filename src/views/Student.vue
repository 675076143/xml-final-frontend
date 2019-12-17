<template>
    <Card>
        <div style="display: flex; align-items: center;padding-bottom: 10px">学生管理
            <Input v-model="searchData" style="width: 30%;margin-left: 10px" search enter-button="Search" placeholder="请输入学号" @on-search="search" />
        </div>
        <Button slot="extra" type="primary" icon="md-add" @click="addModal=true">添加学生信息</Button>
        <Table border :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="stuNo">
                <strong>{{ row.stuNo }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="initForm(index)">Edit</Button>
                <Button type="error" size="small" @click="remove(index)">Delete</Button>
            </template>
        </Table>
        <Modal
                v-model="addModal"
                title="添加学生信息">
            <Form ref="addStudentForm" :model="addData" :rules="addValidate" :label-width="80">
                <FormItem label="学号" prop="stuNo">
                    <Input v-model="addData.stuNo" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="姓名" prop="stuName">
                    <Input v-model="addData.stuName" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="出生日期" prop="birthday">
                    <DatePicker v-model="addData.birthday" type="date" placeholder="Select date" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="籍贯" prop="jiguan">
                    <Input v-model="addData.jiguan" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="地址" prop="address">
                    <Input v-model="addData.address" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="电话" prop="phone">
                    <Input v-model="addData.phone" placeholder="Enter your role"></Input>
                </FormItem>
                <FormItem label="入学日期" prop="date">
                    <DatePicker v-model="addData.date" type="month" placeholder="Select month" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="班级" prop="class">
                    <Input v-model="addData.class" placeholder="Enter your role"></Input>
                </FormItem>
            </Form>
            <Button slot="footer" type="primary" @click="add('addStudentForm')">确认添加</Button>
        </Modal>
        <Modal
                v-model="editModal"
                title="修改成绩">
            <Form ref="editStudentForm" :model="editData" :rules="addValidate" :label-width="80">
                <FormItem label="学号" prop="stuNo">
                    <Input v-model="editData.stuNo" placeholder="Enter your name" disabled></Input>
                </FormItem>
                <FormItem label="姓名" prop="stuName">
                    <Input v-model="editData.stuName" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="出生日期" prop="birthday">
                    <DatePicker v-model="editData.birthday" type="date" placeholder="Select date" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="籍贯" prop="jiguan">
                    <Input v-model="editData.jiguan" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="地址" prop="address">
                    <Input v-model="editData.address" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="电话" prop="phone">
                    <Input v-model="editData.phone" placeholder="Enter your role"></Input>
                </FormItem>
                <FormItem label="入学日期" prop="date">
                    <DatePicker v-model="editData.date" type="month" placeholder="Select month" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="班级" prop="class">
                    <Input v-model="editData.class" placeholder="Enter your role"></Input>
                </FormItem>
            </Form>
            <Button slot="footer" type="primary" @click="edit('editStudentForm')">确认添加</Button>
        </Modal>

        <Modal v-model="deleteModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>确认删除</span>
            </p>
            <div style="text-align:center">
                <p>此操作不可逆</p>
                <p>是否删除？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="deleteModalLoading" @click="del">删除</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
  import {
    reqAddStudent,
    reqAddUser,
    reqDeleteStudent,
    reqDeleteUser, reqSearchScores, reqSearchStudents,
    reqStudents, reqUpdateStudent,
    reqUpdateUser,
    reqUsers
  } from "../api";

  export default {
    name: "Student",
    mounted() {
      this.initData()
    },
    data() {
      return {
        columns: [
          {
            title: '学号',
            slot: 'stuNo',
            key: 'stuNo'
          },
          {
            title: '学生姓名',
            key: 'stuName'
          },
          {
            title: '出生日期',
            key: 'birthday'
          },
          {
            title: '籍贯',
            key: 'jiguan'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '电话',
            key: 'phone'
          },
          {
            title: '入学日期',
            key: 'date'
          },
          {
            title: '班级',
            key: 'class'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        data: [],
        addModal: false,
        editModal:false,
        editData:{},
        deleteModal:false,
        deleteIndex:-1,
        deleteModalLoading:false,
        searchData:'',
        addData: {
          stuNo:"",
          stuName:"",
          birthday:"",
          jiguan:"",
          address:"",
          phone:"",
          date:"",
          class:""
        },
        addValidate: {
          stuNo: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          stuName: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          // birthday: [
          //   {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          // ],
          jiguan: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          address: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          // date: [
          //   {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          // ],
          class: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
        }
      }

    },

    methods: {
      async search(){
        console.log(this.searchData)
        const result = await reqSearchStudents(this.searchData,this)
        console.log(result)
        if (result.code === 200) {
          this.data = result.data
          console.log(this.data)
        } else {
          this.$Message.error("查询成绩信息失败！")
        }
      },
      initForm(index) {
        this.editData = this.data[index]
        this.editModal = true
      },
      remove(index) {
        this.deleteModal = true
        this.deleteIndex = index
      },
      async del(){
        this.deleteModalLoading = true
        const {stuNo} = this.data[this.deleteIndex]
        const result = await reqDeleteStudent(stuNo,this)
        if(result.code===200){
          this.initData();
          this.deleteModalLoading = false
          this.deleteModal = false
        }else {
          this.$Message.error('删除失败')
        }
      },
      async initData() {
        const result = await reqStudents(this)
        if (result.code === 200) {
          this.data = result.data
        } else {
          this.$Message.error("获取学生信息失败！")
        }
      },
      add(name) {
        this.$refs[name].validate(async valid => {
          if(valid){
            const {stuNo,stuName,birthday,jiguan,address,phone,date} = this.addData
            const stuClass = this.addData.class
            const result = await reqAddStudent(stuNo,stuName,birthday,jiguan,address,phone,date,stuClass,this)
            if(result.code===200){
              this.initData()
              this.$Message.success('添加学生信息成功！')
              this.addModal = false
            }else {
              this.$Message.error('添加学生信息失败！')
            }
          }
        })
        // const result = await reqAddUser()
      },
      edit(name){
        this.$refs[name].validate(async valid => {
          if(valid){
            const result = await reqUpdateStudent(this.editData,this)
            if(result.code===200){
              this.initData()
              this.$Message.success('修改学生信息成功！')
              this.editModal = false
            }else {
              this.$Message.error('修改学生信息失败！')
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
