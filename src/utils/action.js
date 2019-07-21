import { get, KEYS, set } from '~/utils/localStorage'
import { TRUCK_FIELDS } from '~/constants/truck'
import { DRIVER_FIELDS } from '~/constants/driver'
import { CARGO_TYPE_FIELDS } from '~/constants/cargo-type'
import { TruckList, DriverList, CargoTypeList } from '~/constants/default'

// CONVERTED LIST | ASSUMP API RESPONSE
export const DefaultTruckList = get(KEYS.TRUCK_DATA) || TruckList.map(x => Object.assign(x,
  {
    driver: DriverList.find(y => y.id === x.driver),
    cargoType: x.cargoType.map(y => CargoTypeList.find(z => z.id === y)),
  }))

export const DefaultDriverList = get(KEYS.DRIVER_DATA) || DriverList

export const DefaultCargoTypeList = get(KEYS.CARGO_TYPE_DATA) || CargoTypeList

// TRUCK ACTION
const convertTruckToSubmit = (data, list) => (
  (Object.assign(data, { [TRUCK_FIELDS.STATUS]: parseFloat(data[TRUCK_FIELDS.STATUS], 10) },
    list ? { [TRUCK_FIELDS.ID]: list.reduce((result, item) => Math.max(result, item[TRUCK_FIELDS.ID]), 0) + 1 } : {}))
)

export const createTruck = (data, item) => {
  if (data.findIndex(x => x[TRUCK_FIELDS.PLATE] === item[TRUCK_FIELDS.PLATE]) === -1) {
    const newData = [...data, convertTruckToSubmit(item, data)]
    set(KEYS.TRUCK_DATA, newData)
    return newData
  }
  return null
}

export const editTruck = (data, item) => {
  if (data.filter(x => x[TRUCK_FIELDS.ID] !== item[TRUCK_FIELDS.ID]).findIndex(x => x[TRUCK_FIELDS.PLATE] === item[TRUCK_FIELDS.PLATE]) === -1
  && data.findIndex(x => x[TRUCK_FIELDS.ID] === item[TRUCK_FIELDS.ID]) !== -1) {
    const index = data.findIndex(x => x[TRUCK_FIELDS.ID] === item[TRUCK_FIELDS.ID])
    const newData = [...data.slice(0, index), convertTruckToSubmit(item), ...data.slice(index + 1, data.length + 1)]
    set(KEYS.TRUCK_DATA, newData)
    return newData
  }
  return null
}

export const removeTruck = (data, item) => {
  const newData = data.filter(x => x[TRUCK_FIELDS.ID] !== item[TRUCK_FIELDS.ID])
  set(KEYS.TRUCK_DATA, newData)
  return newData
}

// DRIVER ACTION
const convertDriverToSubmit = (data, list) => (
  (Object.assign(data, { [DRIVER_FIELDS.STATUS]: parseFloat(data[DRIVER_FIELDS.STATUS], 10) },
    list ? { [DRIVER_FIELDS.ID]: list.reduce((result, item) => Math.max(result, item[DRIVER_FIELDS.ID]), 0) + 1 } : {}))
)

export const createDriver = (data, item) => {
  const newData = [...data, convertDriverToSubmit(item, data)]
  set(KEYS.DRIVER_DATA, newData)
  return newData
}

export const editDriver = (data, item) => {
  if (data.find(x => x[DRIVER_FIELDS.ID] === item[DRIVER_FIELDS.ID])) {
    const index = data.findIndex(x => x[DRIVER_FIELDS.ID] === item[DRIVER_FIELDS.ID])
    const convertedItem = convertDriverToSubmit(item)
    const newData = [...data.slice(0, index), convertedItem, ...data.slice(index + 1, data.length + 1)]
    set(KEYS.DRIVER_DATA, newData)
    // UPDATE TRUCK
    const dataTruck = get(KEYS.TRUCK_DATA) || [...DefaultTruckList]
    dataTruck.forEach((element, truckIndex) => {
      if (element[TRUCK_FIELDS.DRIVER] && element[TRUCK_FIELDS.DRIVER][DRIVER_FIELDS.ID] === convertedItem[DRIVER_FIELDS.ID]) {
        editTruck(dataTruck, Object.assign(element, { [TRUCK_FIELDS.DRIVER]: [2, 3].includes(convertedItem[DRIVER_FIELDS.STATUS]) ? '' : convertedItem }), truckIndex)
      }
    })
    return { data: get(KEYS.DRIVER_DATA), dataTruck: get(KEYS.TRUCK_DATA) }
  }
  return null
}

export const removeDriver = (data, item) => {
  const newData = data.filter(x => x[DRIVER_FIELDS.ID] !== item[DRIVER_FIELDS.ID])
  set(KEYS.DRIVER_DATA, newData)
  // UPDATE TRUCK
  const dataTruck = get(KEYS.TRUCK_DATA) || [...DefaultTruckList]
  dataTruck.forEach((element, truckIndex) => {
    if (element[TRUCK_FIELDS.DRIVER] && element[TRUCK_FIELDS.DRIVER][DRIVER_FIELDS.ID] === item[DRIVER_FIELDS.ID]) {
      editTruck(dataTruck, Object.assign(element, { [TRUCK_FIELDS.DRIVER]: '' }), truckIndex)
    }
  })
  return newData
}

// CARGO TYPE ACTION
const convertCargoTypeToSubmit = (data, list) => (
  (Object.assign(data, { [CARGO_TYPE_FIELDS.STATUS]: parseFloat(data[CARGO_TYPE_FIELDS.STATUS], 10) },
    list ? { [CARGO_TYPE_FIELDS.ID]: list.reduce((result, item) => Math.max(result, item[CARGO_TYPE_FIELDS.ID]), 0) + 1 } : {}))
)

export const createCargoType = (data, item) => {
  const newData = [...data, convertCargoTypeToSubmit(item, data)]
  set(KEYS.CARGO_TYPE_DATA, newData)
  return newData
}

export const editCargoType = (data, item) => {
  if (data.find(x => x[CARGO_TYPE_FIELDS.ID] === item[CARGO_TYPE_FIELDS.ID])
    && (data.filter(x => x[CARGO_TYPE_FIELDS.ID] !== item[CARGO_TYPE_FIELDS.ID]).findIndex(y => y[CARGO_TYPE_FIELDS.NAME] === item[CARGO_TYPE_FIELDS.NAME]) === -1)
  ) {
    const index = data.findIndex(x => x[CARGO_TYPE_FIELDS.ID] === item[CARGO_TYPE_FIELDS.ID])
    const convertedItem = convertCargoTypeToSubmit(item)
    const newData = [...data.slice(0, index), convertedItem, ...data.slice(index + 1, data.length + 1)]
    set(KEYS.CARGO_TYPE_DATA, newData)
    // UPDATE TRUCK
    const dataTruck = get(KEYS.TRUCK_DATA) || [...DefaultTruckList]
    dataTruck.forEach((element, truckIndex) => {
      if (element[TRUCK_FIELDS.CARGO_TYPE].find(y => y[CARGO_TYPE_FIELDS.ID] === convertedItem[CARGO_TYPE_FIELDS.ID])) {
        const cargoType = element[TRUCK_FIELDS.CARGO_TYPE]
        const updateIndex = cargoType.findIndex(x => x[CARGO_TYPE_FIELDS.ID] === convertedItem[CARGO_TYPE_FIELDS.ID])
        let newCargoType = []
        if (convertedItem[CARGO_TYPE_FIELDS.STATUS] === 2) {
          newCargoType = cargoType.filter(x => x[CARGO_TYPE_FIELDS.ID] !== convertedItem[CARGO_TYPE_FIELDS.ID])
        } else if (updateIndex !== -1) {
          newCargoType = [...cargoType.slice(0, updateIndex), convertedItem, ...cargoType.slice(updateIndex + 1, cargoType.length + 1)]
        }
        editTruck(dataTruck, Object.assign(element, { [TRUCK_FIELDS.CARGO_TYPE]: newCargoType }), truckIndex)
      }
    })
    return { data: newData, dataTruck: get(KEYS.TRUCK_DATA) }
  }
  return null
}

export const removeCargoType = (data, item) => {
  const newData = data.filter(x => x[CARGO_TYPE_FIELDS.ID] !== item[CARGO_TYPE_FIELDS.ID])
  set(KEYS.CARGO_TYPE_DATA, newData)
  // UPDATE TRUCK
  const dataTruck = get(KEYS.TRUCK_DATA) || [...DefaultTruckList]
  dataTruck.forEach((element, truckIndex) => {
    if (element[TRUCK_FIELDS.CARGO_TYPE].find(y => y[CARGO_TYPE_FIELDS.ID] === item[CARGO_TYPE_FIELDS.ID])) {
      editTruck(dataTruck, Object.assign(element, { [TRUCK_FIELDS.CARGO_TYPE]: element[TRUCK_FIELDS.CARGO_TYPE].filter(x => x[CARGO_TYPE_FIELDS.ID] !== item[CARGO_TYPE_FIELDS.ID]) }), truckIndex)
    }
  })
  return newData
}
