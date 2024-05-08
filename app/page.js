import styles from "./page.module.css";

export default function Home() {
  let word1 = "test";
  let word2 = "taste";
  let matrix = [];

  // instantiate matrix
  for (let w2ndex = 0; w2ndex < word2.length + 2; w2ndex++) {
    matrix.push([]);
    for (let w1ndex = 0; w1ndex < word1.length + 2; w1ndex++) {
      // leave grid space for blanks and letters
      if (w2ndex === 0 && w1ndex === 0) {
        matrix[w2ndex].push('');
      }
      else if (w2ndex === 0) {
        matrix[w2ndex].push(word1[w1ndex]);
      }
      else if (w1ndex === 0) {
        matrix[w2ndex].push(word2[w2ndex]);
      }
      else {
        matrix[w2ndex].push(0);
      }
    }
  }

  // iterate through matrix
  for (let w2ndex = 0; w2ndex < matrix.length; w2ndex++) {
    for (let w1ndex = 0; w1ndex < matrix[w2ndex].length; w1ndex++) {

      // base case: if the current index is at 0, the levenshtein distance is the length of the other word
      if (w2ndex === 1) {
        matrix[w2ndex][w1ndex] = w1ndex;
      }
      if (w1ndex === 1) {
        matrix[w2ndex][w1ndex] = w2ndex;
      }

      if (w2ndex > 1 && w1ndex > 1) {
        // determine levenshtein distance based on current progress in the matrix
        // if the current letter is the same
        if (word2[w2ndex - 1] === word1[w1ndex - 1]) {
          matrix[w2ndex][w1ndex] = matrix[w2ndex - 1][w1ndex - 1];
        }
        // if the current letter is different
        else {
          matrix[w2ndex][w1ndex] = Math.min(matrix[w2ndex - 1][w1ndex], matrix[w2ndex][w1ndex-1], matrix[w2ndex-1][w1ndex-1]) + 1;
        }
      }
    }
  }

  console.log(matrix);

  return (
    <main className={styles.main}>
      <p>word 1: {word1}</p>
      <p>word 2: {word2}</p>

      <table>
        {matrix.map((column) => {
          return <tr key={column}>
            {column.map((cell) => {
              return <td key={cell}>{cell}</td>
            })}
          </tr>
        })}
      </table>
    </main>
  );
}
