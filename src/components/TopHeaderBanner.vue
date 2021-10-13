<template>
  <div class="top-banner-title">На главной верх</div>
  <div class="top-banner">
    <div class="top-banner__size"><p>Размер: 1000x190</p></div>
    <div class="top-banner__banners">
      <div class="top-banner__list">
        <div v-for="(banner, index) in banners" :key="index">
          <new-banner
            v-model="banners[index]"
            @deleteBanner="deleteBanner(index)"
          />
        </div>
      </div>
      <button @click="createBanner" class="create-banner">Добавить</button>
    </div>
    <div class="top-banner__bottom-btns">
      <div class="top-banner__speed">
        <form action="formdata" method="post" name="form1">
          <p>
            Скорость вращения
            <select name="list1">
              <option>5с</option>
              <option>10с</option>
              <option>15с</option>
            </select>
          </p>
        </form>
      </div>
      <button @click="saveBanners" class="save" type="submit">Сохранить</button>
    </div>
  </div>
</template>

<script>
import NewBanner from "./NewBanner.vue";

export default {
  components: { NewBanner },

  computed: {
    banners() {
      return this.$store.getters.banners;
    },
  },
  mounted: function () {
    // this.$store.dispatch("saveBanners");
  },

  methods: {
    async saveBanners() {
      const banner = this.$store.getters.banners;
      await this.$store.dispatch("saveBanners", banner);
    },

    // async pushName() {
    //   await this.$store.dispatch("pushName", this.names);
    // },

    createBanner() {
      this.banners.push({
        url: "",
        text: "",
      });
    },

    deleteBanner(index) {
      this.banners.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-banner-title {
  display: flex;
  justify-content: center;
  font-size: 30px;
}
.top-banner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 350px;
  margin-right: 30px;
  border: solid 2px black;
  border-radius: 20px;
  &__size {
    margin: 30px 0px 0px 20px;
  }

  &__banners {
    display: flex;
  }

  &__list {
    display: flex;
    margin: 20px 20px 20px 70px;
    flex-wrap: wrap;
  }

  &__bottom-btns {
    position: relative;
    display: flex;
    margin: 20px 0px;
  }

  &__speed {
    margin: 0px 0px 0px 50px;
  }
}
.create-banner {
  position: relative;
  top: 20px;
  max-height: 50px;
}
.save {
  position: absolute;
  left: 45%;
  width: 140px;
  height: 40px;
  border-radius: 7px;
}
</style>