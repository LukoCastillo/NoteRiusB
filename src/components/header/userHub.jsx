import React from 'react';
import  './header.css';


export default class UserHub extends React.Component {

    handleOnclick = () =>{
        this.props.onSync();
    };

    render(){
        const {imageUrl} = this.props;
        return(<div>
            <img src={imageUrl} 
            alt=""  
            className="userImg"
            onClick={this.handleOnclick}
            />
        </div>);
    }
};