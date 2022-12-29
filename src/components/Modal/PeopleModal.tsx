import { getListUser } from '@app/libs/api/EventApi'
import { User } from '@app/server/firebaseType'
import { selectedListMemberStore, setListUser } from '@app/stores/events'
import { useAppDispatch, useAppSelector } from '@app/stores/hook'
import { Box, Button, Modal, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
type PropsType = {
  open: boolean
  setOpen: any
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
function PeopleModal({ open, setOpen }: PropsType) {
  const [userData, setUserData] = useState<User[]>([])
  const { selectedListMember } = useAppSelector(selectedListMemberStore)
  const [selectingMembers, setSelectingMembers] = useState<User[]>([...selectedListMember])
  const dispatch = useAppDispatch()
  const handleClickRow = (user: User) => {
    const tempMembers = [...selectingMembers]
    const index = tempMembers.findIndex((u) => u.uid === user.uid)
    if (index > -1) {
      tempMembers.splice(index, 1)
    } else {
      tempMembers.push(user)
    }
    setSelectingMembers(tempMembers)
  }
  const handleAdd = () => {
    dispatch(setListUser(selectingMembers))
    setSelectingMembers([])
    setOpen(false)
  }

  useEffect(() => {
    getListUser().then((data) => setUserData(data))
  }, [])

  useEffect(() => {
    setSelectingMembers([...selectedListMember])
  }, [open])

  const handleOnClose = () => {
    setOpen(false)
    setSelectingMembers([])
  }

  return (
    <Modal open={open} onClose={handleOnClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h5">Chọn người đi ăn</Typography>
        {userData?.map((item: User) => (
          <Box
            key={Number(item.uid)}
            className={`hover:cursor-pointer ${selectingMembers.find((user) => item.uid === user.uid) ? 'bg-green-300' : ''} p-3 rounded-md mb-2`}
            onClick={() => handleClickRow(item)}
          >
            <Typography>{item.name || item.email || 'no name'}</Typography>
          </Box>
        ))}
        <Button onClick={handleAdd} variant="contained">
          Add People
        </Button>
      </Box>
    </Modal>
  )
}

export default PeopleModal
