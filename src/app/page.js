"use client";
import { useState, useEffect } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import styles from "./page.module.css";
import MessageCard from "../components/MessageCard/MessageCard";
import InputArea from "../components/InputArea/InputArea";
import { detectLanguage, summarizeText, translateText } from "../lib/api";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  // Log availability of Chrome AI APIs
  useEffect(() => {
    if (typeof window.ai !== "undefined") {
      console.log("✅ Chrome AI APIs are available.");
    } else {
      console.warn("⚠️ Chrome AI APIs are not available for summarization/translation.");
    }
  }, []);

  // Handles user input and AI responses
  const handleSend = async (text) => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    // Hide the welcome message when input is sent
    if (showWelcome) {
      setShowWelcome(false);
    }

    setError("");
    setIsLoading(true);

    const newMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      detectedLang: "Detecting...",
      isLoading: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      // Use Chrome's Language Detection API
      const detectedLang = await detectLanguage(newMessage.text);
      if (!detectedLang) throw new Error("Language detection failed.");

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id
            ? { ...msg, detectedLang, isLoading: false }
            : msg
        )
      );

      // Auto-translate if the detected language differs from the selected language.
      // Pass the detected language as the source.
      if (detectedLang !== selectedLang) {
        const translation = await translateText(newMessage.text, detectedLang, selectedLang);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, translation, isLoading: false } : msg
          )
        );
      }

      // Auto-summarize if the text is long and in English.
      if (detectedLang === "en" && newMessage.text.length >= 150) {
        const summary = await summarizeText(newMessage.text);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, summary, isLoading: false } : msg
          )
        );
      }
    } catch (err) {
      console.error("❌ Error in handleSend:", err);
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      {/* Welcome Message Section with fade-out animation */}
      {showWelcome && (
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Welcome to AI Text Assistant!</h1>
          <p className={styles.welcomeSubtitle}>
            Detect languages, summarize text, and translate instantly with AI.
          </p>
        </div>
      )}

      {/* Message Display */}
      <div className={styles.messagesContainer}>
        {messages.map((msg) => (
          <MessageCard
            key={msg.id}
            message={msg}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
            setMessages={setMessages}
          />
        ))}
      </div>

      {/* Input Area */}
      <InputArea
        onSend={handleSend}
        error={error}
        setError={setError}
        isLoading={isLoading}
        onTyping={() => {
          if (showWelcome) setShowWelcome(false);
        }}
      />
    </main>
  );
}
