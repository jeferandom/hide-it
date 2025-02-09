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
    chrome?.storage.local.set({ blockedKeywords: keywords });
  };

  return (
    <>
      <div>
        <h2>{title}</h2>
        <ul>
          {
            keywords.map(keyword => <li>{keyword}</li>)
          }
        </ul>
        <input
          type="text"
          value={keywords.join(', ')}
          onChange={(e) => setKeywords(e.target.value.split(', '))}
        />
        <button onClick={updateKeywords}>Update Keywords</button>
      </div>
    </>
  )
}

export default App
