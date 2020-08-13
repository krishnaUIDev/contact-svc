module.exports.absolute = function (num) {
  return num >= 0 ? num : -num;
};

module.exports.getCurrenty = function () {
  return ["USD", "AUD", "EUR"];
};

module.exports.getProduct = function (id) {
  return { product: id, name: "krishna" };
};

module.exports.registerUser = function (userName) {
  if (!userName) throw new Error("User is required");
  return {
    id: new Date().getTime(),
    userName,
  };
};

module.exports.fizzBuzz = function (input) {
  if (typeof input !== "number") throw new Error("input should be number");
  if (input % 3 === 0 && input % 5 === 0) return "FizzBuzz";
  if (input % 3 === 0) return "Fizz";
  if (input % 5) return "Buzz";
  return input;
};
