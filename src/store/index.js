import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    weather: []
  },
  mutations: {
    SET_WEATHER_STATE: (state, response) => {
      state.weather = response;
    }
  },
  actions: {
    GET_WEATHER_FROM_API({commit}) {
      return axios("https://api.weatherbit.io/v2.0/forecast/daily?lat=47.2362&lon=38.8969&days=7&key=43013e41df9f443290b1a400251307e7", {
        method: "GET"
      })
      .then((response) => {
        commit('SET_WEATHER_STATE', response.data);
        return response;
      }).catch ((error) => {
        console.log(error);
        return error;
      })
    }
  },
  getters: {
    WEATHER(state) {
      return state.weather;
    }
  }
});

export default store;
