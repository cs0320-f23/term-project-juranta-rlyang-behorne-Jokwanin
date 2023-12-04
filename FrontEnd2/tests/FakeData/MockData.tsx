

const mockCSV1 = [
    ["1", "2", "3", "4", "5"],
    ["hi", "bob", "how", "are", "you"],
    ["hi", "timothy", "I", "am", "good"],
    ["yay", "I", "am", "so", "glad"]
];

const mockCSV2 = [
    ["1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10"],
    ["11", "12", "13", "14", "15"]
];

const emptyCSV3 = [[]];

const mockCSV4 = [
    ["hi", "bob", "how", "are", "you"]
];

const mockCSV5 = [
    ["hi"]
];

const mockCSV6 = [
    ["The Header"],
    ["2"],
    ["4"],
    ["uh"],
    ["oh"],
    ["the"],
    ["horse"],
];

const mockCSV7 = [
    ["Name", "Age", "Height", "Net_Worth", "Shoe_Size", "SAT_Score", "Fav_Color"],
    ["Joe", "23", "5 foot", "$3,000", "13", "1100", "blue"],
    ["Greg", "82", "6 foot", "$38,000", "8", "900", "green"],
    ["Steven", "8", "3 foot", "$3", "5", "N/A", "red"],
    ["Billy", "13", "5 foot", "$600", "10", "1500", "orange"]
];

const mockCSV8 = [
    ["Jones", "Billy", "Joel", "Ryan", "Jason", "Alex", "Taylor","Greg"],
    ["Joe", "Zack", "Fox", "Anna", "Allan", "Vanessa", "Noah", "Billy"],
    ["Greg", "Anna", "Elias", "Kendrick", "Elijah", "Aidan", "Allan", "Billy"],
    ["Steven", "Aidan", "Theo", "Billy", "Joe", "Buck", "Tom", "Greg"],
];
const mockCSV9 = [
    ["13", "8", "3", "33", "5"],
    ["6", "75", "8", "9", "12"],
    ["99", "1", "13", "81", "100"]
];

/**
 * 
 * @returns Map of strings to strings; from filepath to fake file
 */

    export const mockDataMap: Map<string, string[][]> = new Map<string, string[][]>();
    mockDataMap.set("mockCSV1", mockCSV1);
    mockDataMap.set("mockCSV2", mockCSV2);
    mockDataMap.set("emptyCSV3", emptyCSV3);
    mockDataMap.set("mockCSV4", mockCSV4);
    mockDataMap.set("mockCSV5", mockCSV5);
    mockDataMap.set("mockCSV6", mockCSV6);
    mockDataMap.set("mockCSV7", mockCSV7);
    mockDataMap.set("mockCSV8", mockCSV8);
    mockDataMap.set("mockCSV9", mockCSV9);
    // return mockDataMap;

    export const mockDataHeaders: Map<string, boolean> = new Map<string, boolean>();
    mockDataHeaders.set("mockCSV1", true);
    mockDataHeaders.set("mockCSV2", false);
    mockDataHeaders.set("emptyCSV3", false);
    mockDataHeaders.set("mockCSV4", false);
    mockDataHeaders.set("mockCSV5", false);
    mockDataHeaders.set("mockCSV6", true);
    mockDataHeaders.set("mockCSV7", true);
    mockDataHeaders.set("mockCSV8", false);
    mockDataHeaders.set("mockCSV9", false);
    
    

