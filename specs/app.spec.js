import { nameIsValid, fullTrim, getTotal } from "../src/app.js";
describe("getTotal 100% coverage", () => {
  const items = [{ price: 10, quantity: 10 }];
  describe("getTotal check imports", () => {
    test("getTotal check import", () => {
      expect(typeof getTotal).toBe("function");
      expect(getTotal).toBeDefined();
    });
  });
  describe("getTotal check throw error", () => {
    test("check discount not a number", () => {
      expect(() => getTotal(items, "5")).toThrow("Скидка должна быть числом");
    });
    test("check discount < 0", () => {
      expect(() => getTotal(items, -6)).toThrow(
        "Процент скидки не может быть отрицательным",
      );
    });
  });

  describe("getTotal check function", () => {
    test("check discount 10", () => {
      expect(getTotal(items, 10)).toBe(90);
    });
    test("check discount 100", () => {
      expect(getTotal(items, 100)).toBe(0);
    });
    test("check without discount", () => {
      expect(getTotal(items)).toBe(100);
    });
    test("check with two objects", () => {
      const items = [
        { price: 10, quantity: 1 },
        { price: 10, quantity: 9 },
      ];
      const discount = 0;
      expect(getTotal(items, discount)).toBe(100);
    });
    test("check with two objects and quantity 0", () => {
      const items = [
        { price: 10, quantity: 0 },
        { price: 10, quantity: 9 },
      ];
      const discount = 0;
      expect(getTotal(items, discount)).toBe(90);
    });
  });
});
describe("nameIsValid 100% coverage", () => {
  describe("nameIsValid check imports", () => {
    test("check import", () => {
      expect(nameIsValid).toBeDefined();
      expect(typeof nameIsValid).toBe("function");
    });
  });
  describe("nameIsValid check test false", () => {
    test.each`
      name      | expected
      ${"t"}    | ${false}
      ${"tt t"} | ${false}
      ${3}      | ${false}
    `("nameIsValid($name) = $expected", ({ name, expected }) => {
      expect(nameIsValid(name)).toBe(expected);
    });
  });

  describe("nameIsValid check true", () => {
    test("check nameIsValid true", () => {
      expect(nameIsValid("Lena")).toBe(true);
    });
    test("check nameIsValid true 2 characters", () => {
      expect(nameIsValid("Ll")).toBe(true);
    });
  });
});
describe("fullTrim 100% coverage", () => {
  describe("fullTrim check imports", () => {
    test("check import", () => {
      expect(fullTrim).toBeDefined();
      expect(typeof fullTrim).toBe("function");
    });
  });

  describe("fullTrim function tests with 2 spaces", () => {
    test.each`
      position    | name
      ${"start"}  | ${"  anna"}
      ${"center"} | ${"an     na"}
      ${"end"}    | ${"anna   "}
    `("spaces in the $position of string trimmed", ({ name }) => {
      expect(fullTrim(name)).not.toContain(" ");
    });
  });
  describe("fullTrim parametric test", () => {
    test.each`
      a           | expected
      ${"test "}  | ${"test"}
      ${" test"}  | ${"test"}
      ${"test"}   | ${"test"}
      ${" test "} | ${"test"}
      ${"te st"}  | ${"test"}
    `("$a = $expected", ({ a, expected }) => {
      expect(fullTrim(a)).toBe(expected);
    });
  });
});
