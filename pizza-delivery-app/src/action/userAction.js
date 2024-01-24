import axios from 'axios';


export const registerUser=(user)=> async dispatch=>{
    dispatch({ type: 'USER_REGISTER_REQUEST'})
    try {
        const response = await axios.post('/api/users/register' , user)
        console.log(response);
        dispatch({ type: 'USER_REGISTER_SUCCESS',payload: response.data})
    }catch(error){
        const errorPayload = {
            message: error.message,
            name: error.name,
            response: error.response ? { status: error.response.status, data: error.response.data } : null,
          };
        dispatch({ type: 'USER_REGISTER_FAILED' , payload : errorPayload})
    }
}

export const LoginUser=(user)=> async dispatch=>{
    dispatch({ type: 'USER_LOGIN_REQUEST'})



    try {
        const response = await axios.post('/api/users/login' , user)
        console.log(response);
        dispatch({ type: 'USER_LOGIN_SUCCESS',payload: response.data})
        localStorage.setItem('currentUser' , JSON.stringify(response.data))
        window.location.href="/"
    }catch(error){
        const errorPayload = {
            message: error.message,
            name: error.name,
            response: error.response ? { status: error.response.status, data: error.response.data } : null,
          };
        dispatch({ type: 'USER_LOGIN_FAILED' , payload : errorPayload})
    }
}

export const logoutUser=()=>dispatch=>{



    localStorage.removeItem('currentUser')
    window.location.href='/login'
}