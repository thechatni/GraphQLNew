import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_DRIVERS } from "../gql/Queries";
import { DELETE_DRIVER } from "../gql/Mutations";

const DeleteDriver = () => {
  const { data } = useQuery(LOAD_DRIVERS);
  const [drivers, setDrivers] = useState();
  const [driverId, setDriverId] = useState();
  const [deleteDriver] = useMutation(DELETE_DRIVER);

  useEffect(() => {
    if (data !== undefined) {
      setDrivers(data.drivers);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteDriver({
      variables: {
        id: driverId,
      },
      refetchQueries: [{ query: LOAD_DRIVERS }],
    });
  };

  return (
    <div>
      <h3>Delete Driver</h3>
      {drivers !== undefined && (
        <div>
          <form id="del-driver" onSubmit={handleSubmit}>
            <div className="field">
              <label>Driver: </label>
              <select
                required
                onChange={(e) => {
                  setDriverId(e.target.value);
                }}
              >
                <option>Select Driver</option>
                {drivers.map((driver, idx) => (
                  <option key={idx} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Delete Driver</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteDriver;
