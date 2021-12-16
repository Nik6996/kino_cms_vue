<template>
  <div>
    <div class="cinemas">
      <div class="cinemas__list">
        <div v-for="(cinema, index) in cinemas" :key="cinema.id">
          <preview-cinema v-model="cinemas[index]" />
        </div>
      </div>
      <button class="cinemas__button">
        <router-link to="/cinemas/create/cinema">Добавить</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreviewCinema from "@/components/cinemas/PreviewCinema.vue";
export default {
  components: {
    PreviewCinema,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      cinemas: "cinema/getCinemas",
    }),
  },

  async mounted() {
    await this.$store.dispatch("cinema/saveHall", null);
    await this.$store.dispatch("cinema/saveCinemaLocal", null);
    await this.$store.dispatch("cinema/loadCinema");
  },
};
</script>

<style lang="scss" scoped>
.cinemas {
  &__list {
    height: 300px;
    display: flex;
  }
  &__button {
    display: block;
    margin: 0 auto;
  }
}
</style>
