<template>
  <div>
    <div class="mailing">
      <div class="mailing__content">
        <div class="mailing__title"><span>E-mail</span></div>
        <div class="mailing__menu">
          <span>Выбрать пользователей кому слать</span>
          <input type="checkbox" id="email" name="email" v-model="picked" />
          <label for="email">Все пользователи</label>
          <input
            type="checkbox"
            id="emailChoice"
            name="email"
            v-model="picked1"
          />
          <label for="emailChoice">Выборочно</label>
          <button :disabled="picked" @click="$router.push('/newsletter/users')">
            Выбрать пользователей
          </button>
        </div>
        <div class="mailing__main">
          <div class="mailing__left">
            <div class="mailing__html-mail">
              <span>Загрузить HTML-письмо</span>
              <button><label for="downloadMail">Загрузить</label></button>
              <input
                v-on:change="saveFile()"
                ref="fileHtml"
                id="downloadMail"
                type="file"
              />
            </div>
            <div class="mailing__file">
              Загружен файл: <span>{{ this.newFile.name }}</span>
            </div>
            <div class="mailing__sample">
              Шаблон используемый в текущей рассылке:
              <span>{{ this.nameNow }}</span>
            </div>
            <div class="mailing__footer">
              <div class="mailing__number">Кол-во писем: <span>1234</span></div>
              <div>Рассылка выполнена на: <span>22%</span></div>
            </div>
          </div>
          <div>
            <div class="mailing__list-simple">
              <div class="mailing__list-title">
                Список последних загруженных шаблонов
              </div>
              <div class="mailing__list">
                <div v-for="(sample, index) in fileList" :key="sample.name">
                  <new-template v-model="fileList[index]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mailing__start">
          <button @click="test()">Начать рассылку</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NewTemplate from "@/components/mailing/NewTemplate.vue";
export default {
  data() {
    return {
      picked: "",
      picked1: "",
      newFile: {
        file: "",
        id: "",
        url: "",
        name: "",
        toggle: false,
      },
      fileList: "",
      nameNow: "",
    };
  },
  components: {
    NewTemplate,
  },
  watch: {
    picked: {
      handler(picked) {
        if (picked) {
          this.picked1 = false;
        } else {
          this.picked1 = true;
        }
      },
    },
    picked1: {
      handler(picked1) {
        if (picked1) {
          this.picked = false;
        } else {
          this.picked = true;
        }
      },
    },
    mails: {
      handler(mails) {
        this.fileList = mails;
      },
      deep: true,
    },
    fileList: {
      handler(fileList) {
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].toggle === true) {
            this.nameNow = fileList[i].name;
            return;
          } else {
            this.nameNow = "";
          }
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      mails: "mailing/getMail",
    }),
  },
  async mounted() {
    if (!this.fileList) {
      await this.$store.dispatch("mailing/load");
    }
  },
  methods: {
    test() {
      console.log(this.fileList);
    },
    async saveFile() {
      const file = this.$refs.fileHtml.files[0];
      await (this.newFile.file = file);
      await (this.newFile.id = new Date().valueOf());
      await this.$store.dispatch("mailing/save", this.newFile);
    },
  },
};
</script>

<style lang="scss" scoped>
.mailing {
  margin-bottom: 30px;
  &__content {
    margin-top: 20px;
    margin-right: 30px;
    border: solid 2px black;
    border-radius: 20px;
  }

  &__title {
    margin: 10px 0px;
    font-weight: 700;
    font-size: 27px;
    display: flex;
    justify-content: center;
  }

  &__menu {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    span {
      margin-right: 20px;
    }
    input {
      position: relative;
      top: 6px;
      margin-right: 10px;
      margin-left: 30px;
    }
    label {
      margin: 0px 50px 0px 0px;
    }
    button {
      border-radius: 10px;
    }
  }

  &__main {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 910px;
  }

  &__left {
    padding: 10px;
  }

  &__html-mail {
    button {
      margin-left: 30px;
      border-radius: 30px;
      width: 120px;
      label {
        margin: 0;
        font-weight: 400;
      }
    }
    input {
      display: none;
    }
  }

  &__file {
    margin: 10px 0px;
    span {
      color: blue;
    }
  }

  &__sample {
    span {
      color: blue;
    }
  }

  &__footer {
    width: 400px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    span {
      color: blue;
    }
  }

  &__list-simple {
    border: solid 2px black;
    border-radius: 10px;
    padding: 10px;
  }

  &__number {
    margin-right: 30px;
  }

  &__list {
  }

  &__start {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>