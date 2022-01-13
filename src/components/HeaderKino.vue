<template>
  <div>
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

    <nav class="main-header">
      <div class="header-logo">
        <a href=""><img src="" alt="LOGO" /></a>
      </div>

      <div class="right-bar">
        <button @click="$router.push('/')">Главная</button>
        <div class="user-name">{{ nameCurrentUser }}</div>
        <div
          v-if="!isUserIn"
          @click="isLogin = true"
          class="header-login btn-lg bg-purple"
        >
          Войти
        </div>
        <div
          v-if="!isUserIn"
          @click="$router.push('/registration')"
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
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      isLogin: false,
      isUserIn: false,
    };
  },
  computed: {
    ...mapGetters({
      nameCurrentUser: "registration/getCurrentUserName",
    }),
  },
  watch: {
    nameCurrentUser: {
      handler(user) {
        if (user) {
          this.isUserIn = true;
        }
      },
    },
  },
  methods: {
    logIn() {
      if (this.user.email && this.user.password) {
        this.$store.dispatch("registration/logIn", this.user);
        this.isLogin = false;
      } else {
        console.log("Введите логин и пароль");
      }
    },
    async logOff() {
      await this.$store.dispatch("registration/logOff", this.user);
      this.isUserIn = false;
      this.nameCurrentUser = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-logo {
  width: 200px;
  height: 80px;
  background: ghostwhite;
  border: solid 2px black;
  margin: 10px 80px;
}
.main-header {
  background-color: white;
  position: fixed;
  width: 100%;
  top: 0;
  margin-left: 0 !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black !important;
  z-index: 1034;
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
}
</style>