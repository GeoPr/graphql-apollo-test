import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useContextValue } from '../../../state/state'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import { useMutation } from 'react-apollo'
import { editMovie } from './mutations'
import { useFormStyles } from '../../../UIStyles/UIStyles'

export interface IValues {
  name: string
  genre: string
  directorId: string
  id: string
}

const schema = yup.object().shape({
  name: yup.string().required('This is a required field'),
  genre: yup.string().required('This is a required field'),
  directorId: yup.string(),
  id: yup.string(),
})

export const MoviesModalEdit: React.FC<IValues> = ({
  directorId,
  genre,
  name,
  id,
}) => {
  const { register, handleSubmit, errors } = useForm<IValues>({
    resolver: yupResolver(schema),
  })
  const { modal, closeHandler } = useContextValue()
  const styles = useFormStyles()
  const [updateM] = useMutation(editMovie)

  const submitHandler = handleSubmit(data => {
    const { directorId, genre, name, id } = data

    updateM({
      variables: { directorId, genre, name, id },
    })
    closeHandler()
  })

  return (
    <Dialog
      open={modal === 'MOVIES_EDIT'}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle>Edit the movie</DialogTitle>
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
            label="Genre"
            name="genre"
            variant="filled"
            color="secondary"
            inputRef={register({ required: true })}
            error={!!errors?.genre}
            helperText={errors.genre?.message}
            defaultValue={genre}
          />
          <TextField
            type="text"
            label="Director id"
            name="directorId"
            variant="filled"
            color="secondary"
            inputRef={register}
            error={!!errors?.directorId}
            helperText={errors.directorId?.message}
            defaultValue={directorId}
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
            Update the movie
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
