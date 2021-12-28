import { database, storage } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
//this.$store.getters[`cinema/getCinemas`]


const CONTACTS_PAGE_DATABASE_PATH = 'contacts';
const DATABASE_PATH = 'pages';
export const contactsPage = {
  namespaced: true,

  state: () => ({
    contacts: ''
  }),
  getters: {
    getContacts(state) {
      return state.contacts
    }
  },
  actions: {
    async save({ commit, getters }, item) {

      async function saveImg(item) {

        const cinemas = item.listCinema
        for (let i = 0; i < cinemas.length; i++) {
          if (cinemas[i].logo.img) {
            const img = cinemas[i].logo.img;
            const storageRef = refStorage(storage, `${DATABASE_PATH}/${CONTACTS_PAGE_DATABASE_PATH}/${cinemas[i].logo.id}`)
            await uploadBytes(storageRef, img);
            const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${CONTACTS_PAGE_DATABASE_PATH}/${cinemas[i].logo.id}`));
            cinemas[i].logo.url = url;
            cinemas[i].logo.img = ''
            cinemas[i].logo.localUrl = ''
          }
        }
      }
      try {
        await saveImg(item);

        await set(ref(database, `${DATABASE_PATH}/${CONTACTS_PAGE_DATABASE_PATH}`), {
          ...item
        })

        commit('setContacts', item);
      } catch (e) {
        console.log(e)
      } finally { }
    },


    async load({ commit }) {
      try {
        const contactsRef = ref(database, `${DATABASE_PATH}/${CONTACTS_PAGE_DATABASE_PATH}`);
        const contactsRecord = await get(contactsRef)

        if (contactsRecord.exists()) {
          commit('setContacts', contactsRecord.val())
        }

      } catch (e) {
        console.log(e)
      } finally { }
    },

    async removeContact({ commit, getters }, item) {
      console.log(item.id)
      const contactsItem = getters.getContacts;
      const contacts = contactsItem.listCinema;
      console.log(item.logo.id)
      if (item.logo.url) {
        const storageRef = refStorage(storage, `${DATABASE_PATH}/${CONTACTS_PAGE_DATABASE_PATH}/${item.logo.id}`)
        await deleteObject(storageRef)
      }
      contacts.forEach((contact, index) => {
        if (item.id === contact.id) {
          commit('removeContact', index)
        }
      })

    }

  },
  mutations: {
    setContacts(state, item) {
      state.contacts = item
    },

    removeContact(state, index) {
      state.contacts.listCinema.splice(index, 1)
    },
  }
}