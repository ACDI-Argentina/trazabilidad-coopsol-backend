const { hash } = require("../services/TraceService");
const { trace1, trace1Altered } = require("./data");




describe("Object hash tests over trace objects", () => {

  it("Alter a trace alter the hash? ", () => {
    const h1 = hash(trace1);
    const h2 = hash(trace1Altered);

    expect(h1).not.toEqual(h2);
  })



})