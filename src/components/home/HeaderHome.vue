<template>
  <div>
    <transition name="modal-window">
      <div v-if="registration" class="registration">
        <span @click="this.registration = false">X</span>
        <registration></registration>
      </div>
    </transition>
    <transition name="modal-window">
      <div v-if="isLogin" class="login">
        <div class="login__card">
          <div @click="isLogin = false" class="login__close">X</div>
          <div class="login__title">Войти в систему</div>
          <div class="login__line"></div>
          <div class="login__email">
            <input v-model="user.email" placeholder="Email" type="text" />
          </div>
          <div class="login__password">
            <input
              v-model="user.password"
              placeholder="Пароль"
              type="password"
            />
          </div>
          <button @click="logIn()" class="login__btn">Войти</button>
        </div>
      </div></transition
    >

    <header class="header">
      <div class="header__content">
        <div @click="$router.push('/')" class="header__logo">
          <img :src="logoImg.url" alt="" />
        </div>
        <div class="header__bar">
          <div class="header__bar-top">
            <div class="header__search">
              <input v-model="search" placeholder="Поиск" type="text" />
            </div>
            <div class="header__links">
              <ul>
                <li><img src="@/assets/icon/f.png" alt="" /></li>
                <li><img src="@/assets/icon/t.png" alt="" /></li>
                <li><img src="@/assets/icon/vk.png" alt="" /></li>
              </ul>
            </div>
            <div class="header__contacts">
              <span>(048) 777-77-77</span>
              <span>(048) 777-77-77</span>
            </div>
          </div>
          <div class="header__bottom">
            <div class="header__btns">
              <div @click="$router.push('/poster')" class="header__poster">
                Афиша
              </div>
              <div
                @click="$router.push('/scheduleHome')"
                class="header__schedule"
              >
                Расписание
              </div>
              <div @click="$router.push('/filmSoon')" class="header__soon">
                Скоро
              </div>
              <div
                @click="$router.push('/cinemasHome')"
                class="header__cinemas"
              >
                Кинотеатры
              </div>
              <div @click="$router.push('/stockHome')" class="header__stick">
                Акции
              </div>
              <select v-model="this.menuInfo">
                <!-- v-model="selected" -->
                <option disabled value="">Больше</option>
                <option>О кинотеатре</option>
                <option>Новости</option>
                <option>Реклама</option>
                <option>Кафе</option>
                <option>Мобильные прил</option>
                <option>Контакты</option>
              </select>
            </div>
            <div class="header__lang">
              <select>
                <option>Рус</option>
                <option>Укр</option>
              </select>
            </div>
          </div>
        </div>
        <div class="header__login">
          <div class="right-bar">
            <button v-if="this.adminPage" @click="$router.push('/admin')">
              Админка
            </button>
            <div @click="$router.push('/registration')" class="user-name">
              {{ this.userName }}
            </div>
            <div
              v-if="!isUserIn"
              @click="isLogin = true"
              class="header-login btn-lg bg-purple"
            >
              Войти
            </div>
            <div
              v-if="!isUserIn"
              @click="this.registration = true"
              class="header-btn btn-lg bg-purple"
            >
              Регистрация
            </div>
            <div
              @click="logOff()"
              v-if="isUserIn"
              class="header-btn btn-lg bg-purple"
            >
              Выйти
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Registration from "@/components/Registration.vue";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      isLogin: false,
      isUserIn: false,
      admin: "",
      userName: "",
      adminPage: false,
      registration: false,
      menuInfo: "",
      search: "",
    };
  },
  components: {
    Registration,
  },
  computed: {
    ...mapGetters({
      nameCurrentUser: "registration/getCurrentUserName",
      currentUserUid: "registration/getCurrentUserUid",
      logoImg: "logo/getLogo",
    }),
  },

  watch: {
    search: {
      handler(search) {
        console.log(search);
        this.searchFilm(search);
        this.$router.push("/");
      },
    },
    menuInfo: {
      handler(info) {
        if (info === "О кинотеатре") {
          this.$router.push("/infoHome");
        }
        if (info === "Новости") {
          this.$router.push("/newsHome");
        }
        if (info === "Реклама") {
          this.$router.push("/advertisingHome");
        }
        if (info === "Кафе") {
          this.$router.push("/cafeHome");
        }
        if (info === "Мобильные прил") {
          this.$router.push("/mobile-app");
        }
        if (info === "Контакты") {
          this.$router.push("/contactsHome");
        }
      },
    },
    nameCurrentUser: {
      handler(user) {
        if (user) {
          this.isUserIn = true;
          this.userName = user;
          if (user === "Admin") {
            this.adminPage = true;
          }
        }
      },
    },
    // currentUserUid: {
    //   handler(uid) {
    //     if (uid === "XcHQaAB2ZoSZh9GJlz96cEJ1JJi2") {
    //       this.isUserIn = true;
    //       this.userName = "Admin";
    //     }
    //   },
    // },
  },
  async mounted() {
    await this.$store.dispatch("registration/load");
    this.$store.dispatch("logo/load");
    if (this.currentUserUid === "h9y3bTZZdVcjTCyFA0bRgdjdYyT2") {
      this.isUserIn = true;
      this.adminPage = true;
      this.userName = "Admin";
    }
    if (this.nameCurrentUser) {
      this.isUserIn = true;
    }
  },
  methods: {
    searchFilm(search) {
      this.$emit("searchFilms", search);
    },
    logIn() {
      if (this.user.email && this.user.password) {
        this.$store.dispatch("registration/logIn", this.user);
        this.isLogin = false;
        this.user.email = "";
        this.user.password = "";
      } else {
        console.log("Введите логин и пароль");
      }
    },
    async logOff() {
      await this.$store.dispatch("registration/logOff", this.user);
      this.isUserIn = false;
      this.nameCurrentUser = null;
      this.userName = "";
      this.adminPage = false;
      this.user.email = "";
      this.user.password = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding-top: 20px;
  margin: 0px 0px 20px 0px;
  &__content {
    display: flex;
    justify-content: space-around;
  }

  &__logo {
    cursor: pointer;
    width: 200px;
    height: 100px;
    background-color: rgb(192, 192, 192);
    img {
      width: 200px;
      height: 100px;
    }
  }

  &__bar {
    display: flex;
    flex-direction: column;
  }

  &__bar-top {
    display: flex;
    justify-content: space-between;
  }

  &__search {
    display: flex;
    align-items: center;
  }

  &__links {
    display: flex;
    align-items: center;
    ul {
      margin: 0;
      display: flex;
    }
    li {
      margin: 0px 5px;
      list-style-type: none;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }

  &__contacts {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: 500;
  }

  &__bottom {
    margin-top: 10px;
    display: flex;
  }

  &__btns {
    border: solid 2px black;
    display: flex;
    background-color: white;
  }

  &__poster,
  &__schedule,
  &__soon,
  &__cinemas,
  &__stick {
    padding: 3px 10px;
    cursor: pointer;
  }
  &__poster:hover,
  &__schedule:hover,
  &__soon:hover,
  &__cinemas:hover,
  &__stick:hover {
    background-color: rgb(184, 184, 184);
  }

  &__lang {
    margin: 3px 10px;
  }
  &__login {
    display: flex;
    align-items: center;
    button {
      margin: 0px 5px;
    }
  }
}

.right-bar {
  font-size: 30px;
  display: flex;
}
.header-btn {
  cursor: pointer;
  margin: 0px 20px;
}
.login {
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(247, 247, 247, 0.37);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &__card {
    position: relative;
    width: 400px;
    height: 300px;
    background-color: rgb(214, 210, 211);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgb(2, 2, 3);
  }
  &__close {
    cursor: pointer;
    position: absolute;
    right: 3px;
    top: 3px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__title {
    margin-top: 20px;
    font-weight: 500;
    color: black;
    font-size: 20px;
  }
  &__line {
    margin: 40px 10px 30px 10px;
    width: 80%;
    height: 1px;
    background-color: black;
  }

  &__email,
  &__password {
    margin: 10px;

    input {
      width: 250px;
      padding: 2px 10px;
    }
  }
  &__btn {
    width: 90%;
    background-color: green;
    border-radius: 5px;
  }
}

.registration {
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(126, 125, 125, 0.37);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    cursor: pointer;
    position: absolute;
    top: 20%;
    right: 20%;
    padding: 10px;
    font-size: 30px;
  }
}
.header-login {
  cursor: pointer;
}

.modal-window-enter-active,
.modal-window-leave-active {
  transition: all 0.8s ease;
  transform: translateY(0px);
}
.modal-window-enter-from,
.modal-window-leave-to {
  transform: translateY(-530px);
}
.user-name {
  margin-right: 20px;
  font-size: 25px;
  font-weight: 500;
  cursor: pointer;
}
</style>