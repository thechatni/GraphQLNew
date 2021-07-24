import { gql } from "@apollo/client";

export const ADD_SUPPLIER = gql`
  mutation addSupplier($name: String!) {
    addSupplier(name: $name) {
      name
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation updateSupplier($id: ID!, $name: String!) {
    updateSupplier(id: $id, name: $name) {
      name
    }
  }
`;

export const DELETE_SUPPLIER = gql`
  mutation deleteSupplier($id: ID!) {
    deleteSupplier(id: $id) {
      name
    }
  }
`;

export const ADD_FLEET = gql`
  mutation addFleet($name: String!, $supplierId: ID!) {
    addFleet(name: $name, supplierId: $supplierId) {
      name
    }
  }
`;

export const UPDATE_FLEET = gql`
  mutation updateFleet($id: ID!, $name: String!, $supplierId: ID!) {
    updateFleet(id: $id, name: $name, supplierId: $supplierId) {
      name
    }
  }
`;

export const DELETE_FLEET = gql`
  mutation deleteFleet($id: ID!) {
    deleteFleet(id: $id) {
      name
    }
  }
`;

export const ADD_VEHICLE = gql`
  mutation addVehicle(
    $name: String!
    $capacity: String!
    $price: String!
    $driverId: ID!
    $fleetId: ID!
    $available: String!
  ) {
    addVehicle(
      name: $name
      capacity: $capacity
      price: $price
      driverId: $driverId
      fleetId: $fleetId
      available: $available
    ) {
      name
      capacity
      price
      available
    }
  }
`;

export const UPDATE_VEHICLE = gql`
  mutation updateVehicle(
    $id: ID!
    $name: String!
    $capacity: String!
    $price: String!
    $driverId: ID!
    $fleetId: ID!
    $available: String!
  ) {
    updateVehicle(
      id: $id
      name: $name
      capacity: $capacity
      price: $price
      driverId: $driverId
      fleetId: $fleetId
      available: $available
    ) {
      name
    }
  }
`;

export const DELETE_VEHICLE = gql`
  mutation deleteVehicle($id: ID!) {
    deleteVehicle(id: $id) {
      name
    }
  }
`;

export const ADD_DRIVER = gql`
  mutation addDriver($name: String!, $available: String!) {
    addDriver(name: $name, available: $available) {
      name
      id
      available
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addDriver($vehicleName: String!, $driverName: String!) {
    addDriver(vehicleName: $vehicleName, driverName: $driverName) {
      vehicleName
      driverName
    }
  }
`;

export const UPDATE_DRIVER = gql`
  mutation updateDriver($id: ID!, $name: String!, $available: String!) {
    updateDriver(id: $id, name: $name, available: $available) {
      name
    }
  }
`;

export const DELETE_DRIVER = gql`
  mutation deleteDriver($id: ID!) {
    deleteDriver(id: $id) {
      name
    }
  }
`;
