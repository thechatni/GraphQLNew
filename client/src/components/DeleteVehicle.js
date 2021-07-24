import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_VEHICLES, GET_SUPPLIER } from "../gql/Queries";
import { DELETE_VEHICLE } from "../gql/Mutations";

const DeleteVehicle = (props) => {
  const { data } = useQuery(LOAD_VEHICLES);
  const [vehicles, setVehicles] = useState();
  const [vehicleId, setVehicleId] = useState();
  const [deleteVehicle] = useMutation(DELETE_VEHICLE);

  useEffect(() => {
    if (data !== undefined) {
      setVehicles(data.vehicles);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteVehicle({
      variables: {
        id: vehicleId,
      },
      refetchQueries: [
        { query: GET_SUPPLIER, variables: { id: props.supplierId } },
        { query: LOAD_VEHICLES },
      ],
    });
  };

  return (
    <div>
      <h3>Delete Vehicle</h3>
      {vehicles !== undefined && (
        <div>
          <form id="del-vehicle" onSubmit={handleSubmit}>
            <div className="field">
              <label>Vehicle: </label>
              <select
                required
                onChange={(e) => {
                  setVehicleId(e.target.value);
                }}
              >
                <option>Select Vehicle</option>
                {vehicles.map((vehicle, idx) => (
                  <option key={idx} value={vehicle.id}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Delete Vehicle</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteVehicle;
