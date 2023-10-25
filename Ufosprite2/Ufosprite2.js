/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ufosprite2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ufo", "./Ufosprite2/costumes/ufo.svg", {
        x: 19.725099999999998,
        y: 23.110039999999998
      })
    ];

    this.sounds = [
      new Sound(
        "explosion_01-6225",
        "./Ufosprite2/sounds/explosion_01-6225.wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.CLONE_START, this.startAsClone4),
      new Trigger(Trigger.CLONE_START, this.startAsClone5),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      )
    ];

    this.vars.hp = 3;
  }

  *spawn() {
    this.stage.vars.spawn = this.random(1, 4);
    if (this.toNumber(this.stage.vars.spawn) === 1) {
      this.goto(240, this.random(-175, 175));
    } else {
      if (this.toNumber(this.stage.vars.spawn) === 2) {
        this.goto(-240, this.random(-175, 175));
      } else {
        if (this.toNumber(this.stage.vars.spawn) === 3) {
          this.goto(this.random(-240, 240), 175);
        } else {
          if (this.toNumber(this.stage.vars.spawn) === 4) {
            this.goto(this.random(-240, 240), -175);
          }
        }
      }
    }
  }

  *startAsClone() {
    yield* this.shooting();
  }

  *damage() {
    while (true) {
      if (this.touching(this.sprites["Projectile"].andClones())) {
        this.vars.hp--;
        this.costumeNumber++;
        this.effects.brightness = 90;
        yield* this.wait(0.05);
        this.effects.brightness = 0;
        if (this.compare(this.vars.hp, 1) < 0) {
          this.stage.vars.ufoExpX = this.x;
          this.stage.vars.ufoExpY = this.y;
          this.stage.vars.points += 3;
          this.sprites["Explo5"].createClone();
          yield* this.startSound("explosion_01-6225");
          yield* this.wait(0.05);
          this.deleteThisClone();
        }
      }
      yield;
    }
  }

  *movement() {
    while (true) {
      yield* this.glide(8, this.random(-240, 240), this.random(-180, 180));
      yield;
    }
  }

  *shooting() {
    while (true) {
      yield* this.wait(this.random(2, 4));
      this.stage.vars.ufoX = this.x;
      this.stage.vars.ufoY = this.y;
      this.sprites["UfoShot"].createClone();
      yield;
    }
  }

  *startAsClone2() {
    yield* this.spawn();
  }

  *startAsClone3() {
    yield* this.movement();
  }

  *startAsClone4() {
    yield* this.damage();
  }

  *startAsClone5() {
    this.visible = true;
  }

  *whenIReceiveGameOver() {
    yield* this.wait(1);
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
