import { IconCircleCheck } from "@tabler/icons-react";
import React from "react";

export default function ordersucess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-6 text-center">
      <div className="rounded-full bg-green-50 p-5">
        <IconCircleCheck size={56} color="#16a34a" stroke={1.5} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
          Your order has been successfully recorded. Watch out for any emails or
          phone calls from us with delivery updates.
        </p>
      </div>
      <button
        className="px-8 py-3 border border-gray-900 text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-colors"
        onClick={() => globalThis.router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
