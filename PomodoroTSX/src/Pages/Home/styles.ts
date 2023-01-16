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

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    gap: .8rem;

    color: ${(props) => props.theme['gray-100']};
    font-size: 1.8rem;
    font-weight: bold;
    flex-wrap: wrap;
`

export const TimerContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 16rem;
    line-height: 12.8rem;
    color: ${ (props) => props.theme['gray-100']};

    display: flex;
    gap: 1rem;

    > span {
        background-color: ${(props) => props.theme['gray-700']};
        padding: 3.2rem 1.6rem;
        border-radius: 8px
    }
`

export const Separator = styled.div`
    padding: 3.2rem 0;
    color: ${(props) => props.theme['green-500']};
    
    width: 6.4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
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

const BaseInput = styled.input`
    background: transparent;
    height: 4rem;

    border: 0;
    border-bottom: 2px solid ${(props) => props.theme['gray-500']};

    font-weight: bold;
    font-size: 1.8rem;
    color: ${(props) => props.theme['gray-100']};

    padding: 0 0.8rem;

    &:focus{
        box-shadow: none;
        border-color: ${(props) => props.theme['green-500']}
    }
`

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calender-picker-indicator{
        display: none !important;
    }
`

export const MinutesInput = styled(BaseInput)`
    width: 6.4rem;
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