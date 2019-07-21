import {
  createDriver, editDriver, removeDriver, createTruck, createCargoType, editTruck, removeTruck, editCargoType, removeCargoType,
} from '~/utils/action'
import { DRIVER_FIELDS } from '~/constants/driver'
import { TRUCK_FIELDS } from '~/constants/truck'
import { CARGO_TYPE_FIELDS } from '~/constants/cargo-type'

// INIT
const driver = {
  [DRIVER_FIELDS.NAME]: 'Nhat Nam',
  [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1992',
  [DRIVER_FIELDS.LICENSE_ID]: '283229159',
  [DRIVER_FIELDS.ADDRESS]: '132 Thuy Khue',
  [DRIVER_FIELDS.NOTE]: '',
  [DRIVER_FIELDS.STATUS]: 1,
}
const cargoType = {
  [CARGO_TYPE_FIELDS.ID]: 1,
  [CARGO_TYPE_FIELDS.NAME]: 'A New Truck Type',
  [CARGO_TYPE_FIELDS.DESCRIPTION]: 'A New Truck Type',
  [CARGO_TYPE_FIELDS.NOTE]: 'A New Truck Type',
  [CARGO_TYPE_FIELDS.STATUS]: 1,
}
const truck = {
  [TRUCK_FIELDS.PLATE]: '15B2-1102',
  [TRUCK_FIELDS.CARGO_TYPE]: [cargoType],
  [TRUCK_FIELDS.DRIVER]: driver,
  [TRUCK_FIELDS.TRUCK_TYPE]: '5 ton',
  [TRUCK_FIELDS.PRICE]: 100000000,
  [TRUCK_FIELDS.DIMENSION]: '4-2-2',
  [TRUCK_FIELDS.PARKING_ADDRESS]: 'No. 136 Ho Tung Mau',
  [TRUCK_FIELDS.PRODUCTION_YEAR]: 2018,
  [TRUCK_FIELDS.STATUS]: 1,
  [TRUCK_FIELDS.DESCRIPTION]: '',
}

describe('Testing Actions', () => {
  // TRUCK
  it('Create Driver', () => {
    expect(createTruck([], truck)).toEqual([Object.assign(truck, { [DRIVER_FIELDS.ID]: 1 })])
  })
  it('Edit Truck', () => {
    const newTruck = Object.assign(truck, { [TRUCK_FIELDS.PLATE]: '15B2-11021' })
    expect(editTruck([truck], newTruck)).toEqual([newTruck])
  })
  it('Edit Truck Fail', () => {
    const existedTruck = {
      [TRUCK_FIELDS.ID]: 2,
      [TRUCK_FIELDS.PLATE]: '15B2-1102',
      [TRUCK_FIELDS.CARGO_TYPE]: [1, 2],
      [TRUCK_FIELDS.DRIVER]: 2,
      [TRUCK_FIELDS.TRUCK_TYPE]: '6 ton',
      [TRUCK_FIELDS.PRICE]: 80000000,
      [TRUCK_FIELDS.DIMENSION]: '3.5-2-2',
      [TRUCK_FIELDS.PARKING_ADDRESS]: 'No. 136 Ho Tung Mau',
      [TRUCK_FIELDS.PRODUCTION_YEAR]: 2017,
      [TRUCK_FIELDS.STATUS]: 1,
      [TRUCK_FIELDS.DESCRIPTION]: '',
    }
    const newTruck = Object.assign(truck, { [TRUCK_FIELDS.PLATE]: '15B2-1102' })
    expect(editTruck([existedTruck, truck], newTruck)).toEqual(null)
  })
  it('Remove Truck', () => {
    expect(removeTruck([truck], truck)).toEqual([])
  })

  // DRIVER
  it('Create Driver', () => {
    expect(createDriver([], driver)).toEqual([Object.assign(driver, { [DRIVER_FIELDS.ID]: 1 })])
  })
  it('Edit Driver', () => {
    const newDriver = Object.assign(driver, { [DRIVER_FIELDS.NAME]: 'Van Duc' })
    expect(editDriver([driver], newDriver).data).toEqual([newDriver])
  })
  it('Remove Driver', () => {
    expect(removeDriver([driver], driver)).toEqual([])
  })

  // CARGO TYPE
  it('Create Cargo Type', () => {
    expect(createCargoType([], cargoType)).toEqual([Object.assign(cargoType, { [DRIVER_FIELDS.ID]: 1 })])
  })
  it('Edit Cargo Type', () => {
    const newCargoType = Object.assign(cargoType, { [CARGO_TYPE_FIELDS.NAME]: 'An Old Truck Type' })
    expect(editCargoType([cargoType], newCargoType).data).toEqual([newCargoType])
  })
  it('Remove Cargo Type', () => {
    expect(removeCargoType([cargoType], cargoType)).toEqual([])
  })
})
