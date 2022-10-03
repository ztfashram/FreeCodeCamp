function SetBreakLength(props) {
  function timeIncrement() {
    if (props.timerOn) return
    if (props.breakTime < 60) {
      props.setBreakTime(props.breakTime + 1)
      if (props.mode == 'break') {
        props.setTimeLeft((props.breakTime + 1) * 60)
      }
    }
  }

  function timeDecrement() {
    if (props.timerOn) return
    if (props.breakTime > 1) {
      props.setBreakTime(props.breakTime - 1)
      if (props.mode == 'break') {
        props.setTimeLeft((props.breakTime - 1) * 60)
      }
    }
  }

  return (
    <div className='col m-2'>
      <div className='h3 text-center' id='break-label'>
        Break Length
      </div>
      <div className='time-sets'>
        <button className='btn btn-light' onClick={() => timeIncrement()} id='break-increment'>
          <i className='fa-solid fa-arrow-up'></i>
        </button>
        <div className='text-center fs-2' id='break-length'>
          {props.breakTime}
        </div>
        <button className='btn btn-light' onClick={() => timeDecrement()} id='break-decrement'>
          <i className='fa-solid fa-arrow-down'></i>
        </button>
      </div>
    </div>
  )
}

function SetSessionLength(props) {
  function timeIncrement() {
    if (props.timerOn) return
    if (props.seshTime < 60) {
      props.setSeshTime(props.seshTime + 1)
      if (props.mode == 'session') {
        props.setTimeLeft((props.seshTime + 1) * 60)
      }
    }
  }

  function timeDecrement() {
    if (props.timerOn) return
    if (props.seshTime > 1) {
      props.setSeshTime(props.seshTime - 1)
      if (props.mode == 'session') {
        props.setTimeLeft((props.seshTime - 1) * 60)
      }
    }
  }
  return (
    <div className='col m-2'>
      <div className='h3 text-center' id='session-label'>
        Session Length
      </div>
      <div className='time-sets'>
        <button className='btn btn-light' onClick={() => timeIncrement('session')} id='session-increment'>
          <i className='fa-solid fa-arrow-up'></i>
        </button>
        <div className='text-center fs-2' id='session-length'>
          {props.seshTime}
        </div>
        <button className='btn btn-light' onClick={() => timeDecrement('session')} id='session-decrement'>
          <i className='fa-solid fa-arrow-down'></i>
        </button>
      </div>
    </div>
  )
}

function PomodoroClock() {
  const [timeLeft, setTimeLeft] = React.useState(1500)
  const [seshTime, setSeshTime] = React.useState(25)
  const [breakTime, setBreakTime] = React.useState(5)
  const [timerOn, setTimerOn] = React.useState(false)
  const [mode, setMode] = React.useState('session') // session, break
  const [intervalId, setIntervalId] = React.useState(null)

  React.useEffect(() => {
    if (timerOn) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0 && mode == 'session') {
            playBeep()
            setMode('break')
            return breakTime * 60
          } else if (prev <= 0 && mode == 'break') {
            playBeep()
            setMode('session')
            return seshTime * 60
          }
          return prev - 1
        })
      }, 1000)
      setIntervalId(interval)
    } else {
      clearInterval(intervalId)
      setIntervalId(null)
    }

    return () => {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }, [timeLeft, timerOn])

  function formatTime() {
    let minutes = Math.floor(timeLeft / 60)
    let seconds = timeLeft % 60
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return minutes + ':' + seconds
  }

  function controlTimer() {
    setTimerOn(!timerOn)
  }

  function resetTime() {
    setBreakTime(5)
    setSeshTime(25)
    setTimeLeft(1500)
    setTimerOn(false)
    setMode('session')
    clearInterval(intervalId)
    setIntervalId(null)

    const sound = document.getElementById('beep')
    sound.pause()
    sound.currentTime = 0
  }

  function playBeep() {
    const sound = document.getElementById('beep')
    sound.currentTime = 0
    sound.play()
  }

  return (
    <div className='container'>
      <div className='h1 text-center pt-4'>Pomodoro Clock</div>
      <div className='row'>
        <SetBreakLength
          breakTime={breakTime}
          setBreakTime={setBreakTime}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          timerOn={timerOn}
          mode={mode}
        />
        <SetSessionLength
          seshTime={seshTime}
          setSeshTime={setSeshTime}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          timerOn={timerOn}
          mode={mode}
        />
      </div>
      <div className='h2 text-center' id='timer-label'>
        {mode == 'break' ? 'Break' : 'Session'}
      </div>
      <div className='timeLeft' id='time-left'>
        {formatTime()}
      </div>
      <div className='controlPanel text-center'>
        <button className='btn btn-light m-2' style={{ width: '65px' }} onClick={() => controlTimer()} id='start_stop'>
          {!timerOn ? <i className='fa-solid fa-play'></i> : <i className='fa-solid fa-pause'></i>}
        </button>
        <button className='btn btn-light m-2' style={{ width: '45px' }} onClick={() => resetTime()} id='reset'>
          <i className='fa-solid fa-arrows-rotate'></i>
        </button>
        <audio
          src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
          id='beep'
        />
      </div>
      <div className='mt-3 text-center' style={{ fontSize: '15px' }}>
        Created by Tiefu
      </div>
    </div>
  )
}

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)
root.render(<PomodoroClock />)

/*  user story #8 was failing becasue:
I used one 'root app' funciontal component to wrap 'setBreakLength' & 'setSessiongLength' components. This leads a rendering problem that when FCC test suit trying to 'hack' the current session time to 60 min, my app doesn't actually update. 
Now I've set above two components ouside of the 'root app', all tests are passed. 
*/
