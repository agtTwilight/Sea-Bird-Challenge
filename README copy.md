# Data-Series-Capture

Deployed Link: 

## Description
Requirements: 
- Create a DataSeriesCapture object that allows users to build small data series, OR, ingests pressure data from a CSV file.
- With either data set, be able to return basic statistics from the data (should execute at O(n)).
- In the basic statistics, include a function--between( x, y)--that can tell the user how many data points are between x and y (inclusive).
- For pressure data, identify a way to analyze pressure distribution.

My Approach:
- Create two classes, [`DataSeriesCapture`](dataseriescapture) and [`Stats`](stats), to house all required functions and data.
- To gather statistical information at BigO(n), mean, min and max, were selected to be the basics statistics of choice, as all could easily be gathered during one loop of the data.
- `between()` was easily implemented in the `Stats` class
- To analyze pressure data, an optional method `getDailyStats()` was included in the `Stats` class. When invoked, this method buckets pressure data by day, executes basic statistics on these bucketed data sets, and calculates a standard deviation for each day as well. Additionally, a React front-end was created for this project to include data visualization via `Chart.js`.

## Table of Contents
- [Installation](#installation)
- [DataSeriesCapture](#dataseriescapture)
- [Stats](#stats)
- [Usage](#usage)

## Installation
Since this program was made with a React front-end, any user can interact with it independent of coding experience. However, this installation guide will be for those interested in running the application strictly with `node.js`. Visit the [Usage](#usage) section for more details on the front-end user experience.

**Note: React doesn't all the `fs` package. Therefore you will need to visit the following repo to run the program via Node.js.**

ADD LINK HERE

Cloning the repository:
1. Navigate to the github repo (linked above).
2. Select the `Code` button above the file display section.
3. Select `SSH` and copy the link.
4. Open your terminal in the directory you wish to clone the files into.
5. Run the following command: `git clone <insert-sshkey-here>`.

Working with Node.js:
1. Install package dependencies with the following command: `npm i`.
2. To run Jest tests execute the following: `npm run test`. Note that `--watchall` and `--verbose` are enabled with the dev dependency, so you will have to exit your terminal and hit `Ctrl + C`.

Navigate the test and source code files. Creating new tests is encouraged!

## DataSeriesCapture
A class was choosen in part due to the pseudo codes structure, but more importantly because they serve as excellent frameworks for creating new objects (one of the requirements was that it be an object).

`constructor(isCSV) ...` :

Each new instance of a DataSeriesCapture initializes and undefined `dataSeris`, and an `isCSV` bool. 
- Since this project was coupled with a front-end, the user is restricted to only being able to upload files of type .csv, should they choose to upload a file. Throughout the functions within DataSeriesCapture, the `isCSV` bool is critical for deciding how particular functions should be executed.
- `dataSeries` is initialized as undefined because of how I elected to store data in the event that a user uploads a CSV. More on this below...

`read_pressure_from_csv()` & `toJson()` :
- Some--albeit minor--[research](https://leanylabs.com/blog/js-csv-parsers-benchmarks/) suggests `PapaParse` is the most efficient CSV to JSON npm package. I haven't worked with many CSV parsing packages before, but I elected to go with `PapaParse` from the limited amount of time spent researching packages.
- `read_pressure_from_csv` awaits a promise from `toJson`. The promise returns an object housing pressure CSV data in the following formats:
    1. An array of all pressure data (to simplify query statistics and `between()` execution).
    2. An object containing each day as a key, and an array of pressure data for each day stored as their value.
...the object stores data as "pressureData", and "dailyData", respectively.
- To minimize the need of loops, I decided storing both pressure and daily data during the same loop event would be the most efficient use of time. I wanted to store daily data in this way because I thought it would be a welcome addition during data analysis.

`build_stats()` :

It was requested that no library should be imported to build stats instantly, get stats should be processed at BigO(n). Additionally, the required stats to be gathered were left ambiguous.

I decided to collect mean, min, and max data during function execution. Since each of these pieces of data requires a loop of O(n) to calculate, I was able to calculate them in one loop to prevent the need of additional loops. Additional stats could be calculated within this function if desired, but I felt like mean, min, and max gave a good overview of the pressure data provided.

I did however, included additional statistical analysis in the [`Stats class`](#stats).

`add(num)` :

Add was made in the event that a user decideds to create their own dataSeries. In that event, dataSeries will be set to an array, and each call to add() will push the value to the end of the array.

## Stats
The stats class houses the data generated by `build_stats`, as well as the `between()` and `getDailyStats` function.

`between( x, y )` :
This function was made to allow the user to identify how many data points lie between two values, x and y, inclusive. In the front end, the count is returned and rendered to the stats display.

`getDailyStats()` :
This function takes dailyData and calculates mean, min, max, and standard deviation for each day. I made this function to add bonus functionality to the front-end, allowing users to see daily pressure data displayed via `Chart.js`.

## Usage

