import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

function App() {
	const [data, setData] = useState([]);
	async function getUsers() {
		const res = await axios.get('http://localhost:5000/api/users');
		console.log(res.data);
		setData(res.data);
	}
  return (
    <div className="App">
		{data.map((user, id) => <h1 key={id}>{`${user._id} - Cash: ${user.cash} - Credit: ${user.credit}`}</h1>)}
		<button onClick={() => getUsers()}>Get Users</button>
    </div>
  );
}

export default App;
