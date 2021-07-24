import "./App.css";
import SuppliersList from "./components/SuppliersList";
import AddSupplier from "./components/AddSupplier";
import AddVehicle from "./components/AddVehicle";
import AddDriver from "./components/AddDriver";
import AddFleet from "./components/AddFleet";
import DeleteSupplier from "./components/DeleteSupplier";
import DeleteFleet from "./components/DeleteFleet";
import DeleteVehicle from "./components/DeleteVehicle";
import DeleteDriver from "./components/DeleteDriver";
import UpdateSupplier from "./components/UpdateSupplier";
import UpdateFleet from "./components/UpdateFleet";
import UpdateVehicle from "./components/UpdateVehicle";
import UpdateDriver from "./components/UpdateDriver";
import OrdersList from "./components/OrdersList";
import { useRecoilValue } from "recoil";
import { clickedAtom } from "./recoil/atoms";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const clicked = useRecoilValue(clickedAtom);
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <SuppliersList />
        <div className="Add">
          <AddSupplier />
          <AddFleet />
          <AddVehicle supplierId={clicked} />
          <AddDriver />
        </div>
        <div className="Update">
          <UpdateSupplier />
          <UpdateFleet />
          <UpdateVehicle supplierId={clicked} />
          <UpdateDriver />
        </div>

        <div className="Delete">
          <DeleteSupplier />
          <DeleteFleet supplierId={clicked} />
          <DeleteVehicle supplierId={clicked} />
          <DeleteDriver />
        </div>

        <OrdersList />
      </div>
    </ApolloProvider>
  );
}

export default App;
