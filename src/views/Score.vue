<template>
    <Card>
        <p style="text-align: left" slot="title">成绩管理</p>
        <Button slot="extra" type="primary" icon="md-add" @click="addModal=true">添加成绩</Button>
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
                title="添加成绩">
            <Form ref="addScoreForm" :model="addData" :rules="addValidate" :label-width="80">
                <FormItem label="学号" prop="stuNo">
                    <Input v-model="addData.stuNo" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="课程" prop="course">
                    <Input v-model="addData.course" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="成绩" prop="score">
                    <Input v-model="addData.score" placeholder="Enter your role"></Input>
                </FormItem>
                <FormItem label="任课老师" prop="teacher">
                    <Input v-model="addData.teacher" placeholder="Enter your role"></Input>
                </FormItem>

            </Form>
            <Button slot="footer" type="primary" @click="add('addScoreForm')">确认添加</Button>
        </Modal>
        <Modal
                v-model="editModal"
                title="修改成绩">
            <Form ref="editScoreForm" :model="editData" :rules="addValidate" :label-width="80">
                <FormItem label="学号" prop="stuNo">
                    <Input v-model="editData.stuNo" placeholder="Enter your name" disabled></Input>
                </FormItem>
                <FormItem label="课程" prop="course">
                    <Input v-model="editData.course" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="成绩" prop="score">
                    <Input v-model="editData.score" placeholder="Enter your role"></Input>
                </FormItem>
                <FormItem label="任课老师" prop="teacher">
                    <Input v-model="editData.teacher" placeholder="Enter your role"></Input>
                </FormItem>

            </Form>
            <Button slot="footer" type="primary" @click="edit('editScoreForm')">确认修改</Button>
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
    reqAddScore,
    reqAddUser,
    reqDeleteScore,
    reqDeleteUser,
    reqScores,
    reqUpdateScore,
    reqUpdateUser,
    reqUsers
  } from "../api";

  export default {
    name: "Score",
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
            title: '课程',
            key: 'course'
          },
          {
            title: '成绩',
            key: 'score'
          },
          {
            title: '任课老师',
            key: 'teacher'
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
        addData: {
          username: '',
          password: '',
          role: ''
        },
        addValidate: {
          stuNo: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          course: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          score: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          teacher: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
        }
      }

    },

    methods: {
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
        const {stuNo,course} = this.data[this.deleteIndex]
        const result = await reqDeleteScore(stuNo,course,this)
        if(result.code===200){
          this.initData();
          this.deleteModalLoading = false
          this.deleteModal = false
        }else {
          this.$Message.error('删除失败')
        }
      },
      async initData() {
        const result = await reqScores(this)
        if (result.code === 200) {
          this.data = result.data
        } else {
          this.$Message.error("获取成绩信息失败！")
        }
      },
      add(name) {
        this.$refs[name].validate(async valid => {
          if(valid){
            const {stuNo,course,score,teacher} = this.addData
            const result = await reqAddScore(stuNo,course,score,teacher,this)
            if(result.code===200){
              this.initData()
              this.$Message.success('添加成绩成功！')
              this.addModal = false
            }else {
              this.$Message.error('添加成绩失败！')
            }
          }
        })
        // const result = await reqAddUser()
      },
      edit(name){
        this.$refs[name].validate(async valid => {
          if(valid){
            const {stuNo,course,score,teacher} = this.editData
            const result = await reqUpdateScore(stuNo,course,score,teacher,this)
            if(result.code===200){
              this.initData()
              this.$Message.success('修改用户成功！')
              this.editModal = false
            }else {
              this.$Message.error('修改用户失败！')
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
