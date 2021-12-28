<template>
  <div>
    <div class="main-card">
      <div class="main-card__number">
        <span>Телефон</span>
        <div class="main-card__number-block">
          <input
            v-model="mainUa.phone1"
            class="main-card__number1"
            type="text"
            placeholder="777 85 98"
          />
          <input
            v-model="mainUa.phone2"
            class="main-card__number2"
            type="text"
            placeholder="777 85 98"
          />
        </div>
      </div>
      <div class="main-card__seo-text">
        <span>SEO текст:</span>
        <textarea
          v-model="mainUa.seoText"
          placeholder="текст"
          cols="90"
          rows="8"
        ></textarea>
      </div>
      <div class="main-card__seo">
        <div class="main-card__seo-block">
          <span>SEO блок:</span>
          <div class="main-card__seo-input">
            <p>
              URL:
              <input v-model="mainUa.seoUrl" type="text" placeholder="URL" />
            </p>
            <p>
              Title:
              <input
                v-model="mainUa.seoTitle"
                type="text"
                placeholder="Title"
              />
            </p>
            <p class="keywords">
              Keywords:
              <input
                v-model="mainUa.seoKeywords"
                type="text"
                placeholder="word"
              />
            </p>
            <p class="main-card__seo-description">
              Description:<textarea
                v-model="mainUa.seoDescription"
                class="main-card__seo-description-textarea"
                placeholder="Description"
              ></textarea>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mainUa: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.main-card {
  &__number {
    display: flex;
    margin-bottom: 40px;
    span {
      margin-right: 30px;
    }
  }
  &__number-block {
    display: flex;
    flex-direction: column;
    height: 80px;

    justify-content: space-between;
  }

  &__number1 {
  }

  &__number2 {
  }

  &__seo-text {
    display: flex;
    span {
      margin-right: 20px;
    }
  }

  &__seo {
    display: flex;
    justify-content: center;
    margin: 30px 0;
  }

  &__seo-block {
    display: flex;

    span {
      margin-right: 100px;
      font-weight: 500;
    }
  }

  &__seo-input {
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    p {
      display: flex;
    }
    input {
      width: 600px;
    }
  }

  &__seo-description {
    display: flex;
    position: relative;
    left: -50px;
  }

  &__seo-description-textarea {
    width: 600px;
    height: 70px;
  }
}
.keywords {
  position: relative;
  left: -38px;
}
</style>