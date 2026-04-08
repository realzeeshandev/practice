import {useContext} from 'react';
import { MyContext } from '../context/index.jsx';



const Stage2 = () => {

const context = useContext(MyContext);



  return (<>
   <div className='result_wrapper'>
    <h3>The Looser is: </h3>
    {context.result}

   </div>
<div className='action_button'
 onClick={context.resetGame}>
Start Over
</div>
<div className='action_button btn_2'
onClick={context.generateNewLooser} >
Get New Looser
</div>

  </>)
}

export default Stage2;