import { database, storage } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";

import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


const CINEMA_DATABASE_PATH = 'cinema';
export const cinema = {
  namespaced: true,

  state: () => ({
    hallArray: [],
    cinema: null,
    cinemas: [],
    isLoading: false,
  }),
  getters: {
    getHalls(state) {
      return state.hallArray
    },
    getCinema(state) {
      return state.cinema
    },
    getCinemas(state) {
      return state.cinemas
    },
    isLoading(state) {
      return state.isLoading
    }

  },

  actions: {
    async saveHall({ commit, getters }, hall) {

      if (hall) {
        const hallList = getters.getHalls
        if (hallList.length < 1) {
          commit('setHall', hall)
        } else {
          let check = true;
          await hallList.forEach((item, index) => {
            if (item.id === hall.id) {
              commit('editHall', hall, index)
              check = false
            }
          })

          if (check == true) {
            commit('setHall', hall)

          }
        }
      } else {
        commit('clearHall')
      }


    },
    removeHall({ commit, getters }, itemId) {
      const hallList = getters.getHalls

      hallList.forEach((item, index) => {
        if (item.id == itemId) {
          if (hallList.length > 1) {
            commit('deleteHall', index)
          }

        }
      })
    },
    async saveCinemaLocal({ commit }, data) {
      await commit('setCinema', data)
    },




    async saveCinema({ commit, getters }, item) {

      commit('setIsLoading', true);

      async function saveLogoCinemaImg(item) {
        if (item.cinemaUa.logo.imgUrl && item.cinemaUa.logo.img) {
          const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/logo/${item.cinemaUa.logo.id}`)
          await deleteObject(storageRef)
        }
        if (item.cinemaRu.logo.imgUrl && item.cinemaRu.logo.img) {
          const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/logo/${item.cinemaRu.logo.id}`)
          await deleteObject(storageRef)
        }
        if (item.cinemaUa.banner.imgUrl && item.cinemaUa.banner.img) {
          const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/banner/${item.cinemaUa.banner.id}`)
          await deleteObject(storageRef)
        }
        if (item.cinemaRu.banner.imgUrl && item.cinemaRu.banner.img) {
          const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/banner/${item.cinemaRu.banner.id}`)
          await deleteObject(storageRef)
        }


        if (item.cinemaUa.logo.img) {
          const img = item.cinemaUa.logo.img;
          const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/logo/${item.cinemaUa.logo.id}`);
          await uploadBytes(storageRef, img)
          const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/logo/${item.cinemaUa.logo.id}`));
          item.cinemaUa.logo.imgUrl = url;
          item.cinemaUa.logo.img = ''
          item.cinemaUa.logo.logoLocal = ''
        }
        if (item.cinemaRu.logo.img) {
          const img = item.cinemaRu.logo.img;
          const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/logo/${item.cinemaRu.logo.id}`);
          await uploadBytes(storageRef, img)
          const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/logo/${item.cinemaRu.logo.id}`));
          item.cinemaRu.logo.imgUrl = url;
          item.cinemaRu.logo.img = ''
          item.cinemaRu.logo.logoLocal = ''
        }
      };
      async function saveBannerCinemaImg(item) {
        if (item.cinemaUa.banner.img) {
          const img = item.cinemaUa.banner.img;
          const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/banner/${item.cinemaUa.banner.id}`);
          await uploadBytes(storageRef, img)
          const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/banner/${item.cinemaUa.banner.id}`));
          item.cinemaUa.banner.imgUrl = url;
          item.cinemaUa.banner.img = ''
          item.cinemaUa.banner.bannerLocal = ''
        }
        if (item.cinemaRu.banner.img) {
          const img = item.cinemaRu.banner.img;
          const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/banner/${item.cinemaRu.banner.id}`);
          await uploadBytes(storageRef, img)
          const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/banner/${item.cinemaRu.banner.id}`));
          item.cinemaRu.banner.imgUrl = url;
          item.cinemaRu.banner.img = ''
          item.cinemaRu.banner.bannerLocal = ''
        }
      };

      async function saveGallaryCinema(item) {
        if (item.cinemaUa.idRemoveGallary.length >= 0) {

          const idArray = item.cinemaUa.idRemoveGallary
          await idArray.forEach(id => {
            const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/gallary/${id}`);
            deleteObject(storageRef);
          })
        }
        if (item.cinemaRu.idRemoveGallary.length >= 0) {
          const idArray = item.cinemaRu.idRemoveGallary
          await idArray.forEach(id => {
            const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/gallary/${id}`);
            if (storageRef) {
              deleteObject(storageRef);
              id = null
            } else {
              id = null
            }

          })

        }
        if (item.cinemaUa.gallary.length >= 0) {
          const gallary = item.cinemaUa.gallary
          for (let i = 0; i < gallary.length; i++) {

            if (gallary[i].image && gallary[i].url) {

              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/gallary/${gallary[i].id}`);
              await deleteObject(storageRef);
            }
            if (gallary[i].image) {
              const img = gallary[i].image;
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/gallary/${gallary[i].id}`)
              await uploadBytes(storageRef, img)
              const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/gallary/${gallary[i].id}`))
              gallary[i].url = url;
              gallary[i].image = ''
            }

          }
        }
        if (item.cinemaRu.gallary.length >= 0) {
          const gallary = item.cinemaRu.gallary
          for (let i = 0; i < gallary.length; i++) {

            if (gallary[i].image && gallary[i].url) {
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/gallary/${gallary[i].id}`);
              await deleteObject(storageRef);
            }
            if (gallary[i].image) {
              const img = gallary[i].image;
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/gallary/${gallary[i].id}`)
              await uploadBytes(storageRef, img)
              const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/gallary/${gallary[i].id}`))
              gallary[i].url = url;
              gallary[i].image = ''
            }
          }
        }
      };

      async function saveHall(item) {
        if (item.hallsForDelete.length >= 0) {

          item.hallsForDelete.forEach(hall => {

            if (hall.hallUa.layout.imgUrl) {
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/layout/${hall.hallUa.layout.id}`);
              deleteObject(storageRef)
            }
            if (hall.hallRu.layout.imgUrl) {
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/layout/${hall.hallRu.layout.id}`);
              deleteObject(storageRef)
            }
            if (hall.hallUa.banner.imgUrl) {
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/banner/${hall.hallUa.banner.id}`);
              deleteObject(storageRef)
            }
            if (hall.hallRu.banner.imgUrl) {
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/banner/${hall.hallRu.banner.id}`);
              deleteObject(storageRef)
            }
            if (hall.hallUa.gallary.length >= 0) {
              const gallary = hall.hallUa.gallary
              gallary.forEach(img => {
                const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/gallary/${img.id}`);
                deleteObject(storageRef)
              })
            }
            if (hall.hallRu.gallary.length >= 0) {
              const gallary = hall.hallRu.gallary
              gallary.forEach(img => {
                const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/gallary/${img.id}`);
                deleteObject(storageRef)
              })
            }
          })



        }


        if (item.halls) {
          async function saveHallLayoutImg(hall) {
            if (hall.hallUa.layout.img && hall.hallUa.layout.imgUrl) {
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/layout/${hall.hallUa.layout.id}`);
              await deleteObject(storageRef)
            }
            if (hall.hallRu.layout.img && hall.hallRu.layout.imgUrl) {
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/layout/${hall.hallRu.layout.id}`);
              await deleteObject(storageRef)
            }


            if (hall.hallUa.layout.img) {
              const img = hall.hallUa.layout.img;
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/layout/${hall.hallUa.layout.id}`);
              await uploadBytes(storageRef, img)
              const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/layout/${hall.hallUa.layout.id}`));
              hall.hallUa.layout.imgUrl = url
              hall.hallUa.layout.img = ''
              hall.hallUa.layout.layoutLocal = ''
            }
            if (hall.hallRu.layout.img) {
              const img = hall.hallRu.layout.img;
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/layout/${hall.hallRu.layout.id}`);
              await uploadBytes(storageRef, img)
              const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/layout/${hall.hallRu.layout.id}`));
              hall.hallRu.layout.imgUrl = url
              hall.hallRu.layout.img = ''
              hall.hallRu.layout.layoutLocal = ''
            }
          };
          async function saveHallbannerImg(hall) {
            if (hall.hallUa.banner.img && hall.hallUa.banner.imgUrl) {
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/banner/${hall.hallUa.banner.id}`);
              await deleteObject(storageRef)
            }
            if (hall.hallRu.banner.img && hall.hallRu.banner.imgUrl) {
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/banner/${hall.hallRu.banner.id}`);
              await deleteObject(storageRef)
            }
            if (hall.hallUa.banner.img) {
              const img = hall.hallUa.banner.img;
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/banner/${hall.hallUa.banner.id}`);
              await uploadBytes(storageRef, img)
              const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/banner/${hall.hallUa.banner.id}`));
              hall.hallUa.banner.imgUrl = url
              hall.hallUa.banner.img = ''
              hall.hallUa.banner.bannerLocal = ''
            }
            if (hall.hallRu.banner.img) {
              const img = hall.hallRu.banner.img;
              const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/banner/${hall.hallRu.banner.id}`);
              await uploadBytes(storageRef, img)
              const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/banner/${hall.hallRu.banner.id}`));
              hall.hallRu.banner.imgUrl = url
              hall.hallRu.banner.img = ''
              hall.hallRu.banner.bannerLocal = ''
            }
          };
          async function saveGallaryHall(hall) {



            if (hall.hallUa.idRemoveGallary.length >= 0) {

              const idArray = hall.hallUa.idRemoveGallary

              await idArray.forEach(id => {
                const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/gallary/${id}`);
                deleteObject(storageRef);
              })
            }
            if (hall.hallRu.idRemoveGallary.length >= 0) {

              const idArray = hall.hallRu.idRemoveGallary

              await idArray.forEach(id => {
                const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/gallary/${id}`);
                deleteObject(storageRef);
              })
            }







            if (hall.hallUa.gallary) {
              const gallary = hall.hallUa.gallary;

              for (let i = 0; i < gallary.length; i++) {
                if (gallary[i].image && gallary[i].url) {
                  const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/gallary/${gallary[i].id}`);
                  await deleteObject(storageRef)
                }
                if (gallary[i].image) {
                  const img = gallary[i].image;
                  const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/gallary/${gallary[i].id}`);
                  await uploadBytes(storageRef, img)
                  const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ua/gallary/${gallary[i].id}`))
                  gallary[i].url = url;
                  gallary[i].image = ''
                }

              }
            }

            if (hall.hallRu.gallary) {
              const gallary = hall.hallRu.gallary;
              for (let i = 0; i < gallary.length; i++) {
                if (gallary[i].image && gallary[i].url) {
                  const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/gallary/${gallary[i].id}`);
                  await deleteObject(storageRef)
                }
                if (gallary[i].image) {
                  const img = gallary[i].image;
                  const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/gallary/${gallary[i].id}`);
                  await uploadBytes(storageRef, img)
                  const url = await getDownloadURL(refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${hall.id}/ru/gallary/${gallary[i].id}`))
                  gallary[i].url = url;
                  gallary[i].image = ''
                }
              }
            }
          };

          const halls = item.halls
          for (let i = 0; i < halls.length; i++) {
            await saveHallLayoutImg(halls[i], i);
            await saveHallbannerImg(halls[i], i);
            await saveGallaryHall(halls[i], i);
            halls[i].hallUa.idRemoveGallary = []
            halls[i].hallRu.idRemoveGallary = []
          }
        } else {
          console.log('Залов нет')
        }

      }


      try {
        if (item.cinemaUa.idRemoveGallary.length <= 0) {
          item.cinemaUa.idRemoveGallary = []
        }
        if (item.cinemaRu.idRemoveGallary.length <= 0) {
          item.cinemaRu.idRemoveGallary = []
        }
        await saveLogoCinemaImg(item);
        await saveBannerCinemaImg(item);
        await saveHall(item);
        delete item.hallsForDelete
        await saveGallaryCinema(item);


        await set(ref(database, `${CINEMA_DATABASE_PATH}/${item.id}`), {
          ...item
        })
        const getCinemas = getters.getCinemas
        let check = true
        await getCinemas.forEach((cinema) => {
          if (cinema.id == item.id) {
            commit('editCinema', item)
            check = false
          }
        })
        if (check == true) {
          commit('setCinemaArray', item)


        }
        //commit('setHalls', item.halls);

      } catch (error) {
        console.log(error)
      } finally {
        commit('setIsLoading', false);

      }

    },

    async setHallsArray({ commit }, halls) {
      await commit('setHalls', halls);

    },
    async loadCinema({ commit }) {

      try {

        const cinemaRef = ref(database, `${CINEMA_DATABASE_PATH}`)

        const cinemaRecord = await get(cinemaRef)

        if (cinemaRecord.exists()) {
          const cinemas = [];
          cinemaRecord.forEach(cinema => {
            const itemCinema = cinema.val()

            if (!itemCinema.hallsForDelete) {
              itemCinema.hallsForDelete = []
            } else {
              itemCinema.hallsForDelete = []
            }
            if (!itemCinema.cinemaUa.idRemoveGallary) {
              itemCinema.cinemaUa.idRemoveGallary = []
            } else (
              itemCinema.cinemaUa.idRemoveGallary = []
            )
            if (!itemCinema.cinemaRu.idRemoveGallary) {
              itemCinema.cinemaRu.idRemoveGallary = []
            } else {
              itemCinema.cinemaRu.idRemoveGallary = []
            }
            if (itemCinema.halls) {

              const halls = itemCinema.halls

              for (let i = 0; i < halls.length; i++) {

                if (!halls[i].hallUa.gallary) {
                  halls[i].hallUa.gallary = []
                }
                if (!halls[i].hallRu.gallary) {
                  halls[i].hallRu.gallary = []
                }
                if (!halls[i].hallUa.idRemoveGallary) {
                  halls[i].hallUa.idRemoveGallary = []
                } else {
                  halls[i].hallUa.idRemoveGallary = []
                }
                if (!halls[i].hallRu.idRemoveGallary) {
                  halls[i].hallRu.idRemoveGallary = []
                } else {
                  halls[i].hallRu.idRemoveGallary = []
                }
              }
              // itemCinema.halls.forEach(hall => {
              // 	if (!hall.hallUa.gallary) {
              // 		hall.hallUa.gallary = []
              // 	}
              // 	if (!hall.hallRu.gallary) {
              // 		hall.hallRu.gallary = []
              // 	}
              // })
            }
            if (!itemCinema.halls) {
              itemCinema.halls = []
            }
            if (!itemCinema.cinemaUa.gallary) {
              itemCinema.cinemaUa.gallary = []
            }
            if (!itemCinema.cinemaRu.gallary) {
              itemCinema.cinemaRu.gallary = []
            }
            cinemas.push(itemCinema)

          })
          commit('setCinemas', cinemas)
        }


      }
      catch (e) {
        console.log(e)
      }
    },

    async removeCinema({ commit, getters }, item) {
      try {
        async function deleteCinema(item) {
          if (getters.getCinemas) {
            const cinemaRef = ref(database, `${CINEMA_DATABASE_PATH}`)
            const filmsRecord = await get(cinemaRef);
            if (filmsRecord.exists()) {
              set(ref(database, `${CINEMA_DATABASE_PATH}/${item.id}`), null);
              if (item.cinemaUa.logo.imgUrl) {
                const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/logo/${item.cinemaUa.logo.id}`);
                await deleteObject(storageRef)
              }
              if (item.cinemaRu.logo.imgUrl) {
                const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/logo/${item.cinemaRu.logo.id}`);
                await deleteObject(storageRef)
              }
              if (item.cinemaUa.banner.imgUrl) {
                const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/banner/${item.cinemaUa.banner.id}`);
                await deleteObject(storageRef)
              }
              if (item.cinemaRu.banner.imgUrl) {
                const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/banner/${item.cinemaRu.banner.id}`);
                await deleteObject(storageRef)
              }
              if (item.cinemaUa.gallary) {
                const gallaryImg = item.cinemaUa.gallary;
                for (let i = 0; i < gallaryImg.length; i++) {
                  const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ua/gallary/${gallaryImg[i].id}`)
                  await deleteObject(storageRef)
                }

              }
              if (item.cinemaRu.gallary) {

                const gallaryImg = item.cinemaRu.gallary;
                for (let i = 0; i < gallaryImg.length; i++) {
                  const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/ru/gallary/${gallaryImg[i].id}`)
                  await deleteObject(storageRef)
                }

              }
              if (item.halls.length >= 0) {
                const items = item.halls
                for (let i = 0; i < items.length; i++) {
                  if (items[i].hallUa.layout.imgUrl) {
                    const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${items[i].id}/ua/layout/${items[i].hallUa.layout.id}`);
                    await deleteObject(storageRef)
                  }
                  if (items[i].hallRu.layout.imgUrl) {
                    const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${items[i].id}/ru/layout/${items[i].hallRu.layout.id}`);
                    await deleteObject(storageRef)
                  }
                  if (items[i].hallUa.banner.imgUrl) {
                    const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${items[i].id}/ua/banner/${items[i].hallUa.banner.id}`);
                    await deleteObject(storageRef)
                  }
                  if (items[i].hallRu.banner.imgUrl) {
                    const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${items[i].id}/ru/banner/${items[i].hallRu.banner.id}`);
                    await deleteObject(storageRef)
                  }
                  if (items[i].hallUa.gallary) {
                    await items[i].hallUa.gallary.forEach(img => {
                      const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${items[i].id}/ua/gallary/${img.id}`)
                      deleteObject(storageRef)
                    })
                  }
                  if (items[i].hallRu.gallary) {
                    await items[i].hallRu.gallary.forEach(img => {
                      const storageRef = refStorage(storage, `${CINEMA_DATABASE_PATH}/${item.id}/halls/${items[i].id}/ru/gallary/${img.id}`)
                      deleteObject(storageRef)
                    })
                  }
                }

                // item.halls.forEach(hall => {


                const cinemasList = getters.getCinemas

                cinemasList.forEach((cinema, index) => {
                  if (cinema.id == item.id) {
                    if (cinemasList.length > 1) {
                      commit('deleteCinema', index)
                    }

                  }
                })



                // })
              }
            }
          }
        }

        await deleteCinema(item)
      } catch (e) {
        console.log(e)
      } finally {
        // window.location.reload();
      }

    }
  },




  mutations: {
    setHall(state, hall) {
      state.hallArray.push(hall)
    },
    setHalls(state, halls) {
      state.hallArray = halls;
    },
    editHall(state, hall, index) {
      const items = state.hallArray
      items.forEach((item, indexItem) => {
        if (indexItem == index) {
          item = hall
        }
      })

    },
    deleteHall(state, index) {
      state.hallArray.splice(index, 1)
    },
    deleteCinema(state, index) {
      state.cinemas.splice(index, 1)
    },
    clearHall(state) {
      state.hallArray = []
    },
    setCinema(state, data) {
      state.cinema = data;
    },
    setCinemaArray(state, data) {
      state.cinemas.push(data)
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setCinemas(state, data) {
      state.cinemas = data
    },
    editCinema(state, data) {
      state.cinemas.forEach(cinema => {
        if (cinema.id == data.id) {
          cinema = data
        }
      })
    }
  }

}