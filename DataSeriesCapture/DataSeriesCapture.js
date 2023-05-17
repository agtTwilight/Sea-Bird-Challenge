const Papa = require('papaparse');
const fs = require('fs');

class DataSeriesCapture {
    constructor() {
        this.dataSeries = [];
        this.isLocked = false;
    }

    add( num ) {
        if( !this.isLocked && num >= 0 ) {
            this.dataSeries.push(num);
        } else {
            return {msg: "error: method, .add( ), cannot be called on a locked data series, or negative integers."};
        }

        return 1;
    }

    between( x, y ) {
        if( !this.dataSeries.length ) {
            return {msg: "error: method, .between( ), cannot be called on dataSeries of length 0."};
        }

        let count = 0;
        if( !this.isLocked ) {
            this.isLocked = true;
        }

        for( let i = 0; i < this.dataSeries.length; i++ ) {
            if( x <= this.dataSeries[i] && this.dataSeries[i] <= y ) {
                ++count;
            }
        };

        return count;
    }

    build_stats() {
        if(!this.isLocked) {
            this.isLocked = true;
        }
    }

    async read_pressure_from_csv(filepath) {
        try {
            if( filepath.slice(-4) !== ".csv" ) {
                console.error({msg: "error: uploaded file is not of type '.csv'"});
            }
    
            // Parse CSV to JSON and append pressure data to this.dataSeries
            this.dataSeries = await this.toJson(filepath);
            this.isLocked = true;
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
                complete: (results) => {
                    const rows = results.data;
                    const pressureData = [];
                    for ( let i = 3; i < rows.length; i++ ) {
                        pressureData.push(rows[i][4]);
                    }
                    resolve(pressureData);
                },
                error (err, file) {
                    reject(err);
                }
            })
        })
    }
}

module.exports = DataSeriesCapture;