function PomodoroClock() {
  const [displayTime, setDisplayTime] = React.useState(25 * 60)
  const [seshTime, setSeshTime] = React.useState(25 * 60)
  const [breakTime, setBreakTime] = React.useState(5 * 60)
  const [timerOn, setTimerOn] = React.useState(false)
  const [onBreak, setOnBreak] = React.useState(false)

  React.useEffect(() => {
    let interval = null

    if (timerOn) {
      interval = setInterval(() => {
        setDisplayTime((prev) => {
          if (prev <= 0 && !onBreak) {
            playBeep()
            setOnBreak(!onBreak)
            return breakTime
          } else if (prev <= 0 && onBreak) {
            playBeep()
            setOnBreak(!onBreak)
            return seshTime
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [timerOn, onBreak])

  function formatTime(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
  }

  function changeTime(amount, type) {
    if (timerOn) return
    if (type == 'break') {
      if ((breakTime <= 60 && amount < 0) || (breakTime >= 3600 && amount > 0)) return
      setBreakTime((prev) => prev + amount)
    } else if (type == 'session') {
      if ((seshTime <= 60 && amount < 0) || (seshTime >= 3600 && amount > 0)) return
      setSeshTime((prev) => prev + amount)
      if (!timerOn) {
        setDisplayTime((prev) => prev + amount)
      }
    }
  }

  function controlTimer() {
    if (!timerOn) {
      setTimerOn(true)
    } else {
      setTimerOn(false)
    }
  }

  function resetTime() {
    setBreakTime(5 * 60)
    setSeshTime(25 * 60)
    setDisplayTime(25 * 60)
    setTimerOn(false)
  }

  function playBeep() {
    const sound = document.getElementById('beep')
    sound.currentTime = 0
    sound.play()
  }

  function SetLength({ title, type, formatTime, time, changeTime }) {
    return (
      <div className='col m-2'>
        <div className='h3 text-center'>{title}</div>
        <div className='time-sets'>
          <button className='btn btn-light' onClick={() => changeTime(60, type)}>
            <i className='fa-solid fa-arrow-up'></i>
          </button>
          <div className='text-center fs-2'>{formatTime(time)}</div>
          <button className='btn btn-light' onClick={() => changeTime(-60, type)}>
            <i className='fa-solid fa-arrow-down'></i>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='h1 text-center pt-4'>Pomodoro Clock</div>
      <div className='row'>
        <SetLength
          title={'Break Length'}
          type={'break'}
          formatTime={formatTime}
          time={breakTime}
          changeTime={changeTime}
        />
        <SetLength
          title={'Session Length'}
          type={'session'}
          formatTime={formatTime}
          time={seshTime}
          changeTime={changeTime}
        />
      </div>
      <div className='h2 text-center' id='timer-label'>
        {onBreak ? 'Break' : 'Session'}
      </div>
      <div className='displayTime'>{formatTime(displayTime)}</div>
      <div className='controlPanel text-center'>
        <button className='btn btn-light m-2' style={{ width: '65px' }} onClick={() => controlTimer()}>
          {!timerOn ? <i className='fa-solid fa-play'></i> : <i className='fa-solid fa-pause'></i>}
        </button>
        <button className='btn btn-light m-2' style={{ width: '45px' }} onClick={() => resetTime()}>
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
