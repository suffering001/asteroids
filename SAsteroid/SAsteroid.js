/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SAsteroid extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./SAsteroid/costumes/costume1.svg", {
        x: 15.733333596954367,
        y: 15.391656671235069
      })
    ];

    this.sounds = [
      new Sound(
        "dropping-rocks-5996",
        "./SAsteroid/sounds/dropping-rocks-5996.wav"
      )
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];

    this.vars.hp = 0;
  }

  *whenIReceiveGameOver() {
    yield* this.wait(1);
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *startAsClone() {
    this.visible = true;
    this.direction -= this.random(90, -90);
    this.goto(
      this.toNumber(this.stage.vars.mX),
      this.toNumber(this.stage.vars.mY)
    );
    this.vars.hp = 1;
    while (true) {
      this.move(4);
      if (this.compare(this.x, 233) > 0) {
        this.x = -240;
      }
      if (this.compare(this.y, 170) > 0) {
        this.y = -170;
      }
      if (this.compare(this.x, -240) < 0) {
        this.x = 240;
      }
      if (this.compare(this.y, -170) < 0) {
        this.y = 170;
      }
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Projectile"].andClones())) {
        this.vars.hp--;
        this.costumeNumber++;
        this.effects.brightness = 90;
        yield* this.wait(0.05);
        this.effects.brightness = 0;
      }
      if (this.touching(this.sprites["Ship"].andClones())) {
        yield* this.wait(0.05);
        this.vars.hp -= 5;
      }
      if (this.compare(this.vars.hp, 1) < 0) {
        this.stage.vars.sx = this.x;
        this.stage.vars.sy = this.y;
        this.stage.vars.points++;
        this.sprites["Explo4"].createClone();
        yield* this.startSound("dropping-rocks-5996");
        this.deleteThisClone();
      }
      yield;
    }
  }
}
