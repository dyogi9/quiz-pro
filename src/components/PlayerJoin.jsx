import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PlayerJoin({ onJoined }) {
  const [name, setName] = useState("");
  const [session, setSession] = useState("");

  useEffect(() => {
    // read session from URL if present
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("session");
      if (s) setSession(s);
    }
  }, []);

  const join = () => {
    if (!name.trim()) return;
    onJoined({ name: name.trim(), session });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-white">
      <motion.div initial={{y:20, opacity:0}} animate={{y:0,opacity:1}} className="max-w-md w-full bg-white rounded-2xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-2">Join Game</h3>
        <p className="text-sm text-slate-600 mb-4">Enter a display name to join the session.</p>

        <div className="space-y-3">
          <input className="w-full border rounded p-3" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="w-full border rounded p-3" placeholder="Session ID (optional)" value={session} onChange={(e)=>setSession(e.target.value)} />
          <button onClick={join} className="w-full bg-indigo-600 text-white p-3 rounded">Join</button>
        </div>

        <div className="mt-4 text-xs text-slate-500">If you opened this page by scanning a QR, the session was auto-filled.</div>
      </motion.div>
    </div>
  );
}
