import Home from "./components/home.vue"
import News from "./components/news.vue"
import News1 from "./components/news1.vue"
import News2 from "./components/news2.vue"

export default {
	routes:[
		{path:"/home",component:Home},
		{path:"/news",component:News,children:[
			{path:"/news/news1",component:News1},
			{path:"/news/news2",component:News2},
			{path:"/news",redirect:"/news/news1"},
		]},
		{path:"/",redirect:"/home"},
		{path:"*",redirect:"/home"},
	]
}