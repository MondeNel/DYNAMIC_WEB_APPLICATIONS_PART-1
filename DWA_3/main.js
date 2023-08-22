// @ts-check


/**
* A Student
* @typedef {Object} Student
* @property {number} id - student ID
* @property {string} name - student name
* @property {string|number} [age] - student age (optional)
* @property {boolean} isActive - student is active
*/
/**
* @type {Student}
*/
const student = {
    id: 123456789,
    name: 'Josh',
    age: 25,
    isActive: true
};

/**
* Represents a second student linked to the {@link Student} type.
* @type {Student}
*/
const student2 = {
    id: 987654321,
    name: 'Emma',
    age: 23,
    isActive: false
};
console.log(student);
console.log(student2);