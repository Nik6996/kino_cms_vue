<template>
  <div>
    <div class="seance">
      <div class="seance__content">
        <select v-model="film" class="seance__cinema">
          <option disabled v-if="this.$route.params.id" value="">
            {{ seance.film.filmName }}
          </option>
          <option v-else disabled value="">Выберите Фильм</option>
          <option v-for="film in films" :value="film" :key="film.id">
            {{ film.itemUa.nameFilm }}
          </option>
        </select>

        <select
          v-if="seance.film.filmId"
          v-model="cinema"
          class="seance__cinema"
        >
          <option disabled v-if="this.$route.params.id" value="">
            {{ seance.cinema.cinemaName }}
          </option>
          <option v-else disabled value="">Выберите Кинотеатр</option>
          <option v-for="cinema in cinemas" :value="cinema" :key="cinema.id">
            {{ cinema.cinemaUa.name }}
          </option>
        </select>
        <select
          v-if="seance.cinema.cinemaId"
          v-model="hall"
          class="seance__hall"
        >
          <option disabled value="">Выберите Зал</option>
          <option v-for="hall in halls" :value="hall" :key="hall.id">
            {{ hall.hallUa.number }}
          </option>
        </select>

        <div v-if="seance.hall.hallId" class="seance__calendar">
          <div class="seance__published">
            <span>Выберите дату</span>
            <div class="seance__date-published">
              <span>{{ seance.date }}</span>
              <button @click="calendar()" class="seance__calendar-btn">
                <img
                  class="seance__btn-calendar"
                  src="@/assets/icon/calendar.svg"
                  alt=""
                />
                <div class="seance__arrow">
                  <img
                    v-bind:class="{ active: isActive }"
                    src="@/assets/icon/arrow.svg"
                    alt=""
                  />
                </div>
              </button>
            </div>
          </div>
          <div v-if="isActive" class="seance__date">
            <DatePicker v-model="date" />
          </div>
        </div>
        <div v-if="seance.date" class="seance__time">
          <span>Выберите время</span>
          <input v-model="seance.time" type="time" />
        </div>
        <div v-if="seance.time" class="seance__price">
          <span>Введите стоимость билета</span>
          <input v-model="seance.price" type="text" placeholder="Цена" />
        </div>
        <button @click="save()" class="seance__save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Calendar, DatePicker } from "v-calendar";
export default {
  data() {
    return {
      seance: {
        film: {
          filmId: "",
          filmName: "",
        },
        cinema: {
          cinemaId: "",
          cinemaName: "",
        },
        hall: {
          hallId: "",
          hallName: "",
        },
        price: "",
        time: "",
        date: "",
        id: "",
        hallImg: "",
      },
      cinema: "",
      halls: "",
      film: "",
      hall: "",
      date: new Date(),
      isActive: false,
    };
  },
  components: {
    Calendar,
    DatePicker,
  },
  computed: {
    ...mapGetters({
      cinemas: "cinema/getCinemas",
      films: "film/getFilms",
      seanceList: "schedule/getSeanceList",
    }),
  },
  watch: {
    cinema: {
      handler(cinema) {
        this.seance.cinema.cinemaId = cinema.id;
        this.seance.cinema.cinemaName = cinema.cinemaUa.name;
        this.halls = cinema.halls;
      },
    },
    hall: {
      handler(hall) {
        this.seance.hall.hallId = hall.id;
        this.seance.hall.hallName = hall.hallUa.number;
        this.seance.hallImg = hall.hallUa.banner.imgUrl;
      },
    },
    film: {
      handler(film) {
        this.seance.film.filmId = film.id;
        this.seance.film.filmName = film.itemUa.nameFilm;
      },
    },
    date: {
      handler(date) {
        this.seance.date = date.toLocaleDateString();
      },
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      await this.$store.dispatch("schedule/load");
      this.loadSeance();
    }
    await this.$store.dispatch("cinema/loadCinema");
    await this.$store.dispatch("film/loadFims");
  },
  methods: {
    async loadSeance() {
      const id = this.$route.params.id;
      await this.seanceList.forEach((item) => {
        if (id == item.id) {
          this.seance = item;
        }
      });
    },
    async save() {
      if (!this.seance.id) {
        this.seance.id = new Date().valueOf();
      }
      await this.$store.dispatch("schedule/save", this.seance);
      this.$router.push("/schedule");
    },
    calendar() {
      if (!this.isActive) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.seance {
  margin-top: 150px;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    select {
      width: 250px;
      height: 30px;
      margin-bottom: 20px;
    }
  }
  &__calendar {
    position: relative;

    span {
      margin-bottom: 5px;
    }
  }
  &__date-published {
    display: flex;
    justify-content: space-between;
    border: solid 2px black;
    max-height: 30px;
    width: 250px;
    span {
      padding-left: 5px;
    }
  }
  &__published {
    display: flex;
    flex-direction: column;

    padding-left: 5px;
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
    display: flex;
  }
  &__btn-calendar {
    position: relative;
    top: 2px;
    left: -2px;
    width: 23px;
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
  &__price {
    width: 250px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }
  &__time {
    padding-top: 20px;
    display: flex;
    justify-content: flex-start;
    width: 250px;
    span {
      margin-right: 20px;
    }
  }
  &__save {
    margin-top: 10px;
  }
}
.active {
  transform: rotateX(180deg);
  transition: all 0.5s;
}
</style>