import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import Category from "./Category";
import {observer} from 'mobx-react-lite'

function clonning(obj){
    let temp = {}
    for(let cat in obj){
        temp[cat]={}
        for(let task in obj[cat]){
            temp[cat][task] = obj[cat][task]
        }
    }
    return temp;
}

const TaskContainer = observer(() =>{
    const [tasks, setTasks] = useState({"any":{},"allTasks":[]})
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState("")
    useEffect(()=>{
        fetch('http://localhost:3006/tasks?id='+localStorage.getItem('id'))
        .then(res=>res.json())
        .then(res=>{
            setTasks(res.data);
            setLoading(false);
        })
    }, [])

    useEffect(()=>{
        fetch('http://localhost:3006/tasks/searching?id='+localStorage.getItem('id')+"&task="+searching)
        .then(res=>res.json())
        .then(res=>{
            setTasks(JSON.parse(res.data))
            setLoading(false);
        })
    }, [searching])

    if(loading){
        return <div className="d-flex justify-content-center w-100" style={{marginTop: window.innerHeight/3}}><Spinner animation="grow" style={{width: "10rem", height: "10rem"}} /></div>
    }

    return(
        <Container className="pt-5">
            <div className="d-flex justify-content-between align-items-center">
            <h1 className="m-4">Задачи</h1>
            <div style={{fontSize: 20}}>Количество задач: {tasks.allTasks.length}</div>
            <Form className="">
                { searching !== "" ? <Form.Control type="text" placeholder="Какое-то важное дело" autoFocus defaultValue={searching} style={{height: 46, width: 400}} onChange={(e)=>{
                    setSearching(e.target.value)
                    setLoading(true);
                }}/> : <Form.Control type="text" placeholder="Какое-то важное дело" defaultValue={searching} style={{height: 46, width: 400}} onChange={(e)=>{
                    setSearching(e.target.value)
                    setLoading(true);
                }}/>}
            </Form>
            </div>
            <div className="d-flex justify-content-center w-100">
                { tasks.allTasks.length === 0? <h3>Задач нет</h3> : <Category data={clonning(tasks)} />}
            </div>
        </Container>
    )
})

export default TaskContainer;