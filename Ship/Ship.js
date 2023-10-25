/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ship extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Ship/costumes/costume1.svg", {
        x: 208.84699854798708,
        y: 129.92072579623755
      }),
      new Costume("costume2", "./Ship/costumes/costume2.svg", {
        x: 269.07087,
        y: 145.75
      })
    ];

    this.sounds = [
      new Sound("Space Flyby2", "./Ship/sounds/Space Flyby2.wav"),
      new Sound("blaster-2-81267", "./Ship/sounds/blaster-2-81267.wav"),
      new Sound("explosion_01-6225", "./Ship/sounds/explosion_01-6225.wav"),
      new Sound("recording1", "./Ship/sounds/recording1.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.points = 0;
    this.goto(0, 0);
    yield* this.movimiento();
  }

  *movimiento() {
    this.stage.vars.speed = 0;
    this.stage.vars.friccion = 4;
    while (true) {
      if (this.keyPressed("w")) {
        this.costume = "costume2";
      } else {
        this.costume = "costume1";
      }
      if (this.keyPressed("w")) {
        this.stage.vars.speed += this.toNumber(this.stage.vars.aceleration);
      }
      if (this.keyPressed("s")) {
        this.stage.vars.speed -= 0.2;
      }
      if (this.keyPressed("a")) {
        this.direction -= 4;
      }
      if (this.keyPressed("d")) {
        this.direction += 4;
      }
      this.stage.vars.speed =
        ((100 - this.toNumber(this.stage.vars.friccion)) / 100) *
        this.toNumber(this.stage.vars.speed);
      this.move(this.toNumber(this.stage.vars.speed));
      if (this.compare(this.stage.vars.speed, 4) > 0) {
        this.stage.vars.aceleration = 0;
      } else {
        this.stage.vars.aceleration = 0.2;
      }
      if (this.compare(this.x, 240) > 0) {
        this.x = -250;
      }
      if (this.compare(this.y, 183) > 0) {
        this.y = -185;
      }
      if (this.compare(this.x, -240) < 0) {
        this.x = 250;
      }
      if (this.compare(this.y, -183) < 0) {
        this.y = 185;
      }
      if (this.compare(this.x, 240) > 0) {
        this.x = -240;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.keyPressed("space")) {
        yield* this.startSound("blaster-2-81267");
        while (!!this.keyPressed("space")) {
          yield;
        }
        this.sprites["Projectile"].createClone();
      }
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    this.visible = true;
    this.stage.vars.shiphp = 5;
    while (true) {
      if (
        this.touching(this.sprites["BAsteroid"].andClones()) ||
        this.touching(this.sprites["MAsteroid"].andClones()) ||
          this.touching(this.sprites["SAsteroid"].andClones()) ||
            this.touching(this.sprites["Ufosprite2"].andClones()) ||
              this.touching(this.sprites["UfoShot"].andClones()) ||
                this.touching(this.sprites["Meteor"].andClones())
      ) {
        this.stage.vars.explox3 = this.x;
        this.stage.vars.exploy3 = this.y;
        this.stage.vars.shiphp--;
        if (this.compare(this.stage.vars.shiphp, 1) > 0) {
          for (let i = 0; i < 4; i++) {
            this.effects.brightness = 90;
            yield* this.wait(0.5);
            this.effects.brightness = 0;
            yield;
          }
        }
        if (this.compare(this.stage.vars.shiphp, 1) < 0) {
          this.sprites["Explo3"].createClone();
          yield* this.startSound("explosion_01-6225");
          this.visible = false;
          this.broadcast("Game over");
        }
      }
      yield;
    }
  }

  *whenIReceiveGameOver() {
    yield* this.wait(1);
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenGreenFlagClicked4() {
    if (this.compare(this.stage.vars.shiphp, 1) < 0) {
      yield* this.wait(1);
      /* TODO: Implement stop other scripts in sprite */ null;
    }
    while (true) {
      if (this.compare(this.stage.vars.points, 50) > 0) {
        yield* this.wait(this.random(10, 20));
        this.sprites["Ufosprite2"].createClone();
      }
      yield;
    }
  }
}
