export function speakAdvisoryText(text, lang = 'marathi', onEndCallback) {
  if (!('speechSynthesis' in window)) {
    alert('Text-to-Speech is not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;

  let langCode = 'hi-IN';
  if (lang === 'marathi') langCode = 'mr-IN';
  if (lang === 'english') langCode = 'en-IN';

  utterance.lang = langCode;

  // Try to set native voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.includes(langCode) || v.lang.startsWith(langCode.slice(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onEndCallback) {
    utterance.onend = onEndCallback;
    utterance.onerror = onEndCallback;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}