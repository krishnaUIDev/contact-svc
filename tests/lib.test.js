const lib = require("./lib");

describe("first", () => {
  test("Our first test", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  test("Our first test", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("array", () => {
  test("Our first test", () => {
    const result = lib.getCurrenty();
    expect(result).toEqual(expect.arrayContaining(["USD"]));
  });
});

describe("obj", () => {
  it("Our first test", () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ product: 1, name: "krishna" });
    expect(result).toMatchObject({ product: 1, name: "krishna" });
    // expect(result).toHaveProperty("product", 1);
  });
});

describe("exception", () => {
  it("Our first test", () => {
    //expect(restult).toThrow();
    // Null undefined '' 0 false --> falsy
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return object", () => {
    const result = lib.registerUser("user");
    expect(result).toHaveProperty("userName", "user");
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("excercise", () => {
  it("Our first test", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return fizzBuzz", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return fizzBuzz", () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });
});
