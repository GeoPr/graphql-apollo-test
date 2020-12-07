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
import { useQuery } from 'react-apollo'
import { Loader } from '../../Loader/Loader'
import { directosQuery } from './queries'
import { IData } from './queries'
import { DirectorsModalRemove } from '../DirectorsModalRemove/DirectorsModalRemove'
import { TModal, useContextValue } from '../../../state/state'
import {
  IValues,
  DirectorModalEdit,
} from '../DirectorModalEdit/DirectorModalEdit'
import { CreateButton } from '../../CreateButton/CreateButton'
import { DirectorsModalCreate } from '../DirectorsModalCreate/DirectorsModalCreate'
import { usePaperStyles } from '../../../UIStyles/UIStyles'

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
  const { paper } = usePaperStyles()

  if (loading) return <Loader />

  const closeMenu = () => setAnchorEl(null)

  const iconButtonHandler = (e: any, { id, name, age }: IValues) => {
    setAnchorEl(e.currentTarget)
    setRemovingId(id!)
    setValues({
      name: name,
      age: age.toString(),
      id: id,
    })
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
                      Age
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
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
                      <TableCell component="th" scope="row" align="center">
                        {director.name}
                      </TableCell>
                      <TableCell align="center">{director.age}</TableCell>
                      <TableCell align="center">
                        {director.movies.map((movie, key) => (
                          <div key={movie.name}>
                            {`${key + 1}. `}
                            {movie.name}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell align="center">
                        <>
                          <IconButton
                            color="inherit"
                            onClick={e => iconButtonHandler(e, director)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={!!anchorEl}
                            onClose={closeMenu}>
                            <MenuItem
                              onClick={() => menuItemHandler('DIRECTORS_EDIT')}>
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                menuItemHandler('DIRECTORS_REMOVE')
                              }>
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
