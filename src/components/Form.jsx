import { useState } from "react";
import { HandleError } from "./HandleError";
import { Succesfull } from "./Succesfull";

export const Form = ({ country }) => {
  const [name, setName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [error, setError] = useState(false);
  const [send, setSend] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //  check the fields
    if ([name, selectedCountry].includes("")) {
      setError(true);
      return;
    }

    const userData = {
      name,
      country: selectedCountry,
    };

    console.log(userData);

    let url = "http://127.0.0.1:3000/api/users";
    let params = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    };

    let req = new Request(url, params);

    fetch(req).then(function (res) {
      if (res.ok) {
        console.log("Success");
        return res.json();
      } else {
        throw new Error("Error: " + res.status);
      }
    });

    //POST
    //  await fetch("http://127.0.0.1:3000/api/users", {
    //     method: "POST",
    //     headers: {
    //       accept: "application/json",
    //     },
    //     body: JSON.stringify(userData),
    //   }).then(function (response) {
    //     if (response.ok) {
    //       console.log("Solicitud exitosa");
    //       return response.json();
    //     } else {
    //       throw new Error(
    //         "Error en la solicitud. Código de estado: " + response.status
    //       );
    //     }
    //   });

    //  reset form
    setName("");
    setSelectedCountry("");
    setError(false);
    setSend(true);
  };

  const handleBack = () => {
    setSend(false);
  };

  return (
    <>
      {send ? (
        <Succesfull handleBack={handleBack} />
      ) : (
        <div className='max-w-md mx-auto bg-gray-400 p-8 border rounded-md shadow-md'>
          {error && <HandleError>All the fields are required*</HandleError>}
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='name' className='block font-medium mb-2'>
                Full Name:
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={handleNameChange}
                className='w-full px-2 py-1 border rounded-md'
                placeholder='write your full name'
              />
            </div>
            <div>
              <label htmlFor='country' className='block font-medium mb-2'>
                Country:
              </label>
              <select
                id='country'
                value={selectedCountry}
                onChange={handleCountryChange}
                className='w-full px-1 py-1 border rounded-md'
              >
                <option value=''>Choose Country</option>
                {country.map((element) => (
                  <option key={element.official} value={element.common}>
                    {element.common}
                  </option>
                ))}
              </select>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white py-1 px-2 rounded-md mt-5 hover:bg-blue-600 transition-colors duration-300 uppercase'
            >
              send
            </button>
          </form>
        </div>
      )}
    </>
  );
};
