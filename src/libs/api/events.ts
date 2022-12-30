import { IEvent } from '@app/server/firebaseType'
import { EventColection, EventDetail } from '@app/server/useDB'
import { getDoc, getDocs } from 'firebase/firestore'

export const getListEvent = async (): Promise<IEvent[]> => {
  const eventDocs = await getDocs(EventColection)
  const listEvent: IEvent[] = []

  eventDocs.docs.forEach((eventDoc) => {
    const event = eventDoc.data()
    event.id = eventDoc.id
    listEvent.push(event)
  })

  return listEvent
}
export const getDetailEvent = async (id: string) => {
  const eventDocs = await getDoc(EventDetail(id))
  const EventData: IEvent = eventDocs.data()!
  EventData.id = eventDocs.id
  return EventData
}
