import { Loader, TextInput } from "@mantine/core";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { getEndpoint, endPoints } from "../../lib/pages";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import CheckoutItem from "../../components/Checkout/CheckoutItem";

async function sendOrder(order, router) {
  var id = getCookie("cart-id");
  await axios.post(getEndpoint(endPoints.addorder), {
    cartId: id,
    email: order.email,
    phone: order.phone,
    firstname: order.firstname,
    lastname: order.lastname,
    address: order.address,
    city: order.city,
  });
  deleteCookie("cart-id");
  router.push("/ordersucess");
}

export default function index() {
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      phone: "",
      address: "",
      city: "",
      firstname: "",
      lastname: "",
    },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : "Invalid email address"),
      phone: (v) => (/\d{10}/.test(v) ? null : "Invalid phone number"),
      address: (v) => (v.length > 0 ? null : "Address is required"),
      city: (v) => (v.length > 0 ? null : "City is required"),
      firstname: (v) => (v.length > 0 ? null : "First name is required"),
      lastname: (v) => (v.length > 0 ? null : "Last name is required"),
    },
  });

  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0.0);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    async function getCart() {
      var id = getCookie("cart-id");
      var result = await axios.post(getEndpoint(endPoints.getcartItems), { id });
      setItems(result.data.items);
      setTotalCost(result.data.total);
      setLoading(false);
    }
    getCart();
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: Delivery form */}
      <div className="flex-1 px-6 py-10 lg:px-16">
        <div className="max-w-md mx-auto lg:mx-0 flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Delivery Details</h1>
            <p className="text-sm text-gray-400 mt-1">
              Enter your shipping information to complete your order
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={form.onSubmit(async (values) => {
              setSubmitLoading(true);
              await sendOrder(values, router);
            })}
          >
            <div className="flex gap-3">
              <TextInput
                className="flex-1"
                label="First Name"
                key={form.key("firstname")}
                {...form.getInputProps("firstname")}
              />
              <TextInput
                className="flex-1"
                label="Last Name"
                key={form.key("lastname")}
                {...form.getInputProps("lastname")}
              />
            </div>
            <TextInput
              label="Email address"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Phone number"
              key={form.key("phone")}
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Address"
              key={form.key("address")}
              {...form.getInputProps("address")}
            />
            <TextInput
              label="City"
              key={form.key("city")}
              {...form.getInputProps("city")}
            />

            <button
              type="submit"
              className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors mt-2"
            >
              {submitLoading ? (
                <Loader size="xs" color="white" />
              ) : (
                "Complete Order"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right: Order summary */}
      <div className="lg:w-[420px] flex-shrink-0 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 px-6 py-10">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader color="dark" />
          </div>
        ) : (
          <div className="flex flex-col">
            {items.map((value) => (
              <CheckoutItem
                key={value.item.id}
                name={value.item.name}
                image={value.item.image}
                price={value.total}
                count={value.count}
              />
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <span className="font-semibold text-gray-900">Total</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-gray-400">NPR</span>
            <span className="text-xl font-bold text-gray-900">$ {totalCost}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
