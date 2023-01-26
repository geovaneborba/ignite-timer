import { useEffect, useContext } from 'react'
import { differenceInSeconds } from 'date-fns'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  // Conversão de minutos para segundos
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // Conversão de segundos para minutos
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  function playFinishedAudio() {
    const finished = new Audio(
      'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true'
    )

    finished.play()
    finished.volume = 0.3
  }

  function showSuccessToast() {
    return toast.success('Ciclo concluído com sucesso!', {
      position: 'top-right',
      theme: 'colored',
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
    })
  }

  useEffect(() => {
    let timer: number

    if (activeCycle) {
      timer = setInterval(() => {
        //Diferença entre a data de agora e de quando foi criado o cyclo em segundos
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(timer)
          playFinishedAudio()
          showSuccessToast()
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
    totalSeconds,
  ])

  useEffect(() => {
    activeCycle
      ? (document.title = `${minutes}:${seconds} Ignite Timer`)
      : (document.title = `Ignite Timer`)
  }, [activeCycle, minutes, seconds])

  return (
    <>
      <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>
      <ToastContainer />
    </>
  )
}
