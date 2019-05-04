import { LIST_WAREHOUSE_LOCATION } from './types'

export const listWarehouseLocation = params => {
  return {
    type: LIST_WAREHOUSE_LOCATION,
    params
  }
}
