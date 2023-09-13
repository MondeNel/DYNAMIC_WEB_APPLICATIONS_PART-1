

const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

// forEach loop 
provinces.forEach((provinces) => console.log(provinces));
names.forEach((names) => console.log(names));


// forEach and joining the arrays
provinces.forEach((province, index) => {
    const name = names[index];
    console.log(`${name} (${province})`);
});