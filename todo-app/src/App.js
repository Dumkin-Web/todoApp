import React, { useEffect } from 'react';
import {Button} from 'react-bootstrap'
import TaskContainer from './components/TaskContainer';
import Topbar from './components/Topbar';

const App = () => {
  useEffect(()=>{
    if(localStorage.getItem('id') == null){
      fetch('http://localhost:3006/reg')
      .then(res=>res.json())
      .then(res=>{
        localStorage.setItem('id', res.data)
      })
    }
  },[])
  return (
    <div>
      <Topbar />
      <TaskContainer />
    </div>
  );
}

export default App;
