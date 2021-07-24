import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOAD_SUPPLIERS } from "../gql/Queries";
import { ADD_SUPPLIER } from "../gql/Mutations";

const AddSupplier = () => {
  const [name, setName] = useState();

  const [addSupplier] = useMutation(ADD_SUPPLIER);

  const handleSubmit = (e) => {
    e.preventDefault();
    addSupplier({
      variables: {
        name: name,
      },
      refetchQueries: [{ query: LOAD_SUPPLIERS }],
    });
  };

  return (
    <div>
      <h3>Add Supplier</h3>
      <form id="add-supp" onSubmit={handleSubmit}>
        <div className="field">
          <label>Supplier name:</label>
          <input
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddSupplier;
