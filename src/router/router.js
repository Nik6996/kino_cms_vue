import Banners from "@/pages/Banners"
import Statistic from "@/pages/Statistic"
import Films from "@/pages/Films"
import News from "@/pages/News"
import Сinemas from "@/pages/Сinemas"
import Newsletter from "@/pages/Newsletter"
import Stock from "@/pages/Stock"
import PagesKino from "@/pages/PagesKino"
import Users from "@/pages/Users"
import CreateFilm from "@/components/films/filmListNow/CreateFilm"
import CreateFilmSoon from "@/components/films/filmListSoon/CreateFilmSoon"
import FilmsContent from '@/components/films/FilmsContent';
import CartCinema from '@/components/cinemas/CartCinema';
import CinemasContent from '@/components/cinemas/CinemasContent';
import HallCard from '@/components/cinemas/HallCard';
import NewsContent from "@/components/news/NewsContent";
import CardNews from '@/components/news/CardNews'

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
			},
			{
				path: 'createFilmSoon',
				component: CreateFilmSoon
			},

			{
				path: 'edit/filmSoon/:id',
				component: CreateFilmSoon
			}
		]

	},
	{
		path: '/news',
		component: News,
		children: [
			{
				path: '',
				component: NewsContent
			},
			{
				path: 'create',
				component: CardNews
			},
			{
				path: 'edit/:id',
				component: CardNews,
			},
		]
	},
	{
		path: '/cinemas',
		component: Сinemas,
		children: [
			{
				path: '',
				component: CinemasContent
			},
			{
				path: 'create/cinema',
				component: CartCinema,
			},
			{
				path: 'edit/:id',
				component: CartCinema,
			},
			{
				path: 'create/cinema/hall/',
				component: HallCard,
				name: 'hallCard',
				props: true
				// props: (route) => ({ query: route.query })
			},
			{
				path: 'edit/hall/:id',
				component: HallCard,
				name: 'editHall',
				props: true
			}
		]
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