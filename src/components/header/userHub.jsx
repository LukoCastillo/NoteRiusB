import React from 'react';

const UserHub = (props) => {
    const style = {
        borderRadius: '50%',
        width: '39px',
        marginLeft: '10px'
    }
    return (<div>
        <img src={props.imageUrl} alt="" style={style} />
    </div>);
};

export default UserHub;