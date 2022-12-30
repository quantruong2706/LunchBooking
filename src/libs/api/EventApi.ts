import { IEvent, User } from '@app/server/firebaseType'
import { EventColection, UserDetail, usersColection } from '@app/server/useDB'
import { doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'

export const getListUser = async () => {
  const userDocs = await getDocs(usersColection)
  const listUser: User[] = []
  userDocs.docs.forEach((userDoc) => {
    const user = userDoc.data()
    listUser.push(user)
  })
  return listUser
}
export const setEvent = async (data: IEvent) => {
  const userRef = doc(EventColection)
  let isSuccess = false
  await setDoc(userRef, data).then(() => {
    isSuccess = true
  })
  return isSuccess
}

export const updateMemberInfo = async (member_id: string, data: User) => {
  updateDoc(UserDetail(member_id), data)
}
