import { isValidLocation, PlaceCommand, MoveCommand } from './command';

describe('isValidLocation', () => {
  it('should return true if given location is valid', () => {
    expect(isValidLocation({ x: 0, y: 0 })).toBe(true);
    expect(isValidLocation({ x: 0, y: 4 })).toBe(true);
    expect(isValidLocation({ x: 4, y: 0 })).toBe(true);
    expect(isValidLocation({ x: 4, y: 4 })).toBe(true);
  });

  it('should return false if given location is not valid', () => {
    expect(isValidLocation({ x: -1, y: 0 })).toBe(false);
    expect(isValidLocation({ x: 0, y: 5 })).toBe(false);
  });
});

describe('PlaceCommand', () => {
  it('should be able to parse PLACE command', () => {
    const expected = new PlaceCommand(0, 0, 'NORTH');
    expect(PlaceCommand.tryParse('PLACE 0,0,NORTH')).toEqual(expected);
  });

  it('should return null if it is not a PLACE command', () => {
    expect(PlaceCommand.tryParse('MOVE')).toBeNull();
  });

  it('should place bus at give position', () => {
    const bus = { location: null };
    const cmd = new PlaceCommand(1, 1, 'NORTH');
    const expected = { location: { x: 1, y: 1, f: 'NORTH' } };
    expect(cmd.execute(bus)).toEqual(expected);
  });

  it('should ignore command if it is not valid (going out of carpark)', () => {
    const bus = { location: { x: 1, y: 1, f: 'SOUTH' } };
    const cmd = new PlaceCommand(5, 5, 'NORTH');
    const expected = { location: { x: 1, y: 1, f: 'SOUTH' } };
    expect(cmd.execute(bus)).toEqual(expected);
  });
});

describe('MoveCommand', () => {
  it('should be able to parse MOVE command', () => {
    const expected = new MoveCommand();
    expect(MoveCommand.tryParse('MOVE')).toEqual(expected);
  });

  it('should return null if it is not a MOVE command', () => {
    expect(MoveCommand.tryParse('LEFT')).toBeNull();
  });

  it('should move bus correctly if heading north', () => {
    const bus = { location: { x: 1, y: 1, f: 'NORTH' } };
    const cmd = new MoveCommand();
    const expected = { location: { x: 1, y: 2, f: 'NORTH' } };
    expect(cmd.execute(bus)).toEqual(expected);
  });

  it('should move bus correctly if heading south', () => {
    const bus = { location: { x: 1, y: 1, f: 'SOUTH' } };
    const cmd = new MoveCommand();
    const expected = { location: { x: 1, y: 0, f: 'SOUTH' } };
    expect(cmd.execute(bus)).toEqual(expected);
  });

  it('should move bus correctly if heading east', () => {
    const bus = { location: { x: 1, y: 1, f: 'EAST' } };
    const cmd = new MoveCommand();
    const expected = { location: { x: 2, y: 1, f: 'EAST' } };
    expect(cmd.execute(bus)).toEqual(expected);
  });

  it('should move bus correctly if heading west', () => {
    const bus = { location: { x: 1, y: 1, f: 'WEST' } };
    const cmd = new MoveCommand();
    const expected = { location: { x: 0, y: 1, f: 'WEST' } };
    expect(cmd.execute(bus)).toEqual(expected);
  });

  it('should ignore command if target location is not valid', () => {
    const bus = { location: { x: 4, y: 4, f: 'NORTH' } };
    const cmd = new MoveCommand();
    const expected = { location: { x: 4, y: 4, f: 'NORTH' } };
    expect(cmd.execute(bus)).toEqual(expected);
  });

  it('should ignore command if bus is not in the carpark', () => {
    const bus = { location: null };
    const cmd = new MoveCommand();
    const expected = { location: null };
    expect(cmd.execute(bus)).toEqual(expected);
  });
});
