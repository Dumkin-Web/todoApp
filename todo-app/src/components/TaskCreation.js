import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";

const TaskCreation = observer((props)=>{
    const [cats, setCats] = useState(false)
    const [loading, setLoading] = useState(true);
    let name = "", cat = 0;

    useEffect(()=>{
        if(cats === false){
            fetch("http://localhost:3006/category?id="+localStorage.getItem('id'))
            .then(res=>res.json())
            .then(res=>{
                delete res.data[1]
                setCats(res.data)
                setLoading(false)
            })
        }
    }, [])

    function createTask(){
        if(name !== ""){
            console.log(cats[cat])
            fetch("http://localhost:3006/tasks/add?id="+localStorage.getItem('id') + "&task=" + name+ "&cat=" + cats[cat])
            .finally(()=>window.location.reload())
        }
    }

    if(loading){
        return <div className="d-flex justify-content-center w-100" style={{marginTop: window.innerHeight/3}}><Spinner animation="grow" style={{width: "10rem", height: "10rem"}} /></div>
    }

    return(
        <Modal show={true} onHide={() => props.handleClose(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Новая категория</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={()=>createTask()}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Название категории</Form.Label>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={(e) =>{
                        cat = e.target.value}}>
                        {cats.map((value, index)=>{
                            return <option key={index} value={index}>{value}</option>
                        })}
                    </Form.Select>
                    <Form.Label>Что нужно сделать?</Form.Label>
                    <Form.Control onChange={(e) =>{
                        name = e.target.value;
                        if(name === ""){
                            e.target.classList.add('border-danger')
                        }
                        else{
                            e.target.classList.remove('border-danger')
                        }
                    }}
                        type="text"
                        placeholder="Очень важное дело"
                        autoFocus
                    />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => props.handleClose(false)}>
                Закрыть
            </Button>
            <Button variant="primary"  
            onClick={() => createTask()}
            >
                Создать
            </Button>
            </Modal.Footer>
      </Modal>
    )
})

export default TaskCreation;