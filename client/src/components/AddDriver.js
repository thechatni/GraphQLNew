import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOAD_DRIVERS } from "../gql/Queries";
import { ADD_DRIVER } from "../gql/Mutations";

const AddDriver = () => {
  const [name, setName] = useState();
  const [available, setAvailable] = useState(true);

  const [addDriver] = useMutation(ADD_DRIVER);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDriver({
      variables: {
        name: name,
        available: available,
      },
      refetchQueries: [{ query: LOAD_DRIVERS }],
    });
  };

  return (
    <div>
      <h3>Add Driver</h3>
      <form id="add-supplier" onSubmit={handleSubmit}>
        <div className="field">
          <label>Driver name:</label>
          <input
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="field">
          <label>Available:</label>
          <select
            onChange={(e) => {
              setAvailable(e.target.value);
            }}
            required
          >
            <option>Availability</option>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <button type="submit">Add Driver</button>
      </form>
    </div>
  );
};

export default AddDriver;
