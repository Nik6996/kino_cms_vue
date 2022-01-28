<template>
  <div>
    <div class="schedue">
      <div class="schedue__content">
        <div class="schedue__header">
          <select v-model="film" class="schedue__film">
            <option disabled value="">Фильм</option>
            <option
              v-for="film in films"
              :value="film.itemUa.nameFilm"
              :key="film.id"
            >
              {{ film.itemUa.nameFilm }}
            </option>
          </select>
          <select v-model="cinema" class="schedue__cinema">
            <option disabled value="">Кинотеатр</option>
            <option v-for="cinema in cinemas" :value="cinema" :key="cinema.id">
              {{ cinema.cinemaUa.name }}
            </option>
          </select>
          <select v-model="hall" class="schedue__hall">
            <option disabled value="">Зал</option>
            <option
              v-for="hall in halls"
              :value="hall.hallUa.number"
              :key="hall.id"
            >
              {{ hall.hallUa.number }}
            </option>
          </select>
          <div class="schedue__calendar">
            <div class="schedue__published">
              <div class="schedue__date-published">
                <span v-if="!dateSearch">Дата</span>
                <span v-else>{{ dateSearch }}</span>
                <button @click="calendar()" class="schedue__calendar-btn">
                  <img
                    class="schedue__btn-calendar"
                    src="@/assets/icon/calendar.svg"
                    alt=""
                  />
                  <div class="schedue__arrow">
                    <img
                      v-bind:class="{ active: isActive }"
                      src="@/assets/icon/arrow.svg"
                      alt=""
                    />
                  </div>
                </button>
              </div>
            </div>
            <div v-if="isActive" class="schedue__date">
              <DatePicker v-model="date" />
            </div>
          </div>
          <button @click="reset()">Сбросить фильтры</button>
        </div>
        <div class="schedue__main">
          <div class="schedue__block">
            <div class="schedue__date-block">Дата</div>
            <div class="schedue__time-block">Время</div>
            <div class="schedue__film-block">Фильм</div>
            <div class="schedue__cinema-block">Кинотеатр</div>
            <div class="schedue__hall-block">Зал</div>
            <div class="schedue__price-block">Цена</div>
            <div class="schedue__booc-block">Бронировать</div>
          </div>
          <div class="schedue__list">
            <div v-for="(seance, index) in returnSearch" :key="seance.id">
              <preview-schedule-home v-model="returnSearch[index]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Calendar, DatePicker } from "v-calendar";
import PreviewScheduleHome from "@/components/home/PreviewScheduleHome";
export default {
  data() {
    return {
      film: "",
      cinema: "",
      cinemaSearch: "",
      hall: "",
      halls: "",
      dateSearch: "",
      date: new Date(),
      isActive: false,
    };
  },
  components: {
    Calendar,
    DatePicker,
    PreviewScheduleHome,
  },
  computed: {
    returnSearch() {
      return this.seanceList
        .filter(
          (seance) =>
            seance?.film.filmName.includes(this.film) &&
            seance?.date.includes(this.dateSearch) &&
            seance?.cinema.cinemaName.includes(this.cinemaSearch) &&
            seance?.hall.hallName.includes(this.hall)
        )
        .sort((a, b) => (a.date > b.date ? 1 : -1));
    },

    ...mapGetters({
      cinemas: "cinema/getCinemas",
      films: "film/getFilms",
      seanceList: "schedule/getSeanceList",
    }),
  },
  watch: {
    cinema: {
      handler(cinema) {
        this.cinemaSearch = cinema.cinemaUa.name;
        this.halls = cinema.halls;
      },
    },
    date: {
      handler(date) {
        this.dateSearch = date.toLocaleDateString();
      },
    },
    dateSearch: {
      handler(date) {
        if (date) {
          this.isActive = false;
        }
      },
    },
  },
  async mounted() {
    await this.$store.dispatch("schedule/load");
    await this.$store.dispatch("cinema/loadCinema");
    await this.$store.dispatch("film/loadFims");
  },
  methods: {
    async reset() {
      this.film = "";
      this.cinemaSearch = "";

      this.dateSearch = "";
      this.hall = "";
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
.schedue {
  margin-top: 100px;
  &__content {
    width: 1000px;
    margin: 0 auto;
  }

  &__header {
    display: flex;
  }

  &__cinema {
    margin: 0px 20px;
  }

  &__calendar {
    position: relative;
    margin: 0px 20px;
    span {
      margin-bottom: 5px;
    }
  }
  &__date-published {
    display: flex;
    justify-content: space-between;
    border: solid 2px black;
    max-height: 30px;
    width: 150px;
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

  &__hall {
    margin: 0px 15px;
  }

  &__block {
    font-size: 20px;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    width: 950px;
    justify-content: space-between;
    padding-right: 5px;
  }
  &__main {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    width: 950px;
    border: solid 2px yellow;
  }

  &__date-block {
    width: 90px;
    margin: 0px 10px;
  }

  &__time-block {
    display: flex;
    justify-content: center;
    width: 80px;
    margin: 0px 10px;
  }

  &__film-block {
    display: flex;
    justify-content: center;
    width: 180px;
    margin: 0px 10px;
  }

  &__cinema-block {
    display: flex;
    justify-content: center;
    width: 150px;
    margin: 0px 10px;
  }

  &__hall-block {
    display: flex;
    justify-content: center;
    width: 60px;
    margin: 0px 10px;
  }

  &__price-block {
    display: flex;
    justify-content: center;
    width: 80px;
    margin: 0px 10px;
  }
}
.active {
  transform: rotateX(180deg);
  transition: all 0.5s;
}
</style>