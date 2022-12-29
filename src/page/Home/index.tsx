import { useAppSelector } from "@app/stores/hook"
import { userStore } from "@app/stores/user"
import { Grid } from "@mui/material"
import Paper from "@mui/material/Paper"
import { Container } from "@mui/system"
import style from './style.css'

export interface IHomePageProps {
  ahihi: string
}

export default function HomePage(props: IHomePageProps) {
  const user = useAppSelector(userStore)
  const css = `
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
      height: 64px;
      border-radius: 32px;

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
          <img id="userImg" src={user.photoURL} alt="user_photo"/>
        </Grid>
      </Grid>
      <Grid id="dashboard" container direction="row" alignItems="center" justifyContent="center" spacing={3}>
        <Grid className="item box" item xs={6} sm={3} sx={{maxWidth: { xs: '40vw', sm: '14vw'} }}>
          <p className="itemHeader">Số bữa đã tham gia</p>
          <p className="itemDetail">12</p>
        </Grid>
        <Grid className="item box" item xs={6} sm={3} sx={{maxWidth: { xs: '40vw', sm: '14vw'} }}>
          <p className="itemHeader">Số lần chủ chi</p>
          <p className="itemDetail">12</p>
        </Grid>
        <Grid className="item box" item sm={3} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: { sm: '14vw'} }}>
          <p className="itemHeader">Số tiền chưa trả</p>
          <p className="itemDetail">400.000</p>
        </Grid>
        <Grid className="item box" item sm={3} sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: { sm: '14vw'} }}>
          <p className="itemHeader">Số tiền chưa đòi</p>
          <p className="itemDetail">1.920.000</p>
        </Grid>
        </Grid>
        <Grid id="list" container direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{marginLeft: { xs: '-12px', sm: '0'} }}>
          <Grid className="item box" item xs={12} sm={6} sx={{maxWidth: { sm: '29vw'} }}>
            <div>
              <span className="text-bold">Số bữa chưa trả</span>
              <span className="text-right">4 bữa</span>
            </div>
            <hr className="divider"/>
            <div>
              <a href="/" className="text-link">Gà Mạch Hoạch</a>
              <span className="text-right">100.000</span>
            </div>
            <div>
              <a href="/" className="text-link">Gà Mạch Hoạch</a>
              <span className="text-right">100.000</span>
            </div>
            <div>
              <a href="/" className="text-link">Gà Mạch Hoạch</a>
              <span className="text-right">100.000</span>
            </div>
            <div>
              <a href="/" className="text-link">Gà Mạch Hoạch</a>
              <span className="text-right">100.000</span>
            </div>
            <hr className="divider"/>
            <div>
              <span className="text-bold">Total</span>
              <span className="text-right">400.000</span>
            </div>
          </Grid>
          <Grid className="item box" item xs={12} sm={6} sx={{maxWidth: { sm: '29vw'} }}>
          <div>
              <span className="text-bold">Số bữa chưa trả</span>
              <span className="text-right">4 bữa</span>
            </div>
            <hr className="divider"/>
            <div>
              <a href="/" className="text-link">Gà Mạch Hoạch</a>
              <span className="text-right">100.000</span>
            </div>
            <div>
              <a href="/" className="text-link">Gà Mạch Hoạch</a>
              <span className="text-right">100.000</span>
            </div>
            <div>
              <a href="/" className="text-link">Gà Mạch Hoạch</a>
              <span className="text-right">100.000</span>
            </div>
            <div>
              <a href="/" className="text-link">Gà Mạch Hoạch</a>
              <span className="text-right">100.000</span>
            </div>
            <hr className="divider"/>
            <div>
              <span className="text-bold">Total</span>
              <span className="text-right">400.000</span>
            </div>
          </Grid>
        </Grid>
      <div>
        
      </div>
    </Container>
  )
}
