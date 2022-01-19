<template>
  <div>
    <div class="poster">
      <div class="poster__content">
        <div class="poster__list">
          <div v-for="(user, index) in films" :key="user.id">
            <preview-soon v-model="films[index]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewSoon from "@/components/home/PreviewSoon.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PreviewSoon,
  },
  computed: {
    ...mapGetters({
      films: "filmSoon/getFilms",
    }),
  },
  async mounted() {
    await this.$store.dispatch("filmSoon/loadFims");
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