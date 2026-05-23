import React, { useState } from "react";
import { Loader } from "@mantine/core";
import { IconShoppingBag } from "@tabler/icons-react";

export default function ProductItem(props) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    await props.addCart();
    setLoading(false);
    props.openBagDrawer();
  };

  return (
    <div className="flex flex-col group rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-44">
        <img
          src={props.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={props.name}
        />
        {/* Mobile quick-add */}
        <button
          className="absolute bottom-2 right-2 bg-black text-white rounded-full p-2 md:hidden shadow-md active:scale-95 transition-transform"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          {loading ? (
            <Loader size="xs" color="white" />
          ) : (
            <IconShoppingBag size={15} stroke={1.5} />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2">
        <p
          className="text-sm font-medium text-gray-900 line-clamp-1 hover:underline underline-offset-2 cursor-pointer"
          onClick={() => props.router.push(`items/${props.id}`)}
        >
          {props.name}
        </p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-gray-500">$ {props.price}</p>
          {/* Desktop add button */}
          <button
            className="hidden md:flex items-center text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-black active:scale-95 transition-all"
            onClick={handleAddToCart}
          >
            {loading ? <Loader size="xs" color="white" /> : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
