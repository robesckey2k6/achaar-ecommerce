import React, { useState } from "react";
import { getCookie } from "cookies-next";
import { IconX } from "@tabler/icons-react";
import { Loader } from "@mantine/core";
import chgCartCount from "../../data/chgCartCount";

var timer = null;

export default function CartMenuItem(props) {
  const [count, setCount] = useState(Number(props.count));
  const [loading, setLoading] = useState(false);

  async function changeCount(newCount) {
    setCount(newCount);
    clearTimeout(timer);
    timer = setTimeout(async () => {
      setLoading(true);
      await chgCartCount(getCookie("cart-id"), props.id, newCount, () => {
        console.log("====ERROR====");
      });
      await props.refreshCart();
    }, 500);
  }

  return (
    <div className="flex items-center gap-3 py-2">
      <img
        src={props.image}
        width={68}
        height={68}
        className="rounded-lg object-cover flex-shrink-0 border border-gray-100 bg-gray-50"
        alt={props.name}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{props.name}</p>
        <p className="text-sm text-gray-500 mt-0.5">
          {loading ? <Loader size="xs" color="dark" /> : `$ ${props.price}`}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors text-sm leading-none"
            onClick={() => count > 1 && changeCount(count - 1)}
          >
            −
          </button>
          <span className="text-sm w-5 text-center font-medium">{count}</span>
          <button
            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors text-sm leading-none"
            onClick={() => changeCount(count + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors p-1"
        onClick={props.remove}
        aria-label="Remove item"
      >
        <IconX size={16} />
      </button>
    </div>
  );
}
