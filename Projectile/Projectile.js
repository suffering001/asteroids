/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Projectile extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Projectile/costumes/costume1.svg", {
        x: 58.22744191644719,
        y: 8.339294999999993
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *startAsClone() {
    this.visible = false;
    while (true) {
      if (this.keyPressed("space")) {
        this.visible = true;
        this.goto(this.sprites["Ship"].x, this.sprites["Ship"].y);
        this.direction = this.sprites["Ship"].direction;
        for (let i = 0; i < 15; i++) {
          this.move(15);
          if (this.compare(this.x, 245) > 0) {
            this.x = -245;
          }
          if (this.compare(this.y, 182) > 0) {
            this.y = -170;
          }
          if (this.compare(this.x, -245) < 0) {
            this.x = 250;
          }
          if (this.compare(this.y, -170) < 0) {
            this.y = 180;
          }
          yield;
        }
      }
      this.deleteThisClone();
      yield;
    }
  }

  *whenGreenFlagClicked() {
    while (true) {
      if (this.keyPressed("space")) {
        this.sprites["Projectile"].createClone();
        while (!!this.keyPressed("space")) {
          yield;
        }
      }
      yield;
    }
  }

  *whenIReceiveGameOver() {
    yield* this.wait(3);
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveGameOver2() {
    yield* this.wait(1);
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *startAsClone2() {
    while (true) {
      if (
        this.touching(this.sprites["BAsteroid"].andClones()) ||
        this.touching(this.sprites["MAsteroid"].andClones()) ||
          this.touching(this.sprites["SAsteroid"].andClones()) ||
            this.touching(this.sprites["Ufosprite2"].andClones()) ||
              this.touching(this.sprites["Meteor"].andClones())
      ) {
        yield* this.wait(0.05);
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    if (this.compare(this.stage.vars.shiphp, 1) < 0) {
      yield* this.wait(1);
      /* TODO: Implement stop other scripts in sprite */ null;
    }
  }
}
