import React, { useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {
  Menu,
  MenuItem,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core'
import { MoviesModalRemove } from '../MoviesModalRemove/MoviesModalRemove'
import { TModal, useContextValue } from '../../../state/state'
import { IData, IMovie } from './queries'
import { IValues, MoviesModalEdit } from '../MoviesModalEdit/MoviesModalEdit'
import { CreateButton } from '../../CreateButton/CreateButton'
import { MoviesModalCreate } from '../MoviesModalCreate/MoviesModalCreate'
import { usePaperStyles } from '../../../UIStyles/UIStyles'
import { withRefetch } from '../../HOCS/withRefetch'
import { compose } from 'recompose'
import { withLoader } from '../../HOCS/withLoader'

export interface ITableProps<TData> {
  loading: boolean
  data: TData | undefined
  refetch: () => any
}

const MoviesTableComponent: React.FC<ITableProps<IData>> = ({ data }) => {
  const [removingId, setRemovingId] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const { setModal } = useContextValue()
  const [values, setValues] = useState<IValues>({
    name: '',
    genre: '',
    directorId: '',
    id: '',
  })
  const { paper } = usePaperStyles()

  const openHandler = (e: any) => {
    setAnchorEl(e.currentTarget)
  }

  const closeMenu = () => setAnchorEl(null)

  const iconButtonHandler = (e: any, { genre, id, name, director }: IMovie) => {
    openHandler(e)
    setRemovingId(id.toString())
    setValues(prev => ({
      ...prev,
      name: name,
      genre: genre,
      directorId: director.id.toString(),
      id: id.toString(),
    }))
  }

  const menuItemHandler = (modalType: TModal) => {
    closeMenu()
    setModal(modalType)
  }

  return (
    <>
      {data && (
        <>
          <Paper className={paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography component="h6" variant="h6">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography component="h6" variant="h6">
                      Genre
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography component="h6" variant="h6">
                      Director
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.movies.map(movie => {
                  return (
                    <TableRow key={movie.id}>
                      <TableCell component="th" scope="row" align="center">
                        {movie.name}
                      </TableCell>
                      <TableCell align="center">{movie.genre}</TableCell>
                      <TableCell align="center">
                        {movie.director.name}
                      </TableCell>
                      <TableCell align="center">
                        <>
                          <IconButton
                            color="inherit"
                            onClick={e => iconButtonHandler(e, movie)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={!!anchorEl}
                            onClose={closeMenu}>
                            <MenuItem
                              onClick={() => menuItemHandler('MOVIES_EDIT')}>
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => menuItemHandler('MOVIES_REMOVE')}>
                              Remove
                            </MenuItem>
                          </Menu>
                        </>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <CreateButton modalType="MOVIES_CREATE">+</CreateButton>
          </Paper>
          <MoviesModalRemove removingId={removingId} />
          <MoviesModalEdit {...values} />
          <MoviesModalCreate />
        </>
      )}
    </>
  )
}

export const MoviesTable = compose<any, any>(
  withRefetch,
  withLoader,
)(MoviesTableComponent)
