"use strict";
// @ts-check
const maxStreams = 2;
let currentIndex = 0;
/** @type {(HTMLAudioElement | null)[]} */
let audioStreams = new Array(maxStreams).fill(null);

/**
 * @param {string} filename
 */
function playSound(filename) {
  currentIndex = (currentIndex + 1) % maxStreams;
  const currentAudio = audioStreams[currentIndex];

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio("audio/" + filename);
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
  audioStreams[currentIndex] = audio;
}
