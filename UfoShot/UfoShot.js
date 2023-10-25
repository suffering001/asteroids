/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class UfoShot extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./UfoShot/costumes/costume1.svg", {
        x: 3.8281299999999874,
        y: 3.75
      })
    ];

    this.sounds = [new Sound("pop", "./UfoShot/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2)
    ];
  }

  *startAsClone() {
    this.visible = true;
    this.goto(
      this.toNumber(this.stage.vars.ufoX),
      this.toNumber(this.stage.vars.ufoY)
    );
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Ship"].y - this.y,
          this.sprites["Ship"].x - this.x
        )
      );
      for (let i = 0; i < 70; i++) {
        this.move(4);
        yield;
      }
      this.deleteThisClone();
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveGameOver() {
    yield* this.wait(1);
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Ship"].andClones())) {
        yield* this.wait(0.05);
        this.deleteThisClone();
      }
      yield;
    }
  }
}
