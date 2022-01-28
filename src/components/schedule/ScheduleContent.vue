<template>
  <div>
    <div class="schedule">
      <div class="schedule__title">Список Сеансов</div>
      <div class="schedule__button">
        <button class="schedule__btn-create">
          <router-link to="/seance/create">
            <img src="@/assets/icon/plus.svg" alt="" />
            <span>Создать сеанс</span>
          </router-link>
        </button>
      </div>
      <div class="schedule__content">
        <div class="schedule__title-list">
          <div class="schedule__film">Фильм</div>
          <div class="schedule__cinema">Кинотеатр</div>
          <div class="schedule__hall">Зал</div>
          <div class="schedule__date">Дата</div>
          <div class="schedule__time">Время</div>
          <div class="schedule__price">Цена</div>
        </div>
        <div class="schedule__list">
          <div v-for="(seance, index) in seanceList" :key="seance.id">
            <preview-schedule v-model="seanceList[index]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreviewSchedule from "@/components/schedule/PreviewSchedule.vue";
export default {
  data() {
    return {};
  },
  components: {
    PreviewSchedule,
  },
  computed: {
    ...mapGetters({
      seanceList: "schedule/getSeanceList",
    }),
  },
  // watch: {
  //   seanceList: {
  //     handler(seanse) {
  //       console.log(seanse);
  //     },
  //   },
  // },
  async mounted() {
    if (this.seanceList.length <= 0) {
      await this.$store.dispatch("schedule/load");
    }
  },
};
</script>

<style lang="scss" scoped>
.schedule {
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

  &__film {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 10px;
  }

  &__cinema {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
  }

  &__hall {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
  }

  &__time {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
  }

  &__price {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
  }
  &__date {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding: 0px 10px;
    border-left: solid 1px black;
  }
}
</style>