<template>
  <div>
    <div class="contacts">
      <div class="contacts__header">
        <div class="contacts__name">
          <span>Название кинотеатра</span>
          <input
            v-model="this.$attrs.modelValue.name"
            placeholder="Название кинотеатра"
            type="text"
          />
        </div>
        <div
          v-show="this.$parent.contacts.listCinema.length > 1"
          class="contacts__btn-slider"
        >
          <label class="switch">
            <input
              v-model="this.$attrs.modelValue.toggle"
              true-value="true"
              false-value="false"
              type="checkbox"
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="contacts__address">
        <span>Адресс</span>
        <textarea
          v-model="this.$attrs.modelValue.address"
          placeholder="Кинотеатр 'Золотой Дюк'
Одесса, Проспект академика Глушко, 11ж
Бронирование билетов:(048) 746-32-33 "
        ></textarea>
      </div>
      <div class="contacts__maps">
        <span>Координаты для карты</span>
        <input
          v-model="this.$attrs.modelValue.maps"
          placeholder="Координаты для карты"
          type="text"
        />
      </div>
      <div class="contacts__logo">
        <span>Лого</span>
        <label class="contacts__lable-logo">
          <input
            accept=".png, .jpg, .jpeg"
            class="contacts__img-logo"
            ref="mainImg"
            @change="previewMain()"
            type="file"
          />
          <img :src="imageSrc" alt="" />
        </label>
        <button @click="imgMainRemove()" class="contacts__remove-img">
          Удалить
        </button>
      </div>
      <div
        v-show="this.$parent.contacts.listCinema.length > 1"
        class="contacts__remove-cinema"
      >
        <button @click="removeContact()" class="contacts__remove">
          Удалить контакт
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const defaultImg = require("@/assets/img/prevue.png");
export default {
  data() {
    return {};
  },
  mounted() {
    if (!this.$attrs.modelValue.id) {
      this.$attrs.modelValue.id = new Date().valueOf();
    }
    // console.log(this.$parent.contacts.listCinema.length);
  },
  computed: {
    imageSrc() {
      if (this.$attrs.modelValue.logo.localUrl) {
        return this.$attrs.modelValue.logo.localUrl;
      }
      if (this.$attrs.modelValue.logo.url) {
        return this.$attrs.modelValue.logo.url;
      } else {
        return defaultImg;
      }
    },
  },
  methods: {
    imgMainRemove() {
      this.$attrs.modelValue.logo.img = "";
      this.$attrs.modelValue.logo.localUrl = "";
      this.$attrs.modelValue.logo.url = "";
    },
    removeContact() {
      this.$store.dispatch(
        "contactsPage/removeContact",
        this.$attrs.modelValue
      );
    },
    previewMain() {
      if (!this.$refs.mainImg || !this.$refs.mainImg.files?.length) {
        this.$attrs.modelValue.logo.img = "";
        this.$attrs.modelValue.logo.localUrl = "";
        return;
      }
      const file = this.$refs.mainImg.files[0];
      const reader = new FileReader();
      this.$attrs.modelValue.logo.img = file;
      reader.onload = (ev) => {
        if (!this.$attrs.modelValue.logo.id) {
          this.$attrs.modelValue.logo.id = new Date().valueOf();
        }
        this.$attrs.modelValue.logo.localUrl = ev.currentTarget.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.contacts {
  margin: 50px 70px 20px 70px;
  border: solid 2px black;
  border-radius: 15px;
  &__name,
  &__maps {
    display: flex;
    align-items: center;
    margin: 20px 40px;
    span {
      margin-right: 10px;
      font-weight: 500;
    }
    input {
      width: 300px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__btn-slider {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }

  &__address {
    display: flex;
    align-items: flex-start;
    margin: 20px 40px;
    textarea {
      width: 800px;
      height: 100px;
    }
    span {
      font-weight: 500;
      margin-right: 10px;
    }
    textarea::placeholder {
      white-space: pre-wrap;
    }
  }

  &__logo {
    margin-left: 40px;
    display: flex;
    align-items: center;
    span {
      font-weight: 500;
    }
  }

  &__lable-logo {
    margin: 20px 50px;
    display: flex;
    justify-content: center;
    width: 130px;
    min-height: 80px;
    background: grey;
    border: solid 2px black;
    img {
      max-width: 130px;
      max-height: 80px;
    }
  }
  &__img-logo {
    display: none;
  }
  &__remove-img {
    margin: 0px 20px;
    border-radius: 7px;
    width: 120px;
    background-color: rgb(226, 97, 97);
  }
  &__remove {
    margin: 20px;
    border-radius: 7px;
    width: 180px;
    background-color: rgb(226, 97, 97);
  }
  &__remove-cinema {
    display: flex;
    justify-content: center;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + .slider {
    background-color: #01dd01;
  }
}
.slider {
  border-radius: 34px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider:before {
  transform: translateX(26px);
}
</style>