import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';

const ModalContainer = styled('div')`
    position:absolute;
    top: 200px;
    left:max-width/2 - 100px;
    width:200px;
    height:160px;
    background:#ea6161;
    border:4px solid white;
    color:white;
    border-radius:5px;
    padding:0 15px;
    > .btns {
        padding-top:10px;
        display:flex;
        justify-content:center;
        gap:5px;
    }
`;

function Modal({ handleClose, handleChange, handleSubmit, changeValue, placeholder, textContent,error }) {

    return (<ModalContainer>
        <h5>{textContent}</h5>
        <input value={changeValue} onChange={handleChange} placeholder={placeholder}></input>
        <div className='btns'>
            <Button type="button" outlook="decline" onClick={handleClose} text={"Close"} />
            <Button type="button" outlook="accept" onClick={handleSubmit} text={"Submit"} />
        </div>

    </ModalContainer>
    )
}

export default Modal