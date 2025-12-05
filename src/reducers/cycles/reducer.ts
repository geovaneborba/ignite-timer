import { ActionTypes } from './action'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
  pausedDate?: Date
  resumedDate?: Date
  totalPausedTime: number // em segundos
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
  isPaused: boolean
}

interface Action {
  type: string
  payload?: any
}

export function cyclesReducer(state: CycleState, action: Action): CycleState {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
        isPaused: false,
      }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return {
        ...state,
        cycles: state.cycles.map((cycle, index) => {
          const isCurrentCycle = index === currentCycleIndex

          if (!isCurrentCycle) {
            return cycle
          }

          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }),
        activeCycleId: null,
        isPaused: false,
      }
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return {
        ...state,
        cycles: state.cycles.map((cycle, index) => {
          const isCurrentCycle = index === currentCycleIndex

          if (!isCurrentCycle) {
            return cycle
          }

          return {
            ...cycle,
            finishedDate: new Date(),
          }
        }),
        activeCycleId: null,
        isPaused: false,
      }
    }

    case ActionTypes.PAUSE_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return {
        ...state,
        cycles: state.cycles.map((cycle, index) => {
          const isCurrentCycle = index === currentCycleIndex

          if (!isCurrentCycle) {
            return cycle
          }

          return {
            ...cycle,
            pausedDate: new Date(),
          }
        }),
        isPaused: true,
      }
    }

    case ActionTypes.RESUME_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId
      )

      if (currentCycleIndex < 0) {
        return state
      }

      const currentCycle = state.cycles[currentCycleIndex]

      const pausedTime = () => {
        if (!currentCycle.pausedDate) {
          return 0
        }

        const currentTime = Date.now()
        const pauseStartTime = new Date(currentCycle.pausedDate).getTime()
        const pausedDurationMs = currentTime - pauseStartTime

        return Math.floor(pausedDurationMs / 1000)
      }

      return {
        ...state,
        cycles: state.cycles.map((cycle, index) => {
          const isCurrentCycle = index === currentCycleIndex

          if (!isCurrentCycle) {
            return cycle
          }

          return {
            ...cycle,
            resumedDate: new Date(),
            totalPausedTime: cycle.totalPausedTime + pausedTime(),
            pausedDate: undefined,
          }
        }),
        isPaused: false,
      }
    }

    default:
      return state
  }
}
