<template>
    <header class="myHeader">
        <div class="circle">
            <h3>FE-DU</h3>
        </div>
        <ul class="menu">
            <li v-for="link in links">
                <a :href="link.href">
                    {{link.name}}
                </a>
            </li>
        </ul>
    </header>
</template>

<script>
    export default{
        data(){
            return{
                links:null,
            }
        },
        created(){
            this.$http.post('/getLinks')
                    .then((response)=> {
                        this.links = JSON.parse(response.body)
                    })
        }

    }
</script>

<style>

</style>
