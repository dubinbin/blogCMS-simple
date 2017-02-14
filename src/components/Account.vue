<template>
  <section class="account">
        <div class="title">修改密码</div>
        <div class="password">
            <i class="fa fa-key fa-fw"></i>
            <input class="form-control" type="password" placeholder="输入新密码" v-model="pw">
            <i class="fa fa-key fa-fw"></i>
            <input class="form-control" type="password" placeholder="确认密码" v-model="rpw">
        </div>
        <div class="panel">
            <button class="btn btn-primary" @click="savePw">保存</button>
        </div>
  </section>
</template>

<script>
    import {userName}   from '../vuex/getters'
    import {pop}        from '../vuex/actions'
    
export default {
  data () {
    return {
      pw:'',
      rpw:''
    }
  },
  methods:{
    savePw(){
      if (this.pw === this.rpw) {
        this.$http.post('/savePw', {
            userName:this.userName,
            password:this.pw
        }).then(()=> {
            this.pop({
                pop: true,
                content: '保存成功',
                cb1: function () {
                    this.pop({})
                }.bind(this)
            })
        })
    }else {
        this.pop({
            pop: true,
            content: '两次输入不一致',   //调用pop里面的文字，组件复用
            cb1: function () {
                this.pop({})
            }.bind(this)
        })
    }
   }
  },
    vuex: {
    getters: {
        userName
    },
    actions: {
        pop
    }
  }
    }
</script>

<style>
.title{
  text-align: center;
}
</style>
