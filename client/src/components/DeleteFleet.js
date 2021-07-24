import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_FLEETS, GET_SUPPLIER } from "../gql/Queries";
import { DELETE_FLEET } from "../gql/Mutations";

const DeleteFleet = (props) => {
  const { data } = useQuery(LOAD_FLEETS);
  const [fleets, setFleets] = useState();
  const [fleetId, setFleetId] = useState();
  const [deleteFleet] = useMutation(DELETE_FLEET);

  useEffect(() => {
    if (data !== undefined) {
      setFleets(data.fleets);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteFleet({
      variables: {
        id: fleetId,
      },
      refetchQueries: [
        { query: GET_SUPPLIER, variables: { id: props.supplierId } },
        { query: LOAD_FLEETS },
      ],
    });
  };

  return (
    <div>
      <h3>Delete Fleet</h3>
      {fleets !== undefined && (
        <div>
          <form id="del-fleet" onSubmit={handleSubmit}>
            <div className="field">
              <label>Fleet: </label>
              <select
                required
                onChange={(e) => {
                  setFleetId(e.target.value);
                }}
              >
                <option>Select Fleet</option>
                {fleets.map((fleet, idx) => (
                  <option key={idx} value={fleet.id}>
                    {fleet.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Delete Fleet</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteFleet;
