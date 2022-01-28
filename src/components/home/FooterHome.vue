<template>
  <div>
    <footer class="footer">
      <div class="footer__content">
        <div class="footer__column">
          <div class="footer__title"><span>Мобильные приложения</span></div>
          <div class="footer__img">
            <img src="@/assets/icon/play-market.png" alt="" />
            <img src="@/assets/icon/app-store.svg" alt="" />
          </div>
          <div class="footer__avada">Разработка сайтов AVADA-MEDIA</div>
        </div>
        <div class="footer__column">
          <div class="footer__title"><span>Афиша</span></div>
          <div class="footer__link">Расписание</div>
          <div class="footer__link">Скоро в прокате</div>
          <div class="footer__link">Кинотеатры</div>
          <div class="footer__link">Акции</div>
        </div>
        <div class="footer__column">
          <div class="footer__title"><span>О кинотеатре</span></div>
          <div class="footer__link">Новости</div>
          <div class="footer__link">Реклама</div>
          <div class="footer__link">Кафе-бар</div>
          <div class="footer__link">Контакты</div>
        </div>
        <div class="footer__column">
          <div class="footer__sites">
            <div><img src="@/assets/icon/f.png" alt="" /></div>
            <div><img src="@/assets/icon/t.png" alt="" /></div>
            <div><img src="@/assets/icon/vk.png" alt="" /></div>
          </div>
        </div>
      </div>
      <div class="footer__bottom">KinoCMS 2016, All rights reserved</div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  background-color: white;
  margin-top: 20px;
  padding: 10px;
  &__content {
    border-top: 3px solid black;
    display: flex;
    justify-content: space-around;
  }

  &__column {
    margin-top: 20px;
    padding: 10px;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  &__img {
    img {
      cursor: pointer;
      width: 130px;
      height: 40px;
    }
  }

  &__avada {
    margin-top: 40px;
    font-size: 13px;
  }

  &__link {
    cursor: pointer;
    margin-bottom: 5px;
  }

  &__sites {
    display: flex;
    img {
      cursor: pointer;
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }

  &__bottom {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-size: 12px;
  }
}
</style>