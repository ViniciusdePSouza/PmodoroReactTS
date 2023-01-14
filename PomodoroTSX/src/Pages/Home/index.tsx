import { Play } from "phosphor-react";
import { FormContainer, HomeContainer, MinutesInput, Separator, TaskInput, TimerButton, TimerContainer } from "./styles";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

export function Home() {

    const { register, handleSubmit, watch } = useForm({})

    function handleCreateNewCycle(data: any) {
        console.log(data)
    }

    const task = watch('task')
    let isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput type="text" id="task" list='task-suggestions' placeholder="Dê um nome para o seu projeto" {...register('task')}/>

                    <datalist id='task-suggestions'>
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesInput type="number" id="minutesAmount" placeholder="00" step={5} min={5} max={60} {...register('minutes', { valueAsNumber: true })}/>

                    <span>minutos.</span>
                </FormContainer>
                <TimerContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </TimerContainer>

                <TimerButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24}/>
                    Começar
                </TimerButton>
            </form>
        </HomeContainer>
    )
}