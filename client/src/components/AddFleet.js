import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_SUPPLIERS, GET_SUPPLIER, LOAD_FLEETS } from "../gql/Queries";
import { ADD_FLEET } from "../gql/Mutations";

const AddFleet = () => {
  const { loading, data } = useQuery(LOAD_SUPPLIERS);
  const [suppliers, setSuppliers] = useState();
  const [name, setName] = useState();
  const [supplierId, setSupplierId] = useState();

  const [addFleet] = useMutation(ADD_FLEET);

  const handleSubmit = (e) => {
    e.preventDefault();
    addFleet({
      variables: {
        name: name,
        supplierId: supplierId,
      },
      refetchQueries: [
        { query: GET_SUPPLIER, variables: { id: supplierId } },
        { query: LOAD_FLEETS },
      ],
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setSuppliers(data.suppliers);
    }
  }, [data]);
  return (
    <div>
      <h3>Add Fleet Owner</h3>
      {(loading && <p>Loading...</p>) || (
        <form id="add-f" onSubmit={handleSubmit}>
          <div className="field">
            <label>Fleet Owner Name:</label>
            <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="field">
            <label>Supplier:</label>
            <select
              onChange={(e) => {
                setSupplierId(e.target.value);
              }}
            >
              <option>Select Supplier</option>
              {suppliers !== undefined &&
                suppliers.map((supplier, idx) => (
                  <option key={idx} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit">Add Fleet Owner</button>
        </form>
      )}
    </div>
  );
};

export default AddFleet;
