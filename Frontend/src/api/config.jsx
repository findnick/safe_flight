import { useState } from "react";
import axios from "axios";
import APIS from ".";

//vercel api link:
// https://cwbackend-5hrgqvyba-awais-zubairs-projects.vercel.app
// my forwarded server port link
// https://sxtrqp1x-8080.inc1.devtunnels.ms/api
// website domain-host link:
// http://flightsavior.com:8080/api/
// awais testing link:
// https://tj6h9ng2-8080.inc1.devtunnels.ms/api
// local link:
// http://localhost:8080/api

const baseModule = axios.create({
  baseURL: "http://localhost:8080/api",
});

const useAPI = (api) => {
  const [loading, toggleLoading] = useState(false);

  async function fetch_function(body) {
    try {
      toggleLoading(true);
      const res = await api(body);
      return res;
    } catch (err) {
      // console.log(err);
      return err;
    } finally {
      toggleLoading(false);
    }
  }

  return [fetch_function, loading];
};

export { APIS, useAPI, baseModule };
