import { collection, CollectionReference, doc, DocumentData, DocumentReference } from 'firebase/firestore'

import { db } from './firebase'
import { IEvent, IEventDetail, User } from './firebaseType'

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}
const createDocumentReference = <T = DocumentData>(collectionName: string, id: string) => {
  return doc(db, collectionName, id) as DocumentReference<T>
}

// export all your collections
export const usersColection = createCollection<User>('Users')
export const EventColection = createCollection<IEvent>('Events')
export const EventDetailColection = createCollection<IEventDetail>('EventDetail')
export const EventDetail = (id: string) => createDocumentReference<IEvent>('Events', id)
export const UserDetail = (id: string) => createDocumentReference<User>('Users', id)
