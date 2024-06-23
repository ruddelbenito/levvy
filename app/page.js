"use client"

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  let [word1, setWord1] = useState("test");
  let [word2, setWord2] = useState("taste");
  let [showError, setShowError] = useState(false);
  let matrix = [];

  // instantiate matrix
  for (let w2ndex = 0; w2ndex < word2.length + 1; w2ndex++) {
    matrix.push([]);
    for (let w1ndex = 0; w1ndex < word1.length + 1; w1ndex++) {
      matrix[w2ndex].push(0);
    }
  }

  // iterate through matrix
  for (let w2ndex = 0; w2ndex < matrix.length; w2ndex++) {
    for (let w1ndex = 0; w1ndex < matrix[w2ndex].length; w1ndex++) {

      // base case: if the current index is at 0, the levenshtein distance is the length of the other word
      if (w2ndex === 0) {
        matrix[w2ndex][w1ndex] = w1ndex;
      }
      if (w1ndex === 0) {
        matrix[w2ndex][w1ndex] = w2ndex;
      }

      if (w2ndex !== 0 && w1ndex !== 0) {
        // determine levenshtein distance based on current progress in the matrix
        // if the current letter is the same
        if (word2[w2ndex - 1] === word1[w1ndex - 1]) {
          matrix[w2ndex][w1ndex] = matrix[w2ndex-1][w1ndex-1];
        }
        // if the current letter is different
        else {
          matrix[w2ndex][w1ndex] = Math.min(matrix[w2ndex - 1][w1ndex], matrix[w2ndex][w1ndex-1], matrix[w2ndex-1][w1ndex-1]) + 1;
        }
      }
    }
  }

  // render graph
  // create a formatted copy of the matrix
  let graph = [];

  // first row - display for first word
  graph.push([]);
  for (let index = 0; index < word1.length + 2; index++) {
    if (index === 0) {
      graph[0].push('')
    }
    else if (index === 1) {
      graph[0].push('_')
    }
    else {
      graph[0].push(word1[index - 2]);
    }
  }

  // other rows - import matrix
  //  - set first index as word2 display
  for (let index = 0; index < word2.length + 1; index++) {
    if (index === 0) {
      graph.push(['_', ...matrix[index]]);
    }
    else {
      graph.push([word2[index - 1], ...matrix[index]]);
    }
  }

  function update() {
    let valid = true;
    let userword1 = document.getElementById('user-word-1').value.toLowerCase();
    let userword2 = document.getElementById('user-word-2').value.toLowerCase();
    const lowercaseRegex = /^[a-z]+$/

    if (!lowercaseRegex.test(userword1)) {
      valid = false;
    }

    if (!lowercaseRegex.test(userword2)) {
      valid = false;
    }

    if (valid) {
      setShowError(false);
      setWord1(userword1);
      setWord2(userword2);
    }
    else {
      setShowError(true);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.page}>
        <h1 className={styles.title}>levvy</h1>
        
        <div className={styles.descriptor}>
           <p>A <a href="https://www.geeksforgeeks.org/introduction-to-levenshtein-distance/" target="_blank" rel="noreferrer">Levenshtein Distance</a> visualisation tool created by <a href="https://ruddel.ca/" target="_blank" rel="noreferrer">ruddel</a>.</p>
        </div>

        <div className={styles.form}>
          <div className={styles.prompt}>
            <p>convert</p>
            <div className={styles.wordWrapper}>
              <input placeholder={word1} id='user-word-1'></input>
            </div>
            <p>to</p>
            <div className={styles.wordWrapper}>
              <input placeholder={word2} id='user-word-2'></input>
            </div>
          </div>
          <button className={styles.button} onClick={update}>convert!</button>
        </div>

        

        {showError ? <p className={styles.errorMessage}>invalid inputs - please ensure that your words consist only of Latin script and try again</p> : <></>}

        <div className={styles.graph}>
          {graph.map((row, rowIndex) => {
            return <div className={styles.row} key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                return <div className={styles.cell} key={`cell-${cellIndex}`}>{cell}</div>
              })}
            </div>
          })}
        </div>

        <div className={styles.endStatement}>
          <p>Changing &quot;{word1}&quot; to become &quot;{word2}&quot; takes at least {matrix[word2.length][word1.length]} edits.</p>
        </div>

      </div>
    </main>
  );
}
