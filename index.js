const DataSeriesCapture = require('./DataSeriesCapture/DataSeriesCapture.js');
const filepath = './DataSeriesCapture/data/58220.csv';
const notCsvFilepath = './data/notCSV.json';

let capture = new DataSeriesCapture;

const test = async () => {
    // await capture.read_pressure_from_csv(filepath);
    // console.log(capture.between( -100, 100 ));
    await console.log(capture.read_pressure_from_csv(notCsvFilepath))
}

test()
