class Stats {
    constructor( dataSeries, isCSV, mean, min, max ) {
        // TODO cannot include SD and keep build_stats to O(n)...provide func in stats to build daily statistics for a csv file.
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
}

module.exports = Stats;