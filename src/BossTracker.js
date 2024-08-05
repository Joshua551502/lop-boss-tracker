import React, { useState, useEffect, useRef } from "react";
import "./BossTracker.css";
import confetti from "canvas-confetti";
import ParadeMaster from "./assets/images/parade_master.jpg";
import MadDonkey from "./assets/images/mad_donkey.jpg";
import ScrappedWatchman from "./assets/images/scrapped_watchman.jpg";
import Survivor from "./assets/images/survivor.jpg";
import PuppetOfTheFuture from "./assets/images/puppet_of_the_future.jpg";
import KingsFlameFuoco from "./assets/images/kings_flame_fuoco.jpg";
import TheAtoned from "./assets/images/the_atoned.jpg";
import FallenArchbishopAndreus from "./assets/images/fallen_archbishop_andreus.jpg";
import EldestOfTheBlackRabbitBrotherhood from "./assets/images/eldest_of_the_black_rabbit_brotherhood.jpg";
import WhiteLady from "./assets/images/white_lady.jpg";
import MadClownPuppet from "./assets/images/mad_clown_puppet.jpg";
import RomeoKingOfPuppets from "./assets/images/romeo_king_of_puppets.jpg";
import ChampionVictor from "./assets/images/champion_victor.jpg";
import OwlDoctor from "./assets/images/owl_doctor.jpg";
import GreenMonsterOfTheSwamp from "./assets/images/green_monster_of_the_swamp.jpg";
import PuppetDevouringGreenMonster from "./assets/images/puppet_devouring_green_monster.jpg";
import RobberWeasel from "./assets/images/robber_weasel.jpg";
import WalkerOfIllusions from "./assets/images/walker_of_illusions.jpg";
import CorruptedParadeMaster from "./assets/images/corrupted_parade_master.jpg";
import BlackRabbitBrotherhood from "./assets/images/black_rabbit_brotherhood.jpg";
import DoorGuardian from "./assets/images/door_guardian.jpg";
import BlackCat from "./assets/images/black_cat.jpg";
import LaxasiaTheComplete from "./assets/images/laxasia_the_complete.jpg";
import RedFox from "./assets/images/red_fox.jpg";
import SimonManusAwakenedGod from "./assets/images/simon_manus_awakened_god.jpg";
import NamelessPuppet from "./assets/images/nameless_puppet.jpg";

const bosses = [
  { name: "Parade Master", image: ParadeMaster, emoji: "🎭" },
  { name: "Mad Donkey", image: MadDonkey, emoji: "🐴" },
  { name: "Scrapped Watchman", image: ScrappedWatchman, emoji: "⏰" },
  { name: "Survivor", image: Survivor, emoji: "🔪" },
  { name: "Puppet of the Future", image: PuppetOfTheFuture, emoji: "🤖" },
  { name: "King’s Flame, Fuoco", image: KingsFlameFuoco, emoji: "🔥" },
  { name: "The Atoned", image: TheAtoned, emoji: "🙏" },
  {
    name: "Fallen Archbishop Andreus",
    image: FallenArchbishopAndreus,
    emoji: "⛪",
  },
  {
    name: "Eldest of the Black Rabbit Brotherhood",
    image: EldestOfTheBlackRabbitBrotherhood,
    emoji: "🐰",
  },
  { name: "White Lady", image: WhiteLady, emoji: "👰" },
  { name: "Mad Clown Puppet", image: MadClownPuppet, emoji: "🤡" },
  { name: "Romeo, King of Puppets", image: RomeoKingOfPuppets, emoji: "👑" },
  { name: "Champion Victor", image: ChampionVictor, emoji: "🏆" },
  { name: "Owl Doctor", image: OwlDoctor, emoji: "🦉" },
  {
    name: "Green Monster of the Swamp",
    image: GreenMonsterOfTheSwamp,
    emoji: "🐸",
  },
  {
    name: "Puppet-Devouring Green Monster",
    image: PuppetDevouringGreenMonster,
    emoji: "👹",
  },
  { name: "Robber Weasel", image: RobberWeasel, emoji: "🦊" },
  { name: "Walker of Illusions", image: WalkerOfIllusions, emoji: "👣" },
  {
    name: "Corrupted Parade Master",
    image: CorruptedParadeMaster,
    emoji: "🎭",
  },
  {
    name: "Black Rabbit Brotherhood",
    image: BlackRabbitBrotherhood,
    emoji: "🐰",
  },
  { name: "Door Guardian", image: DoorGuardian, emoji: "🚪" },
  { name: "Black Cat", image: BlackCat, emoji: "🐱" },
  { name: "Laxasia the Complete", image: LaxasiaTheComplete, emoji: "⚡" },
  { name: "Red Fox", image: RedFox, emoji: "🦊" },
  {
    name: "Simon Manus, Awakened God",
    image: SimonManusAwakenedGod,
    emoji: "🕊️",
  },
  { name: "Nameless Puppet", image: NamelessPuppet, emoji: "👤" },
];

const BossTracker = () => {
  const [deathCounts, setDeathCounts] = useState({});
  const [defeatedBosses, setDefeatedBosses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isGlobalResetModalOpen, setIsGlobalResetModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem("deathCounts")) || {};
    setDeathCounts(storedCounts);
    const storedDefeated =
      JSON.parse(localStorage.getItem("defeatedBosses")) || [];
    setDefeatedBosses(storedDefeated);
  }, []);

  useEffect(() => {
    localStorage.setItem("deathCounts", JSON.stringify(deathCounts));
  }, [deathCounts]);

  useEffect(() => {
    localStorage.setItem("defeatedBosses", JSON.stringify(defeatedBosses));
  }, [defeatedBosses]);

  useEffect(() => {
    if (isModalOpen || isResetModalOpen || isGlobalResetModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, isResetModalOpen, isGlobalResetModalOpen]);

  const adjustCount = (boss, amount) => {
    setDeathCounts((prevCounts) => ({
      ...prevCounts,
      [boss]: (prevCounts[boss] || 0) + amount,
    }));
  };

  const resetCount = (boss) => {
    setDeathCounts((prevCounts) => ({
      ...prevCounts,
      [boss]: 0,
    }));
    setDefeatedBosses((prev) => prev.filter((b) => b !== boss));
  };

  const resetAllCounts = () => {
    const resetCounts = {};
    bosses.forEach((boss) => {
      resetCounts[boss.name] = 0;
    });
    setDeathCounts(resetCounts);
    setDefeatedBosses([]);
    setIsGlobalResetModalOpen(false);
  };

  const handleCountChange = (boss, value) => {
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setDeathCounts((prevCounts) => ({
        ...prevCounts,
        [boss]: newValue,
      }));
    }
  };

  const openModal = (boss) => {
    setSelectedBoss(boss);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBoss(null);
  };

  const openResetModal = () => {
    setIsResetModalOpen(true);
  };

  const closeResetModal = () => {
    setIsResetModalOpen(false);
  };

  const handleReset = () => {
    if (selectedBoss) {
      resetCount(selectedBoss.name);
    }
    closeResetModal();
    closeModal();
  };

  const openGlobalResetModal = () => {
    setIsGlobalResetModalOpen(true);
  };

  const closeGlobalResetModal = () => {
    setIsGlobalResetModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      (isModalOpen || isResetModalOpen || isGlobalResetModalOpen) &&
      !event.target.closest(".modal-content")
    ) {
      closeModal();
      closeResetModal();
      closeGlobalResetModal();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      if (isModalOpen && selectedBoss) {
        adjustCount(selectedBoss.name, 1);
      }
    } else if (event.key === "d") {
      event.preventDefault();
      if (isModalOpen && selectedBoss) {
        adjustCount(selectedBoss.name, -1);
      }
    }
  };

  const handleVictoryAchieved = () => {
    if (defeatedBosses.includes(selectedBoss.name)) {
      setDefeatedBosses((prev) =>
        prev.filter((boss) => boss !== selectedBoss.name)
      );
    } else {
      setDefeatedBosses((prev) => [...prev, selectedBoss.name]);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f4b400", "#8b0000", "#2e2e2e"],
        zIndex: 9999, // Set a high z-index to ensure confetti appears in front
      });
    }
  };

  const totalDeaths = Object.values(deathCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <div className="container">
      <h1 className="title">LIES OF P BOSS TRACKER</h1>
      <ul className="boss-list">
        {bosses.map((boss) => (
          <li
            key={boss.name}
            className={`boss-item ${
              defeatedBosses.includes(boss.name) ? "defeated" : ""
            }`}
            onClick={() => openModal(boss)}
          >
            <span className="boss-name">
              <img src={boss.image} alt={boss.name} className="boss-image" />
              {boss.name} {boss.emoji}
            </span>
            <div className="button-group">
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  adjustCount(boss.name, -1);
                }}
                disabled={deathCounts[boss.name] === 0}
              >
                -
              </button>
              <input
                className="count-input"
                type="number"
                value={deathCounts[boss.name] || 0}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleCountChange(boss.name, e.target.value)}
              />
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  adjustCount(boss.name, 1);
                }}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-deaths">TOTAL DEATHS: {totalDeaths}</div>
      <button className="reset-button" onClick={openGlobalResetModal}>
        RESET ALL
      </button>

      {isModalOpen && selectedBoss && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedBoss.name}</h2>
            <img
              src={selectedBoss.image}
              alt={selectedBoss.name}
              className="modal-boss-image"
            />
            <div className="button-group">
              <button
                className="button"
                onClick={() => adjustCount(selectedBoss.name, -1)}
                disabled={deathCounts[selectedBoss.name] === 0}
              >
                -
              </button>
              <input
                className="count-input"
                type="number"
                value={deathCounts[selectedBoss.name] || 0}
                onChange={(e) =>
                  handleCountChange(selectedBoss.name, e.target.value)
                }
              />
              <button
                className="button"
                onClick={() => adjustCount(selectedBoss.name, 1)}
              >
                +
              </button>
            </div>
            <p className="description-text">
              Press <strong>Space</strong> to add one, <strong>D</strong> to go
              back one.
            </p>
            <div className="modal-buttons-seperator">
              <button
                className="victory-achieved-button"
                onClick={handleVictoryAchieved}
              >
                {defeatedBosses.includes(selectedBoss.name)
                  ? "UNDO VICTORY ACHIEVED"
                  : "VICTORY ACHIEVED"}
              </button>
              <button className="reset-button-2" onClick={openResetModal}>
                RESET
              </button>
            </div>
          </div>
        </div>
      )}

      {isResetModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content confirmation-modal" ref={modalRef}>
            <div className="modal-content">
              <p>
                Are you sure you want to reset the death count for{" "}
                {selectedBoss.name}?
              </p>
              <button className="modal-button" onClick={handleReset}>
                Yes
              </button>
              <button className="modal-button" onClick={closeResetModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isGlobalResetModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content confirmation-modal" ref={modalRef}>
            <div className="modal-content">
              <p>
                Are you sure you want to reset the death counts for all bosses?
              </p>
              <button className="modal-button" onClick={resetAllCounts}>
                Yes
              </button>
              <button className="modal-button" onClick={closeGlobalResetModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BossTracker;
