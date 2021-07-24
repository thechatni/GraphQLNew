import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_SUPPLIERS, GET_SUPPLIER, LOAD_FLEETS } from "../gql/Queries";
import { UPDATE_FLEET } from "../gql/Mutations";

const UpdateFleet = () => {
  const { loading, data } = useQuery(LOAD_SUPPLIERS);
  const { data: dataF } = useQuery(LOAD_FLEETS);
  const [fleets, setFleets] = useState();
  const [suppliers, setSuppliers] = useState();
  const [name, setName] = useState();
  const [supplierId, setSupplierId] = useState();
  const [fleetId, setFleetId] = useState();

  const [updateFleet] = useMutation(UPDATE_FLEET);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFleet({
      variables: {
        id: fleetId,
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
    if (dataF !== undefined) {
      setFleets(dataF.fleets);
      console.log(dataF.fleets);
    }
  }, [data, dataF]);
  return (
    <div>
      <h3>Update Fleet Owner</h3>
      {(loading && <p>Loading...</p>) || (
        <form id="update-fleet" onSubmit={handleSubmit}>
          <div className="field">
            <label>Fleet: </label>
            <select
              onChange={(e) => {
                setFleetId(e.target.value);
              }}
            >
              <option>Select Fleet Owner</option>
              {fleets !== undefined &&
                fleets.map((fleet, idx) => (
                  <option key={idx} value={fleet.id}>
                    {fleet.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="field">
            <label>New Fleet Owner Name: </label>
            <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="field">
            <label>Supplier: </label>
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

          <button type="submit">Update Fleet Owner</button>
        </form>
      )}
    </div>
  );
};

export default UpdateFleet;
