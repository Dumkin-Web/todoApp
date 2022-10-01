import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";

const TaskEdit = (props)=>{
    const [cats, setCats] = useState([])
    const [loading, setLoading] = useState(true);
    let name = props.task, cat = cats.indexOf(props.cat);

    useEffect(()=>{
        if(cats.length === 0){
            fetch("http://localhost:3006/category?id="+localStorage.getItem('id'))
            .then(res=>res.json())
            .then(res=>{
                delete res.data[1]
                setCats(res.data)
                setLoading(false)
            })
        }
    }, [])

    function editTask(){
        if(name !== ""){
            console.log(cats[cat])
            fetch("http://localhost:3006/tasks/edit?id="+localStorage.getItem('id') + "&task=" + props.task+ "&cat=" + props.cat+"&newCat="+cats[cat]+"&newTask="+name)
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
                <Form onSubmit={()=>editTask()}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Название категории</Form.Label>
                    <Form.Select aria-label="Default select example" className="mb-3" defaultValue={cats.indexOf(props.cat)} onChange={(e) =>{
                        cat = e.target.value}}>
                        {cats.map((value, index)=>{
                            return <option key={index} value={index}>{value}</option>
                        })}
                    </Form.Select>
                    <Form.Label>Как назвать ваше дело?</Form.Label>
                    <Form.Control defaultValue={name} onChange={(e) =>{
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
            onClick={() => editTask()}
            >
                Изменить
            </Button>
            </Modal.Footer>
      </Modal>
    )
}

export default TaskEdit;