import {
  Project,
  Sprite
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Ship from "./Ship/Ship.js";
import Projectile from "./Projectile/Projectile.js";
import UfoShot from "./UfoShot/UfoShot.js";
import BAsteroid from "./BAsteroid/BAsteroid.js";
import MAsteroid from "./MAsteroid/MAsteroid.js";
import SAsteroid from "./SAsteroid/SAsteroid.js";
import Meteor from "./Meteor/Meteor.js";
import Explo1 from "./Explo1/Explo1.js";
import Explo2 from "./Explo2/Explo2.js";
import Explo4 from "./Explo4/Explo4.js";
import Explo3 from "./Explo3/Explo3.js";
import Sprite3 from "./Sprite3/Sprite3.js";
import Ufosprite2 from "./Ufosprite2/Ufosprite2.js";
import Explo5 from "./Explo5/Explo5.js";
import Sprite1 from "./Sprite1/Sprite1.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Ship: new Ship({
    x: -40.13296968857121,
    y: 23.35465470450996,
    direction: -108,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 7.000000000000001,
    visible: true,
    layerOrder: 14
  }),
  Projectile: new Projectile({
    x: 14.425454325501816,
    y: 185,
    direction: 4,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 22.88020700275171,
    visible: false,
    layerOrder: 3
  }),
  UfoShot: new UfoShot({
    x: 0.8475324927843388,
    y: -104.55294027975609,
    direction: 98.71978037719033,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 12
  }),
  BAsteroid: new BAsteroid({
    x: -200.76994704232658,
    y: 102.89852183182495,
    direction: -24.652259545484583,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 1,
    size: 70,
    visible: false,
    layerOrder: 2
  }),
  MAsteroid: new MAsteroid({
    x: -203.2659723001455,
    y: -128.15791645149739,
    direction: 119,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 1
  }),
  SAsteroid: new SAsteroid({
    x: 151.99999421437542,
    y: -10,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 65,
    visible: false,
    layerOrder: 9
  }),
  Meteor: new Meteor({
    x: -237.50697568983605,
    y: 56.869582981580834,
    direction: 139,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 40,
    visible: false,
    layerOrder: 8
  }),
  Explo1: new Explo1({
    x: -62.03783489860122,
    y: -0.37616310226954397,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 7
  }),
  Explo2: new Explo2({
    x: -203.2659723001455,
    y: -128.15791645149739,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 40,
    visible: false,
    layerOrder: 6
  }),
  Explo4: new Explo4({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 25,
    visible: false,
    layerOrder: 13
  }),
  Explo3: new Explo3({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 40,
    visible: false,
    layerOrder: 5
  }),
  Sprite3: new Sprite3({
    x: 0,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 150,
    visible: false,
    layerOrder: 10
  }),
  Ufosprite2: new Ufosprite2({
    x: 240,
    y: 68,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 11
  }),
  Explo5: new Explo5({
    x: -48.76419761365102,
    y: 0.538864539015865,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 40,
    visible: false,
    layerOrder: 4
  }),
  Sprite1: new Sprite1({
    x: 182,
    y: -116,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 15
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
