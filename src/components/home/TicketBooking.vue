<template>
  <div>
    <div class="ticket">
      <div class="ticket__main-img">
        <div v-if="modal" class="ticket__modal">Билеты успешно куплены!</div>
        <img :src="this.hallImg" alt="" />
      </div>
      <div class="ticket__content">
        <div class="ticket__film-img"><img :src="filmImg" alt="" /></div>
        <div class="ticket__main">
          <div class="ticket__name-film">{{ nameFilm }}</div>
          <div class="ticket__info">
            <div class="ticket__date"><span>Дата:</span> {{ date }}</div>
            <div class="ticket__time"><span>Время:</span> {{ time }}</div>
            <div class="ticket__number-hall">
              <span>Зал:</span> {{ numberHall }}
            </div>
          </div>
          <div class="ticket__header">
            <div class="ticket__price">
              Цена в грн: <span>{{ price }}</span>
            </div>
            <div class="ticket__header-main">
              <div class="ticket__booc">Забронировано: <span></span></div>
              <span>Ваш заказ: </span>
              <div class="ticket__order">
                <div class="ticket__tickets">
                  Билетов: <span>{{ sumTickets }}</span>
                </div>
                <div class="ticket__sum">
                  Сумма: <span>{{ priceTickets }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="ticket__hall hall">
            <div class="hall__content">
              <div class="hall__rows">
                <span>Ряд 1</span>
                <span>Ряд 2</span>
                <span>Ряд 3</span>
                <span>Ряд 4</span>
                <span>Ряд 5</span>
                <span>Ряд 6</span>
                <span>Ряд 7</span>
                <span>Ряд 8</span>
                <span>Ряд 9</span>
                <span>Ряд 10</span>
              </div>
              <div class="hall__main">
                <div class="hall__screen">
                  <span></span>
                  <p>Экран</p>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row1.place1 == 'select') {
                        hallSeats.row1.place1 = '';
                      } else {
                        hallSeats.row1.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place1 === 'select',
                      sales: hallSeats.row1.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place2 == 'select') {
                        hallSeats.row1.place2 = '';
                      } else {
                        hallSeats.row1.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place2 === 'select',
                      sales: hallSeats.row1.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place3 == 'select') {
                        hallSeats.row1.place3 = '';
                      } else {
                        hallSeats.row1.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place3 === 'select',
                      sales: hallSeats.row1.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place4 == 'select') {
                        hallSeats.row1.place4 = '';
                      } else {
                        hallSeats.row1.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place4 === 'select',
                      sales: hallSeats.row1.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place5 == 'select') {
                        hallSeats.row1.place5 = '';
                      } else {
                        hallSeats.row1.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place5 === 'select',
                      sales: hallSeats.row1.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place6 == 'select') {
                        hallSeats.row1.place6 = '';
                      } else {
                        hallSeats.row1.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place6 === 'select',
                      sales: hallSeats.row1.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place7 == 'select') {
                        hallSeats.row1.place7 = '';
                      } else {
                        hallSeats.row1.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place7 === 'select',
                      sales: hallSeats.row1.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place8 == 'select') {
                        hallSeats.row1.place8 = '';
                      } else {
                        hallSeats.row1.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place8 === 'select',
                      sales: hallSeats.row1.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place9 == 'select') {
                        hallSeats.row1.place9 = '';
                      } else {
                        hallSeats.row1.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place9 === 'select',
                      sales: hallSeats.row1.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place10 == 'select') {
                        hallSeats.row1.place10 = '';
                      } else {
                        hallSeats.row1.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place10 === 'select',
                      sales: hallSeats.row1.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place11 == 'select') {
                        hallSeats.row1.place11 = '';
                      } else {
                        hallSeats.row1.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place11 === 'select',
                      sales: hallSeats.row1.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row1.place12 == 'select') {
                        hallSeats.row1.place12 = '';
                      } else {
                        hallSeats.row1.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row1.place12 === 'select',
                      sales: hallSeats.row1.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row2.place1 == 'select') {
                        hallSeats.row2.place1 = '';
                      } else {
                        hallSeats.row2.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place1 === 'select',
                      sales: hallSeats.row2.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place2 == 'select') {
                        hallSeats.row2.place2 = '';
                      } else {
                        hallSeats.row2.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place2 === 'select',
                      sales: hallSeats.row2.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place3 == 'select') {
                        hallSeats.row2.place3 = '';
                      } else {
                        hallSeats.row2.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place3 === 'select',
                      sales: hallSeats.row2.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place4 == 'select') {
                        hallSeats.row2.place4 = '';
                      } else {
                        hallSeats.row2.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place4 === 'select',
                      sales: hallSeats.row2.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place5 == 'select') {
                        hallSeats.row2.place5 = '';
                      } else {
                        hallSeats.row2.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place5 === 'select',
                      sales: hallSeats.row2.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place6 == 'select') {
                        hallSeats.row2.place6 = '';
                      } else {
                        hallSeats.row2.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place6 === 'select',
                      sales: hallSeats.row2.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place7 == 'select') {
                        hallSeats.row2.place7 = '';
                      } else {
                        hallSeats.row2.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place7 === 'select',
                      sales: hallSeats.row2.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place8 == 'select') {
                        hallSeats.row2.place8 = '';
                      } else {
                        hallSeats.row2.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place8 === 'select',
                      sales: hallSeats.row2.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place9 == 'select') {
                        hallSeats.row2.place9 = '';
                      } else {
                        hallSeats.row2.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place9 === 'select',
                      sales: hallSeats.row2.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place10 == 'select') {
                        hallSeats.row2.place10 = '';
                      } else {
                        hallSeats.row2.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place10 === 'select',
                      sales: hallSeats.row2.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place11 == 'select') {
                        hallSeats.row2.place11 = '';
                      } else {
                        hallSeats.row2.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place11 === 'select',
                      sales: hallSeats.row2.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place12 == 'select') {
                        hallSeats.row2.place12 = '';
                      } else {
                        hallSeats.row2.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place12 === 'select',
                      sales: hallSeats.row2.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place13 == 'select') {
                        hallSeats.row2.place13 = '';
                      } else {
                        hallSeats.row2.place13 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place13 === 'select',
                      sales: hallSeats.row2.place13 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                  <div
                    @click="
                      if (hallSeats.row2.place14 == 'select') {
                        hallSeats.row2.place14 = '';
                      } else {
                        hallSeats.row2.place14 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row2.place14 === 'select',
                      sales: hallSeats.row2.place14 === 'sales',
                    }"
                    class="hall__place"
                  >
                    14
                  </div>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row3.place1 == 'select') {
                        hallSeats.row3.place1 = '';
                      } else {
                        hallSeats.row3.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place1 === 'select',
                      sales: hallSeats.row3.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place2 == 'select') {
                        hallSeats.row3.place2 = '';
                      } else {
                        hallSeats.row3.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place2 === 'select',
                      sales: hallSeats.row3.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place3 == 'select') {
                        hallSeats.row3.place3 = '';
                      } else {
                        hallSeats.row3.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place3 === 'select',
                      sales: hallSeats.row3.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place4 == 'select') {
                        hallSeats.row3.place4 = '';
                      } else {
                        hallSeats.row3.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place4 === 'select',
                      sales: hallSeats.row3.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place5 == 'select') {
                        hallSeats.row3.place5 = '';
                      } else {
                        hallSeats.row3.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place5 === 'select',
                      sales: hallSeats.row3.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place6 == 'select') {
                        hallSeats.row3.place6 = '';
                      } else {
                        hallSeats.row3.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place6 === 'select',
                      sales: hallSeats.row3.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place7 == 'select') {
                        hallSeats.row3.place7 = '';
                      } else {
                        hallSeats.row3.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place7 === 'select',
                      sales: hallSeats.row3.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place8 == 'select') {
                        hallSeats.row3.place8 = '';
                      } else {
                        hallSeats.row3.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place8 === 'select',
                      sales: hallSeats.row3.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place9 == 'select') {
                        hallSeats.row3.place9 = '';
                      } else {
                        hallSeats.row3.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place9 === 'select',
                      sales: hallSeats.row3.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place10 == 'select') {
                        hallSeats.row3.place10 = '';
                      } else {
                        hallSeats.row3.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place10 === 'select',
                      sales: hallSeats.row3.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place11 == 'select') {
                        hallSeats.row3.place11 = '';
                      } else {
                        hallSeats.row3.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place11 === 'select',
                      sales: hallSeats.row3.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place12 == 'select') {
                        hallSeats.row3.place12 = '';
                      } else {
                        hallSeats.row3.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place12 === 'select',
                      sales: hallSeats.row3.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place13 == 'select') {
                        hallSeats.row3.place13 = '';
                      } else {
                        hallSeats.row3.place13 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place13 === 'select',
                      sales: hallSeats.row3.place13 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place14 == 'select') {
                        hallSeats.row3.place14 = '';
                      } else {
                        hallSeats.row3.place14 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place14 === 'select',
                      sales: hallSeats.row3.place14 === 'sales',
                    }"
                    class="hall__place"
                  >
                    14
                  </div>
                  <div
                    @click="
                      if (hallSeats.row3.place15 == 'select') {
                        hallSeats.row3.place15 = '';
                      } else {
                        hallSeats.row3.place15 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row3.place15 === 'select',
                      sales: hallSeats.row3.place15 === 'sales',
                    }"
                    class="hall__place"
                  >
                    15
                  </div>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row4.place1 == 'select') {
                        hallSeats.row4.place1 = '';
                      } else {
                        hallSeats.row4.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place1 === 'select',
                      sales: hallSeats.row4.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place2 == 'select') {
                        hallSeats.row4.place2 = '';
                      } else {
                        hallSeats.row4.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place2 === 'select',
                      sales: hallSeats.row4.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place3 == 'select') {
                        hallSeats.row4.place3 = '';
                      } else {
                        hallSeats.row4.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place3 === 'select',
                      sales: hallSeats.row4.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place4 == 'select') {
                        hallSeats.row4.place4 = '';
                      } else {
                        hallSeats.row4.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place4 === 'select',
                      sales: hallSeats.row4.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place5 == 'select') {
                        hallSeats.row4.place5 = '';
                      } else {
                        hallSeats.row4.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place5 === 'select',
                      sales: hallSeats.row4.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place6 == 'select') {
                        hallSeats.row4.place6 = '';
                      } else {
                        hallSeats.row4.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place6 === 'select',
                      sales: hallSeats.row4.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place7 == 'select') {
                        hallSeats.row4.place7 = '';
                      } else {
                        hallSeats.row4.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place7 === 'select',
                      sales: hallSeats.row4.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place8 == 'select') {
                        hallSeats.row4.place8 = '';
                      } else {
                        hallSeats.row4.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place8 === 'select',
                      sales: hallSeats.row4.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place9 == 'select') {
                        hallSeats.row4.place9 = '';
                      } else {
                        hallSeats.row4.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place9 === 'select',
                      sales: hallSeats.row4.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place10 == 'select') {
                        hallSeats.row4.place10 = '';
                      } else {
                        hallSeats.row4.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place10 === 'select',
                      sales: hallSeats.row4.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place11 == 'select') {
                        hallSeats.row4.place11 = '';
                      } else {
                        hallSeats.row4.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place11 === 'select',
                      sales: hallSeats.row4.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place12 == 'select') {
                        hallSeats.row4.place12 = '';
                      } else {
                        hallSeats.row4.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place12 === 'select',
                      sales: hallSeats.row4.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row4.place13 == 'select') {
                        hallSeats.row4.place13 = '';
                      } else {
                        hallSeats.row4.place13 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row4.place13 === 'select',
                      sales: hallSeats.row4.place13 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row5.place1 == 'select') {
                        hallSeats.row5.place1 = '';
                      } else {
                        hallSeats.row5.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place1 === 'select',
                      sales: hallSeats.row5.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place2 == 'select') {
                        hallSeats.row5.place2 = '';
                      } else {
                        hallSeats.row5.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place2 === 'select',
                      sales: hallSeats.row5.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place3 == 'select') {
                        hallSeats.row5.place3 = '';
                      } else {
                        hallSeats.row5.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place3 === 'select',
                      sales: hallSeats.row5.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place4 == 'select') {
                        hallSeats.row5.place4 = '';
                      } else {
                        hallSeats.row5.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place4 === 'select',
                      sales: hallSeats.row5.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place5 == 'select') {
                        hallSeats.row5.place5 = '';
                      } else {
                        hallSeats.row5.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place5 === 'select',
                      sales: hallSeats.row5.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place6 == 'select') {
                        hallSeats.row5.place6 = '';
                      } else {
                        hallSeats.row5.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place6 === 'select',
                      sales: hallSeats.row5.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place7 == 'select') {
                        hallSeats.row5.place7 = '';
                      } else {
                        hallSeats.row5.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place7 === 'select',
                      sales: hallSeats.row5.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place8 == 'select') {
                        hallSeats.row5.place8 = '';
                      } else {
                        hallSeats.row5.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place8 === 'select',
                      sales: hallSeats.row5.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place9 == 'select') {
                        hallSeats.row5.place9 = '';
                      } else {
                        hallSeats.row5.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place9 === 'select',
                      sales: hallSeats.row5.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place10 == 'select') {
                        hallSeats.row5.place10 = '';
                      } else {
                        hallSeats.row5.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place10 === 'select',
                      sales: hallSeats.row5.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place11 == 'select') {
                        hallSeats.row5.place11 = '';
                      } else {
                        hallSeats.row5.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place11 === 'select',
                      sales: hallSeats.row5.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place12 == 'select') {
                        hallSeats.row5.place12 = '';
                      } else {
                        hallSeats.row5.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place12 === 'select',
                      sales: hallSeats.row5.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row5.place13 == 'select') {
                        hallSeats.row5.place13 = '';
                      } else {
                        hallSeats.row5.place13 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row5.place13 === 'select',
                      sales: hallSeats.row5.place13 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row6.place1 == 'select') {
                        hallSeats.row6.place1 = '';
                      } else {
                        hallSeats.row6.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place1 === 'select',
                      sales: hallSeats.row6.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place2 == 'select') {
                        hallSeats.row6.place2 = '';
                      } else {
                        hallSeats.row6.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place2 === 'select',
                      sales: hallSeats.row6.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place3 == 'select') {
                        hallSeats.row6.place3 = '';
                      } else {
                        hallSeats.row6.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place3 === 'select',
                      sales: hallSeats.row6.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place4 == 'select') {
                        hallSeats.row6.place4 = '';
                      } else {
                        hallSeats.row6.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place4 === 'select',
                      sales: hallSeats.row6.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place5 == 'select') {
                        hallSeats.row6.place5 = '';
                      } else {
                        hallSeats.row6.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place5 === 'select',
                      sales: hallSeats.row6.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place6 == 'select') {
                        hallSeats.row6.place6 = '';
                      } else {
                        hallSeats.row6.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place6 === 'select',
                      sales: hallSeats.row6.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place7 == 'select') {
                        hallSeats.row6.place7 = '';
                      } else {
                        hallSeats.row6.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place7 === 'select',
                      sales: hallSeats.row6.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place8 == 'select') {
                        hallSeats.row6.place8 = '';
                      } else {
                        hallSeats.row6.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place8 === 'select',
                      sales: hallSeats.row6.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place9 == 'select') {
                        hallSeats.row6.place9 = '';
                      } else {
                        hallSeats.row6.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place9 === 'select',
                      sales: hallSeats.row6.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place10 == 'select') {
                        hallSeats.row6.place10 = '';
                      } else {
                        hallSeats.row6.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place10 === 'select',
                      sales: hallSeats.row6.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place11 == 'select') {
                        hallSeats.row6.place11 = '';
                      } else {
                        hallSeats.row6.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place11 === 'select',
                      sales: hallSeats.row6.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place12 == 'select') {
                        hallSeats.row6.place12 = '';
                      } else {
                        hallSeats.row6.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place12 === 'select',
                      sales: hallSeats.row6.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row6.place13 == 'select') {
                        hallSeats.row6.place13 = '';
                      } else {
                        hallSeats.row6.place13 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row6.place13 === 'select',
                      sales: hallSeats.row6.place13 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row7.place1 == 'select') {
                        hallSeats.row7.place1 = '';
                      } else {
                        hallSeats.row7.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place1 === 'select',
                      sales: hallSeats.row7.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place2 == 'select') {
                        hallSeats.row7.place2 = '';
                      } else {
                        hallSeats.row7.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place2 === 'select',
                      sales: hallSeats.row7.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place3 == 'select') {
                        hallSeats.row7.place3 = '';
                      } else {
                        hallSeats.row7.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place3 === 'select',
                      sales: hallSeats.row7.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place4 == 'select') {
                        hallSeats.row7.place4 = '';
                      } else {
                        hallSeats.row7.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place4 === 'select',
                      sales: hallSeats.row7.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place5 == 'select') {
                        hallSeats.row7.place5 = '';
                      } else {
                        hallSeats.row7.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place5 === 'select',
                      sales: hallSeats.row7.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place6 == 'select') {
                        hallSeats.row7.place6 = '';
                      } else {
                        hallSeats.row7.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place6 === 'select',
                      sales: hallSeats.row7.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place7 == 'select') {
                        hallSeats.row7.place7 = '';
                      } else {
                        hallSeats.row7.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place7 === 'select',
                      sales: hallSeats.row7.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place8 == 'select') {
                        hallSeats.row7.place8 = '';
                      } else {
                        hallSeats.row7.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place8 === 'select',
                      sales: hallSeats.row7.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place9 == 'select') {
                        hallSeats.row7.place9 = '';
                      } else {
                        hallSeats.row7.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place9 === 'select',
                      sales: hallSeats.row7.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place10 == 'select') {
                        hallSeats.row7.place10 = '';
                      } else {
                        hallSeats.row7.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place10 === 'select',
                      sales: hallSeats.row7.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place11 == 'select') {
                        hallSeats.row7.place11 = '';
                      } else {
                        hallSeats.row7.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place11 === 'select',
                      sales: hallSeats.row7.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place12 == 'select') {
                        hallSeats.row7.place12 = '';
                      } else {
                        hallSeats.row7.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place12 === 'select',
                      sales: hallSeats.row7.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row7.place13 == 'select') {
                        hallSeats.row7.place13 = '';
                      } else {
                        hallSeats.row7.place13 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row7.place13 === 'select',
                      sales: hallSeats.row7.place13 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row8.place1 == 'select') {
                        hallSeats.row8.place1 = '';
                      } else {
                        hallSeats.row8.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place1 === 'select',
                      sales: hallSeats.row8.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place2 == 'select') {
                        hallSeats.row8.place2 = '';
                      } else {
                        hallSeats.row8.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place2 === 'select',
                      sales: hallSeats.row8.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place3 == 'select') {
                        hallSeats.row8.place3 = '';
                      } else {
                        hallSeats.row8.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place3 === 'select',
                      sales: hallSeats.row8.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place4 == 'select') {
                        hallSeats.row8.place4 = '';
                      } else {
                        hallSeats.row8.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place4 === 'select',
                      sales: hallSeats.row8.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place5 == 'select') {
                        hallSeats.row8.place5 = '';
                      } else {
                        hallSeats.row8.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place5 === 'select',
                      sales: hallSeats.row8.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place6 == 'select') {
                        hallSeats.row8.place6 = '';
                      } else {
                        hallSeats.row8.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place6 === 'select',
                      sales: hallSeats.row8.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place7 == 'select') {
                        hallSeats.row8.place7 = '';
                      } else {
                        hallSeats.row8.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place7 === 'select',
                      sales: hallSeats.row8.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place8 == 'select') {
                        hallSeats.row8.place8 = '';
                      } else {
                        hallSeats.row8.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place8 === 'select',
                      sales: hallSeats.row8.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place9 == 'select') {
                        hallSeats.row8.place9 = '';
                      } else {
                        hallSeats.row8.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place9 === 'select',
                      sales: hallSeats.row8.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place10 == 'select') {
                        hallSeats.row8.place10 = '';
                      } else {
                        hallSeats.row8.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place10 === 'select',
                      sales: hallSeats.row8.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place11 == 'select') {
                        hallSeats.row8.place11 = '';
                      } else {
                        hallSeats.row8.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place11 === 'select',
                      sales: hallSeats.row8.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place12 == 'select') {
                        hallSeats.row8.place12 = '';
                      } else {
                        hallSeats.row8.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place12 === 'select',
                      sales: hallSeats.row8.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row8.place13 == 'select') {
                        hallSeats.row8.place13 = '';
                      } else {
                        hallSeats.row8.place13 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row8.place13 === 'select',
                      sales: hallSeats.row8.place13 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row9.place1 == 'select') {
                        hallSeats.row9.place1 = '';
                      } else {
                        hallSeats.row9.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place1 === 'select',
                      sales: hallSeats.row9.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place2 == 'select') {
                        hallSeats.row9.place2 = '';
                      } else {
                        hallSeats.row9.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place2 === 'select',
                      sales: hallSeats.row9.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place3 == 'select') {
                        hallSeats.row9.place3 = '';
                      } else {
                        hallSeats.row9.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place3 === 'select',
                      sales: hallSeats.row9.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place4 == 'select') {
                        hallSeats.row9.place4 = '';
                      } else {
                        hallSeats.row9.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place4 === 'select',
                      sales: hallSeats.row9.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place5 == 'select') {
                        hallSeats.row9.place5 = '';
                      } else {
                        hallSeats.row9.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place5 === 'select',
                      sales: hallSeats.row9.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place6 == 'select') {
                        hallSeats.row9.place6 = '';
                      } else {
                        hallSeats.row9.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place6 === 'select',
                      sales: hallSeats.row9.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place7 == 'select') {
                        hallSeats.row9.place7 = '';
                      } else {
                        hallSeats.row9.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place7 === 'select',
                      sales: hallSeats.row9.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place8 == 'select') {
                        hallSeats.row9.place8 = '';
                      } else {
                        hallSeats.row9.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place8 === 'select',
                      sales: hallSeats.row9.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place9 == 'select') {
                        hallSeats.row9.place9 = '';
                      } else {
                        hallSeats.row9.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place9 === 'select',
                      sales: hallSeats.row9.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place10 == 'select') {
                        hallSeats.row9.place10 = '';
                      } else {
                        hallSeats.row9.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place10 === 'select',
                      sales: hallSeats.row9.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place11 == 'select') {
                        hallSeats.row9.place11 = '';
                      } else {
                        hallSeats.row9.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place11 === 'select',
                      sales: hallSeats.row9.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place12 == 'select') {
                        hallSeats.row9.place12 = '';
                      } else {
                        hallSeats.row9.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place12 === 'select',
                      sales: hallSeats.row9.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row9.place13 == 'select') {
                        hallSeats.row9.place13 = '';
                      } else {
                        hallSeats.row9.place13 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row9.place13 === 'select',
                      sales: hallSeats.row9.place13 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                </div>
                <div class="hall__row">
                  <div
                    @click="
                      if (hallSeats.row10.place1 == 'select') {
                        hallSeats.row10.place1 = '';
                      } else {
                        hallSeats.row10.place1 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place1 === 'select',
                      sales: hallSeats.row10.place1 === 'sales',
                    }"
                    class="hall__place"
                  >
                    1
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place2 == 'select') {
                        hallSeats.row10.place2 = '';
                      } else {
                        hallSeats.row10.place2 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place2 === 'select',
                      sales: hallSeats.row10.place2 === 'sales',
                    }"
                    class="hall__place"
                  >
                    2
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place3 == 'select') {
                        hallSeats.row10.place3 = '';
                      } else {
                        hallSeats.row10.place3 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place3 === 'select',
                      sales: hallSeats.row10.place3 === 'sales',
                    }"
                    class="hall__place"
                  >
                    3
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place4 == 'select') {
                        hallSeats.row10.place4 = '';
                      } else {
                        hallSeats.row10.place4 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place4 === 'select',
                      sales: hallSeats.row10.place4 === 'sales',
                    }"
                    class="hall__place"
                  >
                    4
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place5 == 'select') {
                        hallSeats.row10.place5 = '';
                      } else {
                        hallSeats.row10.place5 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place5 === 'select',
                      sales: hallSeats.row10.place5 === 'sales',
                    }"
                    class="hall__place"
                  >
                    5
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place6 == 'select') {
                        hallSeats.row10.place6 = '';
                      } else {
                        hallSeats.row10.place6 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place6 === 'select',
                      sales: hallSeats.row10.place6 === 'sales',
                    }"
                    class="hall__place"
                  >
                    6
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place7 == 'select') {
                        hallSeats.row10.place7 = '';
                      } else {
                        hallSeats.row10.place7 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place7 === 'select',
                      sales: hallSeats.row10.place7 === 'sales',
                    }"
                    class="hall__place"
                  >
                    7
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place8 == 'select') {
                        hallSeats.row10.place8 = '';
                      } else {
                        hallSeats.row10.place8 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place8 === 'select',
                      sales: hallSeats.row10.place8 === 'sales',
                    }"
                    class="hall__place"
                  >
                    8
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place9 == 'select') {
                        hallSeats.row10.place9 = '';
                      } else {
                        hallSeats.row10.place9 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place9 === 'select',
                      sales: hallSeats.row10.place9 === 'sales',
                    }"
                    class="hall__place"
                  >
                    9
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place10 == 'select') {
                        hallSeats.row10.place10 = '';
                      } else {
                        hallSeats.row10.place10 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place10 === 'select',
                      sales: hallSeats.row10.place10 === 'sales',
                    }"
                    class="hall__place"
                  >
                    10
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place11 == 'select') {
                        hallSeats.row10.place11 = '';
                      } else {
                        hallSeats.row10.place11 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place11 === 'select',
                      sales: hallSeats.row10.place11 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place12 == 'select') {
                        hallSeats.row10.place12 = '';
                      } else {
                        hallSeats.row10.place12 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place12 === 'select',
                      sales: hallSeats.row10.place12 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place13 == 'select') {
                        hallSeats.row10.place13 = '';
                      } else {
                        hallSeats.row10.place13 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place13 === 'select',
                      sales: hallSeats.row10.place13 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place14 == 'select') {
                        hallSeats.row10.place14 = '';
                      } else {
                        hallSeats.row10.place14 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place14 === 'select',
                      sales: hallSeats.row10.place14 === 'sales',
                    }"
                    class="hall__place"
                  >
                    14
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place15 == 'select') {
                        hallSeats.row10.place15 = '';
                      } else {
                        hallSeats.row10.place15 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place15 === 'select',
                      sales: hallSeats.row10.place15 === 'sales',
                    }"
                    class="hall__place"
                  >
                    15
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place16 == 'select') {
                        hallSeats.row10.place16 = '';
                      } else {
                        hallSeats.row10.place16 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place16 === 'select',
                      sales: hallSeats.row10.place16 === 'sales',
                    }"
                    class="hall__place"
                  >
                    11
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place17 == 'select') {
                        hallSeats.row10.place17 = '';
                      } else {
                        hallSeats.row10.place17 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place17 === 'select',
                      sales: hallSeats.row10.place17 === 'sales',
                    }"
                    class="hall__place"
                  >
                    12
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place18 == 'select') {
                        hallSeats.row10.place18 = '';
                      } else {
                        hallSeats.row10.place18 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place18 === 'select',
                      sales: hallSeats.row10.place18 === 'sales',
                    }"
                    class="hall__place"
                  >
                    13
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place19 == 'select') {
                        hallSeats.row10.place19 = '';
                      } else {
                        hallSeats.row10.place19 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place19 === 'select',
                      sales: hallSeats.row10.place19 === 'sales',
                    }"
                    class="hall__place"
                  >
                    14
                  </div>
                  <div
                    @click="
                      if (hallSeats.row10.place20 == 'select') {
                        hallSeats.row10.place20 = '';
                      } else {
                        hallSeats.row10.place20 = 'select';
                      }
                    "
                    v-bind:class="{
                      select: hallSeats.row10.place20 === 'select',
                      sales: hallSeats.row10.place20 === 'sales',
                    }"
                    class="hall__place"
                  >
                    15
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ticket__price-booking">
            Стоимость услуги бронирования 3грн. за каждое место.
          </div>
          <div class="ticket__desc">
            забронированные билеты нужно выкупить не позднее чем за полчаса до
            начала сеанса
          </div>
          <div class="ticket__btns">
            <button class="ticket__booking">Забронировать</button>
            <button @click="save()" class="buy">Купить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      hallSeats: {
        row1: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
        },
        row2: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
          place13: "",
          place14: "",
        },
        row3: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
          place13: "",
          place14: "",
          place15: "",
        },
        row4: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
          place13: "",
        },
        row5: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
          place13: "",
        },
        row6: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
          place13: "",
        },
        row7: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
          place13: "",
        },
        row8: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
          place13: "",
        },
        row9: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
          place13: "",
        },
        row10: {
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
          place7: "",
          place8: "",
          place9: "",
          place10: "",
          place11: "",
          place12: "",
          place13: "",
          place14: "",
          place15: "",
          place16: "",
          place17: "",
          place18: "",
          place19: "",
          place20: "",
        },
        id: this.$route.params.id,
      },
      hallImg: "",
      filmImg: "",
      nameFilm: "",
      date: "",
      time: "",
      price: "",
      numberHall: "",
      priceTickets: 0,
      sumTickets: 0,
      modal: false,
    };
  },
  computed: {
    ...mapGetters({
      films: "film/getFilms",
      seanceList: "schedule/getSeanceList",
    }),
  },
  watch: {
    hallSeats: {
      handler(hall) {
        let price = 0;
        let sumTickets = 0;
        for (let i in hall) {
          // console.log(hall[i]);
          const hallItems = hall[i];
          for (let index in hallItems) {
            if (hallItems[index] === "select") {
              price += Number(this.price);
              sumTickets += 1;
            }
          }
        }
        this.priceTickets = price;
        this.sumTickets = sumTickets;
      },
      deep: true,
    },
    modal: {
      handler(modal) {
        if (modal) {
          setTimeout(this.close, 2000);
        }
      },
    },
  },
  async mounted() {
    await this.$store.dispatch("schedule/load");
    await this.$store.dispatch("film/loadFims");
    this.load();
  },
  props: ["idFilm"],
  methods: {
    async save() {
      let hall = this.hallSeats;
      let check = false;
      for (let i in hall) {
        // console.log(hall[i]);
        
        const hallItems = hall[i];
        for (let index in hallItems) {
          if (hallItems[index] === "select") {
            hallItems[index] = "sales";
            check = true
          }
        }
      }
      if(check){
 await this.$store.dispatch("schedule/saveTickets", hall);
      this.modal = true;
      } else{
        console.log('Билеты не выбраны')
      }
     
    },

    load() {
      const id = this.$route.params.id;
      this.seanceList.forEach((seanse) => {
        if (seanse.id == id) {
          this.nameFilm = seanse.film.filmName;
          this.hallImg = this.$attrs.hallImg;
          this.date = seanse.date;
          this.time = seanse.time;
          this.numberHall = seanse.hall.hallName;
          this.price = seanse.price;
          if (seanse.tickets) {
            this.hallSeats = seanse.tickets;
          }

          this.films.forEach((film) => {
            if (film.id === seanse.film.filmId) {
              this.filmImg = film.itemUa.mainImgUrl.url;
            }
          });
        }
      });
    },
    close() {
      this.modal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.ticket {
  width: 1300px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 300px;
  }
  &__content {
    display: flex;
  }

  &__main-img {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
  }

  &__film-img {
    margin-right: 20px;
    width: 240px;
    height: 320px;
    background-color: blueviolet;
    img {
      width: 240px;
      height: 320px;
      object-fit: cover;
    }
  }

  &__main {
    width: 100%;
  }

  &__name-film {
    height: 35px;
    display: flex;
    align-items: center;

    background-color: brown;
    padding: 5px;
    width: 300px;
    color: white;
    font-weight: 600;
    font-size: 20px;
  }
  &__name-film::before {
    position: relative;
    z-index: -1;
    top: 18px;
    left: 0;
    transform: rotate(15deg);
    content: "";
    width: 80px;
    height: 21px;
    background-color: rgb(208, 211, 31);
  }

  &__info {
    margin-top: 30px;
    display: flex;
    font-weight: 500;
    color: gray;
  }

  &__date {
  }

  &__time {
    margin: 0px 10px;
  }

  &__number-hall {
  }

  &__header-main {
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
  }

  &__price {
    margin-top: 10px;
    font-weight: 500;
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      background-color: rgb(218, 141, 0);
    }
  }

  &__booc {
    display: flex;
    align-items: center;
    span {
      margin: 0px 20px 0px 10px;
      display: block;
      width: 40px;
      height: 40px;
      background-color: rgb(109, 109, 109);
    }
  }

  &__order {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 300px;
    border: 4px solid rgb(194, 100, 13);
    font-weight: 500;
    color: rgb(75, 75, 75);
  }

  &__tickets {
    padding: 0px 10px;
    span {
      margin: 0px 5px;
      color: brown;
    }
  }

  &__sum {
    span {
      margin: 0px 5px;
      color: brown;
    }
  }

  &__hall {
  }

  &__price-booking {
    font-weight: 500;
    margin-bottom: 20px;
  }

  &__desc {
    text-transform: uppercase;
    font-weight: 500;
  }

  &__btns {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }

  &__booking {
    margin-right: 20px;
    width: 170px;
    height: 40px;

    font-weight: 600;
    border: solid 2px gray;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
  }
  &__modal {
    border-radius: 5px;
    white-space: nowrap;
    padding: 10px;
    z-index: 100;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;
    color: white;
    top: 0;
    right: 0;
    width: 220px;
    height: 60px;
    background-color: rgb(20, 168, 27);
  }
}
.hall {
  margin-bottom: 30px;
  &__content {
    display: flex;
    justify-content: space-between;
  }
  &__rows {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100px;
    span {
      font-weight: 500;
      margin: 1px;
      display: flex;
      align-items: center;
      height: 40px;
    }
  }

  &__main {
  }

  &__screen {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-image: url(https://cinemaciti.ua/app/images/icons/arc.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    text-transform: uppercase;
    p {
      display: block;
      font-weight: 600;
      font-size: 25px;
      padding: 10px;
      color: grey;
    }
  }

  &__row {
    display: flex;
    justify-content: center;
  }

  &__place {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: chocolate;
    margin: 1px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    color: white;
    font-weight: 500;
    font-size: 12px;
    padding: 3px;
  }
}

.buy {
  width: 170px;
  height: 40px;
  color: white;
  font-weight: 600;
  border: solid 2px gray;
  border-radius: 5px;
  background-color: green;
}
.select {
  background-color: red;
}
.sales {
  background-color: rgb(109, 109, 109);
  position: relative;
  z-index: -1;
}
</style>