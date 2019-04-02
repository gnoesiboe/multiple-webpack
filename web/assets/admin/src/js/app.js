const laptops = [{
    owner: 'Remco',
    age: 24
}, {
    owner: 'Harry',
    age: 23
}];

console.log(...laptops);

const newLaptops = laptops.map((laptop) => {
    return {
        ...laptop,
        memory: 24
    }
});

console.log(newLaptops);
