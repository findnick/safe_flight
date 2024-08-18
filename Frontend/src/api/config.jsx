import { useState } from "react";
import axios from "axios";
import APIS from ".";

//vercel api link:
// https://cwbackend-5hrgqvyba-awais-zubairs-projects.vercel.app

const baseModule = axios.create({
  baseURL: "https://tj6h9ng2-8080.inc1.devtunnels.ms/api/",
});

const useAPI = (api) => {
  const [loading, toggleLoading] = useState(false);

  async function fetch_function(body) {
    try {
      toggleLoading(true);
      const res = await api(body);
      return res;
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      toggleLoading(false);
    }
  }

  return [fetch_function, loading];
};

export { APIS, useAPI, baseModule };
