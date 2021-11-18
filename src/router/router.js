import Banners from "@/pages/Banners"
import Statistic from "@/pages/Statistic"
import Films from "@/pages/Films"
import News from "@/pages/News"
import Сinemas from "@/pages/Сinemas"
import Newsletter from "@/pages/Newsletter"
import Stock from "@/pages/Stock"
import PagesKino from "@/pages/PagesKino"
import Users from "@/pages/Users"
import CreateFilm from "@/pages/CreateFilm"
import FilmsContent from '@/components/FilmsContent';

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
		component: Films,
		children: [
			{
				path: '',
				component: FilmsContent,
			},
			{
				path: 'create',
				component: CreateFilm
			},
			{
				path: 'edit/:id',
				component: CreateFilm
			}
		]

	},
	{
		path: '/news',
		component: News,
		children: [
			{
				path: ':id',
				component: Films
			}
		]
	},
	{
		path: '/cinemas',
		component: Сinemas
	},
	{
		path: '/stock',
		component: Stock
	},
	{
		path: '/pages',
		component: PagesKino
	},
	{
		path: '/users',
		component: Users
	},
	{
		path: '/newsletter',
		component: Newsletter
	},

]




const router = createRouter({
	routes,
	history: createWebHashHistory()
})


export default router