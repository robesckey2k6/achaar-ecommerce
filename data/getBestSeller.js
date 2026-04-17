import axios from "axios";
import { getEndpoint, endPoints } from "../lib/pages";

export default async function getBestSeller(onfail) {
  var result = await axios.post(getEndpoint(endPoints.getBestSeller), {});

  if (result.data.success) {
    return result.data.items;
  } else {
    return [];
  }
}
