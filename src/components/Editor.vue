<template>
    <section class="editor">
        <input class="title" placeholder="标题" v-model="title">
        <div :class="view">
            <vue-html5-editor :content.sync="content" :height="500"></vue-html5-editor>
        </div>
        <div class="panel">
            <button class="save" @click="send">保存</button>
        </div>
    </section>
</template>

<script>
    import {userName}    from '../vuex/getters'
    import {pop}         from '../vuex/actions'

    export default {
      data () {
        return {
            title:'',
            content: '',
            date:'',
            id:'',
            view:'edit'
        }
      },
            created(){
                if (this.$route.query.id) {
                    let id = this.$route.query.id
                    this.$http.get('/article?id=' + id)
                            .then((response)=> {
                                let body = JSON.parse(response.body)
                                this.content = body.content
                                this.title = body.title
                                this.date = body.date
                                this.id = id
                            })
                } else {
                    this.date = new Date().toLocaleDateString()
                }
            },

            methods: {
                send(){
                    this.title = this.title.trim()
                    this.date = new Date()

                    if (!this.title) {
                        alert('请输入标题')
                        return
                    }

                    this.$http.post('/save', this.$data)
                            .then(()=> {
                                this.pop({
                                    pop: true,
                                    content: '保存成功',
                                    cb1: function () {
                                        this.pop({})
                                        this.$router.go('/main/articleList')
                                    }.bind(this)
                                })
                            })
                },
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

<style lang="sass">
    @import "../style/components/Editor.scss";
</style>
