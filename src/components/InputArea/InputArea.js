// InputArea.js
"use client";

import { useState } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import styles from "./InputArea.module.css";

export default function InputArea({ onSend, error, setError, isLoading, onTyping }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    if (!isLoading) {
      onSend(inputText);
      setInputText("");
    }
  };

  return (
    <div className={styles.inputArea}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.inputGroup}>
        <textarea
          className={styles.textarea}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setError("");
            if (e.target.value.trim() && onTyping) {
              onTyping();
            }
          }}
          placeholder="Hello 👋, type whatever you have in mind in your favorite language..."
          aria-label="Text input"
          rows={3}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
        />
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={isLoading}
          aria-label="Send message"
        >
          {isLoading ? (
            <FaSpinner className={styles.spin} />
          ) : (
            <FaPaperPlane />
          )}
        </button>
      </div>
    </div>
  );
}
