import { TRUCK_FIELDS } from './truck'
import { DRIVER_FIELDS } from './driver'
import { CARGO_TYPE_FIELDS } from './cargo-type'
import { get, KEYS, set } from '~/utils/localStorage'

// DEFAULT DATA
const TruckList = [
  {
    [TRUCK_FIELDS.ID]: 1,
    [TRUCK_FIELDS.PLATE]: '30A-50493',
    [TRUCK_FIELDS.CARGO_TYPE]: [1, 2],
    [TRUCK_FIELDS.DRIVER]: 1,
    [TRUCK_FIELDS.TRUCK_TYPE]: '9 ton',
    [TRUCK_FIELDS.PRICE]: 800000000,
    [TRUCK_FIELDS.DIMENSION]: '10-2-2',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.128, Hoan Kiem Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2018,
    [TRUCK_FIELDS.STATUS]: 1,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
  {
    [TRUCK_FIELDS.ID]: 2,
    [TRUCK_FIELDS.PLATE]: '29B-11425',
    [TRUCK_FIELDS.CARGO_TYPE]: [3, 4],
    [TRUCK_FIELDS.DRIVER]: 2,
    [TRUCK_FIELDS.TRUCK_TYPE]: '8 ton',
    [TRUCK_FIELDS.PRICE]: 1000000000,
    [TRUCK_FIELDS.DIMENSION]: '8-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.2, Hoan Kiem Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2012,
    [TRUCK_FIELDS.STATUS]: 2,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
  {
    [TRUCK_FIELDS.ID]: 3,
    [TRUCK_FIELDS.PLATE]: '28L-21321',
    [TRUCK_FIELDS.CARGO_TYPE]: [1],
    [TRUCK_FIELDS.DRIVER]: 3,
    [TRUCK_FIELDS.TRUCK_TYPE]: '9 ton',
    [TRUCK_FIELDS.PRICE]: 1350000000,
    [TRUCK_FIELDS.DIMENSION]: '12-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.10, Hoan Kiem Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2014,
    [TRUCK_FIELDS.STATUS]: 3,
    [TRUCK_FIELDS.DESCRIPTION]: 'Truck is defected',
  },
  {
    [TRUCK_FIELDS.ID]: 4,
    [TRUCK_FIELDS.PLATE]: '29A-2321',
    [TRUCK_FIELDS.CARGO_TYPE]: [10, 2],
    [TRUCK_FIELDS.DRIVER]: 4,
    [TRUCK_FIELDS.TRUCK_TYPE]: '7 ton',
    [TRUCK_FIELDS.PRICE]: 2350000000,
    [TRUCK_FIELDS.DIMENSION]: '10-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.10, Hoan Kiem Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2014,
    [TRUCK_FIELDS.STATUS]: 1,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
  {
    [TRUCK_FIELDS.ID]: 5,
    [TRUCK_FIELDS.PLATE]: '21G-63216',
    [TRUCK_FIELDS.CARGO_TYPE]: [8, 2],
    [TRUCK_FIELDS.DRIVER]: 5,
    [TRUCK_FIELDS.TRUCK_TYPE]: '7.5 ton',
    [TRUCK_FIELDS.PRICE]: 1220000000,
    [TRUCK_FIELDS.DIMENSION]: '8-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.10, Pham Hung Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2010,
    [TRUCK_FIELDS.STATUS]: 1,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
  {
    [TRUCK_FIELDS.ID]: 6,
    [TRUCK_FIELDS.PLATE]: '20A-9878',
    [TRUCK_FIELDS.CARGO_TYPE]: [1, 2],
    [TRUCK_FIELDS.DRIVER]: 5,
    [TRUCK_FIELDS.TRUCK_TYPE]: '6 ton',
    [TRUCK_FIELDS.PRICE]: 620000000,
    [TRUCK_FIELDS.DIMENSION]: '8-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.24, Pham Hung Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2009,
    [TRUCK_FIELDS.STATUS]: 1,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
  {
    [TRUCK_FIELDS.ID]: 7,
    [TRUCK_FIELDS.PLATE]: '22A-21563',
    [TRUCK_FIELDS.CARGO_TYPE]: [4],
    [TRUCK_FIELDS.DRIVER]: 8,
    [TRUCK_FIELDS.TRUCK_TYPE]: '5 ton',
    [TRUCK_FIELDS.PRICE]: 752000000,
    [TRUCK_FIELDS.DIMENSION]: '7-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.24, Pham Hung Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2009,
    [TRUCK_FIELDS.STATUS]: 1,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
  {
    [TRUCK_FIELDS.ID]: 8,
    [TRUCK_FIELDS.PLATE]: '12A-21521',
    [TRUCK_FIELDS.CARGO_TYPE]: [1, 7],
    [TRUCK_FIELDS.DRIVER]: 7,
    [TRUCK_FIELDS.TRUCK_TYPE]: '3 ton',
    [TRUCK_FIELDS.PRICE]: 420000000,
    [TRUCK_FIELDS.DIMENSION]: '4-3.5-2',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.24, Pham Hung Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2015,
    [TRUCK_FIELDS.STATUS]: 1,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
  {
    [TRUCK_FIELDS.ID]: 9,
    [TRUCK_FIELDS.PLATE]: '54L-21521',
    [TRUCK_FIELDS.CARGO_TYPE]: [7, 8],
    [TRUCK_FIELDS.DRIVER]: 7,
    [TRUCK_FIELDS.TRUCK_TYPE]: '7.9 ton',
    [TRUCK_FIELDS.PRICE]: 1270000000,
    [TRUCK_FIELDS.DIMENSION]: '12-2-5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.4, Le Chan Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2015,
    [TRUCK_FIELDS.STATUS]: 3,
    [TRUCK_FIELDS.DESCRIPTION]: 'Truck is reparing',
  },
  {
    [TRUCK_FIELDS.ID]: 10,
    [TRUCK_FIELDS.PLATE]: '32A-8271',
    [TRUCK_FIELDS.CARGO_TYPE]: [7, 8, 9],
    [TRUCK_FIELDS.DRIVER]: 5,
    [TRUCK_FIELDS.TRUCK_TYPE]: '4.5 ton',
    [TRUCK_FIELDS.PRICE]: 80000000,
    [TRUCK_FIELDS.DIMENSION]: '12-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.8, Hoan Kiem Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2014,
    [TRUCK_FIELDS.STATUS]: 1,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
  {
    [TRUCK_FIELDS.ID]: 11,
    [TRUCK_FIELDS.PLATE]: '22B-3215',
    [TRUCK_FIELDS.CARGO_TYPE]: [10],
    [TRUCK_FIELDS.DRIVER]: 4,
    [TRUCK_FIELDS.TRUCK_TYPE]: '8.5 ton',
    [TRUCK_FIELDS.PRICE]: 60000000,
    [TRUCK_FIELDS.DIMENSION]: '2-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.8, Hoan Kiem Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2014,
    [TRUCK_FIELDS.STATUS]: 2,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
  {
    [TRUCK_FIELDS.ID]: 12,
    [TRUCK_FIELDS.PLATE]: '12B-54832',
    [TRUCK_FIELDS.CARGO_TYPE]: [5, 10],
    [TRUCK_FIELDS.DRIVER]: 2,
    [TRUCK_FIELDS.TRUCK_TYPE]: '2.8 ton',
    [TRUCK_FIELDS.PRICE]: 40000000,
    [TRUCK_FIELDS.DIMENSION]: '2-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.4, Le Chan Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2017,
    [TRUCK_FIELDS.STATUS]: 3,
    [TRUCK_FIELDS.DESCRIPTION]: 'Out of working time',
  },
  {
    [TRUCK_FIELDS.ID]: 13,
    [TRUCK_FIELDS.PLATE]: '52L-5483',
    [TRUCK_FIELDS.CARGO_TYPE]: [2, 6],
    [TRUCK_FIELDS.DRIVER]: 6,
    [TRUCK_FIELDS.TRUCK_TYPE]: '6.2 ton',
    [TRUCK_FIELDS.PRICE]: 95000000,
    [TRUCK_FIELDS.DIMENSION]: '4-2-1.5',
    [TRUCK_FIELDS.PARKING_ADDRESS]: 'No.24, Pham Hung Street',
    [TRUCK_FIELDS.PRODUCTION_YEAR]: 2017,
    [TRUCK_FIELDS.STATUS]: 1,
    [TRUCK_FIELDS.DESCRIPTION]: '',
  },
]

const DriverList = [
  {
    [DRIVER_FIELDS.ID]: 1,
    [DRIVER_FIELDS.NAME]: 'Do Van Duc',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1995',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '136 Ho Tung Mau',
    [DRIVER_FIELDS.NOTE]: 'Very Good Driver',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 2,
    [DRIVER_FIELDS.NAME]: 'Le Tuan Anh',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1993',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '94 Yet Kieu, Hoan Kiem',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 3,
    [DRIVER_FIELDS.NAME]: 'Vu Ngoc Truong',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1994',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '94 Yet Kieu, Hoan Kiem',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 4,
    [DRIVER_FIELDS.NAME]: 'Nguyen Quang',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1995',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '132 Ton Duc Thang, Dong Da',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 5,
    [DRIVER_FIELDS.NAME]: 'Vu Truong',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1980',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '112 Ton Duc Thang',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 6,
    [DRIVER_FIELDS.NAME]: 'Le Tuan',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1982',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '112 Ton Duc Thang',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 7,
    [DRIVER_FIELDS.NAME]: 'Nguyen Thanh Canh',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1979',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '17 Cua Dong',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 8,
    [DRIVER_FIELDS.NAME]: 'Le Thu Ha',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1972',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '68 Hang Bo',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 9,
    [DRIVER_FIELDS.NAME]: 'Do Quan',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1991',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '97 Cau Giay',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 10,
    [DRIVER_FIELDS.NAME]: 'Pham Hoang Nam',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1985',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '97 Cau Giay',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
  {
    [DRIVER_FIELDS.ID]: 11,
    [DRIVER_FIELDS.NAME]: 'Nguyen Hoang Tuan',
    [DRIVER_FIELDS.YEAR_OF_BIRTH]: '1990',
    [DRIVER_FIELDS.LICENSE_ID]: '281729159',
    [DRIVER_FIELDS.ADDRESS]: '23 Hang Hanh',
    [DRIVER_FIELDS.NOTE]: '',
    [DRIVER_FIELDS.STATUS]: 1,
  },
]

const CargoTypeList = [
  {
    [CARGO_TYPE_FIELDS.ID]: 1,
    [CARGO_TYPE_FIELDS.NAME]: 'Refrigerator',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Refrigerator Truck',
    [CARGO_TYPE_FIELDS.NOTE]: 'Main Cargo Type',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
  {
    [CARGO_TYPE_FIELDS.ID]: 2,
    [CARGO_TYPE_FIELDS.NAME]: 'Cutaway Van',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Refrigerator Truck',
    [CARGO_TYPE_FIELDS.NOTE]: '',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
  {
    [CARGO_TYPE_FIELDS.ID]: 3,
    [CARGO_TYPE_FIELDS.NAME]: 'Oil',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Oil Truck',
    [CARGO_TYPE_FIELDS.NOTE]: '',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
  {
    [CARGO_TYPE_FIELDS.ID]: 4,
    [CARGO_TYPE_FIELDS.NAME]: 'Mobile Crane',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Mobile Crane Truck',
    [CARGO_TYPE_FIELDS.NOTE]: '',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
  {
    [CARGO_TYPE_FIELDS.ID]: 5,
    [CARGO_TYPE_FIELDS.NAME]: 'Dump',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Dump Truck',
    [CARGO_TYPE_FIELDS.NOTE]: '',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
  {
    [CARGO_TYPE_FIELDS.ID]: 6,
    [CARGO_TYPE_FIELDS.NAME]: 'Garbage',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Garbage Truck',
    [CARGO_TYPE_FIELDS.NOTE]: '',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
  {
    [CARGO_TYPE_FIELDS.ID]: 7,
    [CARGO_TYPE_FIELDS.NAME]: 'Log Carrier',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Log Carrier Truck',
    [CARGO_TYPE_FIELDS.NOTE]: '',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
  {
    [CARGO_TYPE_FIELDS.ID]: 8,
    [CARGO_TYPE_FIELDS.NAME]: 'Gas',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Gas Truck',
    [CARGO_TYPE_FIELDS.NOTE]: '',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
  {
    [CARGO_TYPE_FIELDS.ID]: 9,
    [CARGO_TYPE_FIELDS.NAME]: 'Tractor Unit',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Tractor Unit Truck',
    [CARGO_TYPE_FIELDS.NOTE]: '',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
  {
    [CARGO_TYPE_FIELDS.ID]: 10,
    [CARGO_TYPE_FIELDS.NAME]: 'Box',
    [CARGO_TYPE_FIELDS.DESCRIPTION]: 'Box Truck',
    [CARGO_TYPE_FIELDS.NOTE]: '',
    [CARGO_TYPE_FIELDS.STATUS]: 1,
  },
]

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
  const newData = [...data, convertTruckToSubmit(item, data)]
  set(KEYS.TRUCK_DATA, newData)
  return newData
}

export const editTruck = (data, item, index) => {
  const newData = [...data.slice(0, index), convertTruckToSubmit(item), ...data.slice(index + 1, data.length + 1)]
  set(KEYS.TRUCK_DATA, newData)
  return newData
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

export const editDriver = (data, item, index) => {
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

export const editCargoType = (data, item, index) => {
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
