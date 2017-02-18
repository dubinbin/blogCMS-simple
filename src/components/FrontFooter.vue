<template>
    <footer>
        <div class="copyright">
            &copy;2016-2017 szdubinbin@gmail.com 
        </div>
        <div class="login" @click="login">
            登陆 | Login
        </div>
    </footer>
</template>

<script>
export default{
    methods:{
        login(){
            this.$router.go('/login')
        }
    }
}
</script>

<style>

</style>
