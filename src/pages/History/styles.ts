import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 2rem 1rem 0;
  }

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`
export const HistoryList = styled.div`
  flex: 1;
  margin-top: 2rem;

  @media (max-width: 600px) {
    overflow: auto;
    flex: unset;

    &::-webkit-scrollbar {
      width: 1rem;
    }

    &::-webkit-scrollbar-track {
      background-color: ${(props) => props.theme['gray-100']};
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme['green-500']};
      border-radius: 100px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      color: ${(props) => props.theme['gray-100']};
      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      height: 3.375rem;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;

        @media (max-width: 600px) {
          width: unset;
        }
      }
      &:last-child {
        border-bottom-right-radius: 8px;
      }
    }
  }
`
const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 100%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
