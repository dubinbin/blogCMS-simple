<template>
    <div class="wrap">
        <front-header></front-header>
        <section class="index">
            <ul>
                <li class="item"
                    v-for="year in years">
                    <p>{{year}}</p>
                    <ul>
                        <li v-for="article in index[year]">
                            <span class="date">
                                {{article.date | dateParse}}
                            </span>
                            <span class="title"
                                  @click="detail(article._id)">
                                {{article.title}}
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        <front-footer></front-footer>
    </div>
</template>

<script>
import frontHeader from './FrontHeader.vue'
import frontFooter from './FrontFooter.vue'
export default {
  data () {
    return {
        articles : null,
        years:[1],
    }
  },
  filters:{
    dateParse:value=>{
        let d = new Date(value)
        return d.getFullYear() + '年' +
         (d.getMonth()+1)+ '月' +
          d.getDate()+ '日'
    }
  },
  created(){
    this.$http.get('/articleList')
      .then((response)=>{
        let arcs = JSON.parse(response.body);
        this.articles = arcs.sort((i,j)=>{
            return new Date(j.date)- new Date(i.date)
        })
       })
    },
  methods:{
    detail(id){
        this.$router.go('/article?id='+id);
    }
  },
  components:{
    frontHeader,
    frontFooter,
  },
  computed:{
    index(){
        //如果没有文章
        if(!this.articles){
            return {1:[{title : '',date : ''}]};
        }
        //如果有
        let index = {};
        this.years.splice(0,1);//删除上面data里面数组的默认值
        this.articles.forEach(atc=>{
            let year = new Date(atc.date).getFullYear();
            if(!index[year]){
                this.years.push(year);
                index[year]= [];
            }
            index[year].push(atc);
        })
     return index
    }
  }
}
</script>

<style>

</style>
