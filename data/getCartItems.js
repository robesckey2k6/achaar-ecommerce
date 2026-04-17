import axios from "axios";
import { getEndpoint, endPoints } from "../lib/pages";

export default async function getCartItems(cartId, itemId, onfail) {
  var result = await axios.post(getEndpoint(endPoints.getcartItems), {
    id: cartId,
    itemId: itemId,
  });

  if (result.data.success) {
    return [result.data.items, result.data.total];
  } else {
    return [];
  }
}
