//redux--a predictable state container for javascript apps
//redux-->state-action-reducer

const { createStore, combineReducers,applyMiddleware } = require("redux")
const logger=require('redux-logger').default
const BUY_LAPTOP="BUY_LAPTOP";
const BUY_MOBILE="BUY_MOBILE";
//initialise state
const initialState={
    numOfLaptops:100
}
const initialMobile={
    numOfMobiles:1000
}


//action
const buyLaptop=()=>
{
    return{
        type:"BUY_LAPTOP"
    }
}

const buyMobile=()=>
{
    return{
        type:"BUY_MOBILE"
    }
}

//reducer and passing action based on action perform state
const laptopReducer=(state=initialState,action)=>
{
//     if(action.type==="BUY_LAPTOP")
//     {
//         return {numOfLaptops: state.numOfLaptops-1}
//     }else{
//         return state;
//     }
// }
switch(action.type)
{
    case "BUY_LAPTOP":
        return {numOfLaptops:state.numOfLaptops-1}
    default:
        return state;
}
}


const mobileReducer=(state=initialMobile,action)=>
{
switch(action.type)
{
    case "BUY_MOBILE":
        return {numOfMobiles:state.numOfMobiles-1}
    default:
        return state;
}
}

//creating store and subscribe to store and dispatching action
const rootReducer=combineReducers({laptopReducer,mobileReducer})
const store=createStore(rootReducer,applyMiddleware(logger));
// console.log(store);
//redux logger is a middleware 
store.subscribe(()=>{console.log(store.getState())});
store.dispatch(buyLaptop());
store.dispatch(buyMobile());
