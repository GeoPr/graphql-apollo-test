import React from 'react'
import { useQuery } from 'react-apollo'
import SwipeableViews from 'react-swipeable-views'
import { useContextValue } from '../../state/state'
import { directosQuery } from '../Directors/DirectorsTable/queries'
import { DirectorsTable } from '../Directors/DirectorsTable/DirectorsTable'
import { MoviesTable } from '../Movies/MoviesTable/MoviesTable'
import { moviesQuery } from '../Movies/MoviesTable/queries'

export const Tabs: React.FC = () => {
  const { activeTab } = useContextValue()
  const {
    data: moviesData,
    loading: moviesLoading,
    refetch: moviesRefetch,
  } = useQuery(moviesQuery)
  const {
    data: directorsData,
    loading: directorsLoading,
    refetch: directorsRefetch,
  } = useQuery(directosQuery)

  return (
    <SwipeableViews index={activeTab}>
      <MoviesTable
        data={moviesData}
        loading={moviesLoading}
        refetch={moviesRefetch}
      />
      <DirectorsTable
        data={directorsData}
        loading={directorsLoading}
        refetch={directorsRefetch}
      />
    </SwipeableViews>
  )
}
