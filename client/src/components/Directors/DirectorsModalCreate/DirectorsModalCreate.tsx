import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useContextValue } from '../../../state/state'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-apollo'
import { createDirector } from './mutations'

interface IValues {
  name: string
  age: number
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, 'This field must not contain numbers')
    .required('This is a required field'),
  age: yup
    .string()
    .matches(/^[0-9]+$/, 'This field must contain only numbers')
    .required('This is a required field'),
})

const useStyles = makeStyles(() => ({
  form: {
    display: 'grid',
    rowGap: '30px',
    width: 400,
    maxWidth: '100%',
  },
  button: {
    justifySelf: 'start',
  },
}))

export const DirectorsModalCreate: React.FC = () => {
  const { modal, setModal } = useContextValue()
  const { register, handleSubmit, errors } = useForm<IValues>({
    resolver: yupResolver(schema),
  })
  const styles = useStyles()
  const [createD] = useMutation(createDirector)

  const closeHandler = () => setModal('')

  const submitHandler = handleSubmit(data => {
    const { name, age } = data

    createD({
      variables: { DName: name, age: +age },
    })
    closeHandler()
  })

  return (
    <Dialog
      open={modal === 'DIRECTORS_CREATE'}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle>Create a director</DialogTitle>
      <DialogContent>
        <form
          action="#"
          noValidate
          onSubmit={submitHandler}
          className={styles.form}>
          <TextField
            type="text"
            label="Name"
            name="name"
            color="secondary"
            variant="filled"
            inputRef={register({ required: true })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            type="text"
            label="Age"
            name="age"
            color="secondary"
            variant="filled"
            inputRef={register({ required: true })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={styles.button}>
            Create a director
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
