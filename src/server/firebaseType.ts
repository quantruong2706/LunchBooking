export type User = {
  address?: string
  age?: string
  bankAccount?: string
  name?: string
  password?: string
  phone?: string
  email?: string | null
  lastSeen?: string | null
  uid?: string | null
}

export type PayHistory = {}

export type Event = {
  address: string
  date: string
  name: string
  total: number
  userId: string
}
