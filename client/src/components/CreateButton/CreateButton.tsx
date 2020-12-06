import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { useContextValue, TModal } from '../../state/state'

const useStyles = makeStyles(() => ({
  button: {
    position: 'absolute',
    right: '30px',
    bottom: '30px',
    borderRadius: '50%',
    width: 70,
    height: 70,
  },
  span: {
    fontSize: '2rem',
  },
}))

interface IProps {
  modalType: TModal
}

export const CreateButton: React.FC<IProps> = ({ children, modalType }) => {
  const { button, span } = useStyles()
  const { setModal } = useContextValue()

  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => setModal(modalType)}
      className={button}>
      <span className={span}>{children}</span>
    </Button>
  )
}
