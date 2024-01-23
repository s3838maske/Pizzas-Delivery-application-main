import React, { useState, useEffect } from "react";
import Pizza from "../components/pizza";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/pizzas/getallpizzas');
      // console.log("Response:", response);

      setPizzas(response.data);
      console.log(response.data)
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
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <div className="row justify-content-center">
     
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Something went wrong: {error}</h1>
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
