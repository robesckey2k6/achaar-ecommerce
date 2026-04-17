import axios from "axios";
import { getEndpoint, endPoints } from "../lib/pages";

export default async function delCartItem(cartId, itemId, onfail) {
  var result = await axios.post(getEndpoint(endPoints.removecartItem), {
    id: cartId,
    itemId: itemId,
  });

  if (result.data.success) {
    return true;
  } else {
    return false;
  }
}
