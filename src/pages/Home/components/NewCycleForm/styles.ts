import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;

  /* Mobile Screens */
  // 600px
  @media (max-width: 600px) {
    justify-content: start;
    align-items: center;

    label {
      width: 100%;

      &:not(:first-child) {
        width: unset;
      }
    }
  }

  // Only 320px
  @media (max-width: 320px) {
    font-size: 0.6875rem;
  }

  // Between 321px and 600px
  @media ((min-width: 321px) and (max-width: 600px)) {
    margin-top: 2rem;
    font-size: 1.5rem;
  }
`

export const InputContainer = styled.div``

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  @media (max-width: 600px) {
    padding: 0;
  }

  /* Mobile Screens */
  @media (max-width: 600px) {
    font-size: inherit;
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  /* Mobile Screens */
  @media (max-width: 600px) {
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  text-align: center;
  width: 4rem;

  /* Mobile Screens */
  @media (max-width: 600px) {
    width: unset;
    padding: 0;
    text-align: center;
  }
`
