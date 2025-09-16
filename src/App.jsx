import { useEffect, useState } from 'react'
import loving from './assets/loving_emoji.png'
import crying from './assets/crying_emoji.png'
import smiling from './assets/smiling_emoji.png'
import sleeping from './assets/sleeping_emoji.png'
import withSunGlasses from './assets/sunglasses_emoji.png'
import Counter from './components/counter'
import './App.css'

function App() {
  const images = [ loving, crying, smiling, sleeping, withSunGlasses];
/*LocalStorage getItem*/
  const [votes, setVotes] = useState(() => {
    try {
      const savedVotes = localStorage.getItem('votes');
      if(!savedVotes) return Array(images.length).fill(0);
      
      const parsedVotes = JSON.parse(savedVotes);
      return Array.isArray(parsedVotes) ? parsedVotes : Array(images.length).fill(0);
    }
    catch (error) {
      return Array(images.length).fill(0);
    }
  });
/*LocalStorage setItem*/
  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes || []));
  }, [votes]);

  const [winnersEmoji, setWinnersEmoji] = useState([]);

  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
  };

  const showResults = () => {
    const maxVotes = Math.max(...votes);
      if (maxVotes === 0) {
        setWinnersEmoji([]);;
        return;
      }
    const WinnersEmojiWithMaxVotes = votes
      .map((v, i) => (v === maxVotes ? i : -1))
      .filter(i => i !== -1);
      setWinnersEmoji(WinnersEmojiWithMaxVotes);
  }
  /*LocalStorage resetItem*/
  const resetResults = ()  => {
    setVotes(Array(images.length).fill(0));
    setWinnersEmoji([]);
    localStorage.removeItem('votes');
  }

  return (
    <>
      <div>
        <h1 className='fw-bold'>Голосування за найкращий смайлик</h1>
          <div className='d-flex gap-5 justify-content-between my-5 flex-wrap align-center'>
            {images.map((src, index) => (
              <Counter
                key={index}
                src={src}
                alt={`emoji-${index}`}
                votes={votes[index]}
                onVote={() => handleVote(index)}/>
            ))}
          </div>
        <button onClick={showResults}>Show Results</button>
        {/*render*/}
        {winnersEmoji.length > 0 && (
        <div className=''>
          <p className='fw-bold fs-2'>Результати голосування:</p>
          {winnersEmoji.length > 1 ? (
            <p className="fw-bold fs-4">Нічия:</p>
          ) : (
            <p className='fw-bold fs-4'>Переможець:</p>
          )}
          <div className='d-flex flex-wrap gap-3 justify-content-center'>
           {winnersEmoji.map(i => (
            <div key={i} className="text-center">
              <img 
              src={images[i]}
              alt={`winner-${i}`}
              style={{ width: '120px' }}
              className="emoji-winner"/>
            </div>
            ))}
          </div>
          <p className="fw-bold fs-5">Кількість голосів: {Math.max(...votes)}</p>
          
          <button onClick={resetResults}>Очистити результати</button>
        </div>
        )}
      </div>
    </>
  )
}

export default App