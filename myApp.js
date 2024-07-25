require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.BASICS_URI, {userNewUrlParser: true, useUnifiedTopology: true, dbName: 'basics'});
let Person;

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [{type: String}]
})

Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const ovi = new Person({name: "Ovi", age: 12, favoriteFoods: ["ribs", "shrimp"]});
  ovi.save(function(err, data) {
    if (err) return done(err);
    done(null , data);
  })
  
};

// createAndSavePerson((err, data) => {
//   if (err) {
//     console.error('Error saving person:', err);
//   } else {
//     console.log('Person saved:', data);
//   }
// });

const raw_array = [
  { name: "Mia", age: 13, favoriteFoods: ["sushi", "tacos"] },
  { name: "Liam", age: 14, favoriteFoods: ["pizza", "ice cream"] },
  { name: "Ava", age: 10, favoriteFoods: ["pasta", "chocolate"] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null , data);
  }); 
};

// createManyPeople(raw_array, (err, data) => {
//   if (err) {
//     console.error('Error saving person:', err);
//   } else {
//     console.log('Person saved:', data);
//   }
// })

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  },
  (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

// findPeopleByName("Mia", (err, data) => {
//   if (err) {
//     console.log('Error finding private:', err);
//   } else {
//     console.log('Private found:', data);
//   }
// });

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, (err, data) => {
    if (err) {
      return done(err)
    }
    done(null, data)
})
};

// findOneByFood("pizza", (err, data) => {
//   if (err) {
//     console.log('No one found to like this food.', err)
//   } else {
//     console.log('This person found to like that food type: ', data)
//   }
// });

const findPersonById = (personId, done) => {
  Person.findById({
    _id: personId}, (err, data) => {
    if (err) return done(err);
    done(null, data)
  })
};

// findPersonById("66a28749e20fcf0cc7372b43", (err, data) => {
//   if (err) {
//     console.log("Person with this id not found", err)
//   } else {
//     console.log("This person was found: ", data)
//   }
// })

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  const found = findPersonById(personId, (err, data) => {
      if (err) {
        console.log("Person with this id not found", err)
      } else {
      data["favoriteFoods"].push(foodToAdd)
      data.save(function(err, data) {
        if (err) return done(err);
        done(null , data);
      });
      }
    });
};

// findEditThenSave("66a28749e20fcf0cc7372b42", (err, data) => {
//   if (err) {
//     console.log("Person with this id not found", err)
//   } else {
//     console.log("This person was found: ", data)
//   }
// });

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const found = Person.findOneAndUpdate({name: personName},
    {age: ageToSet},
    {new: true},
    (err, data) => {
    if (err) {
      console.log("Person with this name not found", err)
    } else {
    data["age"] = 20
    data.save(function(err, data) {
      if (err) return done(err);
      done(null , data);
    });
    }
  });
};

// findAndUpdate("Liam", (err, data) => {
//     if (err) {
//       console.log("Person with this id not found", err)
//     } else {
//       console.log("This person was found: ", data)
//     }
//   });

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,
    (err, data) => {
    if (err) {
      return done(err)
    } else {
    done(null, data)
    }
  });
};

removeById("66a2c3ea0652f02f284aea46", (err, data) => {
    if (err) {
      console.log("Person with this id not found", err)
    } else {
      console.log("That's the last we'll see of ", data)
    }
  });

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
