<!--
 * @Author       : Senkita
 * @Date         : 2024-04-05 15:01:02
 * @Description  : 主页
 * @LastEditTime : 2024-04-29 00:14:58
 * @LastEditors  : Senkita
-->
<template>
  <header>
    <h1>Pony</h1>
  </header>
  <main>
    <Board />
    <Term />
  </main>
  <footer>
    Copyright &copy; {{ new Date().getFullYear() }}
    <a href="https://github.com/Senkita" target="_blank">Senkita</a>
  </footer>
</template>

<script setup lang="ts">
import Board from "~/src/components/Board.vue";
import Term from "~/src/components/Term.vue";
</script>

<style scoped>
header,
footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

a:link,
a:visited,
a:hover,
a:active {
  margin: 0 5px;
  color: #000;
  text-decoration: none;
}
</style>
