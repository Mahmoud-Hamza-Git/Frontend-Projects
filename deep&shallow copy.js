const obj = {
  name: 'hamza',
  desc: { age: 22, height: 180 },
  skills: ['fast learner', 'passion', 'hardwork', 'patience'],
};

const copy1 = { ...obj };

let copy2 = JSON.stringify(obj);
copy2 = JSON.parse(copy2);

obj.skills[1] = 23;
console.log(copy1);
console.log(copy2);
