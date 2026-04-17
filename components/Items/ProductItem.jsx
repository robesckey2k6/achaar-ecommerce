import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button, Loader } from "@mantine/core";
import { IconShoppingBag } from "@tabler/icons-react";

export default function ProductItem(props) {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="flex flex-col gap-2 p-1 transition-colors justify-around rounded-md h-[20rem]"
      id="item-pannel"
    >
      <div className="flex flex-col relative">
        <div className="flex justify-end absolute w-full p-2 h-14">
          <div
            className="bg-[#000000a1] rounded-full p-2 text-white md:hidden"
            onClick={async () => {
              setLoading(true);
              await props.addCart();
              setLoading(false);
              props.openBagDrawer();
            }}
          >
            {loading ? (
              <Loader size="sm" color="white"></Loader>
            ) : (
              <IconShoppingBag></IconShoppingBag>
            )}
          </div>
        </div>
        <img
          src={props.image}
          className="rounded-lg overflow-hidden object-cover h-48"
        />
      </div>

      <div className="w-full">
        <p
          className="font-bold hover:underline underline-offset-2 cursor-pointer text-lg"
          onClick={() => {
            props.router.push(`items/${props.id}`);
          }}
        >
          {props.name}
        </p>
        <p className="font-light text-md">रु {props.price}</p>
      </div>

      <div className="hidden flex-col w-full md:flex">
        <Button
          color="black"
          size="xs"
          onClick={
            // ! Find a better solution for this shit!
            // ! Calling a function already defined
            async () => {
              setLoading(true);
              await props.addCart();
              setLoading(false);
              props.openBagDrawer();
            }
          }
        >
          {loading ? <Loader size="xs" color="white"></Loader> : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
