<template>
    <Card>
        <p style="text-align: left" slot="title">用户管理</p>
        <Button slot="extra" type="primary" icon="md-add" @click="addModal=true">添加用户</Button>
        <Table border :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="username">
                <strong>{{ row.username }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="initForm(index)">Edit</Button>
                <Button type="error" size="small" @click="remove(index)">Delete</Button>
            </template>
        </Table>
        <Modal
                v-model="addModal"
                title="添加用户">
            <Form ref="addUserForm" :model="addData" :rules="addValidate" :label-width="80">
                <FormItem label="用户名" prop="username">
                    <Input v-model="addData.username" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="addData.password" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="角色" prop="role">
                    <Input v-model="addData.role" placeholder="Enter your role"></Input>
                </FormItem>

            </Form>
            <Button slot="footer" type="primary" @click="addUser('addUserForm')">确认添加</Button>
        </Modal>
        <Modal
                v-model="editModal"
                title="修改用户">
            <Form ref="editUserForm" :model="editData" :rules="addValidate" :label-width="80">
                <FormItem label="用户名" prop="username">
                    <Input v-model="editData.username" placeholder="Enter your name" disabled></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="editData.password" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="角色" prop="role">
                    <Input v-model="editData.role" placeholder="Enter your role"></Input>
                </FormItem>

            </Form>
            <Button slot="footer" type="primary" @click="editUser('editUserForm')">确认修改</Button>
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
  import {reqAddUser, reqDeleteUser, reqUpdateUser, reqUsers} from "../api";

  export default {
    name: "User",
    mounted() {
      this.initData()
    },
    data() {
      return {
        columns: [
          {
            title: '用户名',
            slot: 'username',
            key: 'username'
          },
          {
            title: '密码',
            key: 'password'
          },
          {
            title: '角色',
            key: 'role'
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
        deleteModal:false,
        deleteIndex:-1,
        deleteModalLoading:false,
        addData: {
          username: '',
          password: '',
          role: ''
        },
        editData: {
          username: '',
          password: '',
          role: ''
        },
        addValidate: {
          username: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          role: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ]
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
        const username = this.data[this.deleteIndex].username
        console.log('username=>',username)
        const result = await reqDeleteUser(username,this)
        if(result.code===200){
          this.initData();
          this.deleteModalLoading = false
          this.deleteModal = false
        }else {
          this.$Message.error('删除失败')
        }
      },
      async initData() {
        const result = await reqUsers(this)
        if (result.code === 200) {
          this.data = result.data
        } else {
          this.$Message.error("获取用户信息失败！")
        }
      },
      addUser(name) {
        this.$refs[name].validate(async valid => {
          if(valid){
            const {username,password,role} = this.addData
            const result = await reqAddUser(username,password,role,this)
            if(result.code===200){
              this.initData()
              this.$Message.success('添加用户成功！')
              this.addModal = false
            }else {
              this.$Message.error('添加用户失败！')
            }
          }
        })
        // const result = await reqAddUser()
      },
      editUser(name){
        this.$refs[name].validate(async valid => {
          if(valid){
            const {username,password,role} = this.editData
            const result = await reqUpdateUser(username,password,role,this)
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
