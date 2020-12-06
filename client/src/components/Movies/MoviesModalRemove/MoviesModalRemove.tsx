import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import BlockIcon from '@material-ui/icons/Block'
import { useContextValue } from '../../../state/state'
import { useMutation } from 'react-apollo'
import { removeMovie } from './mutations'

interface IProps {
  removingId: string
}

export const MoviesModalRemove: React.FC<IProps> = ({ removingId }) => {
  const { modal, setModal } = useContextValue()
  const [removeM, { loading }] = useMutation(removeMovie, {
    variables: { id: removingId }
  })

  const closeHandler = () => setModal('')

  const remove = () => {
    removeM()
    closeHandler()
  }

  return (
    <Dialog
      open={modal === 'MOVIES_REMOVE'}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Are you sire that you want to delete element?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you click 'Confirm' this element will be removed from data base.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          <BlockIcon /> Cancel
        </Button>
        <Button onClick={remove} color="primary" autoFocus>
          <DeleteForeverIcon /> Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
