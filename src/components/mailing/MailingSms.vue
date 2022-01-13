<template>
  <div>
    <div class="mailing">
      <div class="mailing__content">
        <div class="mailing__title"><span>SMS</span></div>
        <div class="mailing__menu">
          <span>Выбрать пользователей кому слать</span>
          <input type="checkbox" id="sms" name="sms" v-model="picked" />
          <label for="sms">Все пользователи</label>
          <input type="checkbox" id="smsChoice" name="sms" v-model="picked1" />
          <label for="smsChoice">Выборочно</label>
          <button :disabled="picked" @click="$router.push('/newsletter/users')">
            Выбрать пользователей
          </button>
        </div>
        <div class="mailing__main">
          <div class="mailing__text">
            <div class="mailing__text-title">
              <span>Текст SMS</span>
              <span>Символов: 111</span>
            </div>
            <textarea placeholder="Введите текст"></textarea>
          </div>
          <div class="mailing__info">
            <div class="mailing__sms">Кол-во SMS: <span>1323</span></div>
            <div class="mailing__progress">
              Рассылка выполнена на: <span>45%</span>
            </div>
          </div>
        </div>
        <div class="mailing__start"><button>Начать рассылку</button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picked: "",
      picked1: "",
    };
  },
  watch: {
    picked: {
      handler(picked) {
        if (picked) {
          this.picked1 = false;
        } else {
          this.picked1 = true;
        }
      },
    },
    picked1: {
      handler(picked1) {
        if (picked1) {
          this.picked = false;
        } else {
          this.picked = true;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.mailing {
  margin-right: 30px;
  border: solid 2px black;
  border-radius: 20px;

  &__title {
    margin: 10px 0px;
    font-weight: 700;
    font-size: 27px;
    display: flex;
    justify-content: center;
  }

  &__menu {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    span {
      margin-right: 20px;
    }
    input {
      position: relative;
      top: 6px;
      margin-right: 10px;
      margin-left: 30px;
    }
    label {
      margin: 0px 50px 0px 0px;
    }
    button {
      border-radius: 10px;
    }
  }

  &__main {
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    max-width: 910px;
  }

  &__text {
    margin-right: 30px;
    textarea {
      width: 500px;
      height: 200px;
    }
  }

  &__text-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  &__sms {
    margin-bottom: 10px;
    span {
      color: blue;
    }
  }

  &__progress {
    span {
      color: blue;
    }
  }

  &__start {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>