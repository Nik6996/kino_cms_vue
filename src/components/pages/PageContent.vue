<template>
  <div>
    <div class="page">
      <div class="page__title">Список Страниц</div>
      <div class="page__button">
        <button class="page__btn-create">
          <router-link to="/pages/create">
            <img src="@/assets/icon/plus.svg" alt="" />
            <span>Создать Новую</span>
          </router-link>
        </button>
      </div>
      <div class="page__content">
        <div class="page__title-list">
          <div class="page__name">Название</div>
          <div class="page__date">Дата создания</div>
          <div class="page__status">Статус</div>
        </div>

        <div class="page__list">
          <div class="page__card main">
            <div class="page__main">
              <div class="page__name-card">Главная страница</div>
              <div class="page__date">{{ this.main.date }}</div>
              <div class="page__status">
                <div v-if="main.toggle == 'true'">ВКЛ</div>
                <div v-if="main.toggle == 'false'">ВЫКЛ</div>
              </div>
            </div>
            <div class="page__btns">
              <div class="page__edit">
                <router-link :to="'/pages/main'">
                  <img src="@/assets/icon/edit-hall.png" alt="" />
                </router-link>
              </div>
            </div>
          </div>
          <div class="page__card info">
            <div class="page__main">
              <div class="page__name-card">О кинотеатре</div>
              <div class="page__date">{{ this.info.date }}</div>
              <div class="page__status">
                <div v-if="info.toggle == 'true'">ВКЛ</div>
                <div v-if="info.toggle == 'false'">ВЫКЛ</div>
              </div>
            </div>
            <div class="page__btns">
              <div class="page__edit">
                <router-link :to="'/pages/info'">
                  <img src="@/assets/icon/edit-hall.png" alt="" />
                </router-link>
              </div>
            </div>
          </div>

          <div class="page__card cafe">
            <div class="page__main">
              <div class="page__name-card">Кафе - Бар</div>
              <div class="page__date">{{ this.cafe.date }}</div>
              <div class="page__status">
                <div v-if="cafe.toggle == 'true'">ВКЛ</div>
                <div v-if="cafe.toggle == 'false'">ВЫКЛ</div>
              </div>
            </div>
            <div class="page__btns">
              <div class="page__edit">
                <router-link :to="'/pages/cafe'">
                  <img src="@/assets/icon/edit-hall.png" alt="" />
                </router-link>
              </div>
            </div>
          </div>

          <div class="page__card vip">
            <div class="page__main">
              <div class="page__name-card">Vip - зал</div>
              <div class="page__date">{{ this.vip.date }}</div>
              <div class="page__status">
                <div v-if="vip.toggle == 'true'">ВКЛ</div>
                <div v-if="vip.toggle == 'false'">ВЫКЛ</div>
              </div>
            </div>
            <div class="page__btns">
              <div class="page__edit">
                <router-link :to="'/pages/vip'">
                  <img src="@/assets/icon/edit-hall.png" alt="" />
                </router-link>
              </div>
            </div>
          </div>

          <div class="page__card advertising">
            <div class="page__main">
              <div class="page__name-card">Реклама</div>
              <div class="page__date">{{ this.advertising.date }}</div>
              <div class="page__status">
                <div v-if="advertising.toggle == 'true'">ВКЛ</div>
                <div v-if="advertising.toggle == 'false'">ВЫКЛ</div>
              </div>
            </div>
            <div class="page__btns">
              <div class="page__edit">
                <router-link :to="'/pages/advertising'">
                  <img src="@/assets/icon/edit-hall.png" alt="" />
                </router-link>
              </div>
            </div>
          </div>

          <div class="page__card childrens">
            <div class="page__main">
              <div class="page__name-card">Детская комната</div>
              <div class="page__date">{{ this.childrens.date }}</div>
              <div class="page__status">
                <div v-if="childrens.toggle == 'true'">ВКЛ</div>
                <div v-if="childrens.toggle == 'false'">ВЫКЛ</div>
              </div>
            </div>
            <div class="page__btns">
              <div class="page__edit">
                <router-link :to="'/pages/childrens'">
                  <img src="@/assets/icon/edit-hall.png" alt="" />
                </router-link>
              </div>
            </div>
          </div>

          <div class="page__card contacts">
            <div class="page__main">
              <div class="page__name-card">Контакты</div>
              <div class="page__date">{{ this.contacts.date }}</div>
              <div class="page__status">
                <div v-if="contacts.toggle === 'true'">ВКЛ</div>
                <div v-if="contacts.toggle === 'false'">ВЫКЛ</div>
              </div>
            </div>
            <div class="page__btns">
              <div class="page__edit">
                <router-link :to="'/pages/contacts'">
                  <img src="@/assets/icon/edit-hall.png" alt="" />
                </router-link>
              </div>
            </div>
          </div>

          <div v-for="(customPage, index) in pageList" :key="customPage.id">
            <preview-page v-model="pageList[index]" />
            <!-- <prewiew-page v-model="pageList[index]" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreviewPage from "@/components/pages/PreviewPage.vue";
export default {
  data() {
    return {
      main: {
        date: "",
        toggle: "",
      },
      info: {
        date: "",
        toggle: "",
      },
      cafe: {
        date: "",
        toggle: "",
      },
      vip: {
        date: "",
        toggle: "",
      },
      advertising: {
        date: "",
        toggle: "",
      },
      childrens: {
        date: "",
        toggle: "",
      },
      contacts: {
        date: "",
        toggle: "",
      },
      pageList: "",
    };
  },
  components: {
    PreviewPage,
  },
  computed: {
    ...mapGetters({
      infoPage: "infoPage/getInfo",
      mainPage: "mainPage/getMain",
      cafePage: "cafePage/getCafe",
      vipPage: "vipPage/getVip",
      advertisingPage: "advertisingPage/getAdvertising",
      childrensPage: "childrensPage/getChildrens",
      customPages: "customPage/getCustom",
      contactsPage: "contactsPage/getContacts",
    }),
  },
  watch: {
    customPages: {
      handler(customPages) {
        this.pageList = customPages;
      },
    },
  },
  async mounted() {
    await this.$store.dispatch("customPage/load");
    this.pageList = this.customPages;
    if (this.infoPage) {
      this.info.toggle = this.infoPage.toggle;
      this.info.date = this.infoPage.date;
    }
    if (!this.infoPage) {
      await this.$store.dispatch("infoPage/load");
      this.info.toggle = this.infoPage.toggle;
      this.info.date = this.infoPage.date;

      // this.info.toggle = this.$store.getters[`infoPage/getInfo`].toggle;
    }
    if (this.mainPage) {
      this.main.date = this.mainPage.date;
      this.main.toggle = this.mainPage.toggle;
    }
    if (!this.mainPage) {
      await this.$store.dispatch("mainPage/loadMainPage");
      this.main.date = this.mainPage.date;
      this.main.toggle = this.mainPage.toggle;
    }

    if (this.cafePage) {
      this.cafe.date = this.cafePage.date;
      this.cafe.toggle = this.cafePage.toggle;
    }
    if (!this.cafePage) {
      await this.$store.dispatch("cafePage/load");
      this.cafe.date = this.cafePage.date;
      this.cafe.toggle = this.cafePage.toggle;
    }

    if (this.vipPage) {
      this.vip.date = this.vipPage.date;
      this.vip.toggle = this.vipPage.toggle;
    }
    if (!this.vipPage) {
      await this.$store.dispatch("vipPage/load");
      this.vip.date = this.vipPage.date;
      this.vip.toggle = this.vipPage.toggle;
    }

    if (this.advertisingPage) {
      this.advertising.date = this.advertisingPage.date;
      this.advertising.toggle = this.advertisingPage.toggle;
    }
    if (!this.advertisingPage) {
      await this.$store.dispatch("advertisingPage/load");
      this.advertising.date = this.advertisingPage.date;
      this.advertising.toggle = this.advertisingPage.toggle;
    }

    if (this.childrensPage) {
      this.childrens.date = this.childrensPage.date;
      this.childrens.toggle = this.childrensPage.toggle;
    }
    if (!this.childrensPage) {
      await this.$store.dispatch("childrensPage/load");
      this.childrens.date = this.childrensPage.date;
      this.childrens.toggle = this.childrensPage.toggle;
    }

    if (this.contactsPage) {
      this.contacts.date = this.contactsPage.date;
      this.contacts.toggle = this.contactsPage.toggle;
    }
    if (!this.contactsPage) {
      await this.$store.dispatch("contactsPage/load");
      this.contacts.date = this.contactsPage.date;
      this.contacts.toggle = this.contactsPage.toggle;
    }

    // if (this.pageList.length <= 0) await this.$store.dispatch("page/loadpage");
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin-right: 200px;
  &__title {
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 500;
  }
  &__button {
    display: flex;
    justify-content: flex-end;
    button {
      border-radius: 5px;
    }
    span {
      color: black;
    }
    img {
      position: relative;
      top: -1px;
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
  }

  &__content {
    max-width: 800px;
    margin: 0 auto;
  }

  &__title-list {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    height: 40px;
    background-color: rgb(180, 180, 180);
    border: solid 1px black;
  }

  &__name {
    display: flex;
    justify-content: flex-start;
    width: 140%;
    padding: 0px 10px;
    height: 100%;
    align-items: center;
    font-weight: 500;
  }

  &__date,
  &__status {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
  }
  &__status {
    width: 60%;
  }

  &__card {
    position: relative;
    margin: 0 auto;
    height: 40px;
    display: flex;
  }

  &__main {
    min-width: 800px;
    height: 40px;
    background-color: rgb(231, 230, 230);
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: solid 1px black;
  }

  &__name-card {
    display: flex;
    justify-content: flex-start;
    width: 140%;
    padding: 0px 10px;
    height: 100%;
    align-items: center;
    font-weight: 500;
    span {
      margin-left: 6px;
    }
  }

  &__date,
  &__status {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
    font-weight: 500;
  }

  &__status {
    width: 60%;
  }

  &__btns {
    display: flex;
  }

  &__edit {
    cursor: pointer;
    margin: 0px 20px;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>