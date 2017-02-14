import Vue 			from 'vue'
import VueResource  from 'vue-resource'
import VueValidator from 'vue-validator'
import VueRouter    from 'vue-router'
import Vuex         from 'vuex'
import editor 		from 'vue-html5-editor'

import Index 		from './components/Index.vue'
import Account 		from './components/Account.vue'
import ArticleList  from './components/ArticleList.vue'
import Editor 		from './components/Editor.vue'
import EndHeader 	from './components/EndHeader.vue'
import Link 		from './components/Link.vue'
import Login 		from './components/Login.vue'
import Main 		from './components/Main.vue'
import Article 		from './components/Article.vue'
import FrontFooter  from './components/FrontFooter.vue'
import FrontHeader  from './components/FrontHeader.vue'
import Pop 			from './components/Pop.vue'
import Waiting      from './components/Waiting.vue'

import store from './vuex/store'

Vue.use(VueValidator);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(editor);

let router = new VueRouter();

router.map({
	'/':{
		component:Index
	},
	'/login':{
		component:Login
	},
	'/article':{
		component:Article
	},
	'/main':{
		component:Main,
		subRoutes:{
			'/':{
				component:ArticleList
			},
			'/editor':{
				component:Editor
			},
			'/articleList':{
				component:ArticleList
			},
			'/menu':{
				component:Link
			},
			'/account':{
				component:Account
			},
		},
	},
})

let App = Vue.extend({
	data(){
		return {}
	},
	    components: {Waiting,Pop},
	http:{
		root:'/'
	},
	computed:{
		waiting:()=>store.state.waiting,
		pop:()=>store.state.popPara.pop
	},
	store
})

router.start(App,'body');