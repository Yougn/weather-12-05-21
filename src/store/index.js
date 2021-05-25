import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    weather: null,
  },
  mutations: {
    SET_WEATHER_STATE: (state, { weather }) => {
      state.weather = weather;
    },
  },
  actions: {
    async getWeatherFromApi({ commit }) {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily`;
      const response = await axios.get(url, {
        params: {
          lat: "47.2362",
          lon: "38.8969",
          days: 7,
          key: process.env.VUE_APP_WEATHER_API_KEY,
        },
      });
      const weather = response.data;
      commit("SET_WEATHER_STATE", { weather });
    },
  },
});

export default store;
