import TitleBackgroundImage from "@/public/home_image.jpg";
import ProductItem from "@/components/Items/ProductItem";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { getEndpoint, endPoints } from "@/lib/pages";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Button, Loader } from "@mantine/core";
import getBestSeller from "../data/getBestSeller";
import getForYou from "../data/getForYou";

async function addToCart(itemId) {
  let id = getCookie("cart-id");
  var result = await axios.post(getEndpoint(endPoints.addcartItem), {
    id: id,
    itemId: itemId,
  });
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
	  <div
  className="h-[50vh] flex items-center justify-center bg-cover bg-center relative grayscale"
  id="head-bar"
  style={{
    backgroundImage: `url(${TitleBackgroundImage.src})`,
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div
    className="relative flex flex-col items-center justify-center gap-3 text-center px-4"
    id="head-bar-tint"
  >
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest text-white">
      [ ROBO SHOP ]
    </h1>

    <p className="text-sm md:text-base text-gray-200 max-w-xl leading-relaxed">
      Discover modern clothing designed for comfort, confidence, and everyday
      style. ROBO SHOP brings you carefully selected apparel that blends
      quality materials with clean, timeless design.
    </p>
  </div>
</div>
      <div className="flex flex-col items-center py-4 gap-4">
        <div className="flex flex-col w-auto gap-2">
          <div className="flex justify-between w-full px-4">
            <h1 className="text-3xl">For you</h1>
            <a
              className="underline text-gray-800 underline-offset-4"
              href="/items"
            >
              View all
            </a>
          </div>

          <div className="item-grid pb-10">

            {loadingForYou ? (
              <div className="flex w-full h-full items-center justify-center gap-y-20">
                <Loader size="md" color="black"></Loader>
              </div>
            ) : (
              forYouItems.map((value) => {
                return (
                  <ProductItem
                    key={value.id}
                    id={value.id}
                    router={router}
                    name={value.name}
                    price={value.price}
                    image={value.image}
                    addCart={async () => {
                      await addToCart(value.id);
                    }}
                    openBagDrawer={globalThis.openCart}
                  />
                );
              })
            )}
          </div>
          <div className="flex justify-between w-full px-4">
            <h1 className="text-3xl">Best sellers</h1>
            <a
              className="underline text-gray-800 underline-offset-4"
              href="/items"
            >
              View all
            </a>
          </div>
          <div className="item-grid">
            {loadingBestSeller ? (
              <div className="flex w-full h-full items-center justify-center">
                <Loader size="md" color="black"></Loader>
              </div>
            ) : (
              bestSellerItems.map((value) => {
                return (
                  <ProductItem
                    key={value.id}
                    id={value.id}
                    router={router}
                    name={value.name}
                    price={value.price}
                    image={value.image}
                    addCart={async () => {
                      await addToCart(value.id);
                    }}
                    openBagDrawer={globalThis.openCart}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
