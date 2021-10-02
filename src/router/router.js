import Banners from "@/pages/Banners"
import Statistic from "@/pages/Statistic"
import Films from "@/pages/Films"
import News from "@/pages/News"
import Сinemas from "@/pages/Сinemas"

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: '/',
		component: Banners
	},
	{
		path: '/statistic',
		component: Statistic
	},
	{
		path: '/films',
		component: Films
	},
	{
		path: '/news',
		component: News
	},
	{
		path: '/cinemas',
		component: Сinemas
	},
]




const router = createRouter({
	routes,
	history: createWebHashHistory()
})


export default router