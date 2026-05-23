import TitleBackgroundImage from "@/public/home_image.jpg";
import ProductItem from "@/components/Items/ProductItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getEndpoint, endPoints } from "@/lib/pages";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Loader } from "@mantine/core";
import getBestSeller from "../data/getBestSeller";
import getForYou from "../data/getForYou";

async function addToCart(itemId) {
  let id = getCookie("cart-id");
  await axios.post(getEndpoint(endPoints.addcartItem), { id, itemId });
}

export default function index() {
  const [bestSellerItems, setBestSellerItems] = useState([]);
  const [forYouItems, setForYouItems] = useState([]);
  const [loadingBestSeller, setLoadingBestSeller] = useState(true);
  const [loadingForYou, setLoadingForYou] = useState(true);

  async function getitems() {
    var result = await getBestSeller();
    setBestSellerItems(result);
    setLoadingBestSeller(false);
    result = await getForYou();
    setForYouItems(result);
    setLoadingForYou(false);
  }

  useEffect(() => {
    getitems();
  }, []);

  const router = useRouter();

  return (
    <>
      {/* Hero */}
      <div
        className="h-[55vh] relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${TitleBackgroundImage.src})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col items-center text-center px-6 gap-5">
          <h1 className="text-5xl md:text-7xl font-bold tracking-[0.2em] text-white">
            THREAD & CO.
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-md leading-relaxed">
            Discover modern clothing designed for comfort and everyday style —
            quality materials, timeless design.
          </p>
          <a
            href="/items"
            className="mt-1 px-8 py-3 bg-white text-black text-sm font-bold tracking-widest rounded-full hover:bg-gray-100 active:scale-95 transition-all"
          >
            SHOP NOW
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col gap-14">
        {/* For You */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">For You</h2>
            <a
              href="/items"
              className="text-sm text-gray-400 hover:text-gray-900 underline underline-offset-4 transition-colors"
            >
              View all
            </a>
          </div>
          {loadingForYou ? (
            <div className="flex justify-center py-20">
              <Loader size="md" color="dark" />
            </div>
          ) : (
            <div className="item-grid">
              {forYouItems.map((value) => (
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
        </section>

        {/* Best Sellers */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
            <a
              href="/items"
              className="text-sm text-gray-400 hover:text-gray-900 underline underline-offset-4 transition-colors"
            >
              View all
            </a>
          </div>
          {loadingBestSeller ? (
            <div className="flex justify-center py-20">
              <Loader size="md" color="dark" />
            </div>
          ) : (
            <div className="item-grid">
              {bestSellerItems.map((value) => (
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
        </section>
      </div>
    </>
  );
}
