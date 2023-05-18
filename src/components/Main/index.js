import DataSeriesCapture from '../../utils/DataSeriesCapture';
import React, 
    { useState, 
    useEffect } from 'react';
import ViewData from '../ViewData';
import './style.css';

export const Main = () => {
    const [capture, setCapture] = useState(null);

    // render executables for appropriate DataSeriesCapture
    useEffect(() => {
        console.log("detected change")
    }, [capture])

    // initialize none csv DataSeriesCapture
    const handleCustomData = () => {
        setCapture(new DataSeriesCapture(false));
    }

    // initialize csv DataSeriesCapture
    const handleCSVData = async () => {
        if(document.querySelector("#upload-file").files[0]) {
            const initCSVCapture = new DataSeriesCapture(true);
            await initCSVCapture.read_pressure_from_csv(document.querySelector("#upload-file").files[0], true);
            setCapture(initCSVCapture);
        }
    }

  return (
    <section id='main'>
        <ViewData capture = {capture} />
        <div id='main-buttons'>
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
