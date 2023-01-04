import { PAGES } from '@app/contants'
import { setCurrentPage } from '@app/stores/footer'
import { useAppSelector } from '@app/stores/hook'
import { userStore } from '@app/stores/user'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../stores/hook'
import { getListEvent } from '@app/libs/api/events'
import { getToPathname } from '@remix-run/router'
import { IEvent, User } from '@app/server/firebaseType'

export interface IHomePageProps {
  ahihi: string
}

export default function HomePage(props: IHomePageProps) {
  const user = useAppSelector(userStore)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCurrentPage(PAGES.HOME));
    
    getListEvent().then((e) => {
      setListEvent(e)
    })
  }, [])

  const [listEvent, setListEvent] = useState<IEvent[]>([])
  console.log(listEvent);
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
  const getJoinedEvent = () => {
    let result = listEvent.filter(x => {
      Object.values(x.members).some(member => member.uid == user.uid);
    });
    return result;
  }

  const getPaidEvent = () => {
    let result = listEvent.filter(x => x.userPayId == user.uid);
    return result;
  }

  const getTotalPaidEvent = () => {
    let result = listEvent.filter(x => x.userPayId == user.uid).reduce((total, data) => total += data.totalAmount, 0);
    return Math.round(result);
  }

  const getNotPaidEvent = () => {
    let result = listEvent.filter(x => {
      Object.values(x.members).some(member => member.uid == user.uid && (member.isPaid !== undefined && member.isPaid !== true))
    });
    return result;
  }

  const getTotalNotPaidAmount = () => {
    let result = getNotPaidEvent().reduce((total, data) => total += (data.totalAmount / data.members.length), 0);
    return Math.round(result);
  }

  return (
    <Container>
      <style>{css}</style>
      <Grid id="header" container direction="row" alignItems="center">
        <Grid item xs={10}>
          <p id="hello">Xin chào</p>
          <p id="username">{user.displayName}</p>
        </Grid>
        <Grid item xs={2}>
          <Link to="/profile">
            <img id="userImg" src={user.photoURL} alt="user_photo" />
          </Link>
        </Grid>
      </Grid>
      <Grid id="dashboard" container direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{ marginLeft: { xs: '-12px', sm: '0' } }}>
        <Grid className="item box" item xs={6} sm={3} sx={{ maxWidth: { xs: '43vw', sm: '20vw', lg: '14vw' } }}>
          <p className="itemHeader">Tham gia</p>
          <p className="itemDetail">{getJoinedEvent().length}</p>
        </Grid>
        <Grid className="item box" item xs={6} sm={3} sx={{ maxWidth: { xs: '43vw', sm: '20vw', lg: '14vw' } }}>
          <p className="itemHeader">Chủ chi</p>
          <p className="itemDetail">{getPaidEvent().length}</p>
        </Grid>
        <Grid className="item box" item sm={3} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: { sm: '20vw', lg: '14vw' } }}>
          <p className="itemHeader">Cần trả</p>
          <p className="itemDetail">{getTotalNotPaidAmount()}</p>
        </Grid>
        <Grid className="item box" item sm={3} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: { sm: '20vw', lg: '14vw' } }}>
          <p className="itemHeader">Cần đòi</p>
          <p className="itemDetail">{getTotalPaidEvent()}</p>
        </Grid>
        </Grid>
        <Grid id="list" container direction="row" justifyContent="center" spacing={3} sx={{marginLeft: { xs: '-12px', sm: '0'} }}>
          <Grid className="item box" item xs={12} sm={6} sx={{maxWidth: { sm: '43vw', lg: '29vw'} }}>
            <div>
              <span className="text-bold">Số bữa chưa trả</span>
              <span className="text-right">{getNotPaidEvent().length} bữa</span>
            </div>
            <hr className="divider"/>
            {getNotPaidEvent().length > 0 ? getNotPaidEvent().map(data =>
              <div key={data.id}>
                <Link to={'/events/' + data.id} className="text-link">{data.eventName}</Link>
                <span className="text-right">{Math.round(data.totalAmount / data.members.length)}</span>
              </div>
             ): <img src="/src/assets/paid_logo.webp" alt="paid"/>}
            <hr className="divider"/>
            <div>
              <span className="text-bold">Tổng</span>
              <span className="text-right">{getTotalNotPaidAmount()}</span>
            </div>
          </Grid>
          <Grid className="item box" item xs={12} sm={6} sx={{maxWidth: { sm: '43vw', lg: '29vw'} }}>
          <div>
              <span className="text-bold">Số bữa cần đòi</span>
              <span className="text-right">{listEvent.filter(x => x.userPayId == user.uid).length} bữa</span>
            </div>
            <hr className="divider"/>
            {listEvent.filter(x => x.userPayId == user.uid).length > 0 ? listEvent.filter(x => x.userPayId == user.uid).map(data =>
              <div key={data.id}>
                <Link to={'/events/' + data.id} className="text-link">{data.eventName}</Link>
                <span className="text-right">{Math.round(data.totalAmount)}</span>
              </div>
             ): <img src="/src/assets/paid_logo.webp" alt="paid"/>}
            <hr className="divider"/>
            <div>
              <span className="text-bold">Tổng</span>
              <span className="text-right">{getTotalPaidEvent()}</span>
            </div>
          </Grid>
      </Grid>
      <div></div>
    </Container>
  )
}
