/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Explo2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Explo2/costumes/1.png", { x: 161, y: 165 }),
      new Costume("2", "./Explo2/costumes/2.png", { x: 173, y: 174 }),
      new Costume("3", "./Explo2/costumes/3.png", { x: 148, y: 136 }),
      new Costume("4", "./Explo2/costumes/4.png", { x: 138, y: 141 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *startAsClone() {
    this.costume = 1;
    this.visible = true;
    this.goto(
      this.toNumber(this.stage.vars.mX),
      this.toNumber(this.stage.vars.mY)
    );
    for (let i = 0; i < 3; i++) {
      this.costume = this.costumeNumber + 1;
      yield* this.wait(0.15);
      yield;
    }
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
