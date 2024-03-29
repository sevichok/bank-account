import React from 'react'
import styled from 'styled-components'

const MainContainer = styled('div')`
background-color:#6196ea ;
color: white ;
padding:20px 200px;
 > h3 {
    margin:0;
    padding:0px 0px 20px ;
    }
 > .list {
    background: #3cb3b9;
    padding:20px 20px;
    border:4px solid white;
    border-radius:5px ;
    list-style: disc;
 }
`;

function MainForm({ data }) {

    return (<>
        <MainContainer>
            <h3>Transfers history:</h3>
            {data && <div className='list'>
                {data?.map((item) => {
                    return <li key={item.toID * item.toID}>
                        From: {item.fromName} Bank ; to: {item.toName} Bank ; amount: {item.amount}$ .</li>
                })}
            </div>}
        </MainContainer>
    </>
    )
}

export default MainForm