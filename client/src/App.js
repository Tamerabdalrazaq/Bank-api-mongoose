import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		getData();
		async function getData(){
			await axios.post('http://localhost:5000/api/users', {id: '123123123', cash: 300})
			let data = await axios.get('http://localhost:5000/api/users');
			setData(data.data)
		}
	}, [])
  return (
    <div className="App">
		{data.map((user, id) => <h1 key={id}>{`${user.id} - Cash: ${user.cash} - Credit: ${user.credit}`}</h1>)}
    </div>
  );
}

export default App;
