import { Event, User } from '@app/server/firebaseType'
import { EventColection, usersColection } from '@app/server/useDB'
import { doc, getDocs, setDoc } from 'firebase/firestore'

export const getListUser = async () => {
  const userDocs = await getDocs(usersColection)
  const listUser: User[] = []
  userDocs.docs.forEach((userDoc) => {
    const user = userDoc.data()
    listUser.push(user)
  })
  return listUser
}
export const setEvent = async (data: Event) => {
  const userRef = doc(EventColection, 'user_12345')
  await setDoc(userRef, data)
}
