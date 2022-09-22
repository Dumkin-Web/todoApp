import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import TaskEdit from "./TaskEdit";


const Task= observer((props)=>{
    const [checked, setChecked] =useState(false)
    const [redact, setRedact] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(()=>{
        setChecked(props.done)
    }, [])

    return(
        <div>
            {show ? <TaskEdit handleClose={handleClose} task={props.task} cat={props.category}/> : <div></div>}
            <div className="d-flex justify-content-between align-items-center mb-3 p-2 border">
                <Form className="me-3">
                    <Form.Check checked={checked} onChange={(e)=>{
                        fetch("http://localhost:3006/tasks/change?id="+localStorage.getItem('id') + "&cat=" + props.category+"&task="+props.task)
                        .then(
                            setChecked(!checked)
                        )
                        
                        
                    }}/>
                </Form>
                {checked ? <div style={{textDecoration: "line-through", fontSize:20}}>{props.task}</div>: <div style={{fontSize:24}}>{props.task}</div>}
                <div className="d-flex">
                { !checked ? <Button className="me-2" onClick={handleShow}>Редактировать</Button>: <Button className="me-2" onClick={handleShow} disabled>Редактировать</Button> }
                <Button variant="danger" style={{width: 44, fontSize: 20}} onClick={(e)=>{
                    fetch("http://localhost:3006/tasks/delete?id="+localStorage.getItem('id') + "&cat=" + props.category+"&task="+props.task)
                    .finally(() => window.location.reload())
                }}>x</Button>
                </div>
            </div>
        </div>
    )
})

export default Task;