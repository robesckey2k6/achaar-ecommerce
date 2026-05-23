import { Indicator } from "@mantine/core";
import React from "react";

export default function CheckoutItem(props) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
      <Indicator inline label={props.count} size={20} color="dark">
        <img
          width={64}
          height={64}
          src={props.image}
          className="rounded-lg object-cover border border-gray-100 bg-gray-50"
          alt={props.name}
        />
      </Indicator>
      <p className="flex-1 text-sm font-medium text-gray-900">{props.name}</p>
      <p className="text-sm font-semibold text-gray-900">$ {props.price}</p>
    </div>
  );
}
