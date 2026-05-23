import React from "react";

export default function BottomBar() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center gap-8 text-center">
        <h2 className="text-xl font-bold tracking-[0.3em]">THREAD & CO.</h2>

        <p className="max-w-md text-sm text-gray-400 leading-relaxed">
          Quality products delivered with reliability and care. Our mission is
          to provide simple, trustworthy, and efficient shopping experiences for
          our customers.
        </p>

        <div className="text-sm text-gray-400 space-y-1">
          <p>+61 400 000 000</p>
        </div>

        <div className="w-16 border-t border-gray-700" />

        <div className="text-xs text-gray-500 space-y-1">
          <p>Built with care by Robesckey D. Maharjan</p>
          <p>
            Issues?{" "}
            <a
              href="mailto:robesckeydangol2006@gmail.com"
              className="underline hover:text-gray-300 transition-colors"
            >
              robesckeydangol2006@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
