import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';

const ModalContainer = styled('div')`
    position:absolute;
    top: 200px;
    left:max-width/2 - 100px;
    width:200px;
    background:#b6d874;
    border:4px solid white;
    color:white;
    border-radius:5px;
    padding:15px 15px;
    > .btns {
        padding-top:10px;
        display:flex;
        justify-content:center;
        gap:5px;
    }
    .err_msg {
        color:red ;
    }
`;

function Modal({ handleClose, handleChange, handleSubmit, changeValue, placeholder, textContent , errorStatus}) {


    return (<ModalContainer>
        <h5>{textContent}</h5>
        <input value={changeValue} onChange={handleChange} placeholder={placeholder}></input>
        {errorStatus && <h6 className='err_msg'>Invalid amount!</h6>}
        <div className='btns'>
            <Button type="button" outlook="decline" onClick={handleClose} text={"Close"} />
            <Button type="button" outlook="accept" onClick={handleSubmit} text={"Submit"} disabled={errorStatus} />
        </div>

    </ModalContainer>
    )
}

export default Modal