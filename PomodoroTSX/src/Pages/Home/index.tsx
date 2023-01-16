import { HandPalm, Play } from "phosphor-react";
import { FormContainer, HomeContainer, MinutesInput, Separator, StartCountDownButton, StopCountDownButton, TaskInput, TimerContainer } from "./styles";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";

import { differenceInSeconds } from "date-fns";

const NewCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Inform a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ter no mínimo 5 minutos').max(60, 'O ciclo precisa ter no máximo 60 minutos')
})

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(NewCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutesOnScreen = String(minutesAmount).padStart(2, '0')
    const secondsOnScreen = String(secondsAmount).padStart(2, '0')

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

    const task = watch('task')
    let isSubmitDisabled = !task

    function handleInterruptCycle() {
        setCycles(cycles.map((cycle) => {
            if(cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date()}
            } else  {
                return cycle
            }
        }))

        setActiveCycleId(null)
    }

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
            }, 1000)
        }

        return (() => {
            clearInterval(interval)
        })
    }, [activeCycle])

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutesOnScreen}:${secondsOnScreen}`
        }
    }, [minutesOnScreen, secondsOnScreen, activeCycle])
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput type="text" id="task" list='task-suggestions' placeholder="Dê um nome para o seu projeto" {...register('task')} disabled={!!activeCycle}/>

                    <datalist id='task-suggestions'>
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} {...register('minutesAmount', { valueAsNumber: true })} disabled={!!activeCycle}/>

                    <span>minutos.</span>
                </FormContainer>
                <TimerContainer>
                    <span>{minutesOnScreen[0]}</span>
                    <span>{minutesOnScreen[1]}</span>
                    <Separator>:</Separator>
                    <span>{secondsOnScreen[0]}</span>
                    <span>{secondsOnScreen[1]}</span>
                </TimerContainer>

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