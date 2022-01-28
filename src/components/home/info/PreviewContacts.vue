<template>
  <div>
    <div class="card">
      <div class="card__content">
        <div class="card__row">
          <div class="card__title">{{ name }}</div>
          <div class="card__address">{{ address }}</div>
        </div>
        <div class="card__row">
          <div class="card__img"><img :src="img" alt="" /></div>
          <div class="card__location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20308.108298024075!2d30.476638618087243!3d50.487399376891695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce02e4080bab%3A0x2b2f2b52535638e0!2z0JHQm9Ce0JrQkdCQ0KHQotCV0KA!5e0!3m2!1sru!2sua!4v1642637985077!5m2!1sru!2sua"
              width="400"
              height="300"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$attrs.modelValue.name,
      img: this.$attrs.modelValue.logo.url,
      address: this.$attrs.modelValue.address,
      location: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 800px;
  &__content {
  }

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-weight: 500;
    font-size: 30px;
    padding: 20px;
  }

  &__address {
    padding: 20px;
    font-size: 20px;
    width: 300px;
  }

  &__img {
    margin: 10px;
    img {
      width: 300px;
      height: 250px;
      object-fit: cover;
    }
  }

  &__location {
  }
}
</style>