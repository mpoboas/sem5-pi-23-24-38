import {expect} from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import {Floor} from '../../../src/domain/floor/floor';

describe('Floor', () => {
it('can be created with valid arguments', () => {
    const floorProps = {
        floorNumber: '1',
        description: 'First floor',
        length: 10,
        width: 20,
        classrooms: ['101', '102']
    };
    const floor = Floor.create(floorProps, new UniqueEntityID());

    expect(floor.isSuccess).to.be.true;
    expect(floor.getValue().floorNumber).to.equal(floorProps.floorNumber);
    expect(floor.getValue().description).to.equal(floorProps.description);
    expect(floor.getValue().length).to.equal(floorProps.length);
    expect(floor.getValue().width).to.equal(floorProps.width);
    expect(floor.getValue().classrooms).to.eql(floorProps.classrooms);
});

  it('cannot be created with invalid arguments', () => {
    const floorProps = {
      floorNumber: '',
      description: '',
      length: -1,
      width: -1,
      classrooms: []
    };
    const floor = Floor.create(floorProps, new UniqueEntityID());

    expect(floor.isFailure).to.be.true;
    expect(floor.error).to.equal('Invalid arguments: floorNumber, description, length, width');
  });

  it('can update its properties', () => {
    const floorProps = {
      floorNumber: '1',
      description: 'First floor',
      length: 10,
      width: 20,
      classrooms: ['101', '102']
    };
    const floor = Floor.create(floorProps, new UniqueEntityID());

    expect(floor.isSuccess).to.be.true;

    floor.getValue().floorNumber = '2';
    floor.getValue().description = 'Second floor';
    floor.getValue().length = 20;
    floor.getValue().width = 30;
    floor.getValue().classrooms = ['201', '202'];

    expect(floor.getValue().floorNumber).to.equal('2');
    expect(floor.getValue().description).to.equal('Second floor');
    expect(floor.getValue().length).to.equal(20);
    expect(floor.getValue().width).to.equal(30);
    expect(floor.getValue().classrooms).to.eql(['201', '202']);
  });
});