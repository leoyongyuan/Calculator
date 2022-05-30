import ACTIONS from "./actions";


const fun = (state ={
    current:"",
    last:"",
    opear:"",
},action) => {
    switch(action.type)
    {
        case ACTIONS.ADD_DIGIT:
            return {
                ...state,
                current: state.current + action.digit,
            }
        case ACTIONS.DELETE_DIGIT:
            return {
                ...state,
                current: state.current.slice(0,-1),
            }
        case ACTIONS.CLEAR:
            return {
                ...state,
                current:"",
            }
        case ACTIONS.CHOOST_OPERATION:
            return {
                ...state,
                current: "",
                last:evaluate(state),
                opear:action.operation,
            }
        case ACTIONS.EVALUATE:
            return {
                ...state,
                current:evaluate(state),
                last:"",
                opear:"",
            }
    }
}