import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoiceDollar, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

const AccItemWrapper = styled('div')`
background:#3cb3b9;//#f38181, #ff7575,* #3cb3b9, #6196ea, #ea6161
padding:5px 10px;
max-width:1200px;
border:4px solid white;
border-radius:5px;

 > h6,h5 {
    color:white;
    margin:0px;
    }
 > .icons {
    padding:5px 10px 0px;
    display:flex;
    gap:10px;
    justify-content:space-around;
    }
`;

let transfersLocalStorage = JSON.parse(localStorage.getItem("transfers") || "[]");

function AccItem({ id, name, balance, handleDelete, handleTransfer, handleEdit }) {

    const [modal, setModal] = useState(false);
    const [startId, setStartID] = useState('');
    const [endId, setEndID] = useState('');
    const [startName, setStartName] = useState('');
    const [endName, setEndName] = useState('');

    const [amount, setAmount] = useState(0);
    const [transfers, setTransfers] = useState(transfersLocalStorage)

    const [editModal, setEditModal] = useState(false);
    const [value, setValue] = useState(name);

    let transferDialog = `Transfer from: ${startName} #${startId}
    Transfer to: ${endName} #${endId}.`;
    let editDialog = `So, let's edit name of this bank account!`;

    useEffect(() => {
        setTransfers(transfers)
        localStorage.setItem("transfers", JSON.stringify(transfers));
    }, [transfers]);

    const dragStart = (e) => {
        e.dataTransfer.effectAllowed = "move";
        let dragId = e.currentTarget.getAttribute('id')
        e.dataTransfer.setData("startID", dragId)
        let dragName = e.currentTarget.getAttribute('name')
        e.dataTransfer.setData("startName", dragName)
        console.log("start", dragId)
    }

    const drop = (e) => {
        let dropId = e.currentTarget.getAttribute('id')
        e.dataTransfer.setData("dropID", dropId)
        let dropName = e.currentTarget.getAttribute('name')
        e.dataTransfer.setData("dropName", dropName)
        let dragId = e.dataTransfer.getData('startID')
        let dragName = e.dataTransfer.getData('startName')
        console.log("drop", dropId)
        setStartName(dragName)
        setEndName(dropName)
        setStartID(dragId)
        setEndID(dropId)
        setModal(true)
    }

    const transfer = () => {
        handleTransfer(startId, endId, amount)
        setModal(false)
        setAmount(0)
        transfers.push({ fromID: startId, toID: endId, fromName: startName, toName: endName, amount: amount });
        localStorage.setItem("transfers", JSON.stringify(transfers))
    }

    const change = (e) => {
        setAmount(e.target.value)
    }

    const close = () => {
        setModal(false)
        setAmount(0)
    }

    const hideEdit = () => {
        setEditModal(false)
    }

    const changeName = (e) => {
        setValue(e.target.value)
    }

    const edit = () => {
        handleEdit(id, value)
        setEditModal(false)
    }

    return (<>
        <AccItemWrapper draggable id={id} name={name} balance={balance}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDrop={drop}>
            <FontAwesomeIcon icon={faFileInvoiceDollar} size="4x" color='white' />
            <h5>{name}</h5>
            <h6>{balance} $</h6>
            <div className='icons'>
                <FontAwesomeIcon icon={faPenToSquare} color='white' onClick={() => setEditModal(true)} />
                <FontAwesomeIcon icon={faTrashCan} color='white' onClick={() => handleDelete(id)} />
            </div>
        </AccItemWrapper>
        {modal &&
            <Modal
                textContent={transferDialog}
                changeValue={amount}
                handleChange={change}
                placeholder={"Transfer amount"}
                handleClose={close}
                handleSubmit={transfer} />}
        {editModal &&
            <Modal
                textContent={editDialog}
                changeValue={value}
                handleChange={changeName}
                placeholder={"New name"}
                handleClose={hideEdit}
                handleSubmit={edit} />}
    </>
    )
}

export default AccItem