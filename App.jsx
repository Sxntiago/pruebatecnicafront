import { useEffect, useState } from "react";
import { Form } from "./src/components/Form";
import Heading from "./src/components/Heading";

function App() {
  const [country, setCountry] = useState([]);

  // get countries by api
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json())
      .then((data) => {
        const countries = [];
        for (let i = 0; i < data.length; i++) {
          countries.push(data[i].name);
        }
        setCountry(countries);
      })

      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className='max-w-md mx-auto bg-gray-300 p-8 border rounded-md shadow-md sex mt-6'>
        <Heading />
        <Form country={country} />
      </div>
    </div>
  );
}

export default App;
