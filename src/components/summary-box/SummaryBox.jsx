import React from "react"
import './summary-box.scss'
import { Box } from '../box/Box'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { colors } from "../../constants"
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const SummaryBox = ({ item, darkMode }) => {
  return (
    <Box darkMode={darkMode}>
    <div className="summary-box">
      <div className={`summary-box__info ${darkMode ? "darkMode" : ""}`}>
        <div className="summary-box__info__title"></div>
        <div>{item.title}</div>
        <span>{item.subtitle}</span>
      </div>
      <div className="summary-box__info__value">
        {item.value }
      </div>
      <div className="summary-box__chart">
          <CircularProgressbarWithChildren
              value={item.percent}
              strokenWidth={10}
              styles={buildStyles({
                  pathColor: item.percent < 50 ? colors.red : colors.purple,
                  trailColor: 'transparent',
                  strokeLinecap: 'round'
              })}
          >
          <div className="summary-box__chart_value">
            {item.percent}%
          </div>
          </CircularProgressbarWithChildren>
      </div>
    </div>
    </Box>
  )
}

export const SummaryBoxSpecial = ({item}) => {
  const chartOptions = {
    responsive: true,
    scales: {
      xAxis: {
        display: false
      },
      yAxis: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      }
    }
  }

  const chartData = {
    labels: item.chartData.labels,
    datasets: [
      {
        label: 'Revenue',
        data: item.chartData.data,
        borderColor: '#fff',
        tension: 0.5,
      }
    ]
  }

  return (
    <Box purple fullheight>
      <div className="summary-box-special">
        <div className="summary-box-special__title">
          {item.title}
        </div>
        <div className="summary-box-special__value">
          {item.value}
        </div>
        <div className="summary-box-special__chart" style={{backgroundColor: "rgb(255 255 255 / 20%)", borderRadius: "10px"}}>
            <Line options={chartOptions} data={chartData} width={`250px`} />
        </div>
      </div>
    </Box>
  )
}