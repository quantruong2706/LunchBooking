import { EventColection, EventDetailColection } from '@app/server/useDB'
import { store } from '@app/stores'
import { CollectionReference, getDocs, query, where } from 'firebase/firestore'

const getBy = async <T = any>(cloection: CollectionReference<T>, params: string) => {
  return (await getDocs(query(cloection, where(params, '==', store.getState().USER.data.uid)))).docs.map((item) => ({ ...item.data(), id: item.id }))
}
export const getHomeData = async () => {
  //số bữa ăn user chủ chi
  const isHost = await getBy(EventColection, 'userPayId')
  // số bữa ăn user tham gia
  const isMember = await getBy(EventDetailColection, 'uid')
  // list bữa ăn user chưa trả
  const unPaidList = isMember.filter((item) => !item.isPaid)
  // list bữa ăn user chưa đòi
  const requirePaymentList = isHost.filter((item) => !item.isAllPaid)

  return {
    isHost,
    isMember,
    unPaidList,
    requirePaymentList,
  }
}
