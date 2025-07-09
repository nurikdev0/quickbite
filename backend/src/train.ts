// TASK Z:

function sumEvens(numbers: number[]): number {
  return numbers
    .filter((num) => num % 2 === 0)
    .reduce((sum, num) => sum + num, 0);
}

console.log(sumEvens([1, 2, 3, 2]));

///////////////////////////////////////////////////
// TASK Y:
// function findIntersection<T>(arr1: T[], arr2: T[]): T[] {
//   const intersection = arr1.filter((item) => arr2.includes(item));
//   return [...new Set(intersection)];
// }

// console.log(findIntersection([1, 2, 3, 4], [3, 2, 0]));

////////////////////////////////////////////////////////
// TASK X:
// function countOccurrences(obj: any, keyToFind: string): number {
//   let count = 0;

//   function search(obj: any) {
//     if (typeof obj === "object" && obj !== null) {
//       for (let key in obj) {
//         if (key === keyToFind) count++;
//         search(obj[key]);
//       }
//     }
//   }

//   search(obj);
//   return count;
// }

// const example = {
//   model: "Bugatti",
//   steer: {
//     model: "HANKOOK",
//     size: 30,
//   },
// };

// console.log(countOccurrences(example, "model"));

/////////////////////////////////////////////////////
// TASK W:

// function chunkArray<T>(arr: T[], size: number): T[][] {
//   const result: T[][] = [];
//   for (let i = 0; i < arr.length; i += size) {
//     result.push(arr.slice(i, i + size));
//   }
//   return result;
// }

// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));

///////////////////////////////////////////
// TASK P:

// function objectToArray(obj: any) {
//   const result = [];
//   for (let key in obj) {
//     result.push([key, obj[key]]);
//   }
//   return result;
// }

// console.log(objectToArray({ a: 10, b: 20 }));

///////////////////////////////////////////
// TASK O:

// function calculateSumOfNumbers(arr: any[]): number {
//   return arr.reduce((sum, item) => {
//     if (typeof item === "number") {
//       return sum + item;
//     }
//     return sum;
//   }, 0);
// }

// const result = calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]);
// console.log(result);

//////////////////////////////////////////
// TASK N:

// function palindromCheck(str: string): boolean {
//   const reversed = str.split("").reverse().join("");
//   return str === reversed;
// }

// console.log(palindromCheck("dad"));
// console.log(palindromCheck("son"));

/////////////////////////////////////////////

// TASK M:

// function getSquareNumbers(
//   numbers: number[]
// ): Array<{ number: number; square: number }> {
//   return numbers.map((num) => ({
//     number: num,
//     square: num * num,
//   }));
// }

// const result = getSquareNumbers([1, 2, 3, 5]);
// console.log(result);

/////////////////////////////////////////////////
// TASK L:

// function reverseSentence(sentence: string): string {

//     let wordsArray: string[] = sentence.split(" ");

//     let reversedWordsArray: string[] = wordsArray.map(word => {
//         let reversedWord: string = word.split("").reverse().join("");
//         return reversedWord;
//     });

//     let result: string = reversedWordsArray.join(" ");

//     return result;
// }

// console.log(reverseSentence("we like coding!"));

/////////////////////////////////////////////////////
// TASK K:

// function countVowels(str: string) {
//     const vowels = ['a', 'e', 'i', 'o', 'u'];
//     let count = 0;

//     for (let char of str.toLowerCase()) {
//         if (vowels.includes(char)) {
//             count++;
//         }
//     }

//     return count;
// }

// console.log(countVowels("stringIi"));

///////////////////////////////////////////////////////////
// TASK J:

// function findLongestWord(str: string): string {
//     const words = str.split(" ");
//     let longest = words[0] || "";

//     for (const word of words) {
//         if (word.length > longest.length) {
//             longest = word;
//         }
//     }

//     return longest;
// }

// console.log(findLongestWord("I came from Uzbekistan!"));

////////////////////////////////////////////////////////
// TASK I:

// function majorityElement(arr: number[]): number {
//     let count: { [key: number]: number } = {};
//     let maxNum = arr[0];

//     for (let num of arr) {
//         count[num] = (count[num] || 0) + 1;
//         if (count[num] > count[maxNum]) maxNum = num;
//     }

//     return maxNum;
// }

// console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4, 5, 5, 5]));

///////////////////////////////////////////////
/*
Project Standards:
- Logging standards
- Naming standards
    function, method, variable => Camel case
    class => Pascal case
    folder => Kebab case
    css => Nake case
- Error handling

*/

//////////////////////////////////////////
//TASK-H2:

// function getDigits(str: string): string {
//     let result = '';

//     for (const char of str) {
//         if (char >= '0' && char <= '9') {
//             result += char;
//         }
//     }

//     return result;
// }

// console.log(getDigits("77m14i1t9dd9ddd"));

/////////////////////////////////////////

//TASK-H:

// function getPositive(arr: number[]): string {

//     let new_arr: number[] = [];

//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] > 0) {
//             new_arr.push(arr[i]);
//         }
//     }

//     return new_arr.join("");
// }

// console.log(getPositive([1, -4, 2, 5, -6]))

//////////////////////////////////////////

//TASK G:

// function getHighestIndex(arr: number[]) {
//     let max = arr[0];
//     let index = 0;

//     for (let i = 1; i < arr.length; i++) {
//         if (arr[i] > max) {
//             max = arr[i];
//             index = i;
//         }
//     }

//     return index;
// }

// console.log(getHighestIndex([5, 21, 12, 21, 8, 88, 99, 5, 111, 2]));
