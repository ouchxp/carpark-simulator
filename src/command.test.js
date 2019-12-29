import { isValidLocation, PlaceCommand } from './command';

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
    const place = new PlaceCommand(1, 1, 'NORTH');
    const expected = { location: { x: 1, y: 1, f: 'NORTH' } };
    expect(place.execute(bus)).toEqual(expected);
  });

  it('should ignore command if it is not valid (going out of carpark)', () => {
    const bus = { location: { x: 1, y: 1, f: 'SOUTH' } };
    const place = new PlaceCommand(5, 5, 'NORTH');
    const expected = { location: { x: 1, y: 1, f: 'SOUTH' } };
    expect(place.execute(bus)).toEqual(expected);
  });
});
