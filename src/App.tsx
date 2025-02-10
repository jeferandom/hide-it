import { useState, useEffect } from 'react'
import './App.css'

interface AppProps {
  title: string;
}

function App({ title }: AppProps) {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (chrome?.storage) {
      chrome.storage.local.get(['blockedKeywords'], function (result) {
        if (result.blockedKeywords) {
          setKeywords(result.blockedKeywords);
        }
      });
    }
  }, []);

  const updateKeywords = () => {
    chrome?.storage?.local.set({ blockedKeywords: keywords });
  };

  return (
    <>
      <div>
        <h2>{title}</h2>
        <ul>
          {
            keywords.map((keyword,i) => { 
              return <li key={`${i}-keyword`}>{keyword}</li>
            })
          }
        </ul>
        <label>
          <span>key-word</span>
          <input
            id="key-word"
            type="text"
            value={keywords.join(', ')}
            onChange={(e) => setKeywords(e.target.value.split(', '))}
          />
        </label>
        <button onClick={updateKeywords}>Save</button>
      </div>
    </>
  )
}

export default App
