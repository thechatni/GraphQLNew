import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_ORDERS } from "../gql/Queries";
import SupplierDetails from "./SupplierDetails";
import { useRecoilState } from "recoil";
import { clickedAtom } from "../recoil/atoms";

const OrdersList = () => {
  const { error, loading, data } = useQuery(LOAD_ORDERS);
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (data !== undefined) {
      setOrders(data.orders);
      console.log(data.orders);
    }
  }, [data]);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>An error occured...</p>}
      <h1>All Orders: </h1>
      {orders !== undefined && (
        <ul>
          {orders.map((order, idx) => (
            <li key={idx}>
              <h3>Order no: {Number(idx) + 1}</h3>
              <p>Vehicle: {order.vehicleName}</p>
              <p>Driver: {order.driverName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersList;
