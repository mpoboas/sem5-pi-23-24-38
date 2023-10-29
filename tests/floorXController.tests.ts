import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IFloorService from '../src/services/IServices/IFloorService';
import FloorController from '../src/controllers/FloorController';
import IRoleDTO from '../src/dto/IRoleDTO';
import { Role } from '../src/domain/role';
import IFloorDTO from '../src/dto/IFloorDTO';
import { Floor } from '../src/domain/floor/floor';

describe('floor controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
		Container.set("FloorSchema", floorSchemaInstance);

		let floorRepoClass = require("../src/repos/floorRepo").default;
		let floorRepoInstance = Container.get(floorRepoClass);
		Container.set("FloorRepo", floorRepoInstance);

		let floorServiceClass = require("../src/services/ServiceImpl/floorService").default;
		let floorServiceInstance = Container.get(floorServiceClass);
		Container.set("FloorService", floorServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    it('floorController unit test using floorService stub', async function () {
		// Arrange
        let body = {  "floorNumber": "r2",
                      "description": "Piso 2 Edifcio R",
                      "length": "21",
                      "width": "21",
                      "classrooms":[]};
                      
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let floorServiceInstance = Container.get("FloorService");
		sinon.stub(floorServiceInstance, "createFloor").returns( Result.ok<IFloorDTO>( {"id":"bebdf65b-2fa4-4c1b-a1da-0cb194f728ed", 
        "floorNumber": req.body.floorNumber, "description": req.body.description,
          "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms} ));

		const ctrl = new FloorController(floorServiceInstance as IFloorService);

		// Act
		await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"bebdf65b-2fa4-4c1b-a1da-0cb194f728ed", 
        "floorNumber": req.body.floorNumber, "description": req.body.description,
          "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms}));
	});


    it('floorController + floorService integration test using floorRepository and Floor stubs', async function () {
		// Arrange
        let body = {  "floorNumber": "r2",
                      "description": "Piso 2 Edifcio R",
                      "length": "21",
                      "width": "21",
                      "classrooms":[]};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Floor, "create").returns(Result.ok({"id":"bebdf65b-2fa4-4c1b-a1da-0cb194f728ed", 
        "floorNumber": req.body.floorNumber, "description": req.body.description,
          "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms}));

		let floorRepoInstance = Container.get("FloorRepo");
		sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({ "floorNumber": req.body.floorNumber, "description": req.body.description,
              "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms}).getValue())
		}));

		let floorServiceInstance = Container.get("FloorService");

		const ctrl = new FloorController(floorServiceInstance as IFloorService);

		// Act
		await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"bebdf65b-2fa4-4c1b-a1da-0cb194f728ed", 
        "floorNumber": req.body.floorNumber, "description": req.body.description,
          "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms}));
	});


    it('floorController + floorService integration test using spy on floorService', async function () {
		// Arrange
        let body = {  "floorNumber": "r2",
                      "description": "Piso 2 Edifcio R",
                      "length": "21",
                      "width": "21",
                      "classrooms":[]};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let floorRepoInstance = Container.get("FloorRepo");
		sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({"floorNumber": req.body.floorNumber, "description": req.body.description,
            "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms}).getValue())
		}));

		let floorServiceInstance = Container.get("FloorService");
		const floorServiceSpy = sinon.spy(floorServiceInstance, "createFloor");

		const ctrl = new FloorController(floorServiceInstance as IFloorService);

		// Act
		await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"bebdf65b-2fa4-4c1b-a1da-0cb194f728ed", 
        "floorNumber": req.body.floorNumber, "description": req.body.description,
          "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms}));
		sinon.assert.calledOnce(floorServiceSpy);
		//sinon.assert.calledTwice(roleServiceSpy);
		sinon.assert.calledWith(floorServiceSpy, sinon.match({ "id":"bebdf65b-2fa4-4c1b-a1da-0cb194f728ed", 
        "floorNumber": req.body.floorNumber, "description": req.body.description,
          "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms}));
	});


    it('floorController unit test using floorService mock', async function () {
		// Arrange
        let body = {  "floorNumber": "r2",
                      "description": "Piso 2 Edifcio R",
                      "length": "21",
                      "width": "21",
                      "classrooms":[]};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let floorServiceInstance = Container.get("FloorService");
		const floorServiceMock = sinon.mock(floorServiceInstance, "createFloor")
		floorServiceMock.expects("createFloor")
			.once()
			.withArgs(sinon.match({name: req.body.name}))
			.returns(Result.ok<IFloorDTO>( {"id":"bebdf65b-2fa4-4c1b-a1da-0cb194f728ed", 
            "floorNumber": req.body.floorNumber, "description": req.body.description,
              "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms} ));

		const ctrl = new FloorController(floorServiceInstance as IFloorService);

		// Act
		await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		floorServiceMock.verify();
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"bebdf65b-2fa4-4c1b-a1da-0cb194f728ed", 
        "floorNumber": req.body.floorNumber, "description": req.body.description,
          "length": req.body.length, "width": req.body.width, "classrooms": req.body.classrooms}));
	});
});


