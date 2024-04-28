/*
 * @Author       : Senkita
 * @Date         : 2024-04-28 14:43:42
 * @Description  : 全局变量
 * @LastEditTime : 2024-04-28 22:50:23
 * @LastEditors  : Senkita
 */

type Point = [number, number];

const TERM_FLAG = "\x1b[1;33m$ \x1b[0m"; // 命令提示符

const WS_HOST = "localhost"; // WebSocket 主机名
const WS_PORT = 1024; // WebSocket 端口

const WS_URL = `ws://${WS_HOST}:${WS_PORT}`; // WebSocket URL

const PARKING_LOT_WIDTH = 760; // 停车场横宽
const PARKING_LOT_HEIGHT = 440; // 停车场纵长

const BLOCK_SIZE = 20; // 虚拟块大小

const ROADS = [
  { x: 4, y: 4 },
  { x: 4, y: 3 },
  { x: 4, y: 2 },
  { x: 4, y: 1 },
  { x: 4, y: 0 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
  { x: 6, y: 2 },
  { x: 7, y: 2 },
  { x: 8, y: 2 },
  { x: 9, y: 2 },
];

const SPACES = [
  // {
  //   spaceNum: "01",
  //   coordX: 1,
  //   coordY: 1,
  //   direction: "default",
  //   placed: true,
  // },
  {
    spaceNum: "02",
    coordX: 5,
    coordY: 1,
    direction: "default",
    placed: true,
  },
  {
    spaceNum: "03",
    coordX: 9,
    coordY: 1,
    direction: "default",
    placed: true,
  },
  {
    spaceNum: "04",
    coordX: 13,
    coordY: 1,
    direction: "default",
    placed: true,
  },

  {
    spaceNum: "05",
    coordX: 21,
    coordY: 1,
    direction: "default",
    placed: true,
  },
  {
    spaceNum: "06",
    coordX: 25,
    coordY: 1,
    direction: "default",
    placed: true,
  },
  {
    spaceNum: "07",
    coordX: 29,
    coordY: 1,
    direction: "default",
    placed: true,
  },
  {
    spaceNum: "08",
    coordX: 33,
    coordY: 1,
    direction: "default",
    placed: true,
  },

  {
    spaceNum: "09",
    coordX: 37,
    coordY: 21,
    direction: "Reverse",
    placed: true,
  },
  {
    spaceNum: "10",
    coordX: 33,
    coordY: 21,
    direction: "Reverse",
    placed: true,
  },
  {
    spaceNum: "11",
    coordX: 29,
    coordY: 21,
    direction: "Reverse",
    placed: true,
  },
  {
    spaceNum: "12",
    coordX: 25,
    coordY: 21,
    direction: "Reverse",
    placed: true,
  },

  {
    spaceNum: "13",
    coordX: 17,
    coordY: 21,
    direction: "Reverse",
    placed: true,
  },
  {
    spaceNum: "14",
    coordX: 13,
    coordY: 21,
    direction: "Reverse",
    placed: true,
  },
  {
    spaceNum: "15",
    coordX: 9,
    coordY: 21,
    direction: "Reverse",
    placed: true,
  },
  {
    spaceNum: "16",
    coordX: 5,
    coordY: 21,
    direction: "Reverse",
    placed: true,
  },
];

const parkingLotArr = new Array(5).fill(-1).map(() => new Array(9).fill(-1));

export {
  BLOCK_SIZE,
  PARKING_LOT_HEIGHT,
  PARKING_LOT_WIDTH,
  ROADS,
  SPACES,
  TERM_FLAG,
  WS_PORT,
  WS_URL,
  parkingLotArr,
};
export type { Point };
