import React, { useState } from 'react';
import axios from 'axios';

const WordSearchGenerator = () => {
  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(false);

  const [words, setWords] = async () => {
	  try {
      const response = await axios.post(************, {
        prompt: `Return a list of comma-separated words to be used in a word search based on the input.`,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5,
      }, {
        headers: {
          'Authorization': `OPENAI_API_KEY`,
          'Content-Type': 'application/json'
        }
      });

      words = response.data.choices[0].text.trim().split(',');
    } catch (error) {
      console.error('Error generating word search:', error);
    }
  }
  
  const generateWordSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(************, {
        prompt: `Generate a word search grid with the following words: ${words}`,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5,
      }, {
        headers: {
          'Authorization': `OPENAI_API_KEY`,
          'Content-Type': 'application/json'
        }
      });

      const generatedGrid = response.data.choices[0].text.trim().split('\n').map(row => row.split(' '));
      setGrid(generatedGrid);
    } catch (error) {
      console.error('Error generating word search:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Word Search Generator</h1>
      <textarea
        value={words}
        blur={(e) => setWords(e.target.value)}
        placeholder="Tell me what kind of word search you want to make."
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={generateWordSearch} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Word Search'}
      </button>
      <div>
        {grid.length > 0 && (
          <table>
            <tbody>
              {grid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} style={{ border: '1px solid black', padding: '5px' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WordSearchGenerator;