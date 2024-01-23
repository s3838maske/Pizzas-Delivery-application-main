
import axios from "axios";

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: 'GET_PIZZAS_REQUEST' });

  try {
    const response = await axios.get('/api/pizzas/getallpizzas');
    console.log("Response:", response);
    dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: response.data });
  } catch (error) {
    // Create a serializable representation of the error
    const errorPayload = {
      message: error.message,
      name: error.name,
      response: error.response ? { status: error.response.status, data: error.response.data } : null,
    };

    dispatch({ type: 'GET_PIZZAS_FAILED', payload: errorPayload });
  }
};
