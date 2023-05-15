<template>
    <div class="main" ref="vantaRef">
        <div class="shell">
            <div class="container a-container" id="a-container" :class="{ 'is-txl': LoginShow }">
                <form action="" method="" class="form" id="a-form">
                    <h2 class="form_title title">创建账号</h2>

                    <span class="form_span">选择注册方式活电子邮箱注册</span>
                    <input type="text" class="form_input" v-model="registerForm.userName" placeholder="账号">
                    <input type="password" class="form_input" v-model="registerForm.password" placeholder="密码">
                    <input type="text" class="form_input" v-model="registerForm.nickName" placeholder="昵称">
                    <input type="text" class="form_input" v-model="registerForm.email" placeholder="邮箱">
                    <div class="emailVerify">
                        <input type="text" class="form_input" v-model="registerForm.emailCode" placeholder="请输入邮箱验证码" />
                        <el-button @click="emailVerify" round>获取邮箱验证码</el-button>
                    </div>
                    <button class="button submit" @click="BtnRegister">SIGN UP</button>
                </form>
            </div>

            <div class="container b-container" id="b-container" :class="{ 'is-txl': LoginShow, 'is-z': LoginShow }">
                <form action="" method="" class="form" id="b-form">
                    <h2 class="form_title title">登入账号</h2>

                    <input type="text" class="form_input" v-model="loginForm.userName" placeholder="账号">
                    <input type="password" class="form_input" v-model="loginForm.password" placeholder="密码">


                    <div class="loginImg">
                        <input type="text" class="form_input" v-model="loginForm.code" placeholder="请输入验证码" />
                        <img :src="loginImg" @click="captchaImage" alt="" />
                    </div>


                    <button class="button submit" @click="BtnLogin">SIGN IN</button>
                </form>
            </div>

            <div class="switch" id="switch-cnt" :class="{ 'is-txr': LoginShow, 'is-gx': isGX }">
                <div class="switch_circle" :class="{ 'is-txr': LoginShow }"></div>
                <div class="switch_circle switch_circle-t" :class="{ 'is-txr': LoginShow }"></div>
                <div class="switch_container" id="switch-c1" :class="{ 'is-hidden': LoginShow }">
                    <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
                    <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
                    <button class="switch_button button switch-btn" @click="changeForm">SIGN IN</button>
                </div>

                <div class="switch_container" id="switch-c2" :class="{ 'is-hidden': !LoginShow }">
                    <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
                    <p class="switch_description description">去注册一个账号，让我们踏入奇妙的旅途！</p>
                    <button class="switch_button button switch-btn" @click="changeForm">SIGN UP</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reqLogin, reqgetInfo, reqregister, reqcaptchaImage, reqemailVerify } from "@/api";
import { mapMutations } from "vuex";
// import * as THREE from 'three'
// import NET from 'vanta/src/vanta.net'

export default {
    data() {
        return {
            LoginShow: false,
            isGX: false,
            registerForm: {
                email: "",
                nickName: "",
                userName: "",
                password: "",
                emailCode: '',
                uuid: '',
            },
            loginForm: {
                userName: "",
                password: "",
                code: "",
                uuid: '',
            },
            loginImg: ''
        }
    },
    mounted() {
        this.changeForm()
        this.captchaImage()
        // this.vantaEffect = NET({
        //     el: this.$refs.vantaRef,
        //     THREE: THREE,
        //     mouseControls: true,
        //     touchControls: true,
        //     gyroControls: false,
        //     minHeight: 200.00,
        //     minWidth: 200.00,
        //     scale: 1.00,
        //     scaleMobile: 1.00,
        //     backgroundColor: 0xEFEFEF,
        //     color: 0x000000,
        //     maxDistance: 10.00,
        // })
    },
    methods: {
        ...mapMutations("user", ["updateUser", 'updateToken']),
        async emailVerify() {
            if (!this.registerForm['email']) {
                this.$message({
                    showClose: true,
                    message: '请填写邮箱'
                });

            }
            let res = await reqemailVerify({ emailAddress: this.registerForm.email })
            if (res.code == 200) {
                console.log('res111', res)
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: res.msg
                });
                this.registerForm.uuid = res.data
            }
        },
        async captchaImage() {
            let res = await reqcaptchaImage()
            if (res.code == 200) {
                // console.log("res", res)
                this.loginImg = `data:image/gif;base64,${res.img}`;
                this.loginForm.uuid = res.uuid
            }
        },
        changeForm() {

            this.isGX = true
            setTimeout(() => {
                this.isGX = false
            }, 1500)
            this.LoginShow = !this.LoginShow

        },
        async register(form) {
            let res = await reqregister(form);
            if (res.code == 200) {
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: '注册成功'
                });

                console.log("regres", res);
                this.changeForm()
            } else {
                alert(res.msg);
            }
        },
        BtnRegister() {
            console.log(this.registerForm);
            let valid = true
            let keys = Object.keys(this.registerForm)
            for (let i = 0; i < keys.length; i++) {
                if (!this.registerForm[keys[i]]) {
                    this.$message({
                        showClose: true,
                        message: '请填写完整注册信息'
                    });
                    valid = false
                    break
                }
            }
            if (valid) {
                this.register(this.registerForm);
            }
        },
        async login(form) {
            let res = await reqLogin(form);
            if (res.code == 200) {
                this.updateToken(res.token)
                let res1 = await reqgetInfo();
                this.updateUser(res1.user);
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: '登陆成功'
                });
                this.$router.push({ path: "/home" });
            } else {

                this.$message({
                    showClose: true,
                    type: 'error',
                    message: res.msg
                });
            }
        },
        BtnLogin() {
            console.log(this.loginForm);
            let valid = true
            let keys = Object.keys(this.loginForm)
            for (let i = 0; i < keys.length; i++) {
                if (!this.loginForm[keys[i]]) {
                    this.$message({
                        showClose: true,
                        message: '请填写完整登陆信息'
                    });
                    valid = false
                    break
                }
            }
            if (valid) {
                console.log("Asdd")
                this.login(this.loginForm);
            }
        },
    },
    computed: {

    },
}
</script>
<style scoped lang='less'>
.emailVerify {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    display: flex;
    justify-content: space-between;

}

.loginImg {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    display: flex;
    justify-content: space-between;

    img {
        border-radius: 8px;
        border: none;
        width: 40%;
        height: 100%;
        cursor: pointer;
    }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* 字体无法选中 */
    user-select: none;
}

.main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background-color: rgb(239, 239, 239);
    color: #a0a5a8;
}

.shell {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    background-color: rgb(239, 239, 239);
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
}


.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: rgb(239, 239, 239);
    transition: 1.25s;

    .form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .form_input {
            width: 350px;
            height: 40px;
            margin: 4px 0;
            padding-left: 25px;
            font-size: 13px;
            letter-spacing: 0.15px;
            border: none;
            outline: none;
            background-color: rgb(239, 239, 239);
            transition: 0.25s ease;
            border-radius: 8px;
            box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        }

        .form_input:focus {
            box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
        }

        .form_span {
            margin-top: 30px;
            margin-bottom: 12px;
        }

        .form_link {
            color: #181818;
            font-size: 15px;
            margin-top: 25px;
            border-bottom: 1px solid #a0a5a8;
            line-height: 2;
        }


    }

}





.title {
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: #181818;
    letter-spacing: 10px;
}

.description {
    font-size: 14px;
    letter-spacing: 0.25px;
    text-align: center;
    line-height: 1.6;
}

.button {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.15px;
    background-color: #4B70E2;
    color: #f9f9f9;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    border: none;
    outline: none;
}

.submit:hover {
    box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
    transform: scale(0.985);
    transition: 0.25s;
    cursor: pointer;
}

.a-container {
    z-index: 100;
    left: calc(100% - 600px);
}

.b-container {
    left: calc(100% - 600px);
    z-index: 0;
}

.switch_circle {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: rgb(239, 239, 239);
    box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
    bottom: -60%;
    left: -60%;
    transition: 1.25s;
}

.switch_circle-t {
    top: -30%;
    left: 60%;
    width: 300px;
    height: 300px;
}

.switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: rgb(239, 239, 239);
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;


    .switch_container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        width: 400px;
        padding: 50px 55px;
        transition: 1.25s;
    }

    .switch_button {
        cursor: pointer;
    }

    .switch_button:hover {
        box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
        transform: scale(0.985);
        transition: 0.25s;
        cursor: pointer;
    }

    .switch_button:active,
    .switch_button:focus {
        box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
        transform: scale(0.97);
        transition: 0.25s;
    }

}


.is-txr {
    left: calc(100% - 400px);
    transition: 1.25s;
    transform-origin: left;
}

.is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
}

.is-z {
    z-index: 200;
    transition: 1.25s;
}

.is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
}

.is-gx {
    animation: is-gx 1.25s;
}

@keyframes is-gx {

    0%,
    10%,
    100% {
        width: 400px;
    }

    30%,
    50% {
        width: 500px;
    }
}
</style>
