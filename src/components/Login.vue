<template>
 <section class="login">
        <validator name="loginValidator">
            <div class="form" @keyup.enter="loginRequest">
                <p>
                    <i class="fa fa-fire fa-2x"></i>
                </p>
                <p>
                    <i class="fa fa-user fa-fw"></i>
                    <input id="userName"  type="text" name="userName" placeholder="用户名"
                           v-model="userName"
                           initial="off"
                           detect-change="off"
                           detect-blur="off"
                           v-validate:user-name="userRule">
                    <label for="userName"
                           v-if="$loginValidator.userName.pattern">
                        <i class="fa fa-exclamation-triangle"></i>
                        <span>账号不能包含字母数字和下划线以外的字符</span>
                    </label>
                </p>
                <p>
                    <i class="fa fa-key fa-fw"></i>
                    <input id="password" type="password" placeholder="密码"
                           v-model="password"
                           initial="off"
                           detect-change="off"
                           detect-blur="off"
                           v-validate:password="passwordRule">
                    <label for="password"
                           v-if="$loginValidator.password.minlength">
                        <i class="fa fa-close"></i>
                        <span>密码太短</span>
                    </label>
                    <label for="password"
                           v-if="true">
                        <span>{{info}}</span>
                    </label>
                </p>
                <p>
                    <button @click="loginRequest">登陆
                    </button>
                </p>
            </div>
        </validator>
    </section>
</template>

<script>
    import {toggle, setUser}    from '../vuex/actions'
    import {get, set}           from '../js/cookieUtil'
    export default{
        data(){
            return {
                userName: '',
                password: '',
                info: '',
                userRule: {
                    pattern: '/^[a-zA-Z0-9\u4e00-\u9fa5_]+$/',
                },
                passwordRule: {
                    minlength: 1,
                    maxlength: 16,
                }

            }
        },
        created(){
            let userName = get('user')
            if (userName) {
                this.setUser(userName)
                this.$router.go('/main')
            }
        },
        methods: {
            loginRequest(){
                this.userName = this.userName.trim()
                this.$validate(true, ()=> {
                    if (this.$loginValidator.valid) {
                        this.toggle()
                        this.$http.post('/login', {
                            userName: this.userName,
                            password: this.password
                        }).then((response)=> {
                            this.loginResponse(response)
                        }, (response)=> {
                            console.log(response)
                        })
                    }
                })
            },

            loginResponse(response, name = this.userName){
                this.toggle()
                let body = JSON.parse(response.body)
                this.info = body.state
                if (body.state === '登陆成功') {
                    this.userName = name
                    this.setUser(this.userName)
                    let date = new Date(Date.now() + 60000 * 30)
                    let hostName = location.hostname
                    set('user', this.userName, date, '/', hostName)
                    this.$router.go('/main')
                }
            },
        },
        vuex: {
            actions: {
                toggle,
                setUser,
            }
        }
    }
</script>

<style>

</style>
