import React, 
    { useState,
    useEffect } from 'react'
import './style.css'

export const ViewData = (props) => {
    const [stats, setStats] = useState(null);
    const [statsView, setStatsView] = useState(null);

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

    const handleMethodClick = (e) => {
        const method = e.target.innerText;
        if( method === "add" ) {
            if( document.querySelector("#add-input").value ) {
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
        } else {
            // by default, has to be getDailyStats() ... run
        }
    }

  return (
    <div id='view-data'>
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
