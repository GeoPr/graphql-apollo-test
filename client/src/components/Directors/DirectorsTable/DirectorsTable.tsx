import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import MoreIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import { useQuery } from 'react-apollo'
import { Loader } from '../../Loader/Loader'
import { directosQuery } from './queries'
import { IData } from './queries'
import { DirectorsModalRemove } from '../DirectorsModalRemove/DirectorsModalRemove'
import { useContextValue } from '../../../state/state'
import {
  IValues,
  DirectorModalEdit,
} from '../DirectorModalEdit/DirectorModalEdit'
import { CreateButton } from '../../CreateButton/CreateButton'
import { DirectorsModalCreate } from '../DirectorsModalCreate/DirectorsModalCreate'

const useStyles = makeStyles(() => ({
  paper: {
    position: 'relative',
    minHeight: 'calc(100vh - 100px)',
  },
}))

export const DirectorsTable: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { data, loading } = useQuery<IData>(directosQuery)
  const { setModal } = useContextValue()
  const [removingId, setRemovingId] = useState('')
  const [values, setValues] = useState<IValues>({
    name: '',
    age: '',
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
                  <TableCell>
                    <Typography component="h6" variant="h6">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography component="h6" variant="h6">
                      Age
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component="h6" variant="h6">
                      Movies
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.directors.map(director => {
                  return (
                    <TableRow key={director.id}>
                      <TableCell component="th" scope="row">
                        {director.name}
                      </TableCell>
                      <TableCell>{director.age}</TableCell>
                      <TableCell align="right">
                        {director.movies.map((movie, key) => (
                          <div key={movie.name}>
                            {`${key + 1}. `}
                            {movie.name}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        <>
                          <IconButton
                            color="inherit"
                            onClick={e => {
                              openHandler(e)
                              setRemovingId(director.id)
                              setValues({
                                name: director.name,
                                age: director.age.toString(),
                                id: director.id,
                              })
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
                              onClick={() => {
                                closeHandler()
                                setModal('DIRECTORS_EDIT')
                              }}>
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setModal('DIRECTORS_REMOVE')
                                closeHandler()
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
            <CreateButton modalType="DIRECTORS_CREATE">+</CreateButton>
          </Paper>
          <DirectorsModalRemove removingId={removingId} />
          <DirectorModalEdit {...values} />
          <DirectorsModalCreate />
        </>
      )}
    </>
  )
}
