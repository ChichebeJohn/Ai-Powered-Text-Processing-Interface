// MessageCard.js
"use client";
import { FaSpinner } from "react-icons/fa";
import { summarizeText, translateText } from "../../lib/api";
import styles from "./MessageCard.module.css";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
  { code: "es", name: "Spanish" },
  { code: "ru", name: "Russian" },
  { code: "tr", name: "Turkish" },
  { code: "fr", name: "French" },
];

export default function MessageCard({
  message,
  selectedLang,
  setSelectedLang,
  isLoading,
  setIsLoading,
  setError,
  setMessages,
}) {
  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const summary = await summarizeText(message.text);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === message.id ? { ...msg, summary } : msg))
      );
    } catch (err) {
      setError("Summarization failed");
    }
    setIsLoading(false);
  };

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      const translation = await translateText(message.text, selectedLang);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, translation } : msg
        )
      );
    } catch (err) {
      setError("Translation failed");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.messageCard}>
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        {message.detectedLang && (
          <small>Detected language: {message.detectedLang}</small>
        )}
      </div>
      <div className={styles.messageActions}>
        {message.detectedLang === "en" && message.text.length >= 150 && (
          <button
            className={styles.btn}
            onClick={handleSummarize}
            disabled={isLoading}
            aria-label="Summarize"
          >
            {isLoading ? <FaSpinner className={styles.spin} /> : "Summarize"}
          </button>
        )}
        <div className={styles.translateGroup}>
          <select
            className={styles.select}
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            aria-label="Select target language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            className={styles.btn}
            onClick={handleTranslate}
            disabled={isLoading}
            aria-label="Translate"
          >
            {isLoading ? <FaSpinner className={styles.spin} /> : "Translate"}
          </button>
        </div>
      </div>
      {message.summary && (
        <div className={styles.resultBox}>
          <h4>Summary:</h4>
          <p>{message.summary}</p>
        </div>
      )}
      {message.translation && (
        <div className={styles.resultBox}>
          <h4>Translation ({selectedLang}):</h4>
          <p>{message.translation}</p>
        </div>
      )}
    </div>
  );
}
