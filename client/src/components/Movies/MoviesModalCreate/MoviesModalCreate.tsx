import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import React from 'react'
import { useContextValue } from '../../../state/state'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-apollo'
import { createMovie } from './mutations'
import { useFormStyles } from '../../../UIStyles/UIStyles'

interface IValues {
  name: string
  genre: string
  directorId: string
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, 'This field must not contain numbers')
    .required('This is a required field'),
  genre: yup
    .string()
    .matches(/^([^0-9]*)$/, 'This field must not contain numbers')
    .required('This is a required field'),
  directorId: yup.string().required('This is a required field'),
})

export const MoviesModalCreate: React.FC = () => {
  const { modal, closeHandler } = useContextValue()
  const { register, handleSubmit, errors } = useForm<IValues>({
    resolver: yupResolver(schema),
  })
  const styles = useFormStyles()
  const [createM] = useMutation(createMovie)

  const submitHandler = handleSubmit(data => {
    const { name, genre, directorId } = data

    createM({
      variables: { MName: name, genre, directorId },
    })
    closeHandler()
  })

  return (
    <Dialog
      open={modal === 'MOVIES_CREATE'}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle>Create a movie</DialogTitle>
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
          />
          <TextField
            type="text"
            label="Genre"
            name="genre"
            variant="filled"
            color="secondary"
            inputRef={register({ required: true })}
            error={!!errors?.genre}
            helperText={errors.genre?.message}
          />
          <TextField
            type="text"
            label="Director id"
            name="directorId"
            variant="filled"
            color="secondary"
            inputRef={register({ required: true })}
            error={!!errors?.directorId}
            helperText={errors.directorId?.message}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={styles.button}>
            Create a movie
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
