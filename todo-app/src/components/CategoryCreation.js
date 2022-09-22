import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

const CategoryCreation = (props)=>{
    let name = "";

    function createCat(){
        if(name !== ""){
            fetch("http://localhost:3006/category/add?id="+localStorage.getItem('id') + "&cat=" + name)
            .finally(()=>window.location.reload())
        }
    }

    return(
        <Modal show={true} onHide={() => props.handleClose(false)} onSubmit={()=>{console.log('sub')}}>
            <Modal.Header closeButton>
            <Modal.Title>Новая категория</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={()=>{console.log('sub')}}>
                    <Form.Group className="mb-3" onSubmit={()=>{console.log('sub')}}>
                    <Form.Label>Название категории</Form.Label>
                    <Form.Control onSubmit={()=>{console.log('sub')}} onChange={(e) =>{
                        name = e.target.value;
                        if(name === ""){
                            e.target.classList.add('border-danger')
                        }
                        else{
                            e.target.classList.remove('border-danger')
                        }
                    }}
                        type="text"
                        placeholder="Какие-то важные дела"
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
            onClick={() => createCat()}>
                Создать
            </Button>
            </Modal.Footer>
      </Modal>
    )
}

export default CategoryCreation;