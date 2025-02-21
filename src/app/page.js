"use client";
import { useState, useEffect } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import styles from "@/styles/Home.module.css";
import MessageCard from "../components/MessageCard/MessageCard";
import InputArea from "../components/InputArea/InputArea";
import { detectLanguage, summarizeText, translateText } from "../lib/api";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // (Optional) Check for Chrome AI availability for summarization & translation.
  // This useEffect logs whether window.ai exists.
  useEffect(() => {
    if (typeof window.ai !== "undefined") {
      console.log("✅ Chrome AI APIs are available.");
    } else {
      console.warn("⚠️ Chrome AI APIs are not available for summarization/translation.");
    }
  }, []);

  // Handles user input and AI response
  const handleSend = async (text) => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
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
      // Use external API for language detection
      const detectedLang = await detectLanguage(newMessage.text);
      if (!detectedLang) throw new Error("Language detection failed.");

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id
            ? { ...msg, detectedLang, isLoading: false }
            : msg
        )
      );

      // If the detected language differs from the selected language, auto-translate.
      if (detectedLang !== selectedLang) {
        const translation = await translateText(newMessage.text, selectedLang);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id
              ? { ...msg, translation, isLoading: false }
              : msg
          )
        );
      }

      // If the text is long and in English, auto-summarize.
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
      <div className={styles.messagesContainer}>
        {messages.map((msg) => (
          <MessageCard
            key={msg.id}
            message={msg}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            isLoading={msg.isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
          />
        ))}
      </div>

      <InputArea
        onSend={handleSend}
        error={error}
        setError={setError}
        isLoading={isLoading}
      />
    </main>
  );
}
