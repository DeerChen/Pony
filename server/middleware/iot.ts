/*
 * @Author       : Senkita
 * @Date         : 2024-04-28 04:16:51
 * @Description  : 中间层转发
 * @LastEditTime : 2024-04-29 00:18:02
 * @LastEditors  : Senkita
 */
import { eventHandler } from "h3";
import type { IClientOptions } from "mqtt";
import mqtt from "mqtt";
import { WebSocketServer } from "ws";
import { TERM_FLAG, WS_PORT } from "~/src/globals";

const PRODUCT_KEY = process.env["PRODUCT_KEY"];
const DEVICE_NAME = process.env["DEVICE_NAME"];

const MQTT_HOST = process.env["MQTT_HOST"];
const MQTT_PORT = process.env["MQTT_PORT"];

const PASSWORD = process.env["PASSWORD"];

const TIMESTAMP = process.env["TIMESTAMP"];

const username = `${DEVICE_NAME}&${PRODUCT_KEY}`;
const clientId = `${PRODUCT_KEY}.${DEVICE_NAME}|securemode=2,signmethod=hmacsha256,timestamp=${TIMESTAMP}|`;

// 阿里云IoT平台连接配置
const options: IClientOptions = {
  username,
  password: PASSWORD,
  clientId,
  keepalive: 60,
  clean: true,
  resubscribe: false,
};

// 中间层转发
const iotHandler = eventHandler(async (_event) => {
  const wsServer = new WebSocketServer({ port: WS_PORT });

  wsServer.on("connection", (ws) => {
    const mqttClient = mqtt.connect(
      `mqtt://${MQTT_HOST}:${MQTT_PORT}`,
      options
    );

    mqttClient.on("connect", () => {
      mqttClient.subscribe(
        `/sys/${PRODUCT_KEY}/${DEVICE_NAME}/thing/event/property/post`
      );

      ws.send("已连接至阿里云IoT平台");
      ws.send(`\r\n${TERM_FLAG}`);
    });

    mqttClient.on("message", (topic, message) => {
      ws.send("收到消息: ");
      ws.send("\x1b[0;37m");
      ws.send(JSON.stringify({ topic, message }));
      ws.send("\u001B[0m");
      ws.send(`\r\n${TERM_FLAG}`);
    });

    // TODO: 错误处理

    ws.on("close", () => {
      mqttClient.end();
    });
  });
});

export default iotHandler;
