import { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const MyContext = createContext();

const MyProvider = (props) => {

  const [stage, setStage] = useState(1);
  const [player, setPlayer] = useState([]);
  const [result, setResult] = useState('');

  const addPlayerHandler = (name) => {
    setPlayer(prevState => [...prevState, name]);
  };

  const removePlayerHandler = (idx) => {
    let newArray = [...player];
    newArray.splice(idx, 1);
    setPlayer(newArray);
  };

  const nextHandler = () => {
    if (player.length < 2) { 
      toast.error('At least 2 players are required to proceed!', {
        position: "top-left",
      });
    } else {
      setStage(2); 
      setTimeout(() => {
        generateLooser();
      },2000)
     
    }
  };

  const generateLooser = () => {

    let result = player[Math.floor(Math.random() * player.length)];
    setResult(result);
  }

  const resetGameHandler = () => {
    setPlayer([]);
    setResult('');
    setStage(1);
  }


  return (
    <>
      <MyContext.Provider value={{ 

        // state
        stage: stage,
        player: player,
        result: result,

        // methods
        addPlayer: addPlayerHandler,
        removePlayer: removePlayerHandler,
        next: nextHandler,
      generateNewLooser: generateLooser,
      resetGame:resetGameHandler
      }}>
        {props.children}
      </MyContext.Provider>

      <ToastContainer />
    </>
  );
};

export default MyProvider;