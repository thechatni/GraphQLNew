import { gql } from "@apollo/client";

export const LOAD_SUPPLIERS = gql`
  query {
    suppliers {
      id
      name
    }
  }
`;

export const LOAD_ORDERS = gql`
  query {
    orders {
      id
      vehicleName
      driverName
    }
  }
`;

export const LOAD_FLEETS = gql`
  query {
    fleets {
      name
      id
    }
  }
`;

export const LOAD_DRIVERS = gql`
  query {
    drivers {
      name
      id
      available
    }
  }
`;

export const LOAD_VEHICLES = gql`
  query {
    vehicles {
      name
      id
    }
  }
`;

export const GET_SUPPLIER = gql`
  query ($id: ID) {
    supplier(id: $id) {
      id
      name
      fleets {
        name
        vehicles {
          id
          name
          capacity
          price
          available
          driver {
            id
            name
          }
          fleet {
            id
            name
          }
        }
      }
    }
  }
`;
