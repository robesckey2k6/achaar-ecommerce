import TitleBackgroundImage from "@/public/items.jpg";
import ProductItem from "@/components/Items/ProductItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getEndpoint, endPoints } from "@/lib/pages";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Loader } from "@mantine/core";
import getItems from "../../data/getItems";

async function addToCart(itemId) {
  let id = getCookie("cart-id");
  await axios.post(getEndpoint(endPoints.addcartItem), { id, itemId });
}

export default function index() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getitems() {
    var result = await getItems();
    setItems(result);
    setLoading(false);
  }

  useEffect(() => {
    getitems();
  }, []);

  const router = useRouter();

  return (
    <>
      {/* Header */}
      <div
        className="h-44 relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${TitleBackgroundImage.src})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold tracking-[0.15em] text-white">
          ALL ITEMS
        </h1>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader size="md" color="dark" />
          </div>
        ) : (
          <div className="item-grid">
            {items.map((value) => (
              <ProductItem
                key={value.id}
                id={value.id}
                router={router}
                name={value.name}
                price={value.price}
                image={value.image}
                addCart={async () => { await addToCart(value.id); }}
                openBagDrawer={globalThis.openCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
