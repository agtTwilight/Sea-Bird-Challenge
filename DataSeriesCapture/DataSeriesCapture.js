const Papa = require('papaparse');

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
            return {msg: "error: method, .between( ), cannot be called on dataSeries of length null."};
        }

        let count = 0;
        if( !this.isLocked ) {
            this.isLocked = true;
        }

        for( let i = 0; i < this.dataSeries.length; i++ ) {
            if( x <= this.dataSeries[i] <= y ) {
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

    read_pressue_from_csv(filename) {
        // TODO: compare time complexity of regex vs .includes() vs .slice()
        if( !filename.slice(-4) === ".csv" ) {
            return {msg: "error: uploaded file is not of type '.csv'"};
        }

        // Parse CSV to JSON and append pressure data to this.dataSeries
        Papa.parse( __dirname + filename, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                for( let i = 0; i < results.data.length; i++ ) {
                    this.dataSeries.push(results.data[i].PRESSION);
                }

                this.isLocked = true;
            }
        })

        return 1;
    }
}