const DataSeriesCapture = require('./DataSeriesCapture.js');
const filepath = './DataSeriesCapture/data/58220.csv';
const notCsvFilepath = './data/notCSV.json';

describe('DataSeriesCapture', () => {
    let capture;

    beforeEach(() => {
        capture = new DataSeriesCapture();
    })

    it('is initialized with an undefined dataSeries and bool named isCSV set to false.', () => {
        expect(capture.dataSeries).toBe(undefined);
        expect(capture.isCSV).toBe(false);
    });

    it('can add nums to the dataSeries using the .add( num ) method', () => {
        capture.add(5);
        expect(capture.dataSeries[0]).toBe(5);
    });

    it('.add(nums) returns an error msg when isCSV === true', () => {
        capture.isCSV = true;
        expect(capture.add(5)).toEqual(expect.objectContaining({msg: "error: method, .add( ), cannot be called on CSV data, or negative integers."}));
    });

    it('.build_stats() returns an error msg when this.dataSeries === undefined', () => {
        expect(capture.build_stats()).toEqual(expect.objectContaining({msg: "error: method, build_stats( ), cannot be called on dataSeries of length 0."}));
    });

    it('can initialize basic statistics (mean, min, max) using the .build_stats( ) method on custom data', () => {
        capture.add(1);
        capture.add(2);
        capture.add(3);
        const stats = capture.build_stats();
        expect(stats.dataSeries).toEqual(expect.arrayContaining([1,2,3]));
        expect(stats.mean).toBe(2);
        expect(stats.min).toBe(1);
        expect(stats.max).toBe(3);
    })

    it('returns 4 when stats.between( 3, 6 ) is called with dataSeries === [ 3, 9, 3, 4, 6 ]', () => {
        capture.add(3);
        capture.add(9);
        capture.add(3);
        capture.add(4);
        capture.add(6);
        const stats = capture.build_stats();
        expect(stats.between( 3, 6 )).toBe(4);
    });

    it('.read_pressure_from_csv(filepath) sets isCSV === true, and pushes CSV pressure data to this.dataSeries.', async () => {
        await capture.read_pressure_from_csv(filepath);
        expect(capture.dataSeries === undefined).toBe(false);
        expect(capture.isCSV).toBe(true);
    });

    it('can initialize basic statistics (mean, min, max) using the .build_stats( ) method on CSV data', async () => {
        await capture.read_pressure_from_csv(filepath);
        const stats = capture.build_stats();
        expect(stats.mean).toBe(1711.3335212356392);
        expect(stats.min).toBe(-1.517);
        expect(stats.max).toBe(1723.86);
    })

    it('.between( -100, 100 ) returns 170 while this.dataSeries === csvData.pression.', async () => {
        await capture.read_pressure_from_csv(filepath);
        const stats = capture.build_stats();
        expect(stats.between( -100, 100 )).toBe(170)
    });

    it('can return basic statistics (mean, min, max) and standard deviation for CSV data seperated by day.', async () => {
        await capture.read_pressure_from_csv(filepath);
        const stats = capture.build_stats();
        stats.getDailyStats();
        
        expect(Object.keys(stats.dataSeries)).toEqual(expect.arrayContaining(["pressureData", "dailyData", "dailyStats"]));

        expect(Object.keys(stats.dataSeries.dailyStats).length).toBe(265);
    });
});