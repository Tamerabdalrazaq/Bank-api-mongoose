import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UserComponent from './components/UserComponent'
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
		{data.map((user, id) => <UserComponent user={user} update={getUsers}/> )}
		<button onClick={() => getUsers()}>Get Users</button>
    </div>
  );
}

export default App;
