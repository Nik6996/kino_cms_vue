<template>
  <div>
    <div class="top-banner__title">
      <strong><p>На главной верх</p></strong>
    </div>
    <div class="top-banner">
      <div class="top-banner__conteiner">
        <form class="top-banner__create-banner">
          <input type="file" class="input-img" name="img" />
          <p>
            URL:
            <input
              v-bind:value="url"
              type="text"
              placeholder="URL"
              class="top-banner__url"
            />
          </p>
          <p>
            Текст:
            <input
              v-bind:value="text"
              type="text"
              placeholder="text"
              class="top-banner__text"
            />
          </p>
          <button type="submit" @click="createBanner" class="top-banner__btn">
            Добавить
          </button>
        </form>
        <div class="top-banner__list-banner banners" v-for="banner in banners">
          <div class="banners__item">
            <div class="banners__delete">x</div>
            <img class="banners__img" src="" alt="" />
            <div class="banners__url">{{ banner.url }}</div>
            <div class="banners__text">{{ banner.text }}</div>
          </div>
        </div>
      </div>
      <div class="btn"><button class="btn-save">Сохранить</button></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [
        { id: 1, url: "какая то ссылка", text: "какой то текст 1" },
        { id: 2, url: "какая то ссылка", text: "какой то текст 2" },
        { id: 3, url: "какая то ссылка", text: "какой то текст 3" },
      ],
      url: "",
      text: "",
    };
  },
  methods: {
    createBanner() {},
  },
};
</script>

<style lang="scss" scoped>
.top-banner {
  margin-left: 240px;
  margin-right: 30px;
  border: solid 2px black;
  min-height: 300px;
  border-radius: 20px;
  &__title {
    display: flex;
    justify-content: center;
    font-size: 30px;
  }

  &__conteiner {
    margin-top: 100px;
    display: flex;
    align-items: flex-start;
    min-height: inherit;
  }

  &__create-banner {
    margin: 0px 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__url {
    margin-top: 20px;
  }

  &__text {
  }

  &__btn {
    min-width: 183px;
  }

  &__list-banner {
  }
}
.input-img {
  width: 183px;
  height: 100px;
  background: grey;
}
.banners {
  position: relative;
  &__delete {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: -25px;
    font-size: 20px;
  }
  &__item {
    margin: 0px 30px;
  }

  &__url {
    margin: 20px 0px;
  }

  &__text {
  }
  &__img {
    width: 183px;
    height: 100px;
    background: grey;
  }
}
.btn {
  display: flex;
  justify-content: center;
}
.btn-save {
  width: 150px;
  height: 50px;
}
</style>