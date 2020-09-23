const colors = require("colors");
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config({ path: "variables.env" });

//Connetion with data base
//*** */

mongoose.set("useFindAndModify", false);
mongoose.connect(
  process.env.MongoDB.toString(),
  { useNewUrlParser: true },
  (error) => {
    if (error) {
      console.log("Connection faild".red);
    } else {
      console.log("Connetiion succesful".green);

      //If the connection is success we init the server on port previusly seted
      app.listen(process.env.PORT, () => {
        console.log(
          "-------------------------------------Server init--------------------------------"
            .blue
        );
      });
    }
  }
);
