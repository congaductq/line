export const TRUCK_FIELDS = {
  ID: 'id',
  PLATE: 'plate',
  CARGO_TYPE: 'cargoType',
  DRIVER: 'driver',
  TRUCK_TYPE: 'truckType',
  PRICE: 'price',
  DIMENSION: 'dimension',
  PARKING_ADDRESS: 'parkingAddress',
  PRODUCTION_YEAR: 'productionYear',
  STATUS: 'status',
  DESCRIPTION: 'description',
}

export const TRUCK_STATUS = {
  1: 'In-use',
  2: 'New',
  3: 'Stopped',
}

export const DEFAULT_TRUCK_SORT_FIELD = TRUCK_FIELDS.PLATE

export const DEFAULT_TRUCK_PAGE_SIZE = 10
