import React from 'react'
import classNames from 'classnames'
import "./ButtonStyle.css";

function Button({ onClick, type, outlook, text, errorStatus }) {
    return (<button
        disabled={errorStatus}
        onClick={onClick}
        type={type}
        className={classNames("button", outlook)}>{text}
    </button>)
}

export default Button