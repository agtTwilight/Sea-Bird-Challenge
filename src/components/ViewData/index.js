import backward from './assets/backward.png';
import forward from './assets/forward.png';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    PointElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React, 
    { useState,
    useEffect } from 'react';
import './style.css';

export const ViewData = (props) => {
    const [stats, setStats] = useState(null);
    const [statsView, setStatsView] = useState(null);
    const [lineChart, setLineChart] = useState(null);
    const [buildGraphs, setBuildGraphs] = useState(false);
    const [chartCount, setChartCount] = useState(0);
    const [betweenResults, setBetweenResults] = useState(null);

    useEffect(() => {
        console.log(stats);
        if(stats) {
            setStatsView(
            <section id='stats-data'>
                <p><strong>Mean pressure:</strong> <span>{stats.mean}</span> bar(s)</p>
                <p><strong>Min pressure:</strong> <span>{stats.min}</span> bar(s)</p>
                <p><strong>Max pressure:</strong> <span>{stats.max}</span> bar(s)</p>
                <p><strong>Sample Size:</strong> <span>{stats.isCSV ? stats.dataSeries.pressureData.length : stats.dataSeries.length}</span></p>
                {
                    betweenResults ? <p><strong>Total between({document.querySelector("#between-lower-limit").value}, {document.querySelector("#between-upper-limit").value}):</strong> <span>{betweenResults}</span> samples</p> : <></>
                }
            </section>
            )
        }
    }, [stats, betweenResults])

    useEffect(() => {
        if(buildGraphs) {
            setLineChart(handleLineCharts());
        }
    }, [buildGraphs, chartCount])
    
    // in hindsight I would refactor this to switch case to avoid nesting if's...
    const handleMethodClick = (e) => {
        // get value of selected user method
        const method = e.target.innerText;
        if( method === "add" ) {
            // Execute add() method
            if( document.querySelector("#add-input").value ) {
                // TODO render arrary
                props.capture.add( +document.querySelector("#add-input").value);
                props.setMethods(["add", "build_stats"]);
            }
        } else if( method === "build_stats" ) {
            // Execute build_stats() method
            setStats(props.capture.build_stats());
            document.querySelector("#add-span").setAttribute("style", "display: none;");
            document.querySelector("#between-span").setAttribute("style", "display: block;");
            // Display executable methods following build_stats
            if( !props.capture.isCSV ) {
                props.setMethods(["between"]);
                document.querySelector("#add-notification").setAttribute("style", "display: none;");
            } else {
                props.setMethods(["between", "getDailyStats"]);
            }
        } else if ( method === "between" ) {
            // Execute between() method
            if( document.querySelector("#between-lower-limit").value && document.querySelector("#between-upper-limit").value ) {
                setBetweenResults(stats.between( +document.querySelector("#between-lower-limit").value, +document.querySelector("#between-upper-limit").value ));
            }
        } else if( method === "getDailyStats") {
            // Execute getDailyStats() method
            document.querySelector("#stats-data").setAttribute("style", "display: none;");
            stats.getDailyStats();
            setBuildGraphs(true);
            props.setMethods(["between", "hideGraph"]);
        } else if ( method === "hideGraph" ) {
            // Execute hideGraph function, allowing user to return to original stats page
            props.setMethods(["between", "showGraph"]);
            document.querySelector("#stats-data").setAttribute("style", "display: block;");
            document.querySelector("#chart").setAttribute("style", "display: none;");
        } else {
            props.setMethods(["between", "hideGraph"]);
            // Execute showGraph function, allowing user to return to graph view
            document.querySelector("#stats-data").setAttribute("style", "display: none;");
            document.querySelector("#chart").setAttribute("style", "display: block;");
        }
    }

    const handleLineCharts = () => {
        ChartJS.register(
            LineElement,
            CategoryScale,
            LinearScale,
            Legend,
            Tooltip,
            PointElement
        )

        let keys = Object.keys(stats.dataSeries.dailyStats);
        keys = keys.slice(0+ (chartCount*7) ,7 + (chartCount*7))

        const data = {
            labels: keys,
            datasets: [
                {
                    label: "mean daily pressure",
                    data: keys.map(key => {
                        return stats.dataSeries.dailyStats[key].mean;
                    }),
                    backgroundColor: 'aqua',
                    borderColor: "black",
                    pointBorderColor: "aqua"
                }
            ]
        };

        console.log(data)

        const options = {
            scales: {
                y: {
                    min: -200,
                    max: 1800,
                }
            }
        }

        return <section id='chart'>
            <section>
                <img id='backward' onClick={chartBackward} src={backward} alt='a backward arrow'></img>
                <p>Chart Num: {chartCount}</p>
                <img id='forward' onClick={chartForward} src={forward} alt='a forward arrow'></img>
            </section>
            <Line
        data = {data}
        options = {options}
        ></Line></section>
    }

    const chartBackward = () => {
        if(chartCount !== 0) {
            setChartCount(chartCount-1);
        }
    }

    const chartForward = () => {
        setChartCount(chartCount +1)
    }

  return (
    <div id='view-data'>
        {
            props.capture !== null
            ? props.capture.isCSV 
            ? <></> 
            : props.capture.dataSeries !== undefined 
            ? <p id='add-notification'>Successfully added {document.querySelector("#add-input").value} to the data series.</p>
            : <></>
            : <></>
        }
        {
            buildGraphs ? lineChart : <></>
        }
        {
        stats ? statsView  : <></>
        }
        <ul id='executable-methods'>
            {
            props.methods.length?(props.methods.map((method, i) => (
                <li key={i} onClick={handleMethodClick}>{method}</li>
            ))) : <></>
            }
        </ul>
        <span id='add-span' >add: <input  id='add-input' type='number'></input></span>
        <span id='between-span' >between: <input id='between-lower-limit' type='number'></input>, <input id='between-upper-limit' type='number'></input></span>
    </div>
  )
}

export default ViewData;
