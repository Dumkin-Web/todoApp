const express = require('express'),
app = express(),
  fs = require('fs');

const { use } = require('express/lib/application');
let data = require('./data/data.json')
const PORT = 3006;

app.get("/reg", (req,res) =>{
    let id = Object.keys(data).map((item,index,arr)=>{
        item = +item
        console.log(typeof item)
        return +item;
    })
    id = Math.max(...id) + 1;
    data[id] = {"Дела":{},"allTasks":[]}
    fs.writeFileSync('./data/data.json', JSON.stringify(data));
    return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .json({"data":id});
})

app.get("/tasks", (req,res) =>{
    const id = req.query['id'];
    return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .json({"data": data[id]});
})

app.get("/tasks/change", (req,res) =>{
    const id = req.query['id'], cat = req.query['cat'], task = req.query['task'];
    data[id][cat][task] = !data[id][cat][task];
    fs.writeFileSync('./data/data.json', JSON.stringify(data));
    return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .sendStatus(200);
})

app.get("/tasks/edit", (req,res) =>{
    const id = req.query['id'], cat = req.query['cat'], task = req.query['task'], newCat = req.query['newCat'], newTask = req.query['newTask'];
    delete data[id][cat][task];
    data[id][newCat][newTask] = false;
    fs.writeFileSync('./data/data.json', JSON.stringify(data));
    return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .sendStatus(200);
})

app.get("/tasks/searching", (req,res) =>{
    let id = req.query['id'], task = req.query['task'];
    temp = {"allTasks":[]};
    let tempArr = [];

    function moderSearching(naming, subString){
        const container = String(naming).toLowerCase()
        const parts = String(subString).toLowerCase().split(' ');
        let result = 0;
        console.log('check')
        for(part of parts){
            console.log(part);
            console.log(container);
            if(container.indexOf(part) != -1){
                result++
            }
        }
        if(result >= parts.length/2)
        {
            console.log(true);
            return true
        }
        console.log(false);
        return false
    }
    //console.log(data[id])
    for(cat in data[id]){
        for(item in data[id][cat]){
            const tempItem = String(item);
            //if(tempItem.toLowerCase().indexOf(task.toString().toLowerCase()) != -1){
            if(moderSearching(item, task)){
                if(temp[cat] == null){
                    temp[cat] = {}
                }
                temp[cat][item] = data[id][cat][item]
                if(isNaN(item)) tempArr.push(item);
            }
        }
    }

    temp.allTasks = tempArr;

    return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .json({"data": JSON.stringify(temp)});
})

app.get("/tasks/delete", (req,res) =>{
    const id = req.query['id'], cat = req.query['cat'], task = req.query['task'];
    delete data[id][cat][task];
    let temp = []
    for(let i = 0; i < data[id].allTasks.length; i++){
        if(data[id].allTasks[i] != task){
            temp.push(data[id].allTasks[i])
        }
    }
    data[id].allTasks = temp;
    fs.writeFileSync('./data/data.json', JSON.stringify(data));
    return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .sendStatus(200);
})

app.get("/tasks/add", (req,res) =>{
    const id = req.query['id'], cat = req.query['cat'], task = req.query['task'];
    data[id][cat][task] = false;
    data[id].allTasks.push(task);
    fs.writeFileSync('./data/data.json', JSON.stringify(data));
    return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .sendStatus(200);
})

app.get("/category", (req,res) =>{
    const id = req.query['id'];
    const temp = data[id];
    return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .json({"data": Object.keys(temp)});
})

app.get("/category/add", (req,res) =>{
    const id = req.query['id'], cat = req.query['cat'];
    data[id][cat] = {};
    fs.writeFileSync('./data/data.json', JSON.stringify(data));
    return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .sendStatus(200);
})


app.listen(PORT, ()=>console.log(`Server ir running on http://localhost:${PORT}`))