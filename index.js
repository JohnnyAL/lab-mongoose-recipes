const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err));

Recipe.create({
  title: "Burger de Bangin",
  level: "UltraPro Chef",
  ingredients: [
    "1 bun",
    "1 patty",
    "1 slice of cheese",
    "Some veggies",
    "A lil ketchup",
    "A lil mayo"
  ],
  cuisine: "American",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 30,
  creator: "Chef Boyarjohnny"
})
  .then(createdRecipe => {
    console.log(createdRecipe);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.insertMany(data)
  .then(createdRecipe => {
    console.log(createdRecipe);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.deleteOne({ title: "Carrot Cake" }).then(result => {
  console.log("Recipe has been removed successfully");
  mongoose.connection.close();
});
