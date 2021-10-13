import './App.css';
import axios from "axios";
import React,{useState, useEffect} from 'react';

const App =()=> {
  const [baran, setBaran] = useState([]);

    const getAllData = async() =>{
      const URL =`http://127.0.0.1:8000/api/todos/`;
      await axios
      .get(URL)
      .then(response=>setBaran(response.data));
    }
    console.log(baran);


    const postData = async() =>{
      const URL = `http://127.0.0.1:8000/api/todos/`;
      await axios
      .post(URL,{
        "id": 6,
        "title": "enivicivokki-6",
        "description": "eni vokki vici enivi civi vok kivici enicivivo ki enivici",
        "completed": true,
      }).then(response => console.log(response));
    }

  return (
  <>
  <div>
    <button onClick={getAllData}> get</button>
    <button onClick={postData}> POSt data</button>

  </div>
  </>
  );
}

export default App;
