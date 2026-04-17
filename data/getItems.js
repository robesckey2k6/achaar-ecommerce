import axios from "axios";
import { getEndpoint, endPoints } from "../lib/pages";

export default async function getItems(onfail) {
  var result = await axios.post(getEndpoint(endPoints.getItem), {});

  if (result.data.success) {
    return result.data.items;
  } else {
    //onfail(result);
	console.log("unable to fetch get items endpoint");
    return [];
  }
}
