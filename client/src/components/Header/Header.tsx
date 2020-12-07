import React from 'react'
import MovieIcon from '@material-ui/icons/Movie'
import { AppBar, Button, makeStyles, Typography } from '@material-ui/core'
import FolderSharedIcon from '@material-ui/icons/FolderShared'
import { useContextValue } from '../../state/state'

const tabs = [
  { icon: <MovieIcon />, label: 'Movies', idx: 0 },
  { icon: <FolderSharedIcon />, label: 'Directors', idx: 1 },
]

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplate: 'auto / repeat(2, 1fr)',
  },
  button: {
    display: 'grid',
    placeContent: 'center',
    placeItems: 'center',
    textAlign: 'center',
  },
  tab: {
    cursor: 'pointer',
    height: 100,
    display: 'grid',
    textAlign: 'center',
    placeContent: 'center',
    placeItems: 'center',
  },
}))

export const Header: React.FC = () => {
  const { setActiveTab } = useContextValue()
  const styles = useStyles()

  return (
    <header>
      <AppBar position="static">
        <div className={styles.container}>
          {tabs.map(({ icon, idx, label }) => (
            <Button
              color="primary"
              variant="contained"
              className={styles.button}
              key={idx}
              onClick={() => setActiveTab(idx)}>
              <div className={styles.tab}>
                {icon}
                <Typography variant="h6" component="h6">
                  {label}
                </Typography>
              </div>
            </Button>
          ))}
        </div>
      </AppBar>
    </header>
  )
}
