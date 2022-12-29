import { getListEvent } from '@app/libs/api/events'
import { TEXT__HOST, TEXT__MEMBER, TEXT__PAID, TEXT__UNPAID } from '@app/libs/constant'
import { formatMoney } from '@app/libs/functions'
import { Event } from '@app/server/firebaseType'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const List = () => {
  const [test, _] = useState(false)
  const [listEvent, setListEvent] = useState<Event[]>([])

  useEffect(() => {
    getListEvent().then((e) => {
      setListEvent(e)
    })
  }, [])
  return (
    <main className="flex">
      <div className="mx-auto w-11/12 max-w-md">
        <div className="text-center my-6">
          <h2 className="text-2xl">Lịch sử đi ăn</h2>
        </div>
        <div className="inline-flex w-full" role="group">
          <button className="min-w-[33%] py-4 px-4 text-gray-900 bg-white rounded-l-lg hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700">
            Thời gian
          </button>
          <button className="min-w-[33%] py-4 px-4 text-gray-900 bg-white border-x border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700">
            Thanh toán
          </button>
          <button className="min-w-[33%] py-4 px-4 text-gray-900 bg-white rounded-r-lg hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700">
            Hình thức
          </button>
        </div>
        <ul className="mt-10">
          {listEvent.map((item) => (
            <li className="my-4" key={item.id}>
              <Link to={item.id} className="flex bg-white rounded-3xl p-3">
                <div className="mx-auto mb-5 p-1 w-1/3">
                  <div className="relative">
                    <img src="https://picsum.photos/200/300?grayscale" className="w-20 h-20 rounded-full mx-auto" alt="" />
                    <span
                      className={
                        'absolute py-1 px-2 block font-normal text-white rounded-lg -bottom-4 inset-x-2/4 -translate-x-2/4 ' +
                        (test ? 'bg-red-700 w-[65px]' : 'bg-green-600 w-[80px]')
                      }
                    >
                      {test ? TEXT__HOST : TEXT__MEMBER}
                    </span>
                  </div>
                </div>
                <div className="w-2/3 relative flex flex-col justify-between">
                  <time>{item.date}</time>
                  <div className="mt-3">
                    <h3 className="font-medium">{item.name}</h3>
                    <span>
                      Chủ trì:&nbsp;
                      <b>Hương</b>
                    </span>
                    <br />
                    <span>
                      Số tiền chưa đòi: <b>{formatMoney(item.billAmount)}</b>
                    </span>
                  </div>
                  <span
                    className={'absolute py-1 px-3 block font-normal text-white rounded-xl text-xl top-0 right-0 ' + (test ? 'bg-red-700' : 'bg-green-600')}
                  >
                    {!test ? TEXT__PAID : TEXT__UNPAID}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default List
