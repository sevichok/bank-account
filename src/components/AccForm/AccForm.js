import React from 'react'
import styled from 'styled-components'
import AccItem from '../AccItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons'

const AccFormWrapper = styled('div')`
display:flex;
justify-content:center;
flex-wrap:wrap;
gap:5px;
background:#6196ea;
padding:40px 10px;
border:2px solid white;

 .buttonArea {
    display:flex;
    flex-direction:column;
    justify-content:center;
    background:#f8cc3a;
    padding:5px 10px;
    cursor:pointer;
    border:4px solid white;
    border-radius:5px; 

    > h5 {
    color:white;
    padding-top:4px;
    }
}
`;

function AccForm({ list, onCreate, handleDelete, handleTransfer, handleEdit }) {

    const listItems = list.map((item) => <AccItem key={item.id} list={list} handleTransfer={handleTransfer} handleEdit={handleEdit}
        id={item.id} balance={item.balance} name={item.name} handleDelete={handleDelete} />)

    return (<>
        <AccFormWrapper>
            {listItems}
            {(list.length < 8) && <div className='buttonArea' onClick={onCreate}>
                <FontAwesomeIcon icon={faFileCirclePlus} size="4x" color='white' />
                <h5>Add new</h5>
            </div>
            }
        </AccFormWrapper>
    </>
    )
}

export default AccForm