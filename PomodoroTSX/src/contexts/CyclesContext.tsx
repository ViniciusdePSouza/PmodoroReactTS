import { createContext, ReactNode, useReducer, useState } from "react"
import { ActionTypes, Cycle, cyclesReducer } from "../reducers/cycles"

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentFunctionAsFinished: () => void
    setAmountSecondsPassedMOCK: (seconds: number) => void
    interruptCurrentCycle: () => void
    createNewCycle: (data: CreateCycleData) => void
}

interface CyclesContextProviderProps {
    children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children, }: CyclesContextProviderProps) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    })
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { cycles, activeCycleId } = cyclesState

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setAmountSecondsPassedMOCK(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentFunctionAsFinished() {
        dispatch({
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: {
                activeCycleId
            }
        })
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch({
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
            payload: {
                newCycle,
            }
        })
        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
            payload: {
                activeCycleId,
            }
        })
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentFunctionAsFinished,
                amountSecondsPassed,
                setAmountSecondsPassedMOCK,
                createNewCycle,
                interruptCurrentCycle
            }}>
            {children}
        </CyclesContext.Provider >
    )
}