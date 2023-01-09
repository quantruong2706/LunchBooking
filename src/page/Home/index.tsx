import { PAGES } from '@app/contants'

import { getHomeData } from '@app/libs/api/home'
import { setSelectedListMember } from '@app/stores/events'
import { setCurrentPage } from '@app/stores/footer'
import { useAppSelector } from '@app/stores/hook'
import { userStore } from '@app/stores/user'
import { list } from '@firebase/storage'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '@app/stores/hook'

export default function HomePage() {
  const user = useAppSelector(userStore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCurrentPage(PAGES.HOME));

    getHomeData().then((e) => {
      setListEvent(e)
    })
  }, [])

  const [listEvent, setListEvent] = useState<any>()
  console.log('listEvent',listEvent);
  const css = `
    html {
      width: 100vw;
      height: 100vh;
    }
    #header, #dashboard, #list {
      font-family: 'Bellota';
      font-style: normal;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    #hello {
      font-family: 'Bellota';
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 23px;
      /* identical to box height */

      color: #000000;
    }
    #username {
      font-family: 'Bellota';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;

      color: #000000;
    }
    #userImg {
      width: 64px;
      height: auto;
      border-radius: 32px;
      float: right;

      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
    .box {
      background: #FFFFFF;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      height: 100%;
    }
    .item {
      margin: 10px;
      padding: 20px;
    }
    .itemHeader {
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 20px;
    }
    .itemDetail {
      float: right;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
    }
    .divider {
      border: 1px solid #9C9C9C;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .text-right {
      float: right;
    }
    .text-bold {
      font-weight: 700;
    }
    .text-link {
      text-decoration-line: underline;
      color: #0075FF;
    }
  `

  const getTotalUnPaidAmount = () => {
    return 0;
  }

  const getTotalRequirePayment = () => {
    return 0;
  }

  return (
    (listEvent ? 
    <Container>
      <style>{css}</style>
      <Grid id="header" container direction="row" alignItems="center">
        <Grid item xs={10}>
          <p id="hello">Xin chào</p>
          <p id="username">{user.name}</p>
        </Grid>
        <Grid item xs={2}>
          <Link to="/profile">
            <img id="userImg" src={user.photoURL} alt="user_photo" referrerPolicy="no-referrer" />
          </Link>
        </Grid>
      </Grid>
      <Grid id="dashboard" container direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{ marginLeft: { xs: '-12px', sm: '0' } }}>
        <Grid className="item box" item xs={6} sm={3} sx={{ maxWidth: { xs: '43vw', sm: '20vw', lg: '14vw' } }}>
          <p className="itemHeader">Tham gia</p>
          <p className="itemDetail">{listEvent.isMember.length}</p>
        </Grid>
        <Grid className="item box" item xs={6} sm={3} sx={{ maxWidth: { xs: '43vw', sm: '20vw', lg: '14vw' } }}>
          <p className="itemHeader">Chủ chi</p>
          <p className="itemDetail">{listEvent.isHost.length}</p>
        </Grid>
        <Grid className="item box" item sm={3} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: { sm: '20vw', lg: '14vw' } }}>
          <p className="itemHeader">Cần trả</p>
          <p className="itemDetail">{listEvent.unPaidList.length}</p>
        </Grid>
        <Grid className="item box" item sm={3} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: { sm: '20vw', lg: '14vw' } }}>
          <p className="itemHeader">Cần đòi</p>
          <p className="itemDetail">{listEvent.requirePaymentList.length}</p>
        </Grid>
        </Grid>
        <Grid id="list" container direction="row" justifyContent="center" spacing={3} sx={{marginLeft: { xs: '-12px', sm: '0'} }}>
          <Grid className="item box" item xs={12} sm={6} sx={{maxWidth: { sm: '43vw', lg: '29vw'} }}>
            <div>
              <span className="text-bold">Số bữa chưa trả</span>
              <span className="text-right">{listEvent.unPaidList.length} bữa</span>
            </div>
            <hr className="divider"/>
            {listEvent.unPaidList.length > 0 ? listEvent.unPaidList.map(data =>
              <div key={data.id}>
                <Link to={'/events/' + data.eventId} className="text-link">{data.name}</Link>
                <span className="text-right">{data.amount}</span>
              </div>
             ): <img src="/src/assets/paid_logo.webp" alt="paid"/>}
            <hr className="divider"/>
            <div>
              <span className="text-bold">Tổng</span>
              <span className="text-right">{getTotalUnPaidAmount()}</span>
            </div>
          </Grid>
          <Grid className="item box" item xs={12} sm={6} sx={{maxWidth: { sm: '43vw', lg: '29vw'} }}>
          <div>
            <span className="text-bold">Số bữa chưa đòi</span>
            <span className="text-right">{listEvent.requirePaymentList.length} bữa</span>
          </div>
          <hr className="divider" />
          {listEvent.requirePaymentList.length > 0 ? (
            listEvent.requirePaymentList.map((data) => (
              <div key={data.id}>
                <Link to={'/events/' + data.id} className="text-link">
                  {data.eventName}
                </Link>
                <span className="text-right">{data.members ? Math.round(data.totalAmount || 0 / data.members.length) : 0}</span>
              </div>
             ))): <img src="/src/assets/paid_logo.webp" alt="paid"/>}
            <hr className="divider"/>
            <div>
              <span className="text-bold">Tổng</span>
              <span className="text-right">{getTotalRequirePayment()}</span>
            </div>
          </Grid>
      </Grid>
      <div></div>
    </Container>
    : <></>)
  )
}
