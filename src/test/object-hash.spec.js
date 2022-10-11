const { hash } = require("../services/TraceService");

describe("Object hash tests", () => {

  it("Object keys order doesn't afect the result", () => {
    const h1 = hash({ a: 1, b: 2 });
    const h2 = hash({ b: 2, a: 1 });

    expect(h1).toEqual(h2);
  })

  it("Object keys order doesn't afect the result in properties", () => {
    const h1 = hash({ a: 1, b: 2, c: { d: 3, e: 4 } });
    const h2 = hash({ a: 1, b: 2, c: { e: 4, d: 3 } });

    expect(h1).toEqual(h2);
  })

  it("Array props order matters", () => {
    const h1 = hash({ a: [1, 2, 3] });
    const h2 = hash({ a: [3, 2, 1] });
    expect(h1).not.toEqual(h2);
  })

  it("Array props order doesn't matter with unorderedArray flag", () => {
    const h1 = hash({ a: [1, 2, 3] }, { unorderedArray: true });
    const h2 = hash({ a: [3, 2, 1] }, { unorderedArray: true });
    expect(h1).not.toEqual(h2);
  })



})