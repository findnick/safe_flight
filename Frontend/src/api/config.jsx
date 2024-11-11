import { useState } from "react";
import axios from "axios";
import APIS from ".";

//vercel api link:
const VERCEL_LINK =
  "https://cwbackend-5hrgqvyba-awais-zubairs-projects.vercel.app";
// my forwarded server port link
const NABEEL_FORWARD_PORT = "https://sxtrqp1x-8080.inc1.devtunnels.ms/api";
// website domain-host link:
const HOST_LINK = "http://flightsavior.com:8080/api";
// awais testing link:
const AWAIS_FORWARD_PORT = "https://tj6h9ng2-8080.inc1.devtunnels.ms/api";
// local link:
const LOCAL_LINK = "http://localhost:8080/api";

const WORKING_LINK = HOST_LINK;
const baseModule = axios.create({
  baseURL: WORKING_LINK,
});

const useAPI = (api) => {
  const [loading, toggleLoading] = useState(false);

  async function fetch_function(body) {
    try {
      toggleLoading(true);
      const res = await api(body);
      return res;
    } catch (err) {
      return err;
    } finally {
      toggleLoading(false);
    }
  }

  return [fetch_function, loading];
};

export { APIS, useAPI, baseModule, WORKING_LINK };
