import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, 
    { useState,
    useEffect } from 'react';
import './style.css';

export const ViewData = (props) => {
    const [stats, setStats] = useState(null);
    const [statsView, setStatsView] = useState(null);
    const [barChart, setBarChart] = useState(null);
    const [buildGraphs, setBuildGraphs] = useState(false);
    const[chartCount, setChartCount] = useState(0);

    useEffect(() => {
        console.log(stats);
        if(stats) {
            setStatsView(
            <section id='stats-data'>
                <p>Mean pressure: <span>{stats.mean}</span> bars</p>
                <p>Min pressure: <span>{stats.min}</span> bars</p>
                <p>Max pressure: <span>{stats.max}</span> bars</p>
                <p>Sample Size: <span>{stats.isCSV ? stats.dataSeries.pressureData.length : stats.dataSeries.length}</span></p>
            </section>
            )
        }
    }, [stats])

    useEffect(() => {
        if(buildGraphs) {
            setBarChart(handleBarCharts());
        }
    }, [buildGraphs, chartCount])

    const handleMethodClick = (e) => {
        const method = e.target.innerText;
        if( method === "add" ) {
            if( document.querySelector("#add-input").value ) {
                // TODO render arrary
                props.capture.add( +document.querySelector("#add-input").value);
                props.setMethods(["add", "build_stats"]);
            }
        } else if( method === "build_stats" ) {
            setStats(props.capture.build_stats());
            document.querySelector("#add-span").setAttribute("style", "display: none;");
            document.querySelector("#between-span").setAttribute("style", "display: block;");
            if( !props.capture.isCSV ) {
                props.setMethods(["between"]);
            } else {
                props.setMethods(["between", "getDailyStats"]);
            }
        } else if ( method === "between" ) {
            if( document.querySelector("#between-lower-limit").value && document.querySelector("#between-upper-limit").value ) {
                // TODO render results
                console.log(stats.between( +document.querySelector("#between-lower-limit").value, +document.querySelector("#between-upper-limit").value ));
            }
        } else if( method === "getDailyStats") {
            document.querySelector("#stats-data").setAttribute("style", "display: none;");
            stats.getDailyStats();
            setBuildGraphs(true);
            props.setMethods(["between", "hideGraph"]);
        } else if ( method === "hideGraph" ) {
            props.setMethods(["between", "showGraph"]);
            document.querySelector("#stats-data").setAttribute("style", "display: block;");
            document.querySelector("#chart").setAttribute("style", "display: none;");
        } else {
            props.setMethods(["between", "hideGraph"]);
            document.querySelector("#stats-data").setAttribute("style", "display: none;");
            document.querySelector("#chart").setAttribute("style", "display: block;");
        }
    }

    const handleBarCharts = () => {
        ChartJS.register(
            BarElement,
            CategoryScale,
            LinearScale,
            Tooltip,
            Legend
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
                    borderWidth: 1,
                }
            ]
        };

        console.log(data)

        const options = {}

        return <section id='chart'>
            <section>
                <p id='backward' onClick={chartBackward}>back</p>
                <p id='forward' onClick={chartForward}>forward</p>
            </section>
            <Bar
        data = {data}
        options = {options}
        ></Bar></section>
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
            buildGraphs ? barChart : <></>
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
