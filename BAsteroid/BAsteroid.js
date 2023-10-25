/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BAsteroid extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./BAsteroid/costumes/costume1.svg", {
        x: 50.5,
        y: 40
      }),
      new Costume("costume2", "./BAsteroid/costumes/costume2.svg", {
        x: 50.425742557461234,
        y: 40.11808324545319
      }),
      new Costume("costume3", "./BAsteroid/costumes/costume3.svg", {
        x: 50.425742557461206,
        y: 40.1575171343421
      }),
      new Costume("costume4", "./BAsteroid/costumes/costume4.svg", {
        x: 47.912399460410455,
        y: 40.15751213434211
      }),
      new Costume("costume5", "./BAsteroid/costumes/costume5.svg", {
        x: 47.553503081219986,
        y: 38.2960682454532
      })
    ];

    this.sounds = [
      new Sound(
        "dropping-rocks-5996",
        "./BAsteroid/sounds/dropping-rocks-5996.wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.CLONE_START, this.startAsClone4),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      )
    ];

    this.vars.hp = 5;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.createClone();
    while (true) {
      yield* this.wait(this.random(7, 10));
      this.createClone();
      yield;
    }
  }

  *startAsClone() {
    this.stage.vars.meteor = this.random(0, 2);
  }

  *movement() {
    this.vars.hp = 5;
    this.direction -= this.random(90, -90);
    while (true) {
      this.goto(this.random(-240, 240), this.random(-180, 180));
      while (
        !(
          this.compare(
            Math.hypot(
              this.sprites["Ship"].x - this.x,
              this.sprites["Ship"].y - this.y
            ),
            150
          ) > 0
        )
      ) {
        this.goto(this.random(-240, 240), this.random(-180, 180));
        yield;
      }
      while (true) {
        this.move(1);
        if (this.compare(this.x, 235) > 0) {
          this.x = -235;
        }
        if (this.compare(this.y, 150) > 0) {
          this.y = -170;
        }
        if (this.compare(this.x, -235) < 0) {
          this.x = 235;
        }
        if (this.compare(this.y, -170) < 0) {
          this.y = 150;
        }
        yield;
      }
      yield;
    }
  }

  *startAsClone2() {
    this.visible = true;
  }

  *actions() {
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
        this.stage.vars.bX = this.x;
        this.stage.vars.bY = this.y;
        this.sprites["Explo1"].createClone();
        yield* this.startSound("dropping-rocks-5996");
        for (let i = 0; i < 2; i++) {
          this.sprites["MAsteroid"].createClone();
          yield;
        }
        if (
          this.toNumber(this.stage.vars.meteor) === 1 &&
          this.compare(this.vars.hp, 1) < 0
        ) {
          this.sprites["Meteor"].createClone();
        }
        yield* this.wait(0.05);
        this.deleteThisClone();
      }
      yield;
    }
  }

  *startAsClone3() {
    yield* this.actions();
  }

  *startAsClone4() {
    yield* this.movement();
  }

  *whenIReceiveGameOver() {
    yield* this.wait(1);
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
