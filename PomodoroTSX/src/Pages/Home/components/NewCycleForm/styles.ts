import styled from "styled-components";

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

export const MinutesInput = styled(BaseInput)`
    width: 6.4rem;
`

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calender-picker-indicator{
        display: none !important;
    }
`