/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("41241", "./Stage/costumes/41241.png", { x: 480, y: 359 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.speed = 1.2537788780161814;
    this.vars.friccion = 4;
    this.vars.aceleration = 0.2;
    this.vars.sx = 46.2532502771747;
    this.vars.sy = 10.432902568776072;
    this.vars.shiphp = 4;
    this.vars.explox3 = 77.90760148377412;
    this.vars.exploy3 = -72.90308494400901;
    this.vars.bY = -68.29088171729143;
    this.vars.bX = 112.71106751079671;
    this.vars.mX = 122.43811315941444;
    this.vars.mY = 100.27427641900614;
    this.vars.points = 5;
    this.vars.spawn = 2;
    this.vars.ufoX = -167.510625;
    this.vars.ufoY = 25.55624999999999;
    this.vars.ufoExpX = -129.952125;
    this.vars.ufoExpY = 79.21125;
    this.vars.meteor = 0;

    this.watchers.shiphp = new Watcher({
      label: "shipHP",
      style: "normal",
      visible: true,
      value: () => this.vars.shiphp,
      x: 240,
      y: 147
    });
    this.watchers.points = new Watcher({
      label: "points",
      style: "large",
      visible: true,
      value: () => this.vars.points,
      x: 240,
      y: 180
    });
  }
}
