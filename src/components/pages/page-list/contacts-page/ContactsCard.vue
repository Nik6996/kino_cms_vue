<template>
  <div>
    <div class="contacts">
      <div class="contacts__list-cinema">
        <transition-group name="listCinema" tag="p"></transition-group>
        <div v-for="(cinema, index) in contacts.listCinema" :key="cinema.id">
          <new-cinema-contacts v-model="contacts.listCinema[index]" />
        </div>
      </div>
      <div class="contacts__btn-add">
        <img src="@/assets/icon/plus.svg" alt="" />
        <button @click="addCinema()">Добавить еще кинотеатр</button>
      </div>
      <div class="contacts__seo">
        <div class="contacts__seo-block">
          <span>SEO блок:</span>
          <div class="contacts__seo-input">
            <p>
              URL:
              <input v-model="contacts.seoUrl" type="text" placeholder="URL" />
            </p>
            <p>
              Title:
              <input
                v-model="contacts.seoTitle"
                type="text"
                placeholder="Title"
              />
            </p>
            <p class="keywords">
              Keywords:
              <input
                v-model="contacts.seoKeywords"
                type="text"
                placeholder="word"
              />
            </p>
            <p class="contacts__seo-description">
              Description:<textarea
                v-model="contacts.seoDescription"
                class="contacts__seo-description-textarea"
                placeholder="Description"
              ></textarea>
            </p>
          </div>
        </div>
      </div>

      <div class="contacts__btn-save">
        <button @click="save()">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import NewCinemaContacts from "@/components/pages/page-list/contacts-page/NewCinemaContacts.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      contacts: {
        listCinema: [],
        seoUrl: "",
        seoTitle: "",
        seoKeywords: "",
        seoDescription: "",
        date: "",
        toggle: "",
      },
    };
  },
  components: {
    NewCinemaContacts,
  },
  mounted() {
    this.$store.dispatch("contactsPage/load");
    if (this.$store.getters[`contactsPage/getContacts`]) {
      this.contacts = this.$store.getters[`contactsPage/getContacts`];
    }
  },
  computed: {
    ...mapGetters({
      contactsStore: "contactsPage/getContacts",
    }),
    //contactsStore: this.$store.getters[`contactsPage/getContacts`],
  },
  watch: {
    contactsStore: {
      handler(contactsStore) {
        this.contacts = contactsStore;
        const contactsList = contactsStore.listCinema;
        for (let i = 0; i < contactsList.length; i++) {
          if (contactsList[i].toggle === "true") {
            this.contacts.toggle = "true";
            return;
          } else {
            this.contacts.toggle = "false";
          }
        }
      },
    },
  },

  methods: {
    async save() {
      await (this.contacts.date = new Date().toLocaleDateString());
      await this.$store.dispatch("contactsPage/save", this.contacts);
      this.$router.push("/pages");
    },
    addCinema() {
      this.contacts.listCinema.push({
        name: "",
        address: "",
        maps: "",
        id: "",
        toggle: "true",
        logo: {
          img: "",
          url: "",
          id: "",
          localUrl: "",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contacts {
  &__list-cinema {
  }

  &__btn-add {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    button {
      font-size: 18px;
      border: solid 2px black;
      border-radius: 10px;
      height: 40px;
    }
  }

  &__seo {
    display: flex;
    justify-content: center;
    margin: 30px 0;
  }

  &__seo-block {
    display: flex;

    span {
      margin-right: 100px;
      font-weight: 500;
    }
  }

  &__seo-input {
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    p {
      display: flex;
    }
    input {
      width: 600px;
    }
  }

  &__seo-description {
    display: flex;
    position: relative;
    left: -50px;
  }

  &__seo-description-textarea {
    width: 600px;
    height: 70px;
  }

  &__btn-save {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    button {
      border-radius: 5px;
    }
  }
}
.keywords {
  position: relative;
  left: -38px;
}
</style>