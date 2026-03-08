import { useState} from "react";

function Username() {
    const [name, setName] = useState('');

  const tooShort = name.length > 0 && name.length < 3

    function handleChange(event) {
        setName(event.target.value)
    }

    return (
        <section>
        <h2>Username</h2>
        <label>Type a name: 
        <input 
            placeholder="Type your username" 
            value={name}
            onChange={handleChange}
        />
        </label>
        {tooShort && <p style={{color: 'red'}}>Username must be at least 3 characters long.</p>}
        <p>Right now: {name || 'No name entered'}</p>
        </section>
    )
}

export default Username;