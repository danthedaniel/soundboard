// @ts-check
"use strict";

/** @type {Record<string, HTMLAudioElement>} */
const audioStreams = {};

/**
 * @param {string} filename
 */
function playSound(filename) {
  const currentAudio = audioStreams[filename];
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio("audio/" + filename);
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
  audio.onended = () => {
    delete audioStreams[filename];
  };
  audioStreams[filename] = audio;
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
