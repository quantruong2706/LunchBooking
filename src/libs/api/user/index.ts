import { User } from '@app/server/firebaseType'
import { UserDetail, usersColection } from '@app/server/useDB'
import { onSnapshot, query, updateDoc } from 'firebase/firestore'

export const getListUser = (fn: (d: User[]) => void) => {
  onSnapshot(query(usersColection), (res) => {
    fn(res.docs.map((item) => ({ ...item.data(), id: item.id })))
  })
}
export const updateUserInfo = (uid: string, data: User) => {
  updateDoc(UserDetail(uid), data)
}
