export type User = {
  bankName?: string
  ldapAcc?: string
  address?: string
  age?: string
  bankAccount?: string
  name?: string | null
  password?: string
  phone?: string
  email?: string | null
  lastSeen?: string | null
  uid?: string | null
  isPaid?: boolean
  amount?: number
}

// export type PayHistory = {}

export interface Event {
  address?: string
  date?: string
  name?: string
  billAmount?: string
  userPayId?: string
  members?: User[]
  tip: number
  totalAmount: number
}
