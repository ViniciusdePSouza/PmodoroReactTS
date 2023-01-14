import { Play } from "phosphor-react";
import { FormContainer, HomeContainer, Separator, TimerContainer } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <input type="text" id="task" placeholder="Dê um nome para o seu projeto" />

                    <label htmlFor="how-long">durante</label>
                    <input type="number" id="how-long" placeholder="00" />

                    <span>minutos.</span>
                </FormContainer>
                <TimerContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </TimerContainer>

                <button type="submit">
                    <Play size={24}/>
                    Começar
                </button>
            </form>
        </HomeContainer>
    )
}