import { PAGES } from '@app/contants'
import { currentPageStore, setCurrentPage } from '@app/stores/footer'
import { useAppDispatch } from '@app/stores/hook'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PeopleIcon from '@mui/icons-material/People'
import { useSelector } from 'react-redux'

const Footer = () => {
  const dispatch = useAppDispatch()
  const currentPage = useSelector(currentPageStore)

  const onClickFooterIcon = (page: string) => {
    dispatch(setCurrentPage(page))
  }

  return (
    <div className="text-center h-[60px] flex justify-around footer" style={{ backgroundColor: '#D9D9D9' }}>
      <button className="flex-1" onClick={() => onClickFooterIcon(PAGES.HOME)}>
        <div>
          <HomeIcon sx={{ color: currentPage === PAGES.HOME ? '#439D0D' : '#A0A0A0' }} />
        </div>
        <div className={`text-[12px] ${currentPage === PAGES.HOME ? 'text-[#439D0D]' : 'text-[#A0A0A0]'}`}>Home</div>
      </button>
      <button className="flex-1" onClick={() => onClickFooterIcon(PAGES.HISTORY)}>
        <div>
          <ListAltIcon sx={{ color: currentPage === PAGES.HISTORY ? '#439D0D' : '#A0A0A0' }} />
        </div>
        <div className={`text-[12px] ${currentPage === PAGES.HISTORY ? 'text-[#439D0D]' : 'text-[#A0A0A0]'}`}>History</div>
      </button>
      <button className="flex flex-col items-center flex-1" onClick={() => onClickFooterIcon(PAGES.ADD_BILL)}>
        <div className="flex text-center items-center mt-[-24px] rounded-[50%] bg-[#d9d9d9] w-[55px] h-[55px] justify-center">
          <AddCircleIcon sx={{ width: '45px', height: '45px', justifyContent: 'center', color: currentPage === PAGES.ADD_BILL ? '#439D0D' : '#B91D37' }} />
        </div>
        <div className={`text-[12px] mt-[-6px] ${currentPage === PAGES.ADD_BILL ? 'text-[#439D0D]' : 'text-[#A0A0A0]'}`}>Add Bill</div>
      </button>
      <button className="flex-1" onClick={() => onClickFooterIcon(PAGES.NOTIFICATIONS)}>
        <div>
          <NotificationsIcon sx={{ color: currentPage === PAGES.NOTIFICATIONS ? '#439D0D' : '#A0A0A0' }} />
        </div>
        <div className={`text-[12px] ${currentPage === PAGES.NOTIFICATIONS ? 'text-[#439D0D]' : 'text-[#A0A0A0]'}`}>Notifications</div>
      </button>
      <button className="flex-1" onClick={() => onClickFooterIcon(PAGES.MEMEBERS)}>
        <div>
          <PeopleIcon sx={{ color: currentPage === PAGES.MEMEBERS ? '#439D0D' : '#A0A0A0' }} />
        </div>
        <div className={`text-[12px] mt-[-6px] ${currentPage === PAGES.MEMEBERS ? 'text-[#439D0D]' : 'text-[#A0A0A0]'}`}>Members</div>
      </button>
    </div>
  )
}

export default Footer
