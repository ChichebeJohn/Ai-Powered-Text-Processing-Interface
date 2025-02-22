// api.js

export const detectLanguage = async (text) => {
  if (!text || typeof text !== "string") {
    console.warn("⚠️ Invalid input for language detection.");
    return null;
  }

  if (
    window.ai &&
    window.ai.languageDetector &&
    typeof window.ai.languageDetector.create === "function"
  ) {
    try {
      // Asynchronously create the detector instance
      const detector = await window.ai.languageDetector.create();
      const result = await detector.detect(text);
      console.log("✅ Language Detection Result:", result);
      if (!result || result.length === 0) {
        console.warn("⚠️ No language detected.");
        return null;
      }
      // Return the detected language code
      return result[0].detectedLanguage;
    } catch (error) {
      console.error("❌ Error in detectLanguage:", error);
      return null;
    }
  } else {
    console.error("❌ Chrome AI Language Detection API is unavailable.");
    return null;
  }
};

export const translateText = async (text, sourceLang, targetLang) => {
  if (!text || typeof text !== "string") {
    console.warn("⚠️ Invalid input for translation.");
    return null;
  }
  if (!targetLang || typeof targetLang !== "string") {
    console.warn("⚠️ Invalid target language.");
    return null;
  }
  if (!sourceLang || typeof sourceLang !== "string") {
    console.warn("⚠️ Invalid source language.");
    return null;
  }

  if (
    window.ai &&
    window.ai.translator &&
    typeof window.ai.translator.create === "function"
  ) {
    try {
      // Create the translator with the detected (source) and selected (target) languages
      const translator = await window.ai.translator.create({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      });
      const translation = await translator.translate(text);
      console.log("✅ Translation Result:", translation);
      return translation;
    } catch (error) {
      console.error("❌ Error in Chrome AI translator:", error);
      return null;
    }
  } else {
    console.error("❌ Chrome AI translator API is unavailable.");
    return null;
  }
};

export const summarizeText = async (text) => {
  if (!text || typeof text !== "string") {
    console.warn("⚠️ Invalid input for summarization.");
    return null;
  }

  if (
    window.ai &&
    window.ai.summarizer &&
    typeof window.ai.summarizer.create === "function"
  ) {
    try {
      // Asynchronously create the summarizer instance
      const summarizer = await window.ai.summarizer.create();
      const response = await summarizer.summarize(text);
      console.log("✅ Summarization Result:", response);
      if (!response || !response.summary) {
        console.warn("⚠️ No summary returned.");
        return null;
      }
      return response.summary;
    } catch (error) {
      console.error("❌ Error in summarizeText:", error);
      return null;
    }
  } else {
    console.error("❌ Chrome AI API for text summarization is unavailable.");
    return null;
  }
};
