export type User = {
  bankName?: string
  ldapAcc?: string
  address?: string
  age?: string
  bankAccount?: string
  bankAccountName?: string
  name?: string | null
  password?: string
  phone?: string
  email?: string | null
  lastSeen?: string | null
  uid?: string | null
  count?: number
}

// export type PayHistory = {}

export interface IEvent {
  id?: string | null
  address?: string
  date?: string
  eventName?: string
  billAmount?: number
  userPayId?: string
  userPayName?: string
  members?: User[]
  tip?: number
  totalAmount?: number
}
export interface IEventDetail {
  eventId?: string | null
  email?: string | null
  name?: string | null
  uid?: string | null
  isPaid?: boolean
  amount?: number
  count?: number
}
