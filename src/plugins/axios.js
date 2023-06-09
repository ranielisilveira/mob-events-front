import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "http://localhost:8005",
});

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$axios", { value: instance });
  },
};
