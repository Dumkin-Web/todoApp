import React, { useState } from "react";
import {Navbar, Button} from 'react-bootstrap';
import CategoryCreation from "./CategoryCreation";
import TaskCreation from "./TaskCreation";

const Topbar = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    function Modals(){
        if(show === 1) return <CategoryCreation handleClose={handleClose}/>
        if(show === 2) return <TaskCreation handleClose={handleClose}/>
        return <div></div>
    }

    return(
        <div>
        <Modals />
        <Navbar bg="dark" variant="dark" className="p-2 d-flex justify-content-between justify-content-center">
            <h1 className="m-2" style={{color: "white", cursor: "default"}}>ToDo</h1>
            <div>
            <Button className="m-2" onClick={() => setShow(1)}>Новая категория</Button>
            <Button className="m-2" onClick={() => setShow(2)}>Новая задача</Button>
            </div>
        </Navbar>
        </div>
    )
}

export default Topbar;