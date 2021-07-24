import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  LOAD_FLEETS,
  LOAD_DRIVERS,
  GET_SUPPLIER,
  LOAD_VEHICLES,
} from "../gql/Queries";
import { ADD_VEHICLE } from "../gql/Mutations";

const AddVehicle = (props) => {
  const [fleets, setFleets] = useState();
  const [drivers, setDrivers] = useState();
  const [name, setName] = useState();
  const [fleetId, setFleetId] = useState();
  const [driverId, setDriverId] = useState();
  const [capacity, setCapacity] = useState();
  const [price, setPrice] = useState();
  const [available, setAvailable] = useState(true);
  const { loading: loadingF, data: dataF } = useQuery(LOAD_FLEETS);
  // const { loading: loadingD, data: dataD } = useQuery(LOAD_DRIVERS);
  const [addVehicle] = useMutation(ADD_VEHICLE);

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicle({
      variables: {
        name: name,
        capacity: capacity,
        price: price,
        driverId: "60fbe7479d556d2908d43807",
        fleetId: fleetId,
        available: available,
      },
      refetchQueries: [
        { query: GET_SUPPLIER, variables: { id: props.supplierId } },
        { query: LOAD_VEHICLES },
      ],
    });
  };

  useEffect(() => {
    if (dataF !== undefined) {
      console.log(dataF);
      setFleets(dataF.fleets);
    }

    // if (dataD !== undefined) {
    //   console.log(dataD);
    //   setDrivers(dataD.drivers);
    // }
  }, [dataF]);
  return (
    <div>
      <h3>Add Vehicle</h3>
      {(loadingF && <p>Loading...</p>) || (
        <form id="add-fleet" onSubmit={handleSubmit}>
          <div className="field">
            <label>Vehicle Name:</label>
            <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="field">
            <label>Capacity:</label>
            <input
              type="text"
              value={capacity || ""}
              onChange={(e) => setCapacity(e.target.value)}
            ></input>
          </div>

          <div className="field">
            <label>Price (in Rs):</label>
            <input
              type="text"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>

          <div className="field">
            <label>Fleet Owner:</label>
            <select
              onChange={(e) => {
                setFleetId(e.target.value);
              }}
            >
              <option>Select Fleet</option>
              {fleets !== undefined &&
                fleets.map((fleet, idx) => (
                  <option key={idx} value={fleet.id}>
                    {fleet.name}
                  </option>
                ))}
            </select>
          </div>

          {/* <div className="field">
            <label>Driver:</label>
            <select
              onChange={(e) => {
                setDriverId(e.target.value);
              }}
            >
              <option>Select Driver</option>
              {drivers !== undefined &&
                drivers.map((driver, idx) => (
                  <option key={idx} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
            </select>
          </div> */}

          <div className="field">
            <label>Available:</label>
            <select
              onChange={(e) => {
                setAvailable(e.target.value);
              }}
            >
              <option>Availability</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>

          <button type="submit">Add Vehicle</button>
        </form>
      )}
    </div>
  );
};

export default AddVehicle;
