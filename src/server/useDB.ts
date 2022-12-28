import { collection, CollectionReference, doc, DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'

import { db } from './firebase'
import { Event, User } from './firebaseType'

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}
const createDocumentReference = <T = DocumentData>(collectionName: string, id: string) => {
  return doc(db, collectionName, id) as DocumentReference<T>
}

// export all your collections
export const usersColection = createCollection<User>('Users')
export const EventColection = createCollection<Event>('Events')
export const EventDetail = (id: string) => createDocumentReference<Event>('Events', id)
