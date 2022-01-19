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
import StockContent from "@/components/stock/StockContent";
import CardStock from '@/components/stock/CardStock'
import PageContent from '@/components/pages/PageContent'
import CustomPageCard from '@/components/pages/page-list/CustomPageCard'
import MainCard from '@/components/pages/page-list/main-page/MainCard'
import InfoCard from '@/components/pages/page-list/info-page/InfoCard'
import CafeCard from '@/components/pages/page-list/cafe-page/CafeCard'
import VipCard from '@/components/pages/page-list/vip-hall-page/VipCard'
import AdvertisingCard from '@/components/pages/page-list/advertising-page/AdvertisingCard'
import ChildrensCard from '@/components/pages/page-list/childrens-room-page/ChildrensCard'
import ContactsCard from '@/components/pages/page-list/contacts-page/ContactsCard'
import Registration from '@/components/Registration.vue'
import UsersContent from '@/components/users/UsersContent'
import UserChoice from '@/components/mailing/UserChoice'
import Admin from '@/components/Admin'
import Home from '@/components/Home'
import Poster from '@/components/home/PosterHome'
import Schedule from '@/components/home/ScheduleHome'
import FilmsHome from '@/components/home/FilmsHome'
import FilmSoonHome from '@/components/home/FilmSoonHome'
import CinemasHome from '@/components/home/CinemasHome'
import StockHome from '@/components/home/StockHome'
import InfoHome from '@/components/home/info/InfoHome'
import NewsHome from '@/components/home/info/NewsHome'
import CafeHome from '@/components/home/info/CafeHome'
import AppHome from '@/components/home/info/AppHome'
import ContactsHome from '@/components/home/info/ContactsHome'
import AdvertisingHome from '@/components/home/info/AdvertisingHome'
import CardFilm from '@/components/home/films/CardFilm'
import CardFilmSoon from '@/components/home/films/CardFilmSoon'
import CinemaCardHome from '@/components/home/cinemas/CinemaCardHome'
import HallCardHome from '@/components/home/cinemas/HallCardHome'


import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: '/',
		component: Home,
		children: [
			{
				path: '/film/:id',
				component: CardFilm
			},
			{
				path: '/cinema/:id',
				component: CinemaCardHome
			},
			{
				path: '/film/soon/:id',
				component: CardFilmSoon
			},
			{
				path: '/cinema/hall/:id',
				component: HallCardHome
			},
			{
				path: '/',
				component: FilmsHome
			},
			{
				path: '/registration',
				component: Registration,
			},
			{
				path: '/poster',
				component: Poster
			},
			{
				path: '/scheduleHome',
				component: Schedule
			},
			{
				path: '/filmSoon',
				component: FilmSoonHome
			},
			{
				path: '/cinemasHome',
				component: CinemasHome
			},
			{
				path: '/stockHome',
				component: StockHome
			},
			{
				path: '/infoHome',
				component: InfoHome
			},
			{
				path: '/newsHome',
				component: NewsHome
			},
			{
				path: '/advertisingHome',
				component: AdvertisingHome
			},
			{
				path: '/cafeHome',
				component: CafeHome
			},
			{
				path: '/mobile-app',
				component: AppHome
			},
			{
				path: '/contactsHome',
				component: ContactsHome
			},
		]
	},
	//Админка
	{
		path: '/admin',
		component: Admin,
		children: [
			{
				path: '/banners',
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
				component: Stock,
				children: [
					{
						path: '',
						component: StockContent
					},
					{
						path: 'create',
						component: CardStock
					},
					{
						path: 'edit/:id',
						component: CardStock,
					},
				]
			},
			{
				path: '/pages',
				component: PagesKino,
				children: [{
					path: '',
					component: PageContent,
				},
				{
					path: 'create',
					component: CustomPageCard
				},
				{
					path: 'main',
					component: MainCard,
				},
				{
					path: 'info',
					component: InfoCard,

				},
				{
					path: 'cafe',
					component: CafeCard,
				},
				{
					path: 'vip',
					component: VipCard,
				},
				{
					path: 'advertising',
					component: AdvertisingCard,
				},
				{
					path: 'childrens',
					component: ChildrensCard,
				},
				{
					path: 'contacts',
					component: ContactsCard,
				},
				{
					path: 'edit/:id',
					component: CustomPageCard
				}
				]
			},
			{
				path: '/users',
				component: Users,
				children: [{
					path: '',
					component: UsersContent
				},
				{
					path: '/edit/user/:id',
					component: Registration
				},
				]
			},
			{
				path: '/newsletter',
				component: Newsletter,

			},
			{
				path: '/newsletter/users',
				component: UserChoice
			}
		]
	},




]




const router = createRouter({
	routes,
	history: createWebHashHistory()
})


export default router