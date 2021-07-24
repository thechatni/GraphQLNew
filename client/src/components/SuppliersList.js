import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_SUPPLIERS } from "../gql/Queries";
import SupplierDetails from "./SupplierDetails";
import { useRecoilState } from "recoil";
import { clickedAtom } from "../recoil/atoms";

const SuppliersList = () => {
  const { error, loading, data } = useQuery(LOAD_SUPPLIERS);
  const [suppliers, setSuppliers] = useState();
  const [selected, setSelected] = useState("null");
  const [clicked, setClicked] = useRecoilState(clickedAtom);

  useEffect(() => {
    if (data !== undefined) {
      setSuppliers(data.suppliers);
      console.log(data.suppliers);
    }
  }, [data]);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>An error occured...</p>}
      <h1>All Suppliers: </h1>
      {suppliers !== undefined && (
        <ul>
          {suppliers.map((supplier, idx) => (
            <li
              key={idx}
              onClick={(e) => {
                setSelected(supplier.id);
                setClicked(supplier.id);
              }}
            >
              <h2>{supplier.name}</h2>
              {selected === supplier.id && (
                <SupplierDetails supplierId={selected} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuppliersList;
