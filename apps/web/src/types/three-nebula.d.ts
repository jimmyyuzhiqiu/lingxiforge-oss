declare module "three-nebula" {
  class NebulaBase {
    constructor(...args: any[]);
    [key: string]: any;
  }

  export default class System extends NebulaBase {
    addEmitter(...args: any[]): any;
    addRenderer(...args: any[]): any;
    emit(...args: any[]): any;
    update(...args: any[]): any;
    destroy(...args: any[]): any;
  }

  export class Emitter extends NebulaBase {
    rate: any;
    setRate(...args: any[]): any;
    setInitializers(...args: any[]): any;
    setBehaviours(...args: any[]): any;
    emit(...args: any[]): any;
  }

  export class Rate extends NebulaBase {}
  export class Span extends NebulaBase {}
  export class Position extends NebulaBase {}
  export class Radius extends NebulaBase {}
  export class Life extends NebulaBase {}
  export class Body extends NebulaBase {}
  export class BoxZone extends NebulaBase {
    width: number;
    height: number;
    depth: number;
  }
  export class Vector3D extends NebulaBase {}
  export class RadialVelocity extends NebulaBase {}
  export class Alpha extends NebulaBase {
    reset(...args: any[]): any;
  }
  export class Scale extends NebulaBase {}
  export class Color extends NebulaBase {}
  export class SpriteRenderer extends NebulaBase {}
}
