import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export default function Home({ onHost, onPlayer }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl p-8 grid grid-cols-2 gap-6"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Quiz Pro</h1>
          <p className="text-sm text-slate-600 mb-6">
            Modern multiplayer quiz — host a session, share QR, players join on their phones.
          </p>

          <div className="space-y-3">
            <button
              onClick={onHost}
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow hover:scale-[1.01]"
            >
              <Crown className="w-5 h-5" /> Host a game
            </button>

            <button
              onClick={onPlayer}
              className="w-full inline-flex items-center justify-center gap-2 border border-slate-200 px-4 py-3 rounded-lg"
            >
              Join as player
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full h-48 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-slate-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl">🎯</div>
              <div className="mt-2 text-sm text-slate-600">Beautiful UI • QR • Tailwind • Framer Motion</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
