import { useContext, useEffect, useState } from "react";

import { TimerContainer, Separator } from "./styles";

import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function CountDown() {
    const { activeCycle, activeCycleId, markCurrentFunctionAsFinished, amountSecondsPassed, setAmountSecondsPassedMOCK } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutesOnScreen = String(minutesAmount).padStart(2, '0')
    const secondsOnScreen = String(secondsAmount).padStart(2, '0')

    
    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutesOnScreen}:${secondsOnScreen}`
        }
    }, [minutesOnScreen, secondsOnScreen, activeCycle])

    useEffect(() => {
        let interval: number

        if (activeCycle) {

            interval = setInterval(() => {
                const secondsDiff = differenceInSeconds(new Date(), activeCycle.startDate)
                if (secondsDiff >= totalSeconds) {
                    markCurrentFunctionAsFinished()
                    setAmountSecondsPassedMOCK(totalSeconds)
                    clearInterval(interval)
                } else {
                    setAmountSecondsPassedMOCK(secondsDiff)
                }
            }, 1000)
        }

        return (() => {
            clearInterval(interval)
        })
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentFunctionAsFinished])

    return (
        <TimerContainer>
            <span>{minutesOnScreen[0]}</span>
            <span>{minutesOnScreen[1]}</span>
            <Separator>:</Separator>
            <span>{secondsOnScreen[0]}</span>
            <span>{secondsOnScreen[1]}</span>
        </TimerContainer>
    )
}