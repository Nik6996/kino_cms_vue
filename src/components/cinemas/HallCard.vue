<template>
  <div>
    <div class="hall">
      <div class="hall__lang">
        <button
          v-bind:class="{ active: isActive }"
          @click="langUa()"
          class="hall__ua"
        >
          Украинский
        </button>
        <button
          v-bind:class="{ active: !isActive }"
          @click="langRu()"
          class="hall__ru"
        >
          Русский
        </button>
      </div>
      <div class="hall-content">
        <div v-if="hallUa">
          <hall-ua
            @deleteGallaryImgUa="deleteGallaryImgUa"
            :hallUa="hallData.hallUa"
            ref="hallUa"
          />
        </div>
        <div v-else>
          <hall-ru
            @deleteGallaryImgRu="deleteGallaryImgRu"
            :hallRu="hallData.hallRu"
          />
        </div>

        <div class="hall__btns">
          <div class="hall__save-error">
            <div v-if="!this.validationBtn" class="hall__error">
              <span>Введите номер зала</span>
            </div>

            <button
              v-bind:class="{ error: isError }"
              class="hall__save"
              @click="save()"
            >
              Сохранить
            </button>
          </div>

          <button class="hall__return" @click="returnHall()">Вернуться</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HallRu from "@/components/cinemas/cinema-ru/HallRu.vue";
import HallUa from "@/components/cinemas/cinema-ua/HallUa.vue";
//const numberHall = this.hallData.hallUa.number;
export default {
  components: {
    HallRu,
    HallUa,
  },
  data() {
    return {
      hallData: {
        hallUa: {
          number: "",
          description: "",
          layout: {
            img: "",
            imgUrl: "",
            id: "",
            layoutLocal: "",
          },
          banner: {
            img: "",
            imgUrl: "",
            id: "",
            bannerLocal: "",
          },
          gallary: [],
          gallaryUrl: [],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          idRemoveGallary: [],
        },
        hallRu: {
          number: "",
          description: "",
          layout: {
            img: "",
            imgUrl: "",
            id: "",
          },
          banner: {
            img: "",
            imgUrl: "",
            id: "",
          },
          gallary: [],
          gallaryUrl: [],
          seoUrl: "",
          seoTitle: "",
          seoKeywords: "",
          seoDescription: "",
          idRemoveGallary: [],
        },
        id: "",
      },
      hallUa: true,
      hallRu: false,
      isActive: true,
      isError: false,
      validationBtn: true,
    };
  },

  props: ["idCinema"],
  watch: {
    hallUa: {
      handler(data) {
        if (data) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    },
    hallData: {
      handler(data) {
        if (data.hallUa.number) {
          this.isError = false;
          this.validationBtn = true;
        }
      },
      deep: true,
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      this.hallData.id = this.$route.params.id;
      const halls = this.$store.getters[`cinema/getHalls`];

      await halls.forEach((item) => {
        if (item.id == this.hallData.id) {
          this.hallData = item;
        }
      });
      // console.log(this.$store.getters[`cinema/getHalls`]);
    } else {
      this.hallData.id = new Date().valueOf();
    }
  },
  methods: {
    deleteGallaryImgUa(id) {
      this.hallData.hallUa.idRemoveGallary.push(id);
    },
    deleteGallaryImgRu(id) {
      this.hallData.hallRu.idRemoveGallary.push(id);
    },
    returnHall() {
      if (this.idCinema) {
        this.$router.push("/cinemas/edit/" + this.idCinema);
      }
    },
    async save() {
      if (!this.hallData.hallUa.number) {
        this.validationBtn = false;
        this.isError = true;
        this.$refs.hallUa.validation();
      } else {
        await this.$store.dispatch("cinema/saveHall", this.hallData);
        //this.$router.push("/cinemas/create/cinema/");
        if (this.idCinema) {
          this.$router.push("/cinemas/edit/" + this.idCinema);
        }
      }
    },
    langUa() {
      this.hallUa = true;
      this.hallRu = false;
    },
    langRu() {
      this.hallUa = false;
      this.hallRu = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.hall {
  &__lang {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }
  &__ua,
  &__ru {
    cursor: pointer;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 120px;
    height: 30px;

    display: flex;
    justify-content: center;
    border: solid 2px black;
  }

  &__btns {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  &__save {
    margin: 0px 20px;
  }
  &__return {
    max-height: 40px;
  }
  &__save-error {
    position: relative;
  }
  &__error {
    position: absolute;
    color: red;
    top: -30px;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
  }
}
.active {
  background-color: rgb(121, 120, 120);
}
.error {
  background-color: rgb(248, 88, 88);
  box-shadow: 0px 0px 10px red;
}
</style>