import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Loader } from "@mantine/core";
import { endPoints, getEndpoint } from "../../lib/pages";
import CheckoutItem from "../Checkout/CheckoutItem";

function genCartItems(cartItems) {
  var data = [];
  var total = 0.0;
  cartItems.forEach((item) => {
    data.push(
      <CheckoutItem
        key={item.item.id}
        count={item.count}
        image={item.item.image}
        name={item.item.name}
        price={Number(item.item.price) * Number(item.count)}
      />
    );
    total += Number(item.item.price) * Number(item.count);
  });
  data.push(
    <div key="total" className="pt-2 flex justify-between text-sm font-semibold text-gray-900">
      <span>Total</span>
      <span>$ {total}</span>
    </div>
  );
  return data;
}

export default function OrdersPage() {
  const [items, setItems] = useState([]);
  const [carItems, setCartItems] = useState({});

  useEffect(() => {
    async function getOrders() {
      let result = await axios.post(getEndpoint(endPoints.getorders));
      setItems(result.data.items);

      let cartIds = [];
      result.data.items.forEach((data) => {
        if (!cartIds.includes(data.cartId)) {
          cartIds.push(data.cartId);
        }
      });
      let result2 = await axios.post(getEndpoint(endPoints.getcartsItems), {
        ids: cartIds,
      });
      setCartItems(result2.data.items);
    }
    getOrders();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500 mt-0.5">{items.length} orders received</p>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr className="bg-gray-50">
              {[
                "Date",
                "Order ID",
                "Name",
                "Email",
                "Phone",
                "City",
                "Address",
                "Items",
              ].map((h) => (
                <Table.Th
                  key={h}
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 whitespace-nowrap"
                >
                  {h}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {items.map((item, i) => (
              <Table.Tr key={i}>
                <Table.Td className="text-xs text-gray-500 whitespace-nowrap">
                  {item.date}
                </Table.Td>
                <Table.Td className="text-xs font-mono text-gray-400">
                  {item.id}
                </Table.Td>
                <Table.Td className="text-sm font-medium text-gray-900 whitespace-nowrap">
                  {item.firstName} {item.lastName}
                </Table.Td>
                <Table.Td className="text-sm text-gray-600">{item.email}</Table.Td>
                <Table.Td className="text-sm text-gray-600">{item.phone}</Table.Td>
                <Table.Td className="text-sm text-gray-600">{item.city}</Table.Td>
                <Table.Td className="text-sm text-gray-600 max-w-[160px]">
                  <span className="line-clamp-2">{item.shippingAddress}</span>
                </Table.Td>
                <Table.Td className="min-w-[220px]">
                  {carItems[item.cartId] ? (
                    <div className="flex flex-col gap-1">
                      {genCartItems(carItems[item.cartId])}
                    </div>
                  ) : (
                    <Loader size="xs" color="dark" />
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
