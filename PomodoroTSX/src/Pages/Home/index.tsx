import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton, } from "./styles";

import { createContext, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form'

import { CountDown } from "./components/CountDown";
import { NewCycleForm } from "./components/NewCycleForm";

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentFunctionAsFinished: () => void
    setAmountSecondsPassedMOCK: (seconds: number) => void
}


const NewCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Inform a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ter no mínimo 5 minutos').max(60, 'O ciclo precisa ter no máximo 60 minutos')
})

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
    type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(NewCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function handleCreateNewCycle(data: any) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)
        reset()
    }

    function markCurrentFunctionAsFinished() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle
                }
            }))
    }

    function setAmountSecondsPassedMOCK(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    const task = watch('task')
    let isSubmitDisabled = !task

    function handleInterruptCycle() {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() }
                } else {
                    return cycle
                }
            }))

        setActiveCycleId(null)
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentFunctionAsFinished, amountSecondsPassed, setAmountSecondsPassedMOCK }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <CountDown />
                </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountDownButton onClick={handleInterruptCycle} type="button" >
                        <HandPalm size={24} />
                        Interromper
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}