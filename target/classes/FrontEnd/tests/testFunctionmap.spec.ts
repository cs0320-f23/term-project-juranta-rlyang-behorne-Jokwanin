import { functionMap, addToMap, removeFromMap} from '../src/components/FunctionPieces/FunctionMap'
import { test, expect } from '@playwright/test';
//import mockFunction from '../src/components/FunctionPieces/Functions/mockFunction';
import view from '../src/components/FunctionPieces/Functions/view';

test('add Functions', async () => {
// addToMap("view2", new view());
//   const commandFunction = functionMap.get("view2");
//   const fruits: string[] = ["apple", "banana", "cherry"];
//   if(commandFunction !== undefined){
//     await commandFunction.execute(fruits);
//     expect(1).toBe(1);
//   } else {
//     expect(1).toBe(2);
//   }

})
test('remove Functions', async () => {
  // removeFromMap("view");
  //   const commandFunction = functionMap.get("view");
  //   if(commandFunction === undefined){
  //     expect(1).toBe(1);
  //   } else {
  //     expect(1).toBe(2);
  //   }

   })

test('is 1 + 1 = 2?', () => {
    expect(1 + 1).toBe(2)
  })


// all exports from main will now be available as main.X
// import * as main from '../mock/src/main';


	