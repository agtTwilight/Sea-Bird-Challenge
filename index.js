const DataSeriesCapture = require('./DataSeriesCapture/DataSeriesCapture.js');
const filepath = './DataSeriesCapture/data/58220.csv';
const notCsvFilepath = './data/notCSV.json';

let capture = new DataSeriesCapture;

const test = async () => {
    await capture.read_pressure_from_csv(filepath);
    const stats = capture.build_stats();
    console.log(stats.getDailyStats());
    // console.log(stats);
    // console.log(capture.dataSeries.dailyData);
    // console.log(capture.between( -100, 100 ));
    // await console.log(capture.read_pressure_from_csv(notCsvFilepath))
}

test()
