import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [lang, setLang] = useState("C++");
  const[result,setResult] = useState("");
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput, langa:lang }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="data:image/png;base64,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" className={styles.icon} />
        <h3>Ask Coding Question</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an Coding Question"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input
            type="text"
          name="language"
            placeholder="Enter an Coding Language"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          />
          <input type="submit" value="Generate Code " />
        </form>
        <SyntaxHighlighter language={lang} style={dracula}>{result} </SyntaxHighlighter>
      </main>
    </div>
  );
}
