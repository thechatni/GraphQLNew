import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_SUPPLIERS } from "../gql/Queries";
import { DELETE_SUPPLIER } from "../gql/Mutations";

const DeleteSupplier = () => {
  const { data } = useQuery(LOAD_SUPPLIERS);
  const [suppliers, setSuppliers] = useState();
  const [supplierId, setSupplierId] = useState();
  // const [flag, setFlag] = useState(false);

  const [deleteSupplier] = useMutation(DELETE_SUPPLIER);

  useEffect(() => {
    if (data !== undefined) {
      setSuppliers(data.suppliers);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteSupplier({
      variables: {
        id: supplierId,
      },
      refetchQueries: [{ query: LOAD_SUPPLIERS }],
    });
    // setFlag(false);
  };

  return (
    <div>
      <h3>Delete Supplier</h3>
      {suppliers !== undefined && (
        <div>
          <form id="del-supplier" onSubmit={handleSubmit}>
            <div className="field">
              <label>Supplier: </label>
              <select
                required
                onChange={(e) => {
                  setSupplierId(e.target.value);
                }}
              >
                <option>Select Supplier</option>
                {suppliers.map((supplier, idx) => (
                  <option key={idx} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Delete Supplier</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteSupplier;
