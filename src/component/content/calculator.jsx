import React, { Component } from 'react';
import Base from './base';
import { connect } from 'react-redux';
import DigitButton from './calconponent/digitButton';
import ACTIONS from './../../redux/actions';
import OperationButton from './calconponent/operationButton';

class Calculator extends Component {
    state = { 
        formater:Intl.NumberFormat('en-us')  
    };
    render() { 
        return (
            <Base>
                <div className='calculator'>
                    <div className="output">
                        <div className="last-outupt">
                            {this.state.formater.format(this.props.lastoperand)} {this.props.operation}
                        </div>
                        <div className="current-output">
                            {this.state.formater.format(this.props.currentoperand)}
                        </div>
                    </div>    
                    <button onClick={this.props.clear} className='button-ac'>AC</button>
                    <button onClick={this.props.delete_digit}>Del</button>
                    <OperationButton operation={"÷"}/>
                    <DigitButton digit={"7"}/>
                    <DigitButton digit={"8"}/>
                    <DigitButton digit={"9"}/>
                    <OperationButton operation={"×"}/>
                    <DigitButton digit={"4"}/> 
                    <DigitButton digit={"5"}/> 
                    <DigitButton digit={"6"}/>
                    <OperationButton operation={"-"}/>
                    <DigitButton digit={"1"}/> 
                    <DigitButton digit={"2"}/> 
                    <DigitButton digit={"3"}/>
                    <OperationButton operation={"+"}/>
                    <DigitButton digit={"0"} />
                    <DigitButton digit={"."}/>
                    <button onClick={this.props.evaluate}  className='button-equal'>=</button>
                </div>               
            </Base>
        );
    }
} 

const mapStateToProps = (state,props) => {
    return {
        currentoperand: state.currentoperand,
        lastoperand:state.lastoperand,
        operation:state.operation,
    }
}

const mapDispatchToProps = {
    delete_digit:() => {
        return {
            type:ACTIONS.DELETE_DIGIT,
        }
    },

    clear:() =>{
        return {
            type:ACTIONS.CLEAR,  
        }
    },
    evaluate:() => {
        return {
            type:ACTIONS.EVALUATE,
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Calculator);