const expect = require('chai').expect;
const sinon = require('sinon');
const config = require('../../config/general');

const {spy, stub} = sinon;

const MaterialController =
require('../controllers/materialController');

describe('Material Controller', () => {
  let instance;
  let materialService;
  let tokenService;
  let createError;
  let json;
  let res;
  let next;
  let status;
  let loggerService;

  beforeEach(() => {
    materialService = {};
    tokenService = {};
    createError = {};
    status = stub();
    json = spy();
    loggerService = {};
    loggerService.logger = sinon.stub().resolves();
    loggerService.gethttpContext = sinon.stub().resolves();
    res = {json, status};
    next=()=>{
      return true;
    };
    status.returns(res);
    instance = new MaterialController(
        loggerService,
        config,
        createError,
        tokenService,
        materialService,
    );
  });

  describe('getMaterialByShortname', () => {
    it('Should throw error invalid Args', async() => {
      const req = {headers: {authorization: null},
        body: {},
      };
      instance._logger.info = sinon.stub().resolves();
      instance._logger.error = sinon.stub().resolves();
      instance._createError = sinon.stub().resolves();
      await instance.getMaterialByShortname(req, res, next);
      expect(res.status.calledWith(500));
    });

    it('Should throw error Unauthorized', async() => {
      const req = {headers: {authorization: 'Bearer defaultToken'},
        params: {
          shortname: 'DEFAULT_SHORTNAME',
        },
      };
      instance._logger.info = sinon.stub().resolves();
      instance._logger.error = sinon.stub().resolves();
      instance._tokenService.getToken =
        sinon.stub().resolves({data: [{username: 'defaultUsername'}]});
      instance._createError = sinon.stub().resolves();
      await instance.getMaterialByShortname(req, res, next);
      expect(
          instance._tokenService.getToken.calledOnce,
      ).to.be.true;
      expect(res.status.calledWith(203));
    });

    it('Get Material', async() => {
      const req = {headers: {authorization: 'Bearer defaultToken'},
        params: {
          shortname: 'DEFAULT_SHORTNAME',
        },
      };
      instance._logger.info = sinon.stub().resolves();
      instance._logger.error = sinon.stub().resolves();
      instance._tokenService.getToken =
        sinon.stub().resolves({data: [{username: 'defaultUsername'}]});
      instance._materialService.getMaterialFromMoodle =
        sinon.stub().resolves({data: [{url: 'teste'}]});
      await instance.getMaterialByShortname(req, res, next);
      expect(
          instance._tokenService.getToken.calledOnce,
      ).to.be.true;
      expect(
          instance._materialService.getMaterialFromMoodle.calledOnce,
      ).to.be.true;
      expect(res.status.calledWith(200));
    });
  });
});
