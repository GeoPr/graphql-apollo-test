import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import MoreIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import { MoviesModalRemove } from '../MoviesModalRemove/MoviesModalRemove'
import { useContextValue } from '../../../state/state'
import { useQuery } from 'react-apollo'
import { Loader } from '../../Loader/Loader'
import { moviesQuery, IData } from './queries'
import { IValues, MoviesModalEdit } from '../MoviesModalEdit/MoviesModalEdit'
import { CreateButton } from '../../CreateButton/CreateButton'
import { MoviesModalCreate } from '../MoviesModalCreate/MoviesModalCreate'

const useStyles = makeStyles(() => ({
  paper: {
    position: 'relative',
    minHeight: 'calc(100vh - 100px)',
  },
}))

export const MoviesTable: React.FC = () => {
  const { data, loading } = useQuery<IData>(moviesQuery)
  const [removingId, setRemovingId] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const { setModal } = useContextValue()
  const [values, setValues] = useState<IValues>({
    name: '',
    genre: '',
    directorId: '',
    id: '',
  })
  const { paper } = useStyles()

  if (loading) {
    return <Loader />
  }

  const openHandler = (e: any) => {
    setAnchorEl(e.currentTarget)
  }

  const closeHandler = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {data && (
        <>
          <Paper className={paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">
                    <Typography component="h6" variant="h6">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="h6" variant="h6">
                      Genre
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
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
                      <TableCell component="th" scope="row" align="right">
                        {movie.name}
                      </TableCell>
                      <TableCell align="right">{movie.genre}</TableCell>
                      <TableCell align="right">{movie.director.name}</TableCell>
                      <TableCell align="right">
                        <>
                          <IconButton
                            color="inherit"
                            onClick={e => {
                              openHandler(e)
                              setRemovingId(movie.id.toString())
                              setValues(prev => ({
                                ...prev,
                                name: movie.name,
                                genre: movie.genre,
                                directorId: movie.director.id.toString(),
                                id: movie.id.toString(),
                              }))
                            }}>
                            <MoreIcon />
                          </IconButton>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={!!anchorEl}
                            onClose={closeHandler}>
                            <MenuItem
                              onClick={e => {
                                setModal('MOVIES_EDIT')
                                openHandler(e)
                              }}>
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={e => {
                                setModal('MOVIES_REMOVE')
                                openHandler(e)
                              }}>
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
