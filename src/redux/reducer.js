import ACTIONS from "./actions";
import {act} from "react-dom/test-utils";

const evaluate = state => {
    let {lastoperand,currentoperand,operation} = state;
    let last = parseFloat(lastoperand);
    let current = parseFloat(currentoperand);

    let res = "";
    switch(operation){
        case '+':
            res = last + current;
            break;
        case '-':
            res = last - current;
            break;
        case '×':
            res = last * current;
            break;
        case '÷':
            res = last / current;
            break;
    }

    return res.toString();
}



const reducer = (state= {
    currentoperand:"",
    lastoperand:"",
    operation:"",
    overwrite:false,
},action) => {
    switch(action.type){
        case ACTIONS.ADD_DIGIT:
            if(state.overwrite){
                return {
                    ...state,
                    currentoperand :action.digit,
                    overwrite:false,
                } 
            }
            if(state.currentoperand === '0' && action.digit === '0')     //特判多个0的情况
                return state;
            if(state.currentoperand === '0' && action.digit !== '.'){    //特判首位为0的情况
                return {
                    ...state,
                    currentoperand:action.digit,
                }
            }                                                            // 特判只能加一个小数点
            if(action.digit === '.' && state.currentoperand.includes('.'))
                 return state;
            if(action.digit === '.' && state.currentoperand === ''){     //特判首位为小数点的情况
                return {
                    ...state,
                    currentoperand:"0.",
                }
            }
            return {
                ...state,   
                currentoperand:state.currentoperand + action.digit,
            }  
        case ACTIONS.DELETE_DIGIT:
            if(state.overwrite){
                return  {
                    ...state,
                    currentoperand:"",
                    overwrite:false,
                }
            }
            if(state.currentoperand === '') 
                return state;
            return {
                ...state,
                currentoperand:state.currentoperand.slice(0,-1),
            }
            case ACTIONS.CHOOST_OPERATION:
                if(state.lastoperand === "" && state.currentoperand === "") 
                return state;
            if(state.lastoperand === "")
                return {
                    ...state,
                    lastoperand:state.currentoperand,
                    operation:action.operation,
                    currentoperand:"",
                }
            if(state.currentoperand === ""){
                return {
                    ...state,
                    operation:action.operation,
                }
            }
            return {
                ...state,
                lastoperand:evaluate(state),
                operation:action.operation,
                currentoperand:"",
            }
        case ACTIONS.CLEAR:
            return {
                ...state,
                currentoperand:"",  
                lastoperand:"",
                operation:"",
            }
        case ACTIONS.EVALUATE:
            if(state.currentoperand === "" || 
               state.lastoperand === ""|| 
               state.operation === "")
               return state;
            return {
                ...state,
                currentoperand:evaluate(state),
                lastoperand:"",
                operation:"",
                overwrite:true,
            }
        default:
            return state;
    }
};


export default reducer;