// @ts-check
"use strict";

/** @type {Record<string, HTMLAudioElement>} */
const audioElements = {};

/**
 * Preload all audio files
 */
function preloadAudio() {
  const buttons = /** @type {NodeListOf<HTMLButtonElement>} */ (
    document.querySelectorAll("button[data-filename]")
  );

  for (const button of buttons) {
    const filename = button.dataset["filename"];
    if (!filename) {
      continue;
    }

    // Create and preload audio element
    const audio = new Audio("audio/" + filename);
    audio.preload = "auto";
    audio.load(); // Force Safari to load the audio

    audioElements[filename] = audio;
  }
}
preloadAudio();

/**
 * @param {string} filename
 */
function playSound(filename) {
  audioElements[filename].pause();
  audioElements[filename].currentTime = 0;
  audioElements[filename].play().catch((error) => {
    console.error("Error playing audio:", error);
  });
}

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", () => {
    const filename = button.dataset["filename"];
    if (!filename) {
      return;
    }

    playSound(filename);
  });
}

document.addEventListener("keydown", (event) => {
  const numberKey = parseInt(event.key);
  if (isNaN(numberKey)) {
    return;
  }

  if (numberKey < 1 || numberKey > 9) {
    return;
  }

  const button = buttons[numberKey - 1];
  const filename = button.dataset["filename"];
  if (!filename) {
    return;
  }

  playSound(filename);
});
