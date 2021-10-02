<template>
  <div>
    <div class="top-banner__title">
      <strong><p>На главной верх</p></strong>
    </div>
    <div class="top-banner">
      <div class="top-banner__conteiner">
        <form class="top-banner__create-banner" @submit.prevent>
          <input type="file" class="input-img" name="img" />
          <p>
            URL:
            <input
              v-bind:value="url"
              @input="inputUrl"
              type="text"
              placeholder="URL"
              class="top-banner__url"
            />
          </p>
          <p>
            Текст:
            <input
              v-bind:value="text"
              @input="inputText"
              type="text"
              placeholder="text"
              class="top-banner__text"
            />
          </p>
          <button type="submit" @click="createBanner" class="top-banner__btn">
            Добавить
          </button>
        </form>
        <div
          class="top-banner__list-banner banners"
          v-for="banner in banners"
          :key="banner"
        >
          <div class="banners__item">
            <div class="banners__delete">x</div>
            <img class="banners__img" src="" alt="" />
            <div class="banners__url"><span>URL: </span>{{ banner.url }}</div>
            <div class="banners__text">
              <span>Текст: </span>{{ banner.text }}
            </div>
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
      banners: [],
      url: "",
      text: "",
    };
  },
  methods: {
    inputUrl(event) {
      this.url = event.target.value;
    },
    inputText(event) {
      this.text = event.target.value;
    },
    createBanner() {
      const newBanner = { id: Date.now(), url: this.url, text: this.text };

      this.banners.push(newBanner);

      this.url = "";
      this.text = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.top-banner {
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
    flex-wrap: wrap;
  }

  &__create-banner {
    padding-bottom: 30px;
    height: inherit;
    margin: 0px 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__url {
    margin-top: 20px;
  }

  &__btn {
    min-width: 183px;
  }

  &__list-banner {
    align-items: flex-start;
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