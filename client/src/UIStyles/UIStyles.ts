import makeStyles from '@material-ui/core/styles/makeStyles'

export const useFormStyles = makeStyles(() => ({
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

export const usePaperStyles = makeStyles(() => ({
  paper: {
    position: 'relative',
    minHeight: 'calc(100vh - 112px)'
    // 112px is header`s height
  }
}))
