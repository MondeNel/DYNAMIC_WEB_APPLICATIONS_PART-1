## DWA_13.5 Challenge 1

- Use forEach to console log each name to the console. You are allowed to call console.log seven times.
- Use forEach to console log each name with a matching province for example Ashwin (Western Cape). Note that you are only allowed to call console.log seven times.
- Using map loop over all province names and turn the string to all uppercase. Log the new array to the console.
- Create a new array with map that has the amount of characters in each name. The result should be: [6, 9, 11, 5, 7, 7]
- Using toSorted to sort all provinces alphabetically.
- Use filter to remove all provinces that have the word Cape in them. After filtering the array, return the amount of provinces left. The final value should be 3
- Create a boolean array by using map and some to determine whether a name contains an S character. The result should be [true, true, false, true, true, false]
  
- Using only reduce, turn the above into an object that indicates the province of an individual. In other words:

```
{
  Ashwin: 'Western Cape',
	Sibongile: 'Gauteng',
  'Jan-Hendrik': 'Northern Cape',
	Sifso: 'Eastern Cape',
	Shailen: 'KwaZulu-Natal',
	Frikkie: 'Free State',
}
```

#### Below are additional exercises. However note that in all the following exercises all code should be written inside the brackets of a single console.log , with the final result being logged to the console. This means that your code will probably look something as follows:

 
``````
console.log(
  // Your code here
)
``````

``````
const products = [
  { product: 'banana', price: "2" },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: "8" },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
]
``````

- Use forEach to console.log each product name to the console.
- Use filter to filter out products that have a name longer than 5 characters
- Using both filter and map. Convert all prices that are strings to numbers, and remove all products from the array that do not have prices. After this has been done then use reduce to calculate the combined price of all remaining products.
- Use reduce to concatenate all product names to create the following string: banana, mango, potato, avocado, coffee and tea.
- Use reduce to calculate both the highest and lowest-priced items. The names should be returned as the following string: Highest: coffee. Lowest: banana.
- Using only Object.entries and reduce recreate the object with the exact same values. However, the following object keys should be changed in the new array:
- product should be changed to name
- price should be changed to cost