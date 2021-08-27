import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    try {
      let res = await axios.get("/api/players");
      setPlayers(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderPlayers = () => {
    return players.map((player) => {
      return (
        <div className="player-card">
          <h2>{player.name}</h2>
          <h3>{player.team}</h3>
          <h3>{player.jerseyNum}</h3>
        </div>
      );
    });
  };

  return (
    <div id="home">
      <h1>NBA Players</h1>
      {players && renderPlayers()}
    </div>
  );
};

export default Home;
