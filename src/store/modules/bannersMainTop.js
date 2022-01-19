
import { database, storage } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";

import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


const default_interval = "5c";
const BANNERS_DATABASE_PATH = 'bannersMainTop';
const default_toggle = true;

export const bannersMainTop = {
  namespaced: true,

  state: () => ({

    items: [],
    interval: default_interval,
    toggle: default_toggle,
    error: null,
    isLoading: true,

  }),
  getters: {
    items(state) {
      return state.items;
    },
    interval(state) {
      return state.interval;
    },
    intervalHome(state) {
      if (state.interval === '5с') {
        return 5000;
      } if (state.interval === '10с') {
        return 10000
      } if (state.interval === '15с') {
        return 15000
      }

    },
    toggle(state) {
      return state.toggle;
    },
    isLoading(state) {
      return state.isLoading;
    },
    error(state) {
      return state.error;
    },

  },

  actions: {
    async save({ commit, state }, { items, interval, toggle }) {
      console.log(items)
      commit('setError', null);
      commit('setIsLoading', true);

      async function updateImg(item, index) {
        const img = item.file
        const storageRef = refStorage(storage, `${BANNERS_DATABASE_PATH}/${item.file.imgId}`);
        await uploadBytes(storageRef, img);

        const url = await getDownloadURL(refStorage(storage, `${BANNERS_DATABASE_PATH}/${item.file.imgId}`))
        delete item.file
        set(ref(database, `${BANNERS_DATABASE_PATH}/items/${item.id}`), {
          ...item,
          order: index,
          image: url
        })

      }

      try {
        const itemsRef = ref(database, `${BANNERS_DATABASE_PATH}/items`)
        const itemsRecord = await get(itemsRef);


        if (itemsRecord.exists()) {
          itemsRecord.forEach(itemRecord => {

            const databaseItem = itemRecord.val();
            const matchingItem = items.find(item => databaseItem.id === item.id);
            if (!matchingItem) {
              set(ref(database, `${BANNERS_DATABASE_PATH}/items/${databaseItem.id}`), null);
              const storageRef = refStorage(storage, `${BANNERS_DATABASE_PATH}/${databaseItem.id}`);
              deleteObject(storageRef);
            }
          })
          items.forEach((item, index) => {
            if (item.file) {
              updateImg(item, index)
            } else {
              set(ref(database, `${BANNERS_DATABASE_PATH}/items/${item.id}`), {
                ...item,
                order: index,

              })
            }

          });
        } else {
          items.forEach((item, index) => {
            console.log(item)
            if (item.file) {
              // TODO: update file
              updateImg(item, index);


            } else {
              set(ref(database, `${BANNERS_DATABASE_PATH}/items/${item.id}`), {
                ...item,
                order: index,
              })
            }


          });
        }


        //set(ref(database, `${BANNERS_DATABASE_PATH}/items`), updatedBanners);

        const intervalRef = ref(database, `${BANNERS_DATABASE_PATH}/interval`);
        set(intervalRef, interval);

        const toggleRef = ref(database, `${BANNERS_DATABASE_PATH}/toggle`);
        set(toggleRef, toggle);

        commit('setToggle', toggle)
        commit('setItems', items);
        commit('setInterval', interval);

      } catch (error) {
        commit('setError', null);

      } finally {
        commit('setIsLoading', false)
      }
    },

    async load({ commit }) {
      commit('setError', null);
      commit('setIsLoading', true);

      try {
        const itemsRef = ref(database, `${BANNERS_DATABASE_PATH}/items`);

        const itemsRecord = await get(itemsRef);

        if (itemsRecord.exists()) {
          const items = [];
          itemsRecord.forEach(itemRecord => {
            items.push(itemRecord.val())
          });
          commit('setItems', items)
        }
        const intervalRef = ref(database, `${BANNERS_DATABASE_PATH}/interval`);
        const intervalRecord = await get(intervalRef);

        if (intervalRecord.exists()) {
          await commit('setInterval', intervalRecord.val())
        };

        const toggleRef = ref(database, `${BANNERS_DATABASE_PATH}/toggle`);
        const toggleRecord = await get(toggleRef);

        if (toggleRecord.exists()) {
          await commit('setToggle', toggleRecord.val())
        }

      } catch (error) {
        commit('setError', error);
      }
      finally {
        commit('setIsLoading', false);
      }
    }
  },

  mutations: {

    setInterval(state, interval) {
      state.interval = interval;
    },
    setToggle(state, toggle) {
      state.toggle = toggle
    },
    setItems(state, items) {
      state.items = items
    },
    setError(state, error) {
      state.error = error;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  }


}












