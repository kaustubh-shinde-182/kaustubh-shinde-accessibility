import { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [result] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleCalculate = () => {
    // For now, just show the alert to demonstrate
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
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

      <form onSubmit={(e) => e.preventDefault()}>
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
          }}
          placeholder="Example: 1,2,3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-describedby="input-instructions"
        />

        <button
          type="button"
          onClick={handleCalculate}
          style={{
            padding: "10px 20px",
            backgroundColor: "#008cba",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Calculate
        </button>
      </form>

      {result !== null && <p style={{ color: "green" }}>Result: {result}</p>}

      {showAlert && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            marginTop: "16px",
            padding: "8px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
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
