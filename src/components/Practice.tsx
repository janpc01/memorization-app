"use client";

import { useEffect, useState } from "react";

interface PracticeProps {
  lines: string[];
  onNewText: () => void;
}

export default function Practice({ lines, onNewText }: PracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entry, setEntry] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finalTime, setFinalTime] = useState<number | null>(null);
  const [hasGivenUp, setHasGivenUp] = useState(false);

  const isComplete = currentIndex >= lines.length;
  const isTimerRunning = !isComplete && !hasGivenUp;

  const inputWidth = lines.reduce((widest, line) => Math.max(widest, line.length), 20);

  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setElapsedTime((Date.now() - startedAt) / 1000);
    }, 100);

    return () => clearInterval(timer);
  }, [isTimerRunning, startedAt]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (entry.trim() !== lines[currentIndex]) return;

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setEntry("");

    if (nextIndex === lines.length) {
      setFinalTime((Date.now() - startedAt) / 1000);
    }
  };

  const giveUp = () => {
    setHasGivenUp(true);
  };

  const tryAgain = () => {
    setCurrentIndex(0);
    setEntry("");
    setStartedAt(Date.now());
    setElapsedTime(0);
    setFinalTime(null);
    setHasGivenUp(false);
  };

  return (
    <div>
      <div className="border p-2 min-h-[100px] bg-gray-100 rounded">
        {lines.slice(0, currentIndex).map((line, index) => (
          <p key={index} className="text-green-700">{line}</p>
        ))}
      </div>

      {isTimerRunning && (
        <p className="mt-2 text-gray-600">Time: {elapsedTime.toFixed(1)} seconds</p>
      )}

      {isComplete && !hasGivenUp && (
        <p className="mt-2 text-green-500">You memorized the full text!</p>
      )}

      {finalTime !== null && !hasGivenUp && (
        <p className="mt-2 text-blue-500">Total time: {finalTime.toFixed(1)} seconds</p>
      )}

      {isTimerRunning && (
        <form onSubmit={submit}>
          <input
            autoFocus
            className="mt-2 p-2 border rounded text-black max-w-full"
            placeholder="Type the next line..."
            value={entry}
            onChange={(event) => setEntry(event.target.value)}
            style={{ width: `${inputWidth * 8}px` }}
          />
          <button type="button" className="mt-2 ml-2 p-2 bg-gray-500 text-white rounded" onClick={giveUp}>
            Give Up
          </button>
        </form>
      )}

      {isComplete && !hasGivenUp && (
        <div>
          <button className="mt-2 p-2 bg-red-500 text-white rounded" onClick={tryAgain}>
            Try Again
          </button>
          <button className="mt-2 ml-2 p-2 bg-blue-500 text-white rounded" onClick={onNewText}>
            New Text
          </button>
        </div>
      )}

      {hasGivenUp && (
        <div className="mt-4">
          <h3 className="text-xl font-bold text-black">Here is the full text:</h3>
          {lines.map((line, index) => (
            <p key={index} className="text-black">{line}</p>
          ))}
          <button className="mt-4 p-2 bg-red-500 text-white rounded" onClick={tryAgain}>
            Try Again
          </button>
          <button className="mt-4 ml-2 p-2 bg-blue-500 text-white rounded" onClick={onNewText}>
            New Text
          </button>
        </div>
      )}
    </div>
  );
}
