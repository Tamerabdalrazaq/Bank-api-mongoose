import React from 'react'
import axios from 'axios'

function UserComponent(user) {
    function deleteUser(id){

    }
    return(
        <div className="user">
            <h3 className="id">{user.id}</h3>
            <h3 className="cash">{user.cash}</h3>
            <h3 className="credit">{user.credit}</h3>
            <h3 className="isActive">{user.isActive}</h3>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
    )
}