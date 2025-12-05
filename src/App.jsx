import React, { useState } from "react";
import Home from "./components/Home";
import HostLobby from "./components/HostLobby";
import PlayerJoin from "./components/PlayerJoin";
import QuizPlay from "./components/QuizPlay";

export default function App() {
  const [route, setRoute] = useState("home"); // home | host | join | play
  const [sessionId, setSessionId] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);

  const startFromHost = (sid) => {
    setSessionId(sid);
    setRoute("play");
  };

  const onPlayerJoined = (info) => {
    // in a real app, you'd persist/join via backend
    setPlayerInfo(info);
    setSessionId(info.session || sessionId);
    setRoute("play");
  };

  const endGame = (scores) => {
    // show simple results (for now we redirect to home)
    alert("Game ended. Scores: " + JSON.stringify(scores));
    setRoute("home");
  };

  return (
    <>
      {route === "home" && <Home onHost={() => setRoute("host")} onPlayer={() => setRoute("join")} />}
      {route === "host" && <HostLobby onStart={startFromHost} />}
      {route === "join" && <PlayerJoin onJoined={onPlayerJoined} />}
      {route === "play" && <QuizPlay sessionId={sessionId} playerInfo={playerInfo} onEnd={endGame} />}
    </>
  );
}
