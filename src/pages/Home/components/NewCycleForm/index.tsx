import { useFormContext } from 'react-hook-form'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        isErrored={!!errors.task}
        type="text"
        id="task"
        // list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        required
        {...register('task')}
      />

      {/* <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist> */}

      <div>
        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          isErrored={!!errors.minutesAmount}
          inputMode="numeric"
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={5}
          min={5}
          max={60}
          disabled={!!activeCycle}
          required
          {...register('minutesAmount', { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </div>
    </FormContainer>
  )
}
