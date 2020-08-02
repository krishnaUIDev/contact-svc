const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => console.log("conneted to mogo"))
  .catch((err) => console.log(err));

const courseScehma = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  catogery: {
    type: String,
    enum: ["web", "mobile"],
    required: true,
    lowercase: true,
    // uppercase: true,
    trim: true,
    // customer validation
    // get: (v) => {
    //   Math.round(v);
    // },
    // set: (v) => {
    //   Math.round(v);
    // },
  },
  tags: {
    type: Array,
    //  isAsync: true,
    validate: {
      //   validator: function (v, callback) {
      //     setTimeout(() => {
      //       const result = v && v.length > 0;
      //       callback(result);
      //     }, 2000);
      //   },
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "tags should be more then 1 length",
    },
  },
  date: { type: Date, default: Date.now },
  isPulished: Boolean,
  //   price: {
  //     type: Number,
  //     required: function () {
  //       return this.isPulished;
  //     },
  //   },
});

const Course = mongoose.model("courses", courseScehma);

async function createCourse() {
  const course = new Course({
    name: "React js",
    author: "krish",
    //  tags: ["test"],
    isPulished: true,
    price: 15,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (field in err.errors) {
      console.log(err.errors[field].message);
      console.log("--------------");
    }
  }
}
createCourse();

// comparision operator
// eq (equal)
// ne not equal
// gt greater than
// get greater than or equal to
// lt less than
// lte less than or equal to
// in
// nin not in
// .find({ price: { $gt: 10 } })

//logical operator

async function getCourses() {
  const course = await Course.find({ name: "Angular js" })
    .limit(3)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(course, "--");
}

getCourses();

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.name = "test";
  const result = await course.save();
  console.log(result);
}
updateCourse("5f24b21781a48a2888b6d090");
