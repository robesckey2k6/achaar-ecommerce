import axios from "axios";
import { getEndpoint, endPoints } from "../lib/pages";

export default async function getForYou(onfail) {
  var result = await axios.post(getEndpoint(endPoints.getForYou), {});

  if (result.data.success) {
    return result.data.items;
  } else {
    return [];
  }
}
