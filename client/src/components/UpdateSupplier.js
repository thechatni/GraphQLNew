import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_SUPPLIERS } from "../gql/Queries";
import { UPDATE_SUPPLIER } from "../gql/Mutations";

const UpdateSupplier = () => {
  const { data } = useQuery(LOAD_SUPPLIERS);
  const [suppliers, setSuppliers] = useState();
  const [supplierId, setSupplierId] = useState();
  const [name, setName] = useState();
  const [updateSupplier] = useMutation(UPDATE_SUPPLIER);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSupplier({
      variables: {
        id: supplierId,
        name: name,
      },
      refetchQueries: [{ query: LOAD_SUPPLIERS }],
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setSuppliers(data.suppliers);
    }
  }, [data]);

  return (
    <div>
      <h3>Update Supplier</h3>
      <form id="add-s" onSubmit={handleSubmit}>
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
        <div className="field">
          <label>New Supplier Name:</label>
          <input
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <button type="submit">Update Supplier</button>
      </form>
    </div>
  );
};

export default UpdateSupplier;
