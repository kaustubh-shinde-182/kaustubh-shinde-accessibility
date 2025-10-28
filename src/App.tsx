import { useState, useRef } from "react";
import { add } from "./stringCalculator";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const resultRef = useRef<HTMLParagraphElement>(null);

  const handleCalculate = () => {
    try {
      const calculationResult = add(input);
      setResult(calculationResult);
      setError(null);
      setShowAlert(false);

      // Focus result for screen readers
      setTimeout(() => {
        resultRef.current?.focus();
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
      setShowAlert(true);
    }
  };

  const handleTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();
      buttonRef.current?.focus();
    }
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      handleCalculate();
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    // Clear previous results when input changes
    if (result !== null || error !== null) {
      setResult(null);
      setError(null);
      setShowAlert(false);
    }
  };

  return (
    <main
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        color: "#333",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={600}
        height={400}
        alt="Beautiful landscape with mountains and lake"
        style={{ maxWidth: "100%", height: "auto" }}
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
            border: error ? "2px solid #dc3545" : "2px solid #008cba",
            borderRadius: "4px",
            padding: "8px",
            width: "100%",
            maxWidth: "400px",
            outline: "none",
            fontFamily: "monospace",
          }}
          placeholder='Examples: "1,2,3" or "1\n2,3" or "//;\n1;2"'
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleTextareaKeyDown}
          aria-describedby="input-instructions"
          aria-invalid={!!error}
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
            marginRight: "10px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab" && e.shiftKey) {
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

        <button
          type="button"
          onClick={() => {
            setInput("");
            setResult(null);
            setError(null);
            setShowAlert(false);
            const textarea = document.getElementById("numbers-input");
            textarea?.focus();
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            outline: "none",
          }}
        >
          Clear
        </button>
      </form>

      {result !== null && (
        <p
          ref={resultRef}
          style={{
            color: "green",
            fontSize: "18px",
            fontWeight: "bold",
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
          }}
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          Result: {result}
        </p>
      )}

      {showAlert && error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
            color: "#721c24",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>Error: {error}</p>
        </div>
      )}

      <div
        id="input-instructions"
        style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}
      >
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
          <li>
            Enter numbers separated by commas: <code>1,2,3</code>
          </li>
          <li>
            Use new lines as delimiters: <code>1\n2,3</code>
          </li>
          <li>
            Custom delimiters: <code>//;\n1;2</code>
          </li>
          <li>Press Ctrl+Enter to calculate quickly</li>
        </ul>
      </div>
    </main>
  );
};

export default App;
