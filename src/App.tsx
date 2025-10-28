import { useState, useRef } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [result] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCalculate = () => {
    // For now, just show the alert to demonstrate
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Tab" && !event.shiftKey) {
      // Tab from textarea should go to button
      event.preventDefault();
      buttonRef.current?.focus();
    }
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      handleCalculate();
    }
  };

  return (
    <main style={{ padding: "20px", backgroundColor: "#fff", color: "#333" }}>
      <img
        src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={600}
        height={400}
        alt="Beautiful landscape with mountains and lake"
      />

      <h1>String Calculator</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
      >
        <label
          htmlFor="numbers-input"
          style={{ display: "block", marginBottom: "8px" }}
        >
          <h2 style={{ fontSize: "20px", margin: "0 0 8px 0" }}>
            Enter numbers
          </h2>
        </label>

        <textarea
          id="numbers-input"
          style={{
            margin: "10px 0",
            color: "#333",
            border: "2px solid #008cba",
            borderRadius: "4px",
            padding: "8px",
            width: "100%",
            maxWidth: "400px",
            outline: "none",
          }}
          placeholder="Example: 1,2,3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleTextareaKeyDown}
          aria-describedby="input-instructions"
        />

        <button
          ref={buttonRef}
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#008cba",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab" && e.shiftKey) {
              // Shift+Tab from button should go back to textarea
              e.preventDefault();
              const textarea = document.getElementById("numbers-input");
              textarea?.focus();
            }
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 0 0 3px rgba(0, 140, 186, 0.5)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "none";
          }}
        >
          Calculate
        </button>
      </form>

      {result !== null && (
        <p style={{ color: "green" }} role="status" aria-live="polite">
          Result: {result}
        </p>
      )}

      {showAlert && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "4px",
          }}
        >
          <p style={{ color: "#856404", margin: 0 }}>
            Make sure you enter numbers correctly!
          </p>
        </div>
      )}

      <div
        id="input-instructions"
        style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}
      >
        Enter numbers separated by commas. Press Ctrl+Enter to calculate.
      </div>
    </main>
  );
};

export default App;
