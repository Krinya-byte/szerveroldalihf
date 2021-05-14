var expect = require("chai").expect;
var getFelhaszMW = require("../../../middleware/felhasz/getFelhaszMw");

describe("getfelhasz middleware", function () {
  it("set res.locals.felhasz with the good obj from the database", function (done) {
    const mw = getFelhaszMW({
      felhaszModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: 1 });
          cb(null, "mockusr");
        },
      },
    });
    const resultMock = {
      locals: {},
    };
    mw(
      {
        params: {
          felhaszid: 1,
        },
      },
      resultMock,
      () => {
        expect(resultMock.locals).to.be.eql({ felhasznalo: "mockusr" });
        done();
      }
    );
  });
  it("write out the error and call next(err) if there is an error", function (done) {
    const mw = getFelhaszMW({
      felhaszModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: 1 });
          cb("error", null);
        },
      },
    });
    const resultMock = {
      locals: {},
    };
    mw(
      {
        params: {
          felhaszid: 1,
        },
      },
      resultMock,
      (err) => {
        expect(err).to.be.eql("error");
        done();
      }
    );
  });
  it("cant find felhasznalo in the database", function (done) {
    const mw = getFelhaszMW({
      felhaszModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: 1 });
          cb(undefined, null);
        },
      },
    });
    const resultMock = {
      locals: {},
    };
    mw(
      {
        params: {
          felhaszid: 1,
        },
      },
      resultMock,
      (err) => {
        expect(err).to.be.eql(undefined);
        expect(resultMock.locals).to.be.eql({});
        done();
      }
    );
  });
});
