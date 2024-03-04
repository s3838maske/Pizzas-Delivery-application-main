import React, { useState, useEffect } from "react";
import Pizza from "../components/pizza";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/pizzas/getallpizzas');
      // console.log("Response:", response);

      setPizzas(response.data);
     
      setError(null);
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
  fetchData()
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <div className="row justify-content-center">
     
        {loading ? (
          <Loading/>
        ) : error ? (
          <Error error='Something went wrong'/>
          ) : (
          // Add an additional check for 'pizzas' before mapping
          Array.isArray(pizzas) ? (
            pizzas.map((pizza) => (
              
              <div className="col-md-3 m-3" key={pizza._id}>
                <div>
                  <Pizza pizza={pizza} />
                </div>
              </div>
              
            ))
          ) : (
            <h1>No pizzas available</h1>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
