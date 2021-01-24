import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

// let API_SRC = "/data/yakkaw.json";
let API_SRC = "https://yakkaw.mfu.ac.th/api/yakkaw/devices";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    rawdata: {},
  },

  mutations: {
    setData(state, { res }) {
      state.rawdata = res.data;
    },
  },
  actions: {
    async fetchData({ commit }) {
      await axios
        .get(API_SRC)
        .then((res) => {
          commit("setData", { res });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },

  getters: {
    getRawData: (state) => state.rawdata,
    getDataById: (state) => (id) => {
      if (state.rawdata.response) {
        return state.rawdata.response.find((station) => station.dvid == id);
      }
    },
    getActiveStations (state)  {
      if (state.rawdata.response) {
        return state.rawdata.response.filter(
          (station) => station.timestamp != null
        );
      }
    },
  },
});
