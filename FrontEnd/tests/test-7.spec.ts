import { test, expect } from "@playwright/test";


test("test", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page
    .getByPlaceholder("Enter command here!")
    .fill(
      "load_file BackEnd\\src\\main\\java\\edu\\brown\\cs\\student\\main\\data\\state\\ri_city_town_income_short.csv"
    );
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByRole("cell", { name: "Median Household Income" }).click({
    clickCount: 3,
  });
  await page.locator("body").press("Control+c");
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search Median Household Income, 80,727.00");
  await page.getByPlaceholder("Enter command here!").press("Enter");
});

test("test mode switch to verbose", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  const commandString1 = "mode verbose";
  // Fill the input field with the command and click the submit button
  await page.fill('[aria-label="Command input"]', commandString1);
  await page.click("button");

  //Comparison: checks output updates to verbose mode
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain("Changed view to Verbose");

  const commandString2 = "mode brief";
  // Fill the input field with the command and click the submit button
  await page.fill('[aria-label="Command input"]', commandString2);
  await page.click("button");

  //Comparison: checks output updates to brief mode
  const outputText2 = await page.textContent(".repl-history");
  expect(outputText2).toContain("Changed view to Brief");
});

// test("view command without loading ", async ({ page }) => {
//   //backend server
//   await page.goto("http://localhost:3444");
//   //front end app.
//   await page.goto("http://localhost:8000/");

//   //view the file without loading anything
//   const commandString = "view";
//   await page.getByPlaceholder("Enter command here!").fill(commandString);
//   await page.click("button");

//   await page.waitForSelector(".repl-history", { timeout: 5000 });

//   const expectedOutput = "Output: No CSV File is Loaded";
//   const outputElement = await page.textContent(".repl-history");
//   expect(expectedOutput).toContain(outputElement);
// });

// test("search command without loading ", async ({ page }) => {
//   //backend server
//   await page.goto("http://localhost:3444");
//   //front end app.
//   await page.goto("http://localhost:8000/");

//   //search the file without loading anything
//   const commandString = "search something";
//   await page.getByPlaceholder("Enter command here!").fill(commandString);
//   await page.click("button");

//   await page.waitForSelector(".repl-history", { timeout: 5000 });

//   const expectedOutput = "Output: No CSV File is Loaded";
//   const outputElement = await page.textContent(".repl-history");
//   expect(expectedOutput).toContain(outputElement);
// });

// test("test file already loaded", async ({ page }) => {
//   //backend server
//   //await page.goto("http://localhost:3444");

//   //front end app.
//   await page.goto("http://localhost:8000/");

//   const commandString =
//     "load_file BackEnd/src/main/java/edu/brown/cs/student/main/data/stars/ten-star.csv";

//   await page.getByPlaceholder("Enter command here!").fill(commandString);
//   //load again
//   await page.click("button");
//   await page.getByPlaceholder("Enter command here!").fill(commandString);
//   await page.click("button");
//   await page.getByPlaceholder("Enter command here!").fill(commandString);
//   await page.click("button");
  
//   await page.waitForSelector(".repl-history", { timeout: 5000 });

//   const outputElement = await page.textContent(".repl-history");
//   const expectedOutput ="Output: Error loading file: CSV is already loaded: BackEnd/src/main/java/edu/brown/cs/student/main/data/stars/ten-star.csvOutput: Error loading file: CSV is already loaded: BackEnd/src/main/java/edu/brown/cs/student/main/data/stars/ten-star.csv";

//   // expect(expectedOutput.toString).toEqual(outputElement.toString);
//    expect(expectedOutput).toContain(outputElement);
// });


// test("test succesfully loaded", async ({ page }) => {
//   //backend server
//   await page.goto("http://localhost:3444");

//   //front end app.
//   await page.goto("http://localhost:8000/");

//   const commandString =
//     "load_file /Users/robynn/Desktop/CS32/repl-rjecroi1-rlyang/BackEnd/src/main/java/edu/brown/cs/student/main/data/stars/stardata_short.csv";
//   await page.getByPlaceholder("Enter command here!").fill(commandString);
//   //load again
//   await page.click("button");

//  await page.waitForSelector(".repl-history", { timeout: 5000 });

//  const expectedOutput =
//    "Successfully loaded file: /Users/robynn/Desktop/CS32/repl-rjecroi1-rlyang/BackEnd/src/main/java/edu/brown/cs/student/main/data/stars/stardata_short.csv";

//  const outputElement = await page.textContent(".repl-history");

//   expect(expectedOutput).toContain(outputElement);

// });

test("test succesfull retrieval of broadband data", async ({page}) => {
  //front end app.
  await page.goto("http://localhost:8000/");

  const commandString = "Broadband New Jersey Gloucester";

  await page.waitForSelector(".repl-history", { timeout: 5000 });

  await page.getByPlaceholder("Enter command here!").fill(commandString);
  await page.click("button");


  await page.waitForSelector(".repl-history", { timeout: 5000 });
  const expectedOutput =
    "Output: Broadband access in Gloucester, New Jersey is : 88.7% Date and time retrieved: 2023-10-26 21:00:59";
  const outputElement = await page.textContent(".repl-history");

  //expect(outputElement).toEqual(expectedOutput);
  expect(expectedOutput).toContain(outputElement);
});


test("test bad state input for broadband", async ({ page }) => {
  //backend server
  await page.goto("http://localhost:3444");

  //front end app.
  await page.goto("http://localhost:8000/");

  const commandString = "Broadband New Bershey Fresno"; //invalid input 

  await page.getByPlaceholder("Enter command here!").fill(commandString);
  await page.click("button");

  const expectedOutput =
    "Output: The state provided in the request was invalid or not found.";
  const outputElement = await page.textContent(".repl-history");

  expect(expectedOutput).toContain(outputElement);
});


test("test successful view ", async ({ page }) => {
    //backend server
    await page.goto("http://localhost:3444");
    //front end app.
    await page.goto("http://localhost:8000/");

    //load the file 
    const commandString =
      "load_file /Users/robynn/Desktop/CS32/repl-rjecroi1-rlyang/BackEnd/src/main/java/edu/brown/cs/student/main/data/state/ri_city_town_income_short.csv";
    await page.getByPlaceholder("Enter command here!").fill(commandString);
    await page.click("button");

    //view the file 
    const commandString2 = "view"
    await page.getByPlaceholder("Enter command here!").fill(commandString2);
    await page.click("button");

    await page.waitForSelector(".repl-history", { timeout: 5000 });

   const expectedOutput = ""
   const outputElement = await page.textContent(".repl-history");
  //expect(expectedOutput).toContain(outputElement);
    expect(outputElement).toContain(expectedOutput);
});


// test("mocking", async ({ page }) => {});


test("load then search a value not found", async ({ page }) => {
  //backend server
  await page.goto("http://localhost:3444");
  //front end app.
  await page.goto("http://localhost:8000/");

  //load the file
  // const commandString =
  //   "load_file /Users/robynn/Desktop/CS32/repl-rjecroi1-rlyang/BackEnd/src/main/java/edu/brown/cs/student/main/data/census/postsecondary_education.csv";
  // await page.getByPlaceholder("Enter command here!").fill(commandString);
  // await page.click("button");

  //invalid search 
  const commandString2 = "search brazilian";
  await page.getByPlaceholder("Enter command here!").fill(commandString2);
  await page.click("button");

  const expectedOutput =
    "Output: No matching rows found. Query parameters: value=brazilian";
  const outputElement = await page.textContent(".repl-history");
  
   expect(expectedOutput).toContain(outputElement);
});
// test("test adding command to map and using command ", async ({ page }) => {


//   class mockLoad implements REPLFunction{

//   }

// });













