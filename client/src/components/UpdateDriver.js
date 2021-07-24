import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { LOAD_DRIVERS } from "../gql/Queries";
import { UPDATE_DRIVER } from "../gql/Mutations";

const UpdateDriver = () => {
  const [driverId, setDriverId] = useState();
  const [drivers, setDrivers] = useState();
  const { data } = useQuery(LOAD_DRIVERS);
  const [name, setName] = useState();
  const [available, setAvailable] = useState(true);

  const [updateDriver] = useMutation(UPDATE_DRIVER);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDriver({
      variables: {
        id: driverId,
        name: name,
        available: available,
      },
      refetchQueries: [{ query: LOAD_DRIVERS }],
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setDrivers(data.drivers);
    }
  }, [data]);

  return (
    <div>
      <h3>Update Driver</h3>
      <form id="update-driver" onSubmit={handleSubmit}>
        <div className="field">
          <label>Driver: </label>
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
        </div>
        <div className="field">
          <label>Driver name: </label>
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
          >
            <option>Availability</option>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <button type="submit">Update Driver</button>
      </form>
    </div>
  );
};

export default UpdateDriver;
