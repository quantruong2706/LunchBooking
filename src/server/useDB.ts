import { db } from './firebase'
import { CollectionReference, collection, DocumentData } from 'firebase/firestore'
import { User, Event } from './firebaseType'

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

// export all your collections
export const usersColection = createCollection<User>('Users')
export const EventColection = createCollection<Event>('Events')
