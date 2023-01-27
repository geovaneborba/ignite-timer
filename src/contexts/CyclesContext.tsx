import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useEffect, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>(() => {
    const storeCycleAsJson = localStorage.getItem(
      'ignite-timer:cycles-state-1.0.0'
    )

    if (storeCycleAsJson) {
      return JSON.parse(storeCycleAsJson)
    }

    return []
  })
  const [activeCycleId, setActiveCycleId] = useState<string | null>(() => {
    const storeActiveCycleIdAsJson = localStorage.getItem(
      'ignite-timer:active-cycle-id-1.0.0'
    )

    if (storeActiveCycleIdAsJson) {
      return JSON.parse(storeActiveCycleIdAsJson)
    }

    return null
  })
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      console.log(activeCycle)
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    console.log(activeCycle)
    return 0
  })

  useEffect(() => {
    const cycleToJSON = JSON.stringify(cycles)
    const activeCycleIdToJSON = JSON.stringify(activeCycleId)

    localStorage.setItem('ignite-timer:cycles-state-1.0.0', cycleToJSON)
    localStorage.setItem(
      'ignite-timer:active-cycle-id-1.0.0',
      activeCycleIdToJSON
    )
  }, [activeCycleId, cycles])

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
