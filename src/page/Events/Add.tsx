// import { ReactComponent as DishImg } from '@app/assets/react.svg'
import PeopleModal from '@app/components/Modal/PeopleModal'
import { User } from '@app/server/firebaseType'
import { selectedListMemberStore } from '@app/stores/events'
import { useAppSelector } from '@app/stores/hook'
import AddIcon from '@mui/icons-material/Add'
import { Box, CardContent, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

function Add() {
  const [date, setDate] = useState<Dayjs | null>(null)
  const [checked, setChecked] = useState([0])
  const { selectedListMember } = useAppSelector(selectedListMemberStore)
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.findIndex(())
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card variant="outlined" className="max-w-[500px]">
        <CardContent>
          <img src="/vite.svg" alt="" />
          <TextField
            fullWidth
            id="filled-required"
            label="Tên"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DatePicker
            className="w-full "
            label="Thời gian"
            value={date}
            onChange={(newValue) => {
              setDate(newValue)
            }}
            renderInput={(params) => (
              <TextField
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                {...params}
              />
            )}
          />
          <Box className="flex items-center">
            <Typography>Thành viên</Typography>
            <Button>
              <AddIcon
                color="success"
                onClick={() => {
                  setOpen(true)
                }}
              />
            </Button>
          </Box>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemText>Đã trả</ListItemText>
              <ListItemText>Tên</ListItemText>
              <ListItemText>Tiền</ListItemText>
            </ListItem>
            {selectedListMember.map((member) => {
              const labelId = `checkbox-list-label-${member.uid}`

              return (
                <ListItem key={member.uid} disablePadding>
                  <ListItemIcon onClick={handleToggle(member.)}>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(member.uid) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <TextField
                    fullWidth
                    id="filled-required"
                    label="Tên"
                    value={member.name || member.email}
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    fullWidth
                    id="filled-required"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </ListItem>
              )
            })}
          </List>
          <Button variant="contained">
            <Typography>Chia đều</Typography>
          </Button>
          <Typography>Người trả bill</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Button variant="contained">
                  {' '}
                  <Typography>Genarate</Typography>
                </Button>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  id="filled-required"
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <TextField
            fullWidth
            id="filled-required"
            variant="standard"
            label="Tổng bill"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="filled-required"
            label="Hoa hồng"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained">
            <Typography>Tạo hóa đơn</Typography>
          </Button>
        </CardContent>
      </Card>
      <PeopleModal open={open} setOpen={setOpen} setPeople={(data: User) => console.log(data)} />
    </>
  )
}

export default Add
