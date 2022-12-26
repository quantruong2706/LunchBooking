import db from './firebase'
import { CollectionReference, collection, DocumentData } from 'firebase/firestore'
import { User, Event } from './FirebaseType'

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

// export all your collections
export const usersCol = createCollection<User>('Users')
export const EventCol = createCollection<Event>('Events')
