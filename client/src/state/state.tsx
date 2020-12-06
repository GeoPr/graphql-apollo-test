import React, { createContext, useContext } from 'react'
import { useState } from 'react'

type TSetState<T> = React.Dispatch<React.SetStateAction<T>>
export type TModal =
  | 'MOVIES_REMOVE'
  | 'MOVIES_CREATE'
  | 'MOVIES_EDIT'
  | 'DIRECTORS_REMOVE'
  | 'DIRECTORS_CREATE'
  | 'DIRECTORS_EDIT'
  | ''

interface IContextProps {
  activeTab: number
  setActiveTab: TSetState<number>
  modal: TModal
  setModal: TSetState<TModal>
}

const Context = createContext({} as IContextProps)

export const StateProvider: React.FC = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [modal, setModal] = useState<TModal>('')

  const value: IContextProps = {
    activeTab,
    setActiveTab,
    modal,
    setModal,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useContextValue = () => useContext(Context)
