<template>
  <div>
    <div class="news">
      <div class="news__header">
        <div v-if="toggle == 'false'" class="news__off">Выкл</div>
        <div v-else class="news__on">Вкл</div>
        <div class="news__btn-slider">
          <label class="switch">
            <input
              v-model="this.toggle"
              true-value="true"
              false-value="false"
              type="checkbox"
            />
            <span class="slider"></span>
          </label>
        </div>
        <div class="news__lang">
          <button
            v-bind:class="{ active: isActive }"
            @click="currentComponent = 'UaNews'"
            class="news__ua"
          >
            Украинский
          </button>
          <button
            v-bind:class="{ active: !isActive }"
            @click="currentComponent = 'RuNews'"
            class="news__ru"
          >
            Русский
          </button>
        </div>
      </div>

      <div class="news__content">
        <keep-alive>
          <component :is="currentComponent"> </component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import UaNews from "@/components/news/UaNews.vue";
import RuNews from "@/components/news/RuNews.vue";

export default {
  data() {
    return {
      currentComponent: "UaNews",
      isActive: true,
      toggle: true,
    };
  },
  components: {
    UaNews,
    RuNews,
  },
  watch: {
    currentComponent: {
      handler(data) {
        if (data == "UaNews") {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.news {
  margin-top: 120px;
  &__lang {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }
  &__ua,
  &__ru {
    cursor: pointer;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 120px;
    height: 30px;
    // background-color: rgb(161, 161, 161);
    display: flex;
    justify-content: center;
    border: solid 2px black;
  }
  &__btn-slider {
    margin: 0px 30px;
  }
  &__header {
    display: flex;
    justify-content: flex-end;
  }
  &__content {
  }
  &__off,
  &__on {
    font-weight: 500;
    padding-top: 5px;
  }
}

.active {
  background-color: rgb(121, 120, 120);
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + .slider {
    background-color: #01dd01;
  }
}
.slider {
  border-radius: 34px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider:before {
  transform: translateX(26px);
}
</style>