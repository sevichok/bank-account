import React, { useState } from "react";
import { useEffect } from "react";
import AccForm from "./components/AccForm"
import MainForm from "./components/MainForm"
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './App.css';

const Trasher = styled('div')`
background:red;
padding:15px 20px 10px;
color:white ;
border-top:2px solid white;
position: fixed;
width:100%;
left: 0;
bottom: 0;
/* height:150px; */
h2 {
  margin:0px;
}
`;

let initialList = [
  { id: Math.floor(Math.random() * 10000), name: "KfW ", balance: 100 },
  { id: Math.floor(Math.random() * 10000), name: "Zürcher", balance: 100 },
  { id: Math.floor(Math.random() * 10000), name: "DBS ", balance: 100 }
];

let listLocalStorage = JSON.parse(localStorage.getItem("list"))

const App = () => {
  const [list, setList] = useState(listLocalStorage || initialList)


  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  const handleDelete = (id) => {
    const deletedIndex = list.findIndex(
      (item) => item.id === id
    );
    if (deletedIndex < 0) { return list }
    list.splice(deletedIndex, 1)
    setList([...list]);
  }

  const handleCreate = () => {
    setList(list.concat({ id: Math.floor(Math.random() * 10000), name: "Bank Acc", balance: 100 }))
  }

  const handleEdit = (id, name) => {
    setList(list.map((item) => item.id === id ? { ...item, name } : item))
  };

  const handleTransfer = (id1, id2, sum) => {
    list.forEach((item) => {
      return item.id === Number(id1) ? item.balance -= Number(sum) : item.balance;
    })
    list.forEach((item) => {
      return item.id === Number(id2) ? item.balance += Number(sum) : item.balance;
    })
    setList([...list])
    console.log(list)
  }

  const deleting = (e) => {
    let elemId = e.dataTransfer.getData('startID')
    console.log(elemId)
    let trashID = Number(elemId)
    handleDelete(trashID)
  }

  let data = JSON.parse(localStorage.getItem("transfers"))

  return (
    <div className='App'>
      <AccForm list={list} handleDelete={handleDelete} onCreate={handleCreate}
        handleTransfer={handleTransfer} handleEdit={handleEdit} />
      <MainForm data={data} />
      <Trasher draggable onDrop={deleting} onDragOver={(e) => e.preventDefault()}>
        <FontAwesomeIcon icon={faTrashCan} size="4x" color='white' />
        <h2>Trasher</h2>
      </Trasher>
    </div>
  );
}

export default App;