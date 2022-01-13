<template>
  <div>
    <div class="registration">
      <div class="registration__title"><span>Страница Клиента</span></div>
      <div class="registration__content">
        <div class="registration__left">
          <div class="registration__name">
            <span class="registration__color">Имя<span>*</span></span>
            <input
              :class="{ 'registration__error-input': validate.name === true }"
              v-model="user.name"
              type="text"
            />
          </div>
          <div class="registration__surname">
            <span class="registration__color">Фамилия<span>*</span></span>
            <input
              :class="{
                'registration__error-input': validate.surname === true,
              }"
              v-model="user.surname"
              type="text"
            />
          </div>
          <div class="registration__alias">
            <span>Псевдоним</span>
            <input v-model="user.alias" type="text" />
          </div>
          <div class="registration__email">
            <span class="registration__color">E-mail<span>*</span></span>
            <input
              :class="{ 'registration__error-input': validate.email === true }"
              v-model="user.email"
              type="text"
            />
          </div>
          <div class="registration__address">
            <span>Адресс</span>
            <input
              v-model="user.address"
              placeholder="г. Киев улица Такаято, 1"
              type="text"
            />
          </div>
          <div class="registration__password">
            <span class="registration__color">Пароль<span>*</span></span>
            <div @click="watchPass()" class="registration__watch">
              <img
                v-if="this.watchPassword"
                src="@/assets/icon/watch.svg"
                alt=""
              />
              <img v-else src="@/assets/icon/watch-off.svg" alt="" />
            </div>
            <input
              :class="{
                'registration__error-input': validate.password === true,
              }"
              v-model="user.password"
              type="password"
              id="password"
            />
          </div>
          <div class="registration__number-card">
            <span>Номер карты</span>
            <input v-model="user.cardNumber" type="text" />
          </div>
        </div>
        <div class="registration__right">
          <div class="registration__leng">
            <span>Язык</span>
            <div>
              <input
                class="registration__leng-input"
                id="ru"
                value="Русский"
                v-model="user.leng"
                type="radio"
              />
              <label for="ru"> Русский </label>

              <input
                class="registration__leng-input"
                id="ua"
                value="Украинский"
                v-model="user.leng"
                type="radio"
              />
              <label for="ua">Украинский</label>
            </div>
          </div>
          <div class="registration__gender">
            <span>Пол</span>
            <div>
              <input
                id="men"
                value="Мужской"
                v-model="user.gender"
                type="radio"
              />
              <label for="men"> Мужской </label>

              <input
                id="woman"
                value="Женский"
                v-model="user.gender"
                type="radio"
              />
              <label for="woman">Женский</label>
            </div>
          </div>
          <div class="registration__phone">
            <span>Номер телефона</span>
            <input v-model="user.phone" type="text" />
          </div>
          <div class="registration__calendar">
            <div class="registration__published">
              <span>Дата рождения</span>
              <div class="registration__date-published">
                <span>{{ user.fullDate }}</span>
                <div @click="calendar()" class="registration__calendar-btn">
                  <img
                    class="registration__btn-calendar"
                    src="@/assets/icon/calendar.svg"
                    alt=""
                  />
                  <div class="registration__arrow">
                    <img
                      v-bind:class="{ active: isActive }"
                      src="@/assets/icon/arrow.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isActive" class="registration__date">
              <DatePicker v-model="user.date" />
            </div>
          </div>
          <div class="registration__town">
            <span>Город</span>
            <select class="registration__town-list" v-model="user.town">
              <option disabled value="">Выберите город</option>
              <option>Киев</option>
              <option>Одесса</option>
              <option>Харьков</option>
            </select>
          </div>
          <div class="registration__password-check">
            <span class="registration__color"
              >Повторить пароль<span>*</span></span
            >
            <div @click="watchPassCheck()" class="registration__watch">
              <img
                v-if="this.watchPasswordCheck"
                src="@/assets/icon/watch.svg"
                alt=""
              />
              <img v-else src="@/assets/icon/watch-off.svg" alt="" />
            </div>
            <input
              :class="{
                'registration__error-input': validate.passwordCheck === true,
              }"
              v-model="passwordCheck"
              type="password"
              id="passwordCheck"
            />
          </div>
        </div>
      </div>
      <div v-if="this.errorMassage" class="registration__validate">
        {{ errorMassage }}
      </div>
      <div @click="save()" class="registration__save">
        <button>Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";

export default {
  data() {
    return {
      user: {
        name: "",
        surname: "",
        alias: "",
        email: "",
        address: "",
        password: "",
        cardNumber: "",
        leng: "",
        gender: "",
        phone: "",
        date: new Date(),
        fullDate: "",
        town: "",
        id: "",
        dateRegistration: "",
      },
      isActive: false,
      passwordCheck: "",
      errorMassage: null,
      validate: {
        name: false,
        surname: false,
        email: false,
        password: false,
        passwordCheck: false,
      },
      watchPassword: false,
      watchPasswordCheck: false,
    };
  },
  components: {
    Calendar,
    DatePicker,
  },
  async mounted() {
    if (!this.user.id) {
      if (this.$route.params.id) {
        this.user.id = Number(this.$route.params.id);
        await this.$store.dispatch("registration/load");
        this.load();
      } else {
        this.user.id = new Date().valueOf();
        this.user.dateRegistration = new Date().toLocaleDateString();
      }
    }
  },
  watch: {
    user: {
      handler(user) {
        const date = new Date(user.date);
        const year = String(date.getFullYear());
        const mounth = String(date.getMonth() + 1);
        const day = String(date.getDate());
        const fullDate = `${day}.${mounth}.${year}`;
        this.user.fullDate = fullDate;
        if (user.name) {
          this.validate.name = false;
          this.errorMassage = null;
        }
        if (this.user.name.length > 3) {
          this.validate.name = false;
          this.errorMassage = null;
        }
        if (user.surname) {
          this.validate.surname = false;
          this.errorMassage = null;
        }
        if (user.email) {
          this.validate.email = false;
          this.errorMassage = null;
        }
        if (this.validEmail(user.email)) {
          this.validate.email = false;
          this.errorMassage = null;
        }
        if (user.password) {
          this.validate.password = false;
          this.errorMassage = null;
        }
        if (user.password.length > 6) {
          this.validate.password = false;
          this.errorMassage = null;
        }
      },
      deep: true,
    },
  },
  methods: {
    async save() {
      if (!this.user.name) {
        console.log("нет имени");
        this.errorMassage = "Введите имя";
        this.validate.name = true;
        return;
      } else {
        this.validate.name = false;
      }
      if (this.user.name.length < 3) {
        console.log("короткое имя");
        this.errorMassage = "Имя должно состоять из 3-х или более символов";
        this.validate.name = true;
        return;
      } else {
        this.validate.name = false;
      }
      if (!this.user.surname) {
        console.log("нет фамилии");
        this.errorMassage = "Введите фамилию";
        this.validate.surname = true;
        return;
      } else {
        this.validate.surname = false;
      }
      if (!this.user.email) {
        console.log("введите почту");
        this.errorMassage = "Введите почту";
        this.validate.email = true;
        return;
      } else {
        this.validate.email = false;
      }
      if (!this.validEmail(this.user.email)) {
        console.log("Укажите корректный адрес электронной почты");
        this.errorMassage = "Укажите корректный адрес электронной почты";
        this.validate.email = true;
        return;
      } else {
        this.validate.email = false;
      }
      if (!this.user.password) {
        console.log("НЕТ ПАРОЛЯ");
        this.errorMassage = "Введите пароль";
        this.validate.password = true;
        return;
      } else {
        this.validate.password = false;
      }
      if (this.user.password.length < 6) {
        console.log("короткий");
        this.errorMassage = "Пароль должен состоять из 6 или более символов";
        this.validate.password = true;
        return;
      } else {
        this.validate.password = false;
      }
      if (this.user.password !== this.passwordCheck) {
        console.log("неверный пароль");
        this.errorMassage = "Неверное подтверждение пароля";
        this.validate.passwordCheck = true;
        return;
      } else {
        this.validate.passwordCheck = false;
      }
      console.log("12345");
      this.errorMassage = null;
      await this.$store.dispatch("registration/saveUser", this.user);

      if (this.$route.params.id) {
        this.$router.push("/users");
      } else {
        this.$router.push("/users");
      }
    },
    load() {
      const users = this.$store.getters[`registration/getUsers`];

      users.forEach((user) => {
        if (user.id === this.user.id) {
          this.user = user;
        }
      });
    },
    validEmail(email) {
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    calendar() {
      if (!this.isActive) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
    watchPass() {
      const pass = document.getElementById("password");
      if (!this.watchPassword) {
        this.watchPassword = true;
      } else {
        this.watchPassword = false;
      }
      if (this.watchPassword) {
        pass.type = "text";
        // confirm.type = "text";
      } else {
        pass.type = "password";
        //confirm.type = "password";
      }
    },
    watchPassCheck() {
      const pass = document.getElementById("passwordCheck");
      if (!this.watchPasswordCheck) {
        this.watchPasswordCheck = true;
      } else {
        this.watchPasswordCheck = false;
      }
      if (this.watchPasswordCheck) {
        pass.type = "text";
        // confirm.type = "text";
      } else {
        pass.type = "password";
        // confirm.type = "password";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.registration {
  margin-top: 140px;
  &__title {
    font-weight: 500;
    font-size: 23px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  &__content {
    justify-content: center;
    display: flex;
  }

  &__left {
    margin-right: 50px;
  }

  &__name,
  &__surname,
  &__alias,
  &__email,
  &__address,
  &__password,
  &__number-card {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    input {
      height: 25px;
      border: solid 1px black;
      margin-left: 30px;
    }
  }

  &__leng,
  &__gender {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 13px;
    span {
      font-size: 18px;
    }
    label {
      margin: 0;
    }
    input {
      cursor: pointer;
      margin-right: 10px;
      margin-left: 40px;
    }
  }

  &__phone {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    input {
      height: 25px;
      border: solid 1px black;
      margin-left: 30px;
    }
  }

  &__date {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__town {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__town-list {
    width: 185px;
  }

  &__password-check {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    input {
      height: 25px;
      border: solid 1px black;
      margin-left: 30px;
    }
  }

  &__save {
    margin-top: 20px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }

  &__calendar {
    margin-bottom: 20px;
    position: relative;
    z-index: 20;
    span {
      margin-right: 40px;
    }
  }
  &__date-published {
    display: flex;
    justify-content: space-between;
    border: solid 1px black;
    height: 25px;
    width: 185px;
    span {
      padding-left: 5px;
    }
  }
  &__published {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      position: relative;
      top: -2px;
      width: 60px;
      height: 30px;
      right: -2px;
    }
  }
  &__date {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 0;
  }
  &__calendar-btn {
    cursor: pointer;
    position: relative;
    z-index: 2;
    width: 55px;
    display: flex;
    justify-content: center;
    border-left: solid 1px black;
    background-color: rgb(206, 205, 205);
  }
  &__btn-calendar {
    position: relative;
    top: 1px;

    width: 20px;
    height: 20px;
  }
  &__arrow {
    position: relative;
    top: -3px;
    img {
      width: 25px;
      height: 25px;
      transition: all 0.5s;
    }
  }
  &__color {
    span {
      color: red;
    }
  }
  &__validate {
    display: flex;
    justify-content: center;
    color: red;
  }
  &__error-input {
    box-shadow: 0px 0px 10px red;
  }
  &__watch {
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: -16px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.active {
  transform: rotateX(180deg);
  transition: all 0.5s;
}
</style>