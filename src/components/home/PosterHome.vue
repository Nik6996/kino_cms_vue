<template>
  <div>
    <div class="poster">
      <div class="poster__content">
        <div class="poster__list">
          <div v-for="(user, index) in films" :key="user.id">
            <preview-poster v-model="films[index]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewPoster from "@/components/home/PreviewPoster.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    PreviewPoster,
  },
  computed: {
    ...mapGetters({
      films: "film/getFilms",
    }),
  },
  async mounted() {
    await this.$store.dispatch("film/loadFims");
  },
};
</script>

<style lang="scss" scoped>
.poster {
  background-color: rgb(71, 69, 69);
  width: 1000px;
  margin: 0 auto;
  &__content {
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>