import { createI18n } from 'vue-i18n/index'

const messages = {
	ru: {
		header: {
			poster: 'Афиша',
			schedule: 'Расписание',
			soon: 'Скоро',
			cinemas: 'Кинотеатры',
			stock: 'Акции',
			more: 'Больше',
			info: 'О кинотеатре',
			cafe: 'Кафе',
			vip: 'Vip-зал',
			advertising: 'Реклама',
			childrens: 'Детская комната',
			contacts: 'Контакты',
			logIn: 'Войти в систему',
			logInBtn: 'Войти',
			registration: 'Регистрация',
			logOff: 'Выйти'
		}

	},
	ua: {
		header: {
			poster: 'Афiша',
			schedule: 'Розклад',
			soon: 'Скоро',
			cinemas: 'Кінотеатри',
			stock: 'Акції',
			more: 'Більше',
			info: 'Про кінотеатр',
			cafe: 'Кафе',
			vip: 'Vip-зала',
			advertising: 'Реклама',
			childrens: 'Дитяча кімната',
			contacts: 'Контакти',
			logIn: 'Увійти до системи',
			logInBtn: 'Увійти',
			registration: 'Реєстрація',
			logOff: 'Вийти'
		}

	}
}


export const i18n = createI18n({
	locale: 'ru',
	fallbackLocale: 'ua',
	messages,
})