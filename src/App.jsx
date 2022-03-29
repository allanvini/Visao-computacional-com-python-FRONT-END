import { useState } from 'react'
import axios from 'axios'
import getDate from './services/search';

import styles from './styles/app.module.scss'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


export default function App() {
  const [results, setResults] = useState([])

  async function fetchResults(event) {
    const searchParams = getDate(event.target.value)
    await axios.get(`http://localhost:4001/data?${searchParams}`).then((response) => {
      setResults(response.data)
    }).catch(() => {
      setResults([])
    })
  }

  return (
    <div className={styles['app-container']}>

      <div className={styles['app-header']}>
        <label>Selecione a data: </label>
        <input className={styles['date-selection-input']} type="date" onChange={fetchResults} />
      </div>


      <div className={styles['chart-container']}>
        <h4>Resultados:</h4>
        <Chart
          type="line"
          width={400}
          height={500}
          data={{
            labels: results.map(register => { return `${register.time.hours}:${register.time.minutes}` }),
            datasets: [{
              label: 'Contagem de veiculos',
              data: results.map(register => { return register.vehichleCount }),
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 2
            }]
          }}
          options={{

            plugins: {
              legend: {
                display: false
              }
            },
            maintainAspectRatio: false
          }}
        />
      </div>



    </div>
  )
}
