import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Drawer, Loader } from "@mantine/core";
import delCartItem from "../../data/delCartItems";
import getCartItems from "../../data/getCartItems";
import CartMenuItem from "./CartMenuItem";

export default function CartDrawer(props) {
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);

  async function refreshCart() {
    const [tempItems, total] = await getCartItems(getCookie("cart-id"), (result) => {
      console.log("====ERROR====", result);
    });
    tempItems.sort((a, b) => (a.id > b.id ? 1 : -1));
    setItems(tempItems);
    setTotalCost(total);
    setIsLoading(false);
  }

  async function delCart(itemId) {
    setIsLoading(true);
    await delCartItem(getCookie("cart-id"), itemId, (result) => {
      console.log("====ERROR====", result);
    });
    refreshCart();
  }

  function onCheckout() {
    props.onClose();
    globalThis.router.push("/checkout");
  }

  useEffect(() => {
    refreshCart();
  }, [props.opened]);

  return (
    <Drawer
      position="right"
      onClose={props.onClose}
      opened={props.opened}
      title={
        <span className="text-base font-semibold text-gray-900">Your Cart</span>
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] gap-5 text-center">
          <div className="text-5xl select-none">🛍️</div>
          <div>
            <p className="text-base font-semibold text-gray-900">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
          </div>
          <button
            className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
            onClick={props.onClose}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full gap-4">
          <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-100">
            <span>Product</span>
            <span>Total</span>
          </div>

          <div className="flex-1 flex flex-col divide-y divide-gray-100 overflow-y-auto">
            {items.map((value) => (
              <CartMenuItem
                id={value.item.id}
                key={value.item.id}
                name={value.item.name}
                price={value.total}
                image={value.item.image}
                count={value.count}
                remove={() => delCart(value.item.id)}
                refreshCart={refreshCart}
              />
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Estimated Total</span>
              <span className="text-xl font-bold text-gray-900">$ {totalCost}</span>
            </div>
            <button
              className="w-full py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
              onClick={onCheckout}
            >
              {isLoading ? <Loader size="xs" color="white" /> : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
