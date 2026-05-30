import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReply = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/generate-reply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      setReply(data.reply);

    } catch (error) {
      console.log(error);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#111827",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <h1>AI Email Assistant</h1>

      <textarea
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Paste email here..."
        style={{
          width: "100%",
          height: "200px",
          padding: "10px",
          marginTop: "20px",
        }}
      />

      <br />
      <br />

      <button
        onClick={generateReply}
        style={{
          padding: "12px 20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Reply"}
      </button>

      <div style={{ marginTop: "30px" }}>
        <h2>AI Reply:</h2>

        <p>{reply}</p>
      </div>
    </div>
  );
}

export default App;