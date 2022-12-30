import { Link } from 'react-router-dom'
import { useAppSelector } from "@app/stores/hook"
import { userStore } from "@app/stores/user"
import { Grid } from "@mui/material"
import { Container } from "@mui/system"

export interface IHomePageProps {
  ahihi: string
}

export default function HomePage(props: IHomePageProps) {
  const user = useAppSelector(userStore)
  const dataEvents = [
      {
        id: 1,
        name: "Gà Mạnh Hoạch",
        type: 'admin',
        total: 1200000,
        cost: 100000
      },
      {
        id: 2,
        name: "Phật Nhảy Tường",
        type: 'admin',
        total: 1200000,
        cost: 100000
      },
      {
        id: 3,
        name: "1900s",
        type: 'member',
        total: 1200000,
        cost: 100000
      },
      {
        id: 4,
        name: "Bia Tạ Hiện",
        type: 'member',
        total: 1200000,
        cost: 100000
      },
      {
        id: 5,
        name: "Trà Sữa sương sương",
        type: 'member',
        total: 1200000,
        cost: 80000
      },
      {
        id: 6,
        name: "Bánh Mì Hội An",
        type: 'member',
        total: 1200000,
        cost: 50000
      },
  ];
  const css = `
    html {
      width: 100vw;
      height: 100vh;
    }
    #header, #dashboard, #list {
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

  return (
    <Container>
      <style>{css}</style>
      <Grid id="header" container direction="row" alignItems="center">
        <Grid item xs={10}>
          <p id="hello">Xin chào</p>
          <p id="username">{user.displayName}</p>
        </Grid>
        <Grid item xs={2}>
          <Link to="/my-profile"><img id="userImg" src={user.photoURL} alt="user_photo"/></Link>
        </Grid>
      </Grid>
      <Grid id="dashboard" container direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{marginLeft: { xs: '-12px', sm: '0'} }}>
        <Grid className="item box" item xs={6} sm={3} sx={{maxWidth: { xs: '43vw', sm: '20vw', lg: '14vw'} }}>
          <p className="itemHeader">Tham gia</p>
          <p className="itemDetail">12</p>
        </Grid>
        <Grid className="item box" item xs={6} sm={3} sx={{maxWidth: { xs: '43vw', sm: '20vw', lg: '14vw'} }}>
          <p className="itemHeader">Chủ chi</p>
          <p className="itemDetail">12</p>
        </Grid>
        <Grid className="item box" item sm={3} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: { sm: '20vw', lg: '14vw'} }}>
          <p className="itemHeader">Cần trả</p>
          <p className="itemDetail">{dataEvents.filter(x => x.type == "member").reduce((total, data) => total += data.cost, 0)}</p>
        </Grid>
        <Grid className="item box" item sm={3} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: { sm: '20vw', lg: '14vw'} }}>
          <p className="itemHeader">Cần đòi</p>
          <p className="itemDetail">{dataEvents.filter(x => x.type == "admin").reduce((total, data) => total += data.total, 0)}</p>
        </Grid>
        </Grid>
        <Grid id="list" container direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{marginLeft: { xs: '-12px', sm: '0'} }}>
          <Grid className="item box" item xs={12} sm={6} sx={{maxWidth: { sm: '43vw', lg: '29vw'} }}>
            <div>
              <span className="text-bold">Số bữa chưa trả</span>
              <span className="text-right">{dataEvents.filter(x => x.type == "member").length} bữa</span>
            </div>
            <hr className="divider"/>
            {dataEvents.filter(x => x.type == "member").length > 0 ? dataEvents.filter(x => x.type == "member").map(data =>
              <div key={data.id}>
                <Link to={'/events/' + data.id} className="text-link">{data.name}</Link>
                <span className="text-right">{data.cost}</span>
              </div>
             ): <img src="/src/assets/paid_logo.webp" alt="paid"/>}
            <hr className="divider"/>
            <div>
              <span className="text-bold">Total</span>
              <span className="text-right">{dataEvents.filter(x => x.type == "member").reduce((total, data) => total += data.cost, 0)}</span>
            </div>
          </Grid>
          <Grid className="item box" item xs={12} sm={6} sx={{maxWidth: { sm: '43vw', lg: '29vw'} }}>
          <div>
              <span className="text-bold">Số bữa cần đòi</span>
              <span className="text-right">{dataEvents.filter(x => x.type == "admin").length} bữa</span>
            </div>
            <hr className="divider"/>
            {dataEvents.filter(x => x.type == "admin").length > 0 ? dataEvents.filter(x => x.type == "admin").map(data =>
              <div key={data.id}>
                <Link to={'/events/' + data.id} className="text-link">{data.name}</Link>
                <span className="text-right">{data.total}</span>
              </div>
             ): <img src="/src/assets/paid_logo.webp" alt="paid"/>}
            <hr className="divider"/>
            <div>
              <span className="text-bold">Total</span>
              <span className="text-right">{dataEvents.filter(x => x.type == "admin").reduce((total, data) => total += data.total, 0)}</span>
            </div>
          </Grid>
        </Grid>
      <div>
        
      </div>
    </Container>
  )
}