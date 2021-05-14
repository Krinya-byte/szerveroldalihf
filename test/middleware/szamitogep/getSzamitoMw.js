var expect = require("chai").expect;
var getSzamitoMW = require("../../../middleware/szamito/getSzamitoMw");

describe("getSzamito middleware", function () {
  it("set res.locals.szamito with the good obj from the database", function (done) {
    const mw = getSzamitoMW({
      szamitoModel: {
        findOne: (p1, cb) => {
          expect(p1).to.be.eql({ _id: 1 });
          cb(null, "mockszamitogep");
        },
      },
    });
    const resultMock = {
      locals: {},
    };
    mw(
      {
        params: {
          szamitoid: 1,
        },
      },
      resultMock,
      () => {
        expect(resultMock.locals).to.be.eql({ szamitogep: "mockszamitogep" });
        done();
      }
    );
  });
  it("write out the error and call next(err) if there is an error", function (done) {
    const mw = getSzamitoMW({
      szamitoModel: {
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
          szamitoid: 1,
        },
      },
      resultMock,
      (err) => {
        expect(err).to.be.eql("error");
        done();
      }
    );
  });
  it("cant find szamito in the database", function (done) {
    const mw = getSzamitoMW({
      szamitoModel: {
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
          szamitoid: 1,
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