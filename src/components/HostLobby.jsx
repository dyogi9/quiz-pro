import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import QRPanel from "./QRPanel";
import { motion } from "framer-motion";

export default function HostLobby({ onStart }) {
  const [players, setPlayers] = useState([]);
  // create a unique session id to share
  const sessionId = useMemo(() => uuidv4().slice(0, 8), []);
  // base url -> auto-detect deployment domain (window) or fallback
  const base = (typeof window !== "undefined" && window.location.origin) || "https://your-deploy-url";
  const joinUrl = `${base}/?session=${sessionId}`;

  // NOTE: In this local demo players won't auto-appear when they open joinUrl on other devices.
  // For real-time syncing add a backend (Firebase / Supabase / websocket)
  const addLocalPlayer = () => {
    const name = `Player ${players.length + 1}`;
    setPlayers(p => [...p, { id: players.length + 1, name }]);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-5xl w-full grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="font-semibold text-slate-800">Host lobby</h3>
          <p className="text-sm text-slate-600 mb-4">Share this QR or link so players can join on their phones</p>

          <div className="mb-4">
            <QRPanel url={joinUrl} label="Scan to join the session" />
          </div>

          <div className="mb-4">
            <div className="text-sm text-slate-600">Players</div>
            <div className="mt-2 space-y-2">
              {players.length === 0 && <div className="text-xs text-slate-400">No players joined yet (demo)</div>}
              {players.map(p => (
                <div key={p.id} className="flex items-center justify-between border rounded p-2">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500">ready</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={addLocalPlayer} className="px-4 py-2 bg-indigo-600 text-white rounded">Add player (demo)</button>
            <button onClick={() => onStart(sessionId)} className="px-4 py-2 bg-emerald-600 text-white rounded">Start Quiz</button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 shadow flex flex-col">
          <h4 className="font-semibold mb-3">Session Info</h4>
          <div className="text-sm text-slate-600 mb-3">Session ID: <span className="font-mono bg-slate-100 px-2 py-1 rounded ml-2">{sessionId}</span></div>
          <div className="text-sm text-slate-600">Instructions</div>
          <ol className="list-decimal list-inside text-sm text-slate-700 mt-2 space-y-2">
            <li>Share QR or link with players.</li>
            <li>Players open link on phone and enter a display name.</li>
            <li>Host clicks <strong>Start Quiz</strong> to begin.</li>
          </ol>

          <div className="mt-auto text-xs text-slate-500">Tip: For live syncing add Firebase / WebSocket — I can add that next.</div>
        </div>
      </motion.div>
    </div>
  );
}
