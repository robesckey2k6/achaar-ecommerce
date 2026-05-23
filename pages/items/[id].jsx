import axios from "axios";
import React, { useState } from "react";
import { endPoints, getEndpoint } from "../../lib/pages";
import { Loader } from "@mantine/core";
import { getCookie } from "cookies-next";
import addCartItem from "../../data/addCartItem";
import ProductItem from "../../components/Items/ProductItem";
import { useRouter } from "next/router";

async function addToCart(itemId) {
  const id = getCookie("cart-id");
  await axios.post(getEndpoint(endPoints.addcartItem), { id, itemId });
}

export default function item({ item, recommended }) {
  const [count, setCount] = useState(1);
  const [pitem] = useState(item);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setLoading(true);
    await addCartItem(getCookie("cart-id"), pitem.id, count, (result) => {
      console.log(result);
    });
    setLoading(false);
    globalThis.openCart();
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 md:items-start">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={pitem.image}
            className="w-full aspect-square object-cover rounded-2xl border border-gray-200 bg-gray-50"
            alt={pitem.name}
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <div className="border-b border-gray-100 pb-5">
            <h1 className="text-3xl font-bold text-gray-900">{pitem.name}</h1>
            <p className="text-2xl font-semibold text-gray-800 mt-3">
              $ {pitem.price}
            </p>
          </div>

          {pitem.description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {pitem.description}
            </p>
          )}

          {/* Quantity selector */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Quantity
            </p>
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-5 py-2.5 w-fit">
              <button
                className="text-gray-500 hover:text-gray-900 transition-colors w-5 text-center text-lg leading-none"
                onClick={() => count > 1 && setCount(count - 1)}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold">{count}</span>
              <button
                className="text-gray-500 hover:text-gray-900 transition-colors w-5 text-center text-lg leading-none"
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Desktop CTA */}
          <button
            className="hidden sm:flex items-center justify-center py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all"
            onClick={handleAddToCart}
          >
            {loading ? <Loader size="xs" color="white" /> : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Recommendations */}
      {recommended.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="item-grid">
              {recommended.map((rec) => (
                <ProductItem
                  key={rec.id}
                  id={rec.id}
                  router={router}
                  name={rec.name}
                  price={rec.price}
                  image={rec.image}
                  addCart={async () => { await addToCart(rec.id); }}
                  openBagDrawer={globalThis.openCart}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <button
          className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          onClick={handleAddToCart}
        >
          {loading ? <Loader size="xs" color="white" /> : "Add to Cart"}
        </button>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const [itemResult, recResult] = await Promise.all([
    axios.post(getEndpoint(endPoints.getitemId), { id: params.id }),
    axios.post(getEndpoint(endPoints.getForYou), {}),
  ]);

  const item = itemResult.data.items[0];
  const recommended = recResult.data.success
    ? recResult.data.items.filter((r) => r.id !== item.id).slice(0, 4)
    : [];

  return {
    props: { item, recommended },
  };
}
