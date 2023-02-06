import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bestTime, setBestTime] = useState();
  const [previousTime, setPreviousTime] = useState();

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  function handleGameEnd() {
    timerStop()
    setPreviousTime(time)
    handleBestTime(time)
    timerReset()
  }

  function handleBestTime(thisTime){
    if (!bestTime){
      setBestTime(thisTime)
    }
    if (+bestTime > +thisTime) {
      setBestTime(thisTime)
    }
  }

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time = {time}
        previousTime = {previousTime}
        bestTime = {bestTime}
        openModal = {() => setShowModal(true)}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart={timerStart}
        onGameEnd={handleGameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

