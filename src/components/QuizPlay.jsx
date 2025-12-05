import React, { useState, useEffect } from "react";
import { questions } from "../data/questions";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function QuizPlay({ sessionId, hostMode, playerInfo, onEnd }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [scores, setScores] = useState(() => (playerInfo ? { [playerInfo.name]: 0 } : {}));
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  useEffect(()=> {
    setTimer(15);
    setSelected(null);
  }, [qIndex]);

  const current = questions[qIndex];

  const answer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = current.answer;
    if (playerInfo) {
      setScores(s => ({ ...s, [playerInfo.name]: (s[playerInfo.name] || 0) + (idx === correct ? 10 + Math.max(0, 5 - Math.floor((15 - timer)/3)) : 0) }));
    }
  };

  const next = () => {
    if (qIndex + 1 < questions.length) setQIndex(qIndex + 1);
    else onEnd && onEnd(scores);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-slate-50 to-white flex items-start justify-center">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-3xl w-full bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-sm text-slate-500">Session</div>
            <div className="font-mono text-xs bg-slate-100 px-2 py-1 rounded inline-block">{sessionId || "local"}</div>
          </div>
          <div className="text-sm text-slate-500">Time</div>
          <div className="text-2xl font-bold text-indigo-600">{timer}s</div>
        </div>

        <h2 className="text-xl font-bold mb-4">{current.q}</h2>

        <div className="space-y-3">
          {current.options.map((opt, i) => {
            let cls = "p-3 rounded border w-full text-left";
            if (selected !== null) {
              if (i === current.answer) cls += " bg-emerald-100 border-emerald-300";
              else if (i === selected) cls += " bg-red-100 border-red-300";
              else cls += " opacity-70";
            } else cls += " hover:bg-indigo-50 cursor-pointer";

            return (
              <button disabled={selected !== null} key={i} className={cls} onClick={() => answer(i)}>
                <div className="flex items-center justify-between">
                  <div>{opt}</div>
                  <div>
                    {selected !== null && i === current.answer && <CheckCircle className="text-green-600" />}
                    {selected !== null && i === selected && i !== current.answer && <XCircle className="text-red-600" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <div className="text-sm text-slate-600">Scores</div>
            <div className="font-bold text-indigo-600">{Object.entries(scores).map(([n,s])=> <div key={n}>{n}: {s}</div>)}</div>
          </div>

          <div className="flex gap-2">
            <button onClick={next} className="px-4 py-2 bg-indigo-600 text-white rounded">Next</button>
            <button onClick={()=>(onEnd && onEnd(scores))} className="px-4 py-2 border rounded">End</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
