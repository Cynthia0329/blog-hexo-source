import { httpGet, httpPost } from './http'

export const getorglist = (params = {}) => httpGet({ url: 'apps/api/org/list', params })

