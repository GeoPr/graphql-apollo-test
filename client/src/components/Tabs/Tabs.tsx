import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { useContextValue } from '../../state/state'
import { DirectorsTable } from '../Directors/DirectorsTable/DirectorsTable'
import { MoviesTable } from '../Movies/MoviesTable/MoviesTable'

export const Tabs: React.FC = () => {
  const { activeTab } = useContextValue()

  return (
    <SwipeableViews index={activeTab}>
      <MoviesTable />
      <DirectorsTable />
    </SwipeableViews>
  )
}
