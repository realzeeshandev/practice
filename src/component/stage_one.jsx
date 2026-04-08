import { useState, useContext, useRef } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { MyContext } from '../context/index.jsx';

const Stage1 = () => { 
  
  const textInput = useRef();
  const context = useContext(MyContext);
  const [error, setError] = useState([false, '']);

  const validateInput = (value) => {
    if (value.trim() === '') {
      setError([true, 'Name cannot be empty']);
      return false;
    }
    if (value.length < 2) {
      setError([true, 'Name must be at least 2 characters long']);
      return false;
    }
    setError([false, '']);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;
    const validate = validateInput(value);
    if (validate) {
      context.addPlayer(value);
    }
    textInput.current.value = '';
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className='mt-4'>

        <Form.Group>
          <Form.Control 
            type='text' 
            placeholder='enter name' 
            ref={textInput} 
            required 
          />
        </Form.Group>

        {error[0] && (
          <Alert variant='danger' className='mt-2'>
            {error[1]}
          </Alert>
        )}

        <Button className='miami' variant='primary' type='submit'>
          Add player 
        </Button>

        {context.player && context.player.length > 0 && (
          <>
            <hr />
            <div>
              <ul className="list-group">
                {context.player.map((player, idx) => (
                  <li 
                    key={idx} 
                    className='list-group-item d-flex justify-content-between align-items-center list-group-item-action'
                  >
                    {player}
                    <span
                      className="badge badge-danger"
                      onClick={() => context.removePlayer(idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div 
              className='action_button'
              onClick={() => context.next()}
            >
              NEXT
            </div>
          </>
        )}

      </Form>
    </>
  );
}

export default Stage1;