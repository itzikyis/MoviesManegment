import React from 'react'

function EditUserPageComp() {
    return (
        <div>
            <label className="input-label">First Name:</label><br />
            <input type='text' className="input" readOnly />
            <br />
            <label className="input-label">Last Name:</label><br />
            <input type='text' className="input" readOnly />
            <br />
            <label className="input-label">User name:</label><br />
            <input type='text' className="input" readOnly/>
            <br />
            <label className="input-label">Session time out(Minutes):</label><br />
            <input type='text' className="input" readOnly />
            <br />
            <label className="input-label">Created Date:</label><br />
            <input type='text' className="input" readOnly/>
            <br />
            <label className="input-label">Permissions:</label><br />
            <label>View Subscriptions<input type="checkbox" className="checkbox" readOnly/></label>
            <br />
            <input type='Button' className="button" value='Update' />
            <input type='Button' className="button" value='Cancel' />
        </div>
    )
}

export default EditUserPageComp
