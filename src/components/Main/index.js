import DataSeriesCapture from '../../utils/DataSeriesCapture';
import React, 
    { useState, 
    useEffect } from 'react';
import ViewData from '../ViewData';
import './style.css';

export const Main = () => {
    const [capture, setCapture] = useState(null);
    const [methods, setMethods] = useState([]);
    const [visibility, setVisiblity] = useState("visible");

    // initialize none csv DataSeriesCapture
    const handleCustomData = () => {
        setCapture(new DataSeriesCapture(false));
        setMethods(["add"]);
        setVisiblity("hidden");
        document.querySelector("#add-span").setAttribute("style", "display: block;");
    }

    // initialize csv DataSeriesCapture
    const handleCSVData = async () => {
        if(document.querySelector("#upload-file").files[0]) {
            const initCSVCapture = new DataSeriesCapture(true);
            await initCSVCapture.read_pressure_from_csv(document.querySelector("#upload-file").files[0], true);
            setCapture(initCSVCapture);
            setMethods(["build_stats"]);
            setVisiblity("hidden");
        }
    }

  return (
    <section id='main'>
        <ViewData capture = {capture} methods = {methods} setMethods = {setMethods} />
        <div id='main-buttons' className={visibility}>
            <button onClick={handleCustomData}>Custom Data Series</button>
            <div id='uploads'>
                <input id='upload-file' type='file' accept='.csv'></input>
                <button id='upload-confirm' onClick={handleCSVData}>Upload</button>
            </div>
        </div>
    </section>
  )
}

export default Main;
