import { useState, useEffect } from 'react'
import './App.less'

function App() {
  const [process, setProcess] = useState(0)
  const [prize, setPrize] = useState('Ready')
  const [loading, setLoading] = useState(false)
  const [prizes, setPrizes] = useState<string[]>([])
  const [textValue, setTextValue] = useState('')
  const [history, setHistory] = useState<Array<string[]>>([])

  useEffect(() => {
    const history = localStorage.getItem('history')
    if (!history) return
    setHistory(JSON.parse(history))
  }, [])

  const deleteHistory = (index: number) => {
    history.splice(index, 1)
    setHistory([...history])
    localStorage.setItem('history', JSON.stringify(history))
  }

  const setCurrentPrize = (p: string[]) => {
    if (loading) return
    setProcess(2)
    setPrizes(p)
    setPrize('Ready')
  }

  const backHandler = () => {
    if (loading) return
    setProcess(process - 1)
  }

  const goHandler = () => {
    if (process < 2) {
      if (process === 1) {
        if (!textValue) return alert('请输入抽奖内容')
        const val = textValue.split(/\s+/).filter(item => item)
        setPrizes(val)
        const historyValue = history.concat([val])
        setHistory(historyValue)
        localStorage.setItem('history', JSON.stringify(historyValue))
      }
      setPrize('Ready')
      return setProcess(process + 1)
    }
    const prizesLength = prizes.length;

    setLoading(true)
    const stop = 3
    let count = 0

    const t = setInterval(() => {
      const random = ~~(Math.random() * prizesLength)
      setPrize(prizes[random])
      count++
      if (count === (stop * 1000 / 20)) {
        clearInterval(t)
        for (let i = 1; i <= 10; i++) {
          (function (j) {
            setTimeout(() => {
              const random = ~~(Math.random() * prizesLength)
              setPrize(prizes[random])
              if (j === 10) {
                setLoading(false)
              }
            }, j * j * 15);
          })(i);
        }
      }
    }, 20)
  }

  return (
    <div className="App">
      <div className={process ? 'wrapper show' : 'wrapper'} onClick={() => !process && setProcess(process + 1)}>
        <span className='start'>START</span>

        <div className={process >= 1 ? 'main show' : 'main'}>
          <div className='main-content'>
            <textarea
              value={textValue}
              onChange={(e) => { setTextValue(e.target.value) }}
              className={process === 1 ? 'show' : 'hidden'}
              placeholder={`多行输入或空格隔开，例\n一等奖\n二等奖\n三等奖`}
            >
            </textarea>
            <div className={process === 2 ? 'lottery show' : 'lottery'}>{prize}</div>
          </div>

          <button disabled={loading} className="custom-btn btn-15" onClick={goHandler}>
            {process === 1 ? 'Sure' : 'Start'}
          </button>
          <div
            style={{ display: process === 2 ? 'inline-block' : 'none' }}
            className={['back', loading ? 'disalbed' : ''].join(' ')}
            onClick={backHandler}
          >↺</div>
          <div className='history' style={{ display: history.length ? 'block' : 'none' }}>
            {history.map((item, index) => (
              <a onClick={() => {
                setCurrentPrize(item)
              }} className={['history-item', loading ? 'disabled' : ''].join(' ')} key={index}>
                {item[0]}
                <span onClick={(e) => {
                  e.stopPropagation()
                  deleteHistory(index)
                }}>🚮</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
