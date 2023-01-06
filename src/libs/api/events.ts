import { IEvent, IEventDetail } from '@app/server/firebaseType'
import { EventColection, EventDetail, EventDetailColection } from '@app/server/useDB'
import { useAppSelector } from '@app/stores/hook'
import { userStore } from '@app/stores/user'
import { getDoc, getDocs, query, where } from 'firebase/firestore'


// const user = useAppSelector(userStore)

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

// danh sach event user tham gia
export const getListEventJoinedByUser = async (uid: string): Promise<IEventDetail[]> => {
  const q = query(EventDetailColection, where("uid", "==", uid));
  const eventDocs = await getDocs(q)
  const listEvent : any[] = []

  eventDocs.docs.forEach((eventDoc) => {
    const event = eventDoc.data()
    event.id = eventDoc.id
    listEvent.push(event)
  })
  return listEvent
}

// danh sach event user chu tri
export const getListEventHostedByUser = async (uid: string): Promise<IEvent[]> => {
  const q = query(EventColection, where("userPayId", "==", uid));
  const eventDocs = await getDocs(q)
  const listEvent : any[] = []

  eventDocs.docs.forEach((eventDoc) => {
    const event = eventDoc.data()
    event.id = eventDoc.id
    listEvent.push(event)
  })
  return listEvent
}

// danh sach eventIds user chu tri
export const getListEventIdsHostedByUser = async (uid: string): Promise<string[]> => {
  const q = query(EventColection, where("userPayId", "==", uid));
  const eventDocs = await getDocs(q)
  const listEventIds : any[] = []

  eventDocs.docs.forEach((eventDoc) => {
    listEventIds.push(eventDoc.id)
  })
  return listEventIds
}

// danh sach member tham gia event cua user
export const getListMemberOfHostedEvent = async (uid: string, lstEventIds: string[]): Promise<IEventDetail[]> => {
  if (lstEventIds.length > 0) {
    const q = query(EventDetailColection, where("eventId", "in", lstEventIds), where("uid", "!=", uid));
    const eventDocs = await getDocs(q)
    const listMember : any[] = []

    eventDocs.docs.forEach((eventDoc) => {
      const event = eventDoc.data()
      event.id = eventDoc.id
      listMember.push(event)
    })
    return listMember
  } else return [];
} 

export const getDetailEvent = async (id: string) => {
  const eventDocs = await getDoc(EventDetail(id))
  const EventData: IEvent = eventDocs.data()!
  EventData.id = eventDocs.id
  return EventData
}
