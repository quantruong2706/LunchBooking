import { LoadingScreen } from '@app/components/Suspense'
import { TEXT__HOST, TEXT__MEMBER, TEXT__PAYMENT_PAID, TEXT__PAYMENT_REMIND } from '@app/libs/constant'
import { formatMoney } from '@app/libs/functions'
import { useAppSelector } from '@app/stores/hook'
import { listEventStore } from '@app/stores/listEvent'
import { listEventDetailStore } from '@app/stores/listEventDetail'
import { listUserStore } from '@app/stores/listUser'
import { userStore } from '@app/stores/user'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ReplyIcon from '@mui/icons-material/Reply'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const LunchDetail = () => {
  const params = useParams<{ id: string }>()
  const { uid } = useAppSelector(userStore)
  const listEventDetail = useAppSelector(listEventDetailStore)
  const listEvent = useAppSelector(listEventStore)
  const listUser = useAppSelector(listUserStore)
  const userInEvent = useMemo(() => listEventDetail.filter((event) => event.eventId === params.id), [listEventDetail, params])
  const eventInfo = useMemo(() => listEvent.find((item) => item.id === params.id), [listEvent, params.id])

  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(true)

  const isHost = useMemo(() => eventInfo?.userPayId === uid, [eventInfo?.userPayId, uid])
  const hostInfo = useMemo(() => listUser.find((user) => user.uid === eventInfo?.userPayId), [eventInfo?.userPayId, listUser])
  const navigate = useNavigate()
  const isPaid = useMemo(() => {
    const member = userInEvent.find((member) => member.uid === uid)
    if (member && member.uid !== eventInfo?.userPayId) {
      return member.isPaid
    } else {
      return !userInEvent.find((member) => !member.isPaid)
    }
  }, [eventInfo?.userPayId, uid, userInEvent])
  const handleClick = () => {
    navigator.clipboard.writeText(listUser.find((user) => user.uid === eventInfo?.userPayId)?.bankAccount || '')
    setOpenAlert(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  useEffect(() => {
    if (eventInfo && hostInfo) {
      setLoading(false)
    }
  }, [eventInfo, hostInfo])

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="bg-white h-screen">
      <Snackbar open={openAlert} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: '#baf7c2' }}>
          <span className="font-bold">copied!</span>
        </Alert>
      </Snackbar>
      <div className="bg-gradient-to-t from-green-300 to-light-color rounded-b-3xl">
        <div className="flex justify-between p-3">
          <button
            className="h-[36px]"
            onClick={() => {
              history.back()
            }}
          >
            <ReplyIcon fontSize={'large'} />
          </button>
          <div className="flex flex-col text-center">
            <div className={'mx-auto relative mb-5 rounded-full border-4 p-1 ' + (isHost ? 'border-red-500' : 'border-green-500')}>
              <img src="https://picsum.photos/200/300?grayscale" className="w-24 h-24 rounded-full" alt="" />
              <span
                className={
                  'absolute py-1 px-2 block font-normal text-white rounded-lg -bottom-5 inset-x-2/4 -translate-x-2/4 ' +
                  (isHost ? 'bg-red-600 w-[65px]' : 'bg-green-600 w-[80px]')
                }
              >
                {isHost ? TEXT__HOST : TEXT__MEMBER}
              </span>
            </div>
            <h2 className="text-2xl text-center mb-2">{eventInfo?.eventName}</h2>
            <time className="mb-2">{eventInfo?.date}</time>
            <p className="my-4">
              <span>
                {TEXT__HOST}
                <b>&nbsp;{eventInfo?.userPayName}</b>
              </span>
              &emsp;{'-'}&emsp;
              <span>
                Tham gia&nbsp;<b>{userInEvent?.length} người</b>
              </span>
            </p>
          </div>
          <div>
            {isHost ? (
              <button className="h-[36px]" onClick={() => navigate(`/events/edit/${params.id}`)}>
                <BorderColorIcon fontSize={'large'} />
              </button>
            ) : (
              <div className="h-[36px] w-[36px]"></div>
            )}
          </div>
        </div>
      </div>
      <div className="py-3 px-5">
        <div className="flex justify-between">
          <span className="text-gray-400 font-bold block mb-3">Tổng bill</span>
          <p className="text-end">
            <span className="text-black">{formatMoney(eventInfo?.billAmount)}</span>
          </p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 font-bold block mb-3">Hoa hồng</span>
          <p className="text-end">
            <span className="text-black">{formatMoney(eventInfo?.billAmount)}</span>
          </p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 font-bold block mb-3">Tổng tiền</span>
          <p className="text-end">
            <span className="text-black">{formatMoney(eventInfo?.billAmount)}</span>
          </p>
        </div>
        <div className="border-y-[1px] border-gray-400">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 font-bold">
                  <th scope="col" className="py-3">
                    Thành viên
                  </th>
                  <th scope="col" className="py-3 text-center">
                    Tiền bill
                  </th>
                  <th scope="col" className="py-3 text-right">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {userInEvent.map((user) => (
                  <tr key={user.uid}>
                    <td>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-6 h-6 accent-green-600 text-green-600 border-0 rounded-md focus:ring-0"
                          readOnly
                          disabled={!user.isPaid}
                          checked={user.isPaid}
                        />
                        <span className="ml-3">{user.name || user.email}</span>
                      </label>
                    </td>
                    <td className="text-center">50k</td>
                    <td className="text-right">100k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {!isPaid ? (
          <>
            <div className="my-3">
              <span className="text-gray-400 font-bold block mb-3">Bank Account</span>
              <p>
                Chủ tài khoản: {hostInfo?.bankAccountName} <br />
                Ngân hàng: {hostInfo?.bankName} <br />
                Số Tài khoản: <b>{hostInfo?.bankAccount}</b>{' '}
                <button className="px-2 rounded bg-gray-300" onClick={handleClick}>
                  Copy
                </button>
                <img className="w-96 h-auto mx-auto" src="https://kalite.vn/wp-content/uploads/2021/09/maqrkalite.jpg" alt="aaa" />
              </p>
            </div>
            <div className="my-3">
              <span className="text-gray-400 font-bold block mb-3">Action</span>
              <div className="flex w-full">
                <button
                  type="button"
                  className={
                    'focus:outline-none text-white focus:ring-4 font-medium rounded-lg px-5 py-2.5 mx-auto ' +
                    (isHost ? 'bg-green-600 hover:bg-green-700 focus:ring-green-400' : 'bg-[#B91D37]')
                  }
                >
                  {isHost ? TEXT__PAYMENT_REMIND : TEXT__PAYMENT_PAID}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="my-3">
            <img className="w-96 h-auto mx-auto" src="/paid.png" alt="aaa" />
          </div>
        )}
      </div>
    </div>
  )
}

export default LunchDetail
