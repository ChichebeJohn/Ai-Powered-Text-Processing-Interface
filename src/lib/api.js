import DetectLanguage from "detectlanguage";

// Initialize the DetectLanguage client with your API key.
const detectLanguageClient = new DetectLanguage("f40cd2d2e5306faf57ba0ac82ae17741");

export const detectLanguage = async (text) => {
  if (!text || typeof text !== "string") {
    console.warn("⚠️ Invalid input for language detection.");
    return null;
  }
  
  try {
    const result = await detectLanguageClient.detect(text);
    console.log("✅ Language Detection Result:", result);
    
    if (!result || result.length === 0) {
      console.warn("⚠️ No language detected.");
      return null;
    }
    
    return result[0].language;
  } catch (error) {
    console.error("❌ Error in detectLanguage:", error);
    return null;
  }
};

export const summarizeText = async (text) => {
  if (!text || typeof text !== "string") {
    console.warn("⚠️ Invalid input for summarization.");
    return null;
  }

  if (!window.ai?.summarizer?.summarize) {
    console.error("❌ AI API for text summarization is unavailable.");
    return null;
  }

  try {
    const response = await window.ai.summarizer.summarize(text);
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
};

export const translateText = async (text, targetLang) => {
  if (!text || typeof text !== "string") {
    console.warn("⚠️ Invalid input for translation.");
    return null;
  }
  if (!targetLang || typeof targetLang !== "string") {
    console.warn("⚠️ Invalid target language.");
    return null;
  }

  // Try to use the Chrome AI translator if available.
  if (window.ai && window.ai.translator && typeof window.ai.translator.create === "function") {
    const translator = window.ai.translator.create();
    if (translator && typeof translator.translate === "function") {
      try {
        const response = await translator.translate(text, targetLang);
        console.log("✅ Translation Result:", response);
        if (response && response.translation) {
          return response.translation;
        } else {
          console.warn("⚠️ No translation returned from Chrome AI translator.");
        }
      } catch (error) {
        console.error("❌ Error in Chrome AI translator:", error);
      }
    } else {
      console.error("❌ Created translator does not have a translate method.");
    }
  } else {
    console.error("❌ Chrome AI translator API is unavailable.");
  }

  // Fallback: Use an external API like LibreTranslate.
  try {
    const fallbackResponse = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text",
      }),
    });
    const data = await fallbackResponse.json();
    if (data && data.translatedText) {
      console.log("✅ Fallback Translation Result:", data.translatedText);
      return data.translatedText;
    } else {
      console.warn("⚠️ No translation returned from fallback API.");
      return null;
    }
  } catch (err) {
    console.error("❌ Error in fallback translation:", err);
    return null;
  }
};
