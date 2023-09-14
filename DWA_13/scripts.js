/**
 * An array containing the names of South African provinces.
 * @type {string[]}
 */
const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];

/**
 * An array containing names of individuals.
 * @type {string[]}
 */
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];


/* ----------------------------------- forEach ------------------------------------------ */

/**
 * Log each province to the console using a forEach loop.
 * @param {string} province - The name of the province.
 */
provinces.forEach((province) => console.log(province));

/**
 * Log each name to the console using a forEach loop.
 * @param {string} name - The name of an individual.
 */
names.forEach((name) => console.log(name));

/**
 * Pair each name with a corresponding province and log them to the console.
 * @param {string} province - The name of the province.
 * @param {number} index - The index of the province in the 'provinces' array.
 */
provinces.forEach((province, index) => {
    const name = names[index];
    console.log(`${name} (${province})`);
});




/* ----------------------------------- Map ------------------------------------------ */

/**
 * Transform each province name to uppercase using the map method.
 * @function
 * @param {string} province - The name of a province.
 * @returns {string} The uppercase version of the province name.
 */
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());


// Log the new array of uppercase province names to the console.
console.log(uppercaseProvinces);


/**
 * Calculate the character count for each name in the 'names' array using the map method.
 *
 * @function
 * @param {string} name - The name for which character count is calculated.
 * @returns {number} The number of characters in the provided name.
 */
const characterCounts = names.map((name) => name.length);

// Log the array of character counts to the console.
console.log(characterCounts);





/* -------------------------------- toSorted ------------------------------------ */

/**
 * Adds a custom toSorted method to the Array prototype for sorting arrays.
 * @function
 * @name Array.prototype.toSorted
 * @param {Function} compareFunction - A comparison function used for sorting.
 * @returns {Array} A new sorted array.
 */

Array.prototype.toSorted = function (compareFunction) {
    return [...this].sort(compareFunction);
};

/**
 * Sort the provinces alphabetically using the custom toSorted method.
 * @type {string[]}
 */
const sortedProvinces = provinces.toSorted();

// Log the sorted list of provinces to the console.
console.log(sortedProvinces);




/* -------------------------------- filter -------------------------------------- */

/**
 * Filter out provinces containing the word 'Cape'.
 * @function
 * @param {string} province - The name of a province.
 * @returns {boolean} `true` if the province does not contain 'Cape', `false` otherwise.
 */
const filteredProvinces = provinces.filter((province) => !province.includes('Cape'));

/**
 * Calculate the number of provinces remaining after filtering.
 * @type {number}
 */
const numberOfProvincesLeft = filteredProvinces.length;

// Log the number of provinces left to the console.
console.log(numberOfProvincesLeft);




/* ---------------------------------- Boolean ------------------------------------- */

/**
 * Create a boolean array indicating whether each name contains an 'S' character.
 * @function
 * @param {string[]} names - An array of names to check.
 * @returns {boolean[]} An array of boolean values indicating whether each name contains an 'S' character.
 */

// We use map to create a boolean array indicating whether each name contains an 'S' character
const nameContainsS = names.map((name) => name.includes('s') || name.includes('S'));

console.log(nameContainsS);






/* ------------------------------------ Reduce --------------------------------------- */

/**
 * Create a mapping of names to their corresponding provinces using the reduce method.
 *
 * @function
 * @param {string} [names] - An array of names to be mapped.
 * @param {string} [provinces] - An array of provinces to be mapped.
 * @returns {Object} An object where names are keys and provinces are values.
 */

// Use reduce to create a mapping of names to provinces
const nameProvinceMap = names.reduce((accumulator, name, index) => {
    // Assign each name to its corresponding province in the accumulator object
    accumulator[name] = provinces[index];
    return accumulator;
}, {});

console.log(nameProvinceMap);






// Exercise 2

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
]

/* -------------------------- forEach ---------------------- */

products.forEach((item) => {
    console.log(item.product);
});



/* -------------------------- Filter ---------------------- */

const filteredProducts = products.filter((item) => item.product.length <= 5);

console.log(filteredProducts);



/* -------------------------- Filter, Map & Reduce (Combined) ---------------------- */

/**
 * Filters products with valid prices and calculates their combined price.
 *
 * @function
 * @name filterProductsAndCalculatePrice
 * @param {Object} [products] - An array of products with "product" and "price" properties.
 * @returns {Object} An array of filtered products with valid prices.
 * @returns {number} The combined price of all remaining products.
 */

// Use filter to remove products without valid prices
const filterProducts = products
    .filter((item) => typeof item.price === 'number' || (typeof item.price === 'string' && item.price.trim() !== ''));

// Use reduce to calculate the combined price of all remaining products
const combinedPrice = filterProducts.reduce((total, item) => total + Number(item.price), 0);

console.log(filterProducts);
console.log(`Combined Price: R${combinedPrice.toFixed(2)}`);




