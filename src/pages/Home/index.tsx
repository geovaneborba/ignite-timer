import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HandPalm, Play, Pause } from 'phosphor-react'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import { useCycles } from '../../contexts/CyclesContext'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
  PauseCountdownButton,
  ButtonsContainer,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser no máximo de 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const {
    createNewCycle,
    interruptCurrentCycle,
    pauseCurrentCycle,
    resumeCurrentCycle,
    activeCycle,
    isPaused,
  } = useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
  }

  function handleInterruptCurrentCycle() {
    interruptCurrentCycle()
    reset()
  }

  function handlePauseCurrentCycle() {
    if (isPaused) {
      resumeCurrentCycle()
    } else {
      pauseCurrentCycle()
    }
  }

  const taskFieldValue = watch('task')
  const isSubmitDisabled = !taskFieldValue

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <ButtonsContainer>
            <PauseCountdownButton
              type="button"
              onClick={handlePauseCurrentCycle}
              isPaused={isPaused}
            >
              {isPaused ? (
                <>
                  <Play size={24} />
                  Retomar
                </>
              ) : (
                <>
                  <Pause size={24} />
                  Pausar
                </>
              )}
            </PauseCountdownButton>

            <StopCountdownButton
              type="button"
              onClick={handleInterruptCurrentCycle}
            >
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          </ButtonsContainer>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
