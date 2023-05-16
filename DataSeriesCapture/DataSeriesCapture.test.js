const DataSeriesCapture = require('./DataSeriesCapture.js');

describe('DataSeriesCapture', () => {
    let capture;

    beforeEach(() => {
        capture = new DataSeriesCapture();
    })

    it('is initialized with an empty array named dataSeries and bool named isLocked set to false.', () => {
        expect(capture.dataSeries.length).toBe(0);
        expect(capture.isLocked).toBe(false);
    });

    it('can add nums to the dataSeries using the .add( num ) method', () => {
        capture.add(5)
        expect(capture.dataSeries[0]).toBe(5);
    });

    it('.add(nums) returns an error msg when isLocked === true', () => {
        capture.isLocked = true;
        expect(capture.add(5)).toEqual(expect.objectContaining({msg: "error: method, .add( ), cannot be called on a locked data series, or negative integers."}));
    });

    it('can set isLocked === true using the .build_stats() method', () => {
        capture.build_stats();
        expect(capture.isLocked).toBe(true);
    });

    it('returns 4 when .between( 3, 6 ) is called when dataSeries === [ 3, 9, 3, 4, 6 ]', () => {
        capture.add(3);
        capture.add(9);
        capture.add(3);
        capture.add(4);
        capture.add(6);
        expect(capture.between( 3, 6 )).toBe(4);
        expect(capture.isLocked).toBe(true);
    });

    it('.between() returns an error msg when !this.dataSeries.length', () => {
        expect(capture.dataSeries.length).toBe(0);
        expect(capture.between(1,2)).toEqual(expect.objectContaining({msg: "error: method, .between( ), cannot be called on dataSeries of length 0."}));
    });

    it('.read_pressure_from_csv() returns an error message when file type != .csv', () => {
        expect(capture.read_pressure_from_csv(file)).toEqual(expect.objectContaining({msg: "error: uploaded file is not of type '.csv'"}));
    });

    it.todo('.read_pressure_from_csv(csvData) returns 1, sets isLocked === true, and pushes CSV pressure data to this.dataSeries.', () => {
        expect(capture.read_pressure_from_csv("/data/58220.csv")).toBe(1);
        expect(capture.dataSeries.length > 0).toBe(true)
    });

    it.todo('.between( -100, 100 ) returns 170 while this.dataSeries === csvData.pression.');
});