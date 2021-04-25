import React from 'react'
import axios from 'axios'
function UserComponent({user, update}) {
    async function deleteUser(id){
        await axios.delete('http://localhost:5000/api/users/'+id);
        update();
    }
    return(
        <div className="user">
            <h3 className="id">{user._id}</h3>
            <h3 className="cash">{user.cash}</h3>
            <h3 className="credit">{user.credit}</h3>
            <h3 className="isActive">{user.isActive}</h3>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
        </div>
    )
}

export default UserComponent;