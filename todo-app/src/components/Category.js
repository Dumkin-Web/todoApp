import React, { useEffect, useState } from "react";
import { Accordion, Spinner } from "react-bootstrap";
import Task from "./Task";

const Category = (props) =>{
    const [active, setActive] = useState([])
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    useEffect(()=>{
        delete props.data['allTasks'];
        let tempData = [];
        let i = 0;
        let tempArr = []
        Object.keys(props.data).forEach((el =>{
            if(Object.keys(props.data[el]).length !==0){
                tempData.push(el)
                tempArr.push(i.toString());
                i++
            }
        }))
        setData(tempData)
        setActive(tempArr)
        setLoading(false)
    }, [])
    
    if(loading){
        return <div className="d-flex justify-content-center w-100" style={{marginTop: window.innerHeight/3}}><Spinner animation="grow" style={{width: "10rem", height: "10rem"}} /></div>
    }
    console.log(data)
    return(
        <Accordion defaultActiveKey={active} className="w-100" alwaysOpen flush>
            {(data).map((category, index, arr)=>{
                console.log(category)
                return <Accordion.Item key={index} eventKey={index.toString()} className="w-100">
                            <Accordion.Header>{ category === "any" ? "Задачи без категории" : category}</Accordion.Header>
                            <Accordion.Body>
                            {Object.keys(props.data[category]).map((task, index) => {
                                    return <Task key={index} task={task} category={category} done={props.data[category][task]} />
                                })}
                            </Accordion.Body>
                        </Accordion.Item>
            })}
        </Accordion>
    )
}

export default Category;