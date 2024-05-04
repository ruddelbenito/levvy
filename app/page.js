import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  let word1 = "test";
  let word2 = "taste";
  let matrix = [];

  // instantiate matrix
  for (let w1ndex = 0; w1ndex < word1.length + 1; w1ndex++) {
    matrix.push([]);
    for (let w2ndex = 0; w2ndex < word2.length + 1; w2ndex++) {
      matrix[w1ndex].push(0);
    }
  }

  // iterate through matrix
  for (let w1ndex = 0; w1ndex < matrix.length; w1ndex++) {
    for (let w2ndex = 0; w2ndex < matrix[w1ndex].length; w2ndex++) {

      // base case: if the current index is at 0, the levenshtein distance is the length of the other word
      if (w1ndex === 0) {
        matrix[w1ndex][w2ndex] = w2ndex;
      }
      if (w2ndex === 0) {
        matrix[w1ndex][w2ndex] = w1ndex;
      }

      if (w1ndex !== 0 && w2ndex !== 0) {
        // determine levenshtein distance based on current progress in the matrix
        // if the current letter is the same
        if (word1[w1ndex - 1] === word2[w2ndex - 1]) {
          matrix[w1ndex][w2ndex] = Math.min(matrix[w1ndex - 1][w2ndex], matrix[w1ndex][w2ndex-1], matrix[w1ndex-1][w2ndex-1]);
        }
        // if the current letter is different
        else {
          matrix[w1ndex][w2ndex] = Math.min(matrix[w1ndex - 1][w2ndex], matrix[w1ndex][w2ndex-1], matrix[w1ndex-1][w2ndex-1]) + 1;
        }
      }
    }
  }

  console.log(matrix);

  return (
    <main className={styles.main}>
      <p>word 1: {word1}</p>
      <p>word 2: {word2}</p>

      
    </main>
  );
}
