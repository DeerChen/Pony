<!--
 * @Author       : Senkita
 * @Date         : 2024-04-28 04:32:37
 * @Description  : 终端
 * @LastEditTime : 2024-04-29 00:05:05
 * @LastEditors  : Senkita
-->
<template>
  <div id="termWrapper">
    <div id="term" ref="termEle"></div>
  </div>
</template>

<script setup lang="ts">
import { AttachAddon } from "@xterm/addon-attach/src/AttachAddon";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { ref } from "vue";
import { TERM_FLAG, WS_URL } from "~/src/globals";
import { useStateParked } from "~/src/states";

const termEle = ref<HTMLElement | null>(null);
const ws = ref<WebSocket>();

const stateParked = useStateParked();

const term = new Terminal(); // 创建终端实例

term.resize(93, 10); // 限制终端行列

onMounted(() => {
  if (termEle.value) {
    term.open(termEle.value);
    term.write(TERM_FLAG);
  }

  ws.value = new WebSocket(WS_URL);
  const attachAddon = new AttachAddon(ws.value); // 终端绑定websocket
  term.loadAddon(attachAddon);

  ws.value.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data).message.data;
      const jsonStr = String.fromCharCode(...data);
      const jsonObj = JSON.parse(jsonStr);

      // 使用阿里云IoT平台提供的标准功能`驻车状态`
      // 0 - 无车 1 - 有车
      stateParked.value = jsonObj.params.StateParked;
    } catch (error) {}
  };
});
</script>

<style scoped>
#termWrapper {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 840px;

  #term {
    width: 840px;
  }
}
</style>
