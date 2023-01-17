import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton, } from "./styles";

import { createContext, useContext, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form'

import { CountDown } from "./components/CountDown";
import { NewCycleForm } from "./components/NewCycleForm";

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CyclesContext } from "../../contexts/CyclesContext";

const NewCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Inform a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ter no mínimo 5 minutos').max(60, 'O ciclo precisa ter no máximo 60 minutos')
})

export function Home() {
    type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

   const { activeCycle, interruptCurrentCycle, createNewCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(NewCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch } = newCycleForm
    
    
        const task = watch('task')
        let isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)} action="">
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <CountDown />
                    
                {activeCycle ? (
                    <StopCountDownButton onClick={interruptCurrentCycle} type="button" >
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