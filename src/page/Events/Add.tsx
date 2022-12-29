// import { ReactComponent as DishImg } from '@app/assets/react.svg'
import PeopleModal from '@app/components/Modal/PeopleModal'
import { setEvent } from '@app/libs/api/EventApi'
import { Event, User } from '@app/server/firebaseType'
import { selectedListMemberStore, setListUser } from '@app/stores/events'
import { useAppDispatch, useAppSelector } from '@app/stores/hook'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, CardContent, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import * as dayjs from 'dayjs'
import _ from 'lodash'
import { useState } from 'react'
const TextFieldStyled = styled(TextField)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    ...theme.typography.subtitle1,
  },
}))
const ButtonStyled = styled(Button)(() => ({
  '&.MuiButton-root': {
    borderRadius: '10px',
  },
}))
const CardStyled = styled(Card)(() => ({
  '&.MuiPaper-root': {
    borderRadius: '15px',
  },
}))

function Add() {
  const initEventValue = {
    address: '',
    date: dayjs(new Date()).format('MM/DD/YYYY'),
    name: '',
    totalAmount: 0,
    userId: '',
    tip: 0,
    billAmount: 0,
  }

  const [eventState, setEventState] = useState<Event>(initEventValue)
  const { selectedListMember } = useAppSelector(selectedListMemberStore)
  const dispatch = useAppDispatch()
  const handleToggle = (memberId: string) => {
    const tempMembers = _.cloneDeep(selectedListMember)
    const index = tempMembers.findIndex((u) => u.uid === memberId)
    if (index > -1) {
      const isPaid = tempMembers[index].isPaid
      tempMembers[index].isPaid = !isPaid
    }
    dispatch(setListUser(tempMembers))
  }
  const handleChangeAmount = (memberId: string | null | undefined, value: number) => {
    const tempMembers = _.cloneDeep(selectedListMember)
    const index = tempMembers.findIndex((u) => u.uid === memberId)
    if (index > -1) {
      tempMembers[index].amount = value
    }
    dispatch(setListUser(tempMembers))
  }
  const [open, setOpen] = useState(false)
  const handleDelete = (member: User) => {
    const newSelectedMember = [...selectedListMember]
    const index = newSelectedMember.findIndex((u) => u.uid === member.uid)
    if (index > -1) {
      newSelectedMember.splice(index, 1)
    }
    dispatch(setListUser(newSelectedMember))
  }
  const handleChangeTextField = (field: string, value: string | number) => {
    setEventState({ ...eventState, [field]: value })
  }
  const handleChangeBill = (value: number) => {
    const total = eventState.tip + value
    setEventState({ ...eventState, billAmount: value, totalAmount: total })
  }
  const handleChangeTip = (value: number) => {
    const total = eventState.billAmount ? eventState.billAmount + value : value
    setEventState({ ...eventState, tip: value, totalAmount: total })
  }
  const handleCreateEvent = async () => {
    const newEventData = { ...eventState, members: selectedListMember }
    await setEvent(newEventData)
  }
  return (
    <>
      <CardStyled variant="outlined" className="max-w-[500px]">
        <CardContent>
          <img src="/vite.svg" alt="" />
          <Box className="mt-6">
            <TextFieldStyled
              required
              fullWidth
              id="filled-required"
              label="Tên"
              value={eventState?.name}
              onChange={(e) => handleChangeTextField('name', e.target.value)}
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box className="mt-6">
            <DatePicker
              className="w-full "
              label="Thời gian"
              value={dayjs(eventState?.date)}
              onChange={(newValue) => {
                handleChangeTextField('date', dayjs(newValue).format('MM/DD/YYYY'))
              }}
              renderInput={(params) => (
                <TextFieldStyled
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...params}
                />
              )}
            />
          </Box>
          <Box className="flex items-center mt-3">
            <Typography variant="subtitle2">Thành viên</Typography>
            <ButtonStyled>
              <AddIcon
                color="success"
                onClick={() => {
                  setOpen(true)
                }}
              />
            </ButtonStyled>
          </Box>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem disablePadding>
              <Typography className="min-w-[50px]" variant="subtitle2">
                Đã trả
              </Typography>
              <Box className="ml-5">
                <Typography className="min-w-[150px]" variant="subtitle2">
                  Tên
                </Typography>
              </Box>
              <Box className="ml-5">
                <Typography className="min-w-[150px]" variant="subtitle2">
                  Tiền
                </Typography>
              </Box>
            </ListItem>
            {selectedListMember.map((member) => {
              const labelId = `checkbox-list-label-${member.uid}`

              return (
                <ListItem key={member.uid} disablePadding>
                  <ListItemIcon onClick={() => (member.uid ? handleToggle(member.uid) : undefined)}>
                    <Checkbox
                      edge="start"
                      // checked={checked.includes(member.uid) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <Box className="ml-5 min-w-[150px]">
                    <Typography noWrap>{member.name || member.email}</Typography>
                  </Box>
                  <Box className="ml-5 min-w-[150px]">
                    <TextFieldStyled
                      fullWidth
                      type="number"
                      id="filled-required"
                      variant="standard"
                      value={member.amount}
                      onChange={(e) => handleChangeAmount(member.uid, Number(e.target.value))}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                  <ButtonStyled onClick={() => handleDelete(member)}>
                    <DeleteIcon />
                  </ButtonStyled>
                </ListItem>
              )
            })}
          </List>
          <Box className="w-full flex justify-end mt-3">
            <ButtonStyled variant="contained" className="mt-6">
              <Typography>Chia đều</Typography>
            </ButtonStyled>
          </Box>
          <Typography variant="subtitle2">Người trả bill</Typography>
          <Box sx={{ flexGrow: 1 }} className="mt-2">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ButtonStyled variant="contained">
                  <Typography>Genarate</Typography>
                </ButtonStyled>
              </Grid>
              <Grid item xs={8}>
                <TextFieldStyled
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
          <Box className="mt-5">
            <TextFieldStyled
              fullWidth
              type="number"
              id="filled-required"
              variant="standard"
              label="Tổng bill"
              value={eventState?.billAmount}
              onChange={(e) => handleChangeBill(Number(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box className="mt-5">
            <TextFieldStyled
              fullWidth
              type="number"
              id="filled-required"
              label="Hoa hồng"
              value={eventState?.tip}
              onChange={(e) => handleChangeTip(Number(e.target.value))}
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box className="mt-5">
            <TextFieldStyled
              fullWidth
              id="filled-required"
              label="Tổng tiền"
              value={eventState?.totalAmount}
              variant="standard"
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box className="flex justify-center my-7">
            <ButtonStyled variant="contained" onClick={handleCreateEvent}>
              <Typography>Tạo hóa đơn</Typography>
            </ButtonStyled>
          </Box>
        </CardContent>
      </CardStyled>
      <PeopleModal open={open} setOpen={setOpen} />
    </>
  )
}

export default Add
