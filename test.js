// NEW CHARACTER TO ADD
const newFavCharacters1 = {
  _id: "111",
  name: "AAA",
  description: "AAA bikes a lot",
  img: "urlA",
};

const newFavCharacters2 = {
  _id: "222",
  name: "BBB",
  description: "BBB eats a lot",
  img: "urlB",
};

const newFavCharacters3 = {
  _id: "333",
  name: "CCC",
  description: "CCC sleeps a lot",
  img: "urlC",
};

// ARRAY OF ALL FAV CHARACTERS
let favCharacters = [];
favCharacters.push(newFavCharacters1);
favCharacters.push(newFavCharacters2);
favCharacters.push(newFavCharacters3);

console.log(favCharacters);

// [
//     {
//       _id: '111',
//       name: 'AAA',
//       description: 'AAA bikes a lot',
//       img: 'urlA'
//     },
//     {
//       _id: '222',
//       name: 'BBB',
//       description: 'BBB eats a lot',
//       img: 'urlB'
//     },
//     {
//       _id: '333',
//       name: 'CCC',
//       description: 'CCC sleeps a lot',
//       img: 'urlC'
//     }
//   ]

const JSONfavCharacters = JSON.stringify(favCharacters);
// console.log(JSONfavCharacters);

// [{"_id":"111","name":"AAA","description":"AAA bikes a lot","img":"urlA"},{"_id":"222","name":"BBB","description":"BBB eats a lot","img":"urlB"},{"_id":"333","name":"CCC","description":"CCC sleeps a lot","img":"urlC"}]

const favCharacters2 = JSON.parse(JSONfavCharacters);
console.log(favCharacters2);
