import { IEvent, User } from '@app/server/firebaseType'
import { EventColection, UserDetail } from '@app/server/useDB'
import { onSnapshot, query, updateDoc } from 'firebase/firestore'

export const getListEvent = (fn: (d: IEvent[]) => void) => {
  onSnapshot(query(EventColection), (res) => {
    fn(res.docs.map((item) => ({ ...item.data(), id: item.id })))
  })
}
export const updateUserInfo = (uid: string, data: User) => {
  updateDoc(UserDetail(uid), data)
}
