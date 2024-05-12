"use client"

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  let [word1, setWord1] = useState("test");
  let word2 = "taste";
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

  console.log(graph);

  return (
    <main className={styles.main}>
      <div className={styles.page}>
        <h1 className={styles.title}>levvy</h1>
        {/* <p>word 1: {word1}</p>
        <p>word 2: {word2}</p> */}

        <div className={styles.prompt}>
          <p>convert</p>
          <input placeholder="word 1"></input>
          <p>to</p>
          <input placeholder="word 2"></input>
          <button>change!</button>
        </div>

        <div className={styles.graph}>
          {graph.map((row, rowIndex) => {
            return <div className={styles.row} key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                return <div className={styles.cell} key={`cell-${cellIndex}`}>{cell}</div>
              })}
            </div>
          })}
        </div>
      </div>
    </main>
  );
}
