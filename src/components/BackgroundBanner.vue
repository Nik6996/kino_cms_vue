<template>
  <div>
    <div class="background-banner">
      <div class="background-banner__title">
        <p>Сквозной банер на заднем фоне</p>
      </div>
      <div class="background-banner__main">
        <div class="background-banner__size"><p>Размер: 2000x3000</p></div>
        <form class="background-banner__form" action="#">
          <div class="background-banner__radio">
            <p>
              <input
                class="background-banner__input"
                name="photo"
                type="radio"
                id="photoOnBackground"
              />
              <label for="photoOnBackground">Фото на фоне</label>
            </p>
            <p>
              <input
                class="background-banner__input"
                name="photo"
                type="radio"
                id="JustAPhoto"
              />
              <label for="JustAPhoto">Просто фото</label>
            </p>
          </div>
          <div class="background-banner__img">
            <label class="banner-img">
              <input accept=".png, .jpg, .jpeg" type="file" class="input-img" />
              <img src="" alt="" />
            </label>
          </div>
          <div class="background-banner__btns">
            <button class="background-banner__add">Добавить</button>
            <button class="background-banner__delete">Удалить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style  lang="scss" scoped>
.background-banner {
  margin: 30px 0px;
  &__title {
    display: flex;
    justify-content: center;
    font-size: 30px;
  }

  &__main {
    padding: 20px;
    border: solid 2px black;
    border-radius: 20px;
  }

  &__size {
  }

  &__form {
    display: flex;
    align-items: flex-start;
  }

  &__radio {
    display: flex;
    flex-direction: column;
    p {
      margin: 25px 0px;
    }
  }

  &__img {
    margin: 0px 30px;
  }

  &__btns {
  }

  &__add,
  &__delete {
    margin: 20px;
    padding: 0px 20px;
    border-radius: 10px;
  }
  &__input {
    margin-right: 10px;
  }
}
.banner-img {
  display: flex;
  justify-content: center;
  width: 130px;
  min-height: 80px;
  background: grey;
  border: solid 2px black;
  img {
    max-width: 150px;
    max-height: 100px;
  }
}
.input-img {
  display: none;
}
</style>