import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core'
import React from 'react'
import { useContextValue } from '../../../state/state'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-apollo'
import { editDirector } from './mutations'

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, 'This field must not contain numbers')
    .required('This is a required field'),
  age: yup
    .string()
    .matches(/^[0-9]+$/, 'This field must contain only numbers')
    .required('This is a required field'),
  id: yup.string(),
})

export interface IValues {
  name: string
  age: string | number
  id?: string
}

const useStyles = makeStyles(() => ({
  form: {
    display: 'grid',
    width: 400,
    maxWidth: '100%',
    rowGap: '15px',
  },
  button: {
    justifySelf: 'start',
  },
}))

export const DirectorModalEdit: React.FC<IValues> = ({ age, name, id }) => {
  const { modal, setModal } = useContextValue()
  const { register, handleSubmit, errors } = useForm<IValues>({
    resolver: yupResolver(schema),
  })
  const [updateD] = useMutation(editDirector)
  const styles = useStyles()

  const closeHandler = () => {
    setModal('')
  }

  const submitHandler = handleSubmit(data => {
    const { age, name, id } = data

    updateD({
      variables: { name, age: +age, id },
    })
    closeHandler()
  })

  return (
    <Dialog
      open={modal === 'DIRECTORS_EDIT'}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle>Edit the director</DialogTitle>
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
            variant="filled"
            color="secondary"
            inputRef={register({ required: true })}
            error={!!errors?.name}
            helperText={errors.name?.message}
            defaultValue={name}
          />
          <TextField
            type="text"
            label="Age"
            name="age"
            variant="filled"
            color="secondary"
            inputRef={register({ required: true })}
            error={!!errors?.age}
            helperText={errors.age?.message}
            defaultValue={age}
          />
          <TextField
            type="text"
            label="Id"
            name="id"
            variant="filled"
            color="secondary"
            inputRef={register}
            error={!!errors?.id}
            helperText={errors.id?.message}
            defaultValue={id}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={styles.button}>
            Update the director
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
