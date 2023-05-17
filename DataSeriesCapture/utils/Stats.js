class Stats {
    constructor( dataSeries, isCSV, mean, min, max ) {
        this.dataSeries = dataSeries;
        this.isCSV = isCSV;
        this.mean = mean
        this.min = min;
        this.max = max;
    }

    between( x, y ) {
        let count = 0;
        let data;

        // Collect data to compare with between().
        if(this.isCSV) {
            data = this.dataSeries.pressureData;
        } else {
            data = this.dataSeries;
        }

        for( let i = 0; i < data.length; i++ ) {
            if( x <= data[i] && data[i] <= y ) {
                ++count;
            }
        };

        return count;
    }

    getDailyStats() {
        if(!this.dataSeries.dailyStats) {
            return {msg: "error: method, .getDailyStats, cannot be called on non-CSV data sets."}
        }

        const data = this.dataSeries.dailyData;
        const keyArr = Object.keys(data);
        const dailyStats = {};

        // Loop through each key in the dailyData array
        keyArr.forEach(key => {
            let keyData = data[key];
            let sum = 0;
            let min = keyData[0];
            let max = keyData[0];

            // Get mean, min, and max for each day
            for( let i = 0; i < keyData.length; i++ ) {
                if( min > keyData[i] ) min = keyData[i];
                if( max < keyData[i] ) max = keyData[i];
                sum += keyData[i];
            }

            const mean = sum/keyData.length;

            // Get standard deviation for each day
            let stdevSum = 0;
            for( let i = 0; i < keyData.length; i++ ) {
                stdevSum += (keyData[i] - mean ) ** 2;
            }

            const stdev = Math.sqrt( stdevSum/keyData.length );
            dailyStats[key] = {
                mean,
                min,
                max,
                stdev
            };
        })

        return dailyStats;
    }
}

module.exports = Stats;