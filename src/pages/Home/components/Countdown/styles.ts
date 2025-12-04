import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  /* Mobile Screens */
  @media (max-width: 600px) {
    width: 100%;
    line-height: unset;
    font-size: 4rem;
    gap: 0.5rem;
    justify-content: center;

    span {
      padding: 0.5rem;
    }
  }

  @media (max-width: 320px) {
    font-size: 4rem;
  }

  // Between 321px and 600px
  @media ((min-width: 321px) and (max-width: 600px)) {
    margin-top: 4rem;
    font-size: 5.5rem;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  /* Mobile Screens */
  @media (max-width: 600px) {
    padding: 0;
    align-items: center;
    width: max-content;
    overflow: unset;
  }
`
