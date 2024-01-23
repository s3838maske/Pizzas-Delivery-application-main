export const getAllPizzasReducer = (state = { pizzas: []}, action) => {


  switch (action.type) {
    case 'GET_PIZZAS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null, // Reset error on request
      };

    case 'GET_PIZZAS_SUCCESS':
      return {
        pizzas: action.payload,
        loading: false,
      };

    case 'GET_PIZZAS_FAILED':
      return {
        pizzas: [],
        error: action.payload,
        loading: false,
      };
      

    default:
      return state;
      
  }

  };
