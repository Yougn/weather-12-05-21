import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    weather: null,
    // TODO ES: move UI related changes to Vue components
    loading: false,
    error: null,
  },
  mutations: {
    SET_WEATHER_STATE: (state, response) => {
      state.weather = response;
    },
  },
  actions: {
    async getWeatherFromApi({ commit }) {
      // TODO ES: changing state outside mutations is not allowed
      this.state.loading = true;
      const url = `https://api.weatherbit.io/v2.0/forecast/daily`;
      // TODO ES: handle error in components, unless state change on error is required. In this case throw error
      try {
        const response = await axios.get(url, {
          params: {
            lat: "47.2362",
            lon: "38.8969",
            days: 7,
            key: process.env.VUE_APP_WEATHER_API_KEY,
          },
        });
        commit("SET_WEATHER_STATE", response.data);
        // TODO ES: vuex action must return Promise<undefined>
        return response;
      } catch (error) {
        this.state.error = error;
        throw error;
      } finally {
        this.state.loading = false;
      }
    },
  },
});

export default store;
