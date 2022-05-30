import React, { Component } from 'react';

class Base extends Component {
    state = {  } 
    render() { 
        return (
            <div className='card' style={{marginTop:"10px"}}>
                <div className='card-body' style={{fontSize:"18px"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
 
export default Base;