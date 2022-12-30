import { LoadingScreen } from '@app/components/Suspense'
import { getDetailEvent } from '@app/libs/api/events'
import { TEXT__HOST, TEXT__MEMBER, TEXT__PAYMENT_PAID, TEXT__PAYMENT_REMIND } from '@app/libs/constant'
import { formatMoney } from '@app/libs/functions'
import { IEvent, User } from '@app/server/firebaseType'
import { UserDetail } from '@app/server/useDB'
import { useAppSelector } from '@app/stores/hook'
import { userStore } from '@app/stores/user'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ReplyIcon from '@mui/icons-material/Reply'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { getDoc } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
const LunchDetail = () => {
  const { uid } = useAppSelector(userStore)
  const [detailData, setDetailData] = useState<IEvent>()
  const [host, setHostData] = useState<User>()
  const [loading, setLoading] = useState<boolean>(true)

  const [openAlert, setOpenAlert] = useState(false)

  const isHost = useMemo(() => detailData?.userPayId === uid, [detailData?.userPayId, uid])
  const isPaid = useMemo(() => {
    const member = detailData?.members!.find((member) => member.uid === uid)
    if (member && member.uid !== detailData?.userPayId) {
      return member.isPaid
    } else {
      return !detailData?.members?.find((member) => !member.isPaid)
    }
  }, [detailData, uid])

  const params = useParams<{ id: string }>()
  useEffect(() => {
    getDetailEvent(params.id!)
      .then((e) => {
        setDetailData(e)
        getDoc(UserDetail(e.userPayId!)).then((res) => {
          setHostData(res.data())
        })
      })
      .catch((e) => {
        throw Error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [params])

  const handleClick = () => {
    navigator.clipboard.writeText(host?.bankAccount || '')
    setOpenAlert(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

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
            <h2 className="text-2xl text-center mb-2">{detailData?.eventName}</h2>
            <time className="mb-2">{detailData?.date}</time>
            <p className="my-4">
              <span>
                <b>{TEXT__HOST}</b>&nbsp;{detailData?.userPayName}
              </span>
              &emsp;{'-'}&emsp;
              <span>
                <b>Tham gia</b>&nbsp;{detailData?.members?.length} người
              </span>
            </p>
          </div>
          <div>
            {isHost ? (
              <button className="h-[36px]">
                <BorderColorIcon fontSize={'large'} />
              </button>
            ) : (
              <div className="h-[36px] w-[36px]"></div>
            )}
          </div>
        </div>
      </div>
      <div className="py-3 px-5">
        <div className="mb-3">
          <span className="text-gray-400 font-bold block mb-3">Tổng tiền</span>
          <p className="block text-end">
            <span className="text-black">{formatMoney(detailData?.billAmount)}</span>
          </p>
        </div>
        <div className="border-y-[1px] border-gray-400">
          <span className="text-gray-400 font-bold block my-3">Thành viên</span>
          <ul>
            {detailData?.members?.map((user) => (
              <li className="my-4" key={user.uid}>
                <div className="flex justify-between cursor-pointer">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-6 h-6 accent-green-600 text-green-600 border-0 rounded-md focus:ring-0"
                      readOnly
                      disabled={!user.isPaid}
                      checked={user.isPaid}
                    />
                    <span className="ml-3">{user.name || user.ldapAcc || user.email}</span>
                  </label>
                  <span>{formatMoney(user.amount)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {!isPaid ? (
          <>
            <div className="my-3">
              <span className="text-gray-400 font-bold block mb-3">Bank Account</span>
              <p>
                Chủ tài khoản: {host?.bankAccountName} <br />
                Ngân hàng: {host?.bankName} <br />
                Số Tài khoản: <b>{host?.bankAccount}</b>{' '}
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
