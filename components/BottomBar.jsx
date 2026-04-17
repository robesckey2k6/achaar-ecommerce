import React from "react";

export default function BottomBar() {
  return (
    <footer className="bg-black text-white flex flex-col items-center justify-center px-6 py-12 gap-6 text-center">
      
      {/* Brand */}
      <h1 className="text-3xl font-semibold tracking-widest">
        [ ROBO SHOP ]
      </h1>

      {/* Description */}
      <p className="max-w-md text-sm text-gray-300 leading-relaxed">
        Quality products delivered with reliability and care.  
        Our mission is to provide simple, trustworthy, and efficient
        shopping experiences for our customers.
      </p>

      {/* Contact */}
      <div className="text-sm text-gray-300 space-y-1">
        <p>Contact: +61 400 000 000 | +61 400 000 000</p>
      </div>

      {/* Divider */}
      <div className="w-24 border-t border-gray-700"></div>

      {/* Credits */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>Website built with ❤️ by Robesckey D. Maharjan</p>
        <p>
          Website issues?{" "}
          <a
            href="mailto:robesckeydangol2006@gmail.com"
            className="underline hover:text-white"
          >
            robesckeydangol2006@gmail.com
          </a>
        </p>
      </div>

    </footer>
  );
}
