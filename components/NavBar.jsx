import { useState } from "react";
import CartDrawer from "./Default/CartDrawer";
import { IconShoppingBag } from "@tabler/icons-react";

function SiteLogo({ onClick }) {
  return (
    <div
      className="flex items-center cursor-pointer select-none"
      onClick={onClick}
    >
      <span className="text-base font-bold tracking-[0.3em] text-gray-900">
        THREAD & CO.
      </span>
    </div>
  );
}

function CartButton({ hide, onClick }) {
  if (hide) return null;
  return (
    <button
      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
      onClick={onClick}
    >
      <IconShoppingBag size={20} stroke={1.5} />
      <span className="hidden md:inline">Cart</span>
    </button>
  );
}

export default function NavBar(props) {
  const [openCart, setOpenCart] = useState(false);

  globalThis.openCart = () => {
    setOpenCart(true);
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <SiteLogo
            onClick={() => {
              globalThis.router.push("/");
            }}
          />
          <CartButton hide={props.disableCart} onClick={() => setOpenCart(true)} />
        </div>
      </header>

      <CartDrawer opened={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}
