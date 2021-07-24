import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GET_SUPPLIER,
  LOAD_DRIVERS,
  LOAD_ORDERS,
  LOAD_VEHICLES,
} from "../gql/Queries";
import { UPDATE_VEHICLE, ADD_ORDER } from "../gql/Mutations";

const SupplierDetails = (props) => {
  const [supplier, setSupplier] = useState();
  const [drivers, setDrivers] = useState();
  const [driverId, setDriverId] = useState();
  const [driverName, setDriverName] = useState();
  const [curvehicle, setCurvehicle] = useState();
  const [selected, setSelected] = useState();
  const [book, setBook] = useState(false);
  const { data } = useQuery(GET_SUPPLIER, {
    variables: {
      id: props.supplierId,
    },
  });

  const { loading: loadingD, data: dataD } = useQuery(LOAD_DRIVERS);
  const [updateVehicle] = useMutation(UPDATE_VEHICLE);
  const [addOrder] = useMutation(ADD_ORDER);
  useEffect(() => {
    if (data !== undefined) {
      console.log(data.supplier);
      setSupplier(data.supplier);
    }
    if (dataD !== undefined) {
      console.log(dataD);
      setDrivers(dataD.drivers);
    }
  }, [data, dataD]);

  const handleOrder = (vehicle) => {
    console.log("Ordered vehicle " + vehicle.name);
    updateVehicle({
      variables: {
        id: vehicle.id,
        name: vehicle.name,
        capacity: vehicle.capacity,
        price: vehicle.price,
        driverId: driverId,
        fleetId: vehicle.fleet.id,
        available: "false",
      },
      refetchQueries: [
        { query: GET_SUPPLIER, variables: { id: props.supplierId } },
        { query: LOAD_VEHICLES },
      ],
    });

    // addOrder({
    //   variables: {
    //     vehicleName: vehicle.name,
    //     driverName: driverName,
    //   },
    //   refetchQueries: [{ query: LOAD_ORDERS }],
    // });
  };

  return (
    <div id="supplier-details">
      {supplier !== undefined && (
        <div>
          <ul>
            <h1>Fleets: </h1>
            {supplier.fleets.map((fleet, idx) => (
              <li key={idx}>
                <h2 onClick={() => setSelected(fleet.name)}>{fleet.name}</h2>
                {selected === fleet.name && (
                  <div className="vehicles">
                    <h1>Vehicles</h1>
                    <ol>
                      {fleet.vehicles.map((vehicle, idy) => (
                        <div key={idy}>
                          {/* {setBook(false)} */}
                          {vehicle.available == "true" && (
                            <div>
                              <li>
                                <div>
                                  <p>
                                    Name:
                                    <span> {vehicle.name}</span>
                                  </p>
                                  <p>
                                    Capacity:
                                    <span> {vehicle.capacity}</span>
                                  </p>
                                  <p>
                                    Price:
                                    <span> {vehicle.price}</span>
                                  </p>
                                </div>

                                <button
                                  onClick={() => {
                                    setBook(true);
                                    setCurvehicle(vehicle.id);
                                  }}
                                >
                                  Select
                                </button>
                                {console.log("Current Vehicle" + curvehicle)}
                                {book && curvehicle === vehicle.id && (
                                  <div className="field">
                                    <label>Driver:</label>
                                    <select
                                      onChange={(e) => {
                                        setDriverId(e.target.value);
                                        setDriverName(e.target.name);
                                      }}
                                    >
                                      <option>Select Driver</option>
                                      {drivers !== undefined &&
                                        drivers.map((driver, idx) => (
                                          <option
                                            key={idx}
                                            value={driver.id}
                                            name={driver.name}
                                          >
                                            {driver.name}
                                          </option>
                                        ))}
                                    </select>
                                    <button
                                      onClick={() => handleOrder(vehicle)}
                                    >
                                      Order
                                    </button>
                                  </div>
                                )}
                              </li>
                            </div>
                          )}
                        </div>
                      ))}
                    </ol>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SupplierDetails;
