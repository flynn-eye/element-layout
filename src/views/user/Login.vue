<template>
    <div>
        <el-row class='form' type='flex' justify="center">
            <el-col :sm='24' :md='10' :lg='8' :xl='5'>
                <div class='title'>加班管理系统</div>
                <el-tabs v-model="activeTag" @tab-click="handleClick">
                    <el-tab-pane label="账户密码登录" name="loginByPassword">
                        <el-form label-position="left" :rules="rules">
                            <el-form-item>
                                <el-input prefix-icon='el-icon-user' type="text" v-model="passwordForm.userName"
                                    autocomplete="off" placeholder="用户名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input prefix-icon='el-icon-lock' type="password" v-model="passwordForm.password"
                                    autocomplete="off" placeholder="密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div class="formAuto">
                                    <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
                                    <a href="javascript:void(0);">忘记密码</a>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click='passwordLogin' type="primary" style="width:100%;" round>
                                    登录
                                </el-button>
                            </el-form-item>
                            <el-form-item>
                                <div class='formBottom'>
                                    <a href="javascript:void(0);">注册账户</a>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="手机号登录" name="loginByPhone">
                        <el-form>
                            <el-form-item>
                                <el-input prefix-icon='el-icon-mobile-phone' type="text" v-model="phoneForm.phone"
                                    autocomplete="off" placeholder="手机号"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-row type="flex" justify="space-between">
                                    <el-col :span='14'>
                                        <el-input prefix-icon='el-icon-message' type="text" v-model="phoneForm.phone"
                                            autocomplete="off" placeholder="验证码"></el-input>
                                    </el-col>
                                    <el-button @click='getCode' :loading='isLoading' :disabled='isDisable'>
                                        {{getCodeButtonValue}}
                                    </el-button>
                                </el-row>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" style="width:100%;" round>
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <el-dialog title="登录错误" :visible.sync="dialogVisible" width="30%">
            <span>账户或密码错误</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        post
    } from '../../util/http.js'
    export default {
        name: 'Login',
        data() {
            return {
                dialogVisible: false,
                rules: {
                    userName: [{
                        required: true,
                        trigger: 'blur'
                    }]
                },
                activeTag: 'loginByPassword',
                autoLogin: true,
                passwordForm: {
                    userName: '',
                    password: '',
                },
                phoneForm: {
                    phone: '',
                    code: '',
                },
                isLoading: false,
                isDisable: false,
                getCodeButtonValue: '获取验证码'
            }
        },
        methods: {
            passwordLogin() {
                this.$store.dispatch('commonStore/login', {
                        empNo: this.passwordForm.userName,
                        password: this.passwordForm.password
                    })
                    .then(res => {
                        if (res.code === '200') {
                            localStorage.setItem('empNo', res.data.empNo)
                            localStorage.setItem('empName', res.data.empName)
                            localStorage.setItem('rankId', res.data.rankId)
                            localStorage.setItem('leader', res.data.leader)
                            localStorage.setItem('deptCode', res.data.deptCode)
                            this.$router.push('/pageLayout/projectManager')
                        } else {
                            this.dialogVisible = true
                            this.passwordForm = {
                                userName: '',
                                password: '',
                            }
                        }
                    })
            },
            handleClick(val) { //handle panechange
            },
            getCode() {
                this.isLoading = true
                this.isDisable = true
                let time = 60;
                this.getCodeButtonValue = time + '秒后重试'
                let task = setInterval(() => {
                    time--;
                    this.getCodeButtonValue = time + '秒后重试'
                }, 1000)
                setTimeout(() => {
                    this.isLoading = false
                    this.isDisable = false
                    this.getCodeButtonValue = '获取验证码'
                    clearInterval(task)
                }, 60 * 1000)
            }
        }
    }
</script>

<style lang="scss">
    .title {
        font-size: 2.5rem;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
        ;
    }

    .formAuto {
        display: flex;
        justify-content: space-between;
    }

    .formBottom {
        display: flex;
        justify-content: flex-end;
    }
</style>