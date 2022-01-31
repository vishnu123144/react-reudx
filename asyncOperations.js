const { createStore, applyMiddleware } = require("redux")

const thunk=require('redux-thunk').default;
const axios=require('axios');
const FETCH_USERS_REQUEST="FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS="FETCH_USERS_SUCCESS";
const FETCH_USERS_FAIL="FETCH_USERS_FAIL";
//initialise state
const initialState={
    users:[],
    error:'',
    isLoading:false
}
//action
const fetchUserRequest=()=>
{
    return{
        type:FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess=(users)=>
{
    return{
        type:FETCH_USERS_SUCCESS,
        data:users
    }
}

const fetchUsersFail=(error)=>
{
    return{
        type:FETCH_USERS_FAIL,
        data: error
    }
}
//reducer
const usersReducer=(state=initialState,action)=>
{
switch(action.type)
{
    case FETCH_USERS_REQUEST:
        return {...state,isLoading:true}
    case FETCH_USERS_SUCCESS:
        return {isLoading:false,users:action.data,error:''}
    case FETCH_USERS_FAIL:
        return {isLoading:false,users:[],error:action.data}   
    default:
        return state;
}
}

const fetchUsers=()=>
{
    return function(dispatch)
    {
        dispatch(fetchUserRequest());
        axios.get('http://jsonplaceholder.typicode.com/users')
                .then(response=>{
                    let users=response.data.map(user=>user.name);
                    dispatch(fetchUserSuccess(users))
                })
                .catch(error=>
                    {
                        dispatch(fetchUsersFail(error))
                    })
    }
}

//creating store 
//thunk is used for supporting async functions
const store=createStore(usersReducer,applyMiddleware(thunk));
store.subscribe(()=>{console.log(store.getState())});
store.dispatch(fetchUsers());