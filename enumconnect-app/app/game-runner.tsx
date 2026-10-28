"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { advance, createRun, GROUND, jump, PLAYER_HEIGHT, PLAYER_X } from "./runner-engine";

type Status = "ready" | "running" | "paused" | "over";
type Game = "mario" | "ninja";

export default function GameRunner() {
  const [game, setGame] = useState<Game>("mario");
  const world = useRef(createRun());
  const [run, setRun] = useState(createRun);
  const [status, setStatus] = useState<Status>("ready");
  const [bestScores, setBestScores] = useState({ mario: 0, ninja: 0 });
  const best = bestScores[game];
  const isMario = game === "mario";
  const gameName = isMario ? "Mario Run" : "Ninja Jump";
  const score = Math.floor(run.distance / 10) + run.collected * 25;
  const stride = status === "running" && run.height === 0 && Math.floor(run.distance / 22) % 2 === 0;

  useEffect(() => {
    if (status !== "running") return;
    let frame: number;
    let previous: number | undefined;
    function tick(now: number) {
      const elapsed = previous === undefined ? 0 : (now - previous) / 1000;
      previous = now;
      world.current = advance(world.current, elapsed, Math.random, game === "mario");
      setRun(world.current);
      if (world.current.crashed) {
        setStatus("over");
        const finalScore = Math.floor(world.current.distance / 10) + world.current.collected * 25;
        setBestScores((scores) => ({ ...scores, [game]: Math.max(scores[game], finalScore) }));
        return;
      }
      frame = window.requestAnimationFrame(tick);
    }
    function pauseWhenHidden() {
      if (document.hidden) setStatus("paused");
    }
    frame = window.requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [status, game]);

  function chooseGame(next: Game) {
    if (next === game) return;
    setBestScores((scores) => ({ ...scores, [game]: Math.max(scores[game], score) }));
    world.current = createRun();
    setRun(world.current);
    setStatus("ready");
    setGame(next);
  }

  function action() {
    if (status === "ready" || status === "over") {
      world.current = jump(createRun());
      setRun(world.current);
      setStatus("running");
    } else if (status === "paused") {
      setStatus("running");
    } else {
      world.current = jump(world.current);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (["Space", "ArrowUp", "Enter"].includes(event.code)) {
      event.preventDefault();
      if (!event.repeat) action();
    }
  }

  return (
    <section className="game-panel runner-panel" aria-labelledby="game-title">
      <div className="game-heading"><span className="game-label">THE WAITING ROOM</span><span className="game-tag">One more run?</span></div>
      <div className="game-picker" role="group" aria-label="Choose your game">
        <button type="button" aria-pressed={isMario} onClick={() => chooseGame("mario")}><span aria-hidden="true">▣</span> Mario Run</button>
        <button type="button" aria-pressed={!isMario} onClick={() => chooseGame("ninja")}><span aria-hidden="true">✦</span> Ninja Jump</button>
      </div>
      <h2 id="game-title">{isMario ? "A super little adventure" : "Small ninja. Big jumps"}<span>.</span></h2>
      <p className="game-description" id="game-instructions">{isMario ? "Jump over pipes, grab the coins, and keep the adventure going." : "Jump over the barriers and see how far your ninja can go."}</p>
      <div className="runner-scoreboard" aria-label={`Score ${score}, best ${Math.max(best, score)}`}>
        {isMario && <span className="coin-counter">COINS <strong>{run.collected.toString().padStart(2, "0")}</strong></span>}<span>HI <strong>{Math.max(best, score).toString().padStart(5, "0")}</strong></span>
        <span>SCORE <strong>{score.toString().padStart(5, "0")}</strong></span>
      </div>
      <button
        className={`runner-stage ${isMario ? "mario-stage" : "ninja-stage"} ${status === "over" ? "has-crashed" : ""}`}
        type="button"
        onClick={action}
        onKeyDown={handleKeyDown}
        aria-label={status === "running" ? `Jump over the next ${isMario ? "pipe" : "barrier"}` : status === "over" ? `Game over. Restart ${gameName}` : status === "paused" ? `Resume ${gameName}` : `Start ${gameName}`}
        aria-describedby="game-instructions runner-controls"
      >
        <svg viewBox="0 0 600 220" aria-hidden="true" className="runner-world">
          {isMario ? <>
          <rect width="600" height="220" fill="#a9ddf5" />
          <g fill="#fffbed">
            {[0, 1, 2].map((cloud) => {
              const x = ((cloud * 235 + 150 - run.distance * 0.12) % 760 + 760) % 760 - 80;
              return <path key={cloud} d={`M${x} ${35 + cloud * 14} h10 v-8 h12 v-8 h22 v8 h12 v8 h10 v13 h-66z`} />;
            })}
          </g>
          <g fill="#74ba7c" stroke="#489763" strokeWidth="2">
            {[0, 1, 2].map((hill) => {
              const x = ((hill * 310 - run.distance * 0.22) % 930 + 930) % 930 - 160;
              return <path key={hill} d={`M${x} 180 Q${x + 80} ${50 + hill * 15} ${x + 160} 180z`} />;
            })}
          </g>
          <g fill="#4b9a5d">
            {[0, 1, 2].map((bush) => {
              const x = ((bush * 250 + 100 - run.distance * 0.5) % 750 + 750) % 750 - 90;
              return <path key={bush} d={`M${x} 180v-14h10v-8h13v-7h14v7h14v8h10v14z`} />;
            })}
          </g>
          <g shapeRendering="crispEdges">
            <rect y="180" width="600" height="40" fill="#c67c43" />
            <path d="M0 180h600v6H0z" fill="#f5ce7b" />
            {Array.from({ length: 17 }, (_, index) => {
              const x = ((index * 40 - run.distance) % 680 + 680) % 680 - 40;
              return <path key={index} d={`M${x} 186v16h40 M${x + 20} 202v18 M${x} 218h40`} fill="none" stroke="#8d4e2e" strokeWidth="2" />;
            })}
          </g>
          <g transform={`translate(${PLAYER_X} ${GROUND - PLAYER_HEIGHT - run.height})`} shapeRendering="crispEdges">
            {/* Original vector pixel art: cap, moustache, overalls, and running boots. */}
            <path d="M8 0h17v4H5v4h30v4H5V4h3z" fill="#e84b38" />
            <path d="M7 12h23v5h7v6h-6v5H10v-5H5v-8h2z" fill="#ffd09a" />
            <path d="M5 11h9v5h-4v6H5z M23 12h4v6h-4z M20 21h14v4H20z" fill="#54372c" />
            <path d="M9 27h19v10H7V30H1v-6h7v3z M28 28h7v6h-7z" fill="#e84b38" />
            <path d="M11 26h5v6h6v-6h5v12H10z" fill="#3476bf" />
            <path d="M12 32h3v3h-3z M23 32h3v3h-3z" fill="#ffe287" />
            <path d="M0 26h5v7H0z M33 28h5v6h-5z" fill="#fff8e5" />
            <path d={stride ? "M10 37h8v5H6v-4h4z M23 37h7v5h-7z" : "M8 37h9v5H8z M20 37h8v2h7v5H23v-3h-3z"} fill="#54372c" />
          </g>
          <g shapeRendering="crispEdges">
            {run.obstacles.map((obstacle, index) => (
              <g key={index} transform={`translate(${obstacle.x} ${GROUND - obstacle.height})`}>
                <path d={`M3 7h${obstacle.width - 6}v${obstacle.height - 7}H3z`} fill="#339849" stroke="#22663b" strokeWidth="2" />
                <path d={`M0 0h${obstacle.width}v10H0z`} fill="#4dba58" stroke="#22663b" strokeWidth="2" />
                <path d={`M6 12h4v${obstacle.height - 13}H6z M4 2h4v6H4z`} fill="#97de72" />
                <path d={`M${obstacle.width - 8} 12h4v${obstacle.height - 13}h-4z`} fill="#25773a" />
              </g>
            ))}
          </g>
          <g fill="#ffcd38" stroke="#bc8118" strokeWidth="2">
            {run.coins.map((coin, index) => <g key={index} transform={`translate(${coin.x} ${GROUND - coin.height})`}>
              <ellipse rx="7" ry="10" /><path d="M0 -6v12" stroke="#fff4b0" />
            </g>)}
          </g>
          {status === "ready" && <g transform="translate(435 85)" shapeRendering="crispEdges">
            <path d="M0 0h24v24H0z" fill="#efb94f" stroke="#a97428" strokeWidth="2" />
            <text x="12" y="18" textAnchor="middle" fill="#fff8dc" fontSize="20" fontFamily="monospace" fontWeight="bold">?</text>
          </g>}
          </> : <>
            <rect width="600" height="220" fill="#fafbf7" />
            <g fill="none" stroke="#c2c8b9" strokeWidth="2">
              {[0, 1, 2].map((cloud) => {
                const x = ((cloud * 235 + 150 - run.distance * 0.12) % 760 + 760) % 760 - 80;
                return <path key={cloud} d={`M${x} ${45 + cloud * 17} h12 v-7 h10 v-6 h19 v6 h12 v7 h10`} />;
              })}
              <path d="M0 180H600" />
              {Array.from({ length: 16 }, (_, index) => <path key={index} d={`M${((index * 43 - run.distance) % 688 + 688) % 688 - 44} ${190 + (index % 3) * 7} h${index % 2 ? 12 : 5}`} />)}
            </g>
            <g transform={`translate(${PLAYER_X} ${GROUND - PLAYER_HEIGHT - run.height})`} fill={status === "over" ? "#865943" : "#4b5148"} shapeRendering="crispEdges">
              <path d="M8 0h20v4h4v20h-7v4H7v-7H3V5h5z" />
              <path d="M5 12H-5V8h-13v5h9v4H5z M-5 16h-12v5h-7v4h12v-4h7z" fill="#89977c" />
              <path d="M8 24h19v13H8z M25 27h8v-7h5v13H25z M8 26H1v9h5v-4h5z" />
              <path d={stride ? "M9 34h8v10H4v-5h5z M21 34h7v5h8v5H24v-5h-3z" : "M8 34h8v5h6v5H10v-5H8z M21 34h7v10H16v-5h5z"} />
              <path d="M14 10h18v8H14z" fill="#f4f5ef" />
              <path d={status === "over" ? "M23 11h3v2h3v3h-3v-2h-3z" : "M25 11h3v4h-3z"} />
              <path d="M8 30h19v4H8z" fill="#a5b792" />
            </g>
            <g fill="#646d5d" shapeRendering="crispEdges">
              {run.obstacles.map((obstacle, index) => <g key={index} transform={`translate(${obstacle.x} ${GROUND - obstacle.height})`}>
                <path d={`M0 0h${obstacle.width}v${obstacle.height}h-6v-8H6v8H0z`} />
                <path d={`M4 5h${obstacle.width - 8}v5H4z`} fill="#f4f5ef" />
              </g>)}
            </g>
          </>}
          {status !== "running" && <g className="runner-overlay" fill="currentColor" textAnchor="middle">
            <text x="320" y="88">{status === "over" ? "GAME OVER" : status === "paused" ? "TAKE A BREATHER" : gameName.toUpperCase()}</text>
            <text x="320" y="114" className="runner-overlay-hint">{status === "over" ? "Tap to try again" : status === "paused" ? "Tap to resume" : "Tap or press space to start"}</text>
          </g>}
        </svg>
      </button>
      <div className="runner-controls" id="runner-controls"><span><kbd>Space</kbd> / <kbd>↑</kbd> to jump</span><span>or tap the game</span></div>
      <p className="game-message" role="status" aria-live="polite">
        {status === "over" ? `Nice run! You scored ${score}. Ready for another?` : status === "paused" ? "Run paused. Your adventure will wait for you." : status === "running" ? (isMario ? "Keep going! Each coin adds 25 points." : "Keep going. Every jump counts.") : "Pick your game above, then let’s run."}
      </p>
      <button className="play-button" type="button" onClick={action} onKeyDown={handleKeyDown}>{status === "over" ? "Run again" : status === "running" ? "Jump" : status === "paused" ? "Resume run" : "Let’s run"}<span aria-hidden="true">{status === "over" ? "↻" : "↗"}</span></button>
      <noscript><p className="noscript-note">Enable JavaScript to play. Please come back later for Enumconnect!</p></noscript>
    </section>
  );
}
