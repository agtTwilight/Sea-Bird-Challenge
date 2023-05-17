const Papa = require('papaparse');
const Stats = require('./utils/Stats.js');
const fs = require('fs');

class DataSeriesCapture {
    constructor() {
        this.dataSeries;
        this.isCSV = false;
    }

    add( num ) {
        if( this.dataSeries === undefined ) {
            this.dataSeries = [];
        }
        
        if( !this.isCSV) {
            this.dataSeries.push(num);
        } else {
            return {msg: "error: method, .add( ), cannot be called on CSV data, or negative integers."};
        }

        return 1;
    }

    build_stats() {
        let data; 

        // Verify that dataSeries exists before building stats
        if(this.isCSV) {
            data = this.dataSeries.pressureData;
        } else if (this.dataSeries !== undefined) {
            data = this.dataSeries;
        } else {
            return {msg: "error: method, build_stats( ), cannot be called on dataSeries of length 0."};
        }

        let sum = 0;
        let min = data[0];
        let max = data[0];

        for( let i = 0; i < data.length; i++ ) {
            if( min > data[i] ) min = data[i];
            if( max < data[i] ) max = data[i];
            sum += data[i];
        }

        const mean = sum/data.length;
        const stats = new Stats(this.dataSeries, this.isCSV, mean, min, max);
        return stats;
    }

    async read_pressure_from_csv(filepath) {
        try {
            // TODO returns a promise. Create handleErr function and pass desired msg text.
            if( filepath.slice(-4) !== ".csv" ) {
                console.error({msg: "error: uploaded file is not of type '.csv'"});
            }
    
            // Parse CSV to JSON and append pressure data to this.dataSeries
            this.dataSeries = await this.toJson(filepath);
            this.isCSV = true;
        } catch (error) {
            console.error(error);
        }
    }

    toJson( filepath ) {
        // create file readstream for papaparse
        const file = fs.createReadStream(filepath)
        return new Promise((resolve, reject) => {
            Papa.parse( file, {
                delimiter: ";",
                skipEmptyLines: true,
                dynamicTyping: true,
                complete: (results) => {
                    const rows = results.data;
                    const pressureData = [];
                    const dailyData = {};
                    let date;
                    for ( let i = 3; i < rows.length; i++ ) {
                        if( date !== rows[i][0] ) {
                            date = rows[i][0];
                            dailyData[date] = [];
                        }
                        dailyData[date].push(rows[i][4]);
                        pressureData.push(rows[i][4]);
                    }
                    resolve({pressureData, dailyData});
                },
                error (err, file) {
                    reject(err);
                }
            })
        })
    }
}

module.exports = DataSeriesCapture;