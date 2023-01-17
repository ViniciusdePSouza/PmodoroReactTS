import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 5.6rem
    }
`

export const BaseTimerButton = styled.button`
    width: 100%;

    border: 0; 
    padding: 1.6rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: .8rem;
    font-weight: bold;
    font-size: 1.6rem;
    color: ${(props) => props.theme['gray-100']};

    cursor: pointer;
    
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`

export const StartCountDownButton = styled(BaseTimerButton)`   
    background-color: ${(props) => props.theme['green-500']};
    
    &:not(:disabled):hover {
        background-color: ${(props) => props.theme['green-700']};
    }
`
export const StopCountDownButton = styled(BaseTimerButton)`
    background-color: ${(props) => props.theme['red-500']};
    
    &:not(:disabled):hover {
        background-color: ${(props) => props.theme['red-700']};
    }
`