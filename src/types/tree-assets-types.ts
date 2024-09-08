export interface ICompany {
  id: string
  name: string
}

export interface ILocation {
  children: Array<ILocation | IAsset>
  id: string
  isOpened?: boolean
  name: string
  parentId: string | null
  typeHash: 'location' | 'asset' | 'component'
}

export interface IAsset {
  children: Array<ILocation | IAsset>
  gatewayId?: string | null
  id: string
  isOpened?: boolean
  locationId?: string | null
  name: string
  parentId?: string | null
  sensorId?: string | null
  sensorType?: 'vibration' | 'energy' | null
  status?: 'alert' | 'operating' | null
  typeHash: 'location' | 'asset' | 'component'
}
