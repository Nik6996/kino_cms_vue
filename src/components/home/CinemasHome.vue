<template>
  <div>
    <div class="cinemas">
      <div class="cinemas__content">
        <div class="cinemas__title"><span>Наши кинотеатры</span></div>
        <div class="cinemas__list">
          <div v-for="(cinema, index) in cinemas" :key="cinema.id">
            <preview-cinema-home v-model="cinemas[index]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewCinemaHome from "@/components/home/cinemas/PreviewCinemaHome";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cinemas: "cinema/getCinemas",
    }),
  },
  components: {
    PreviewCinemaHome,
  },
  async mounted() {
    await this.$store.dispatch("cinema/loadCinema");
  },
};
</script>

<style lang="scss" scoped>
.cinemas {
  width: 1300px;
  margin: 0 auto;
  &__content {
    margin: 0 auto;
    width: 700px;
  }

  &__title {
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 40px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>