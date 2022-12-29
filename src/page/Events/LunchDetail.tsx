import { getDetailEvent } from '@app/libs/api/events'
import { TEXT__HOST, TEXT__MEMBER, TEXT__PAYMENT_REMIND } from '@app/libs/constant'
import { formatMoney } from '@app/libs/functions'
import { Event } from '@app/server/firebaseType'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ReplyIcon from '@mui/icons-material/Reply'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const LunchDetail = () => {
  const [test, setTest] = useState<boolean>(false)
  const [detailData, setDetailData] = useState<Event>()
  const params = useParams<{ id: string }>()
  useEffect(() => {
    getDetailEvent(params.id!).then((e) => {
      console.log(e)
      setDetailData(e)
    })
  }, [params])
  return (
    <div className="bg-white h-screen">
      {/* <button
          onClick={() => {
            setTest((p) => !p)
          }}
        >
          ahihi
        </button> */}
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
            <div className={'mx-auto relative mb-5 rounded-full border-4 p-1 ' + (test ? 'border-red-500' : 'border-green-500')}>
              <img src="https://picsum.photos/200/300?grayscale" className="w-24 h-24 rounded-full" alt="" />
              <span
                className={
                  'absolute py-1 px-2 block font-normal text-white rounded-lg -bottom-5 inset-x-2/4 -translate-x-2/4 ' +
                  (test ? 'bg-red-600 w-[65px]' : 'bg-green-600 w-[80px]')
                }
              >
                {test ? TEXT__HOST : TEXT__MEMBER}
              </span>
            </div>
            <h2 className="text-2xl text-center mb-2">{detailData?.name}</h2>
            <time className="mb-2">{detailData?.date}</time>
            <p className="my-4">
              <span>
                <b>{TEXT__HOST}</b>&nbsp;bqduy1
              </span>
              &emsp;{'-'}&emsp;
              <span>
                <b>Tham gia</b>&nbsp;12 người
              </span>
            </p>
          </div>
          <div>
            {test ? (
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
            <li className="my-4">
              <div className="flex justify-between cursor-pointer">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="w-6 h-6 accent-green-600 text-green-600 border-0 rounded-md focus:ring-0" disabled />
                  <span className="ml-3">Lê Thành Đạt</span>
                </label>
                <span>100.000 VNĐ</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="my-3">
          <span className="text-gray-400 font-bold block mb-3">Bank Account</span>
          <p>
            Chủ tài khoản: Bùi Quang Duy <br />
            Ngân hàng: SCB, chi nhánh Hà Nội <br />
            Số Tài khoản: <b>1234567799</b> <button className="px-2 rounded bg-gray-300">Copy</button>
            <img className="w-96 h-auto mx-auto" src="https://kalite.vn/wp-content/uploads/2021/09/maqrkalite.jpg" alt="aaa" />
          </p>
        </div>
        <div className="my-3">
          <span className="text-gray-400 font-bold block mb-3">Action</span>
          <div className="flex w-full">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400 font-medium rounded-lg px-5 py-2.5 mx-auto"
            >
              {TEXT__PAYMENT_REMIND}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LunchDetail
