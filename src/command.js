// eslint-disable-next-line max-classes-per-file
import { DIMENSION } from './const';

export function isValidLocation(location) {
  const { x, y } = location;
  return x >= 0 && x <= DIMENSION && y >= 0 && y < DIMENSION;
}

export class PlaceCommand {
  constructor(x, y, f) {
    this.x = x;
    this.y = y;
    this.f = f;
  }

  static tryParse(cmd) {
    const regex = /PLACE (\d+),(\d+),(NORTH|SOUTH|EAST|WEST)/;
    // return null if the command string is not a Place command
    if (!regex.test(cmd)) {
      return null;
    }
    // create a PlaceCommand object from parsed command
    const [, x, y, f] = cmd.match(regex);
    return new PlaceCommand(parseInt(x, 10), parseInt(y, 10), f);
  }

  execute(bus) {
    const { x, y, f } = this;
    const location = { x, y, f };
    // ignore command if the updated location is invalid
    if (!isValidLocation(location)) {
      return bus;
    }
    // place bus at given location
    return { ...bus, location };
  }
}

export class MoveCommand {
  static tryParse(cmd) {
    // return null if the command string is not a MOVE command
    if (cmd !== 'MOVE') {
      return null;
    }
    // create a MoveCommand object from parsed command
    return new MoveCommand();
  }

  execute(bus) {
    // if bus is not in the carpark, ignore move command
    if (!bus.location) {
      return bus;
    }
    const { x, y, f } = bus.location;
    const location = { ...bus.location };
    switch (f) {
      case 'WEST':
        location.x = x - 1;
        break;
      case 'EAST':
        location.x = x + 1;
        break;
      case 'SOUTH':
        location.y = y - 1;
        break;
      case 'NORTH':
        location.y = y + 1;
        break;
      default:
    }
    // ignore command if the updated location is invalid
    if (!isValidLocation(location)) {
      return bus;
    }
    // move bus to target location
    return { ...bus, location };
  }
}

export class TurnCommand {
  constructor(direction) {
    this.direction = direction;
  }

  static tryParse(cmd) {
    // return null if the command string is not a LEFT or RIGHT command
    if (cmd !== 'LEFT' && cmd !== 'RIGHT') {
      return null;
    }
    // create a TurnCommand object from parsed command
    return new TurnCommand(cmd);
  }

  execute(bus) {
    // if bus is not in the carpark, ignore move command
    if (!bus.location) {
      return bus;
    }
    const facings = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
    const offset = this.direction === 'LEFT' ? 1 : -1 + facings.length;
    const idx = (facings.indexOf(bus.location.f) + offset) % facings.length;
    const location = { ...bus.location, f: facings[idx] };
    return { ...bus, location };
  }
}

export class ReportCommand {
  static tryParse(cmd) {
    // return null if the command string is not a REPORT command
    if (cmd !== 'REPORT') {
      return null;
    }
    // create a ReportCommand object from parsed command
    return new ReportCommand();
  }

  execute(bus) {
    if (!bus.location) {
      // eslint-disable-next-line no-console
      console.log('Bus is not in the carpark!');
    } else {
      const { x, y, f } = bus.location;
      // eslint-disable-next-line no-console
      console.log(`${x},${y},${f}`);
    }
    return bus;
  }
}
