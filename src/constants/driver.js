export const DRIVER_FIELDS = {
  ID: 'id',
  NAME: 'name',
  YEAR_OF_BIRTH: 'yearOfBirth',
  LICENSE_ID: 'licenseId',
  ADDRESS: 'address',
  NOTE: 'note',
  STATUS: 'status',
}

export const DRIVER_STATUS = {
  1: 'Active',
  2: 'Inactive',
  3: 'Has left',
}

export const DEFAULT_DRIVER_FIELD = DRIVER_FIELDS.NAME

export const DRIVER_ADDITIONAL_FIELDS = [DRIVER_FIELDS.YEAR_OF_BIRTH]

export const DEFAULT_DRIVER_SORT_FIELD = DRIVER_FIELDS.NAME

export const DEFAULT_DRIVER_PAGE_SIZE = 10

export const DRIVER_MIN_BORN_YEAR = (new Date()).getFullYear() - 65 // Max age = 65

export const DRIVER_MAX_BORN_YEAR = (new Date()).getFullYear() - 20 // Min age = 20
