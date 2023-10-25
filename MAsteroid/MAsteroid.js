/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MAsteroid extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./MAsteroid/costumes/1.svg", {
        x: 34.36113094146478,
        y: 37.16136000000003
      }),
      new Costume("2", "./MAsteroid/costumes/2.svg", {
        x: 34.36113094146481,
        y: 37.16136
      }),
      new Costume("3", "./MAsteroid/costumes/3.svg", {
        x: 34.36113188292967,
        y: 37.16136
      })
    ];

    this.sounds = [
      new Sound(
        "dropping-rocks-5996",
        "./MAsteroid/sounds/dropping-rocks-5996.wav"
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
    this.goto(
      this.toNumber(this.stage.vars.bX),
      this.toNumber(this.stage.vars.bY)
    );
    this.direction -= this.random(90, -90);
    this.vars.hp = 3;
    while (true) {
      this.move(3);
      if (this.compare(this.x, 240) > 0) {
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
        this.vars.hp -= 5;
      }
      if (this.compare(this.vars.hp, 1) < 0) {
        this.stage.vars.mX = this.x;
        this.stage.vars.mY = this.y;
        this.sprites["Explo2"].createClone();
        yield* this.startSound("dropping-rocks-5996");
        for (let i = 0; i < 2; i++) {
          this.sprites["SAsteroid"].createClone();
          yield;
        }
        yield* this.wait(0.05);
        this.deleteThisClone();
      }
      yield;
    }
  }
}
