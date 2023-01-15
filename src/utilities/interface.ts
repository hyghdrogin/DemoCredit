export interface IUser {
  id?: string
  email?: string
  username?: string
  password: string
  balance?: number
  created_at?: Date
  updated_at?: Date
}

export interface CustomRequest {
  params: string
  query: string
  path: string[]
}

export interface ICredit {
  id?: string
  owner?: string
  sender?: string
  amount: number
  reference?: string
  type?: string
  status?: string
  created_at?: Date
  updated_at?: Date
}

export interface IDebit {
  id?: string
  receiver?: string
  sender?: string
  amount: number
  type?: string
  status?: string
  created_at?: Date
  updated_at?: Date
}
