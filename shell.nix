{ pkgs ? import <nixpkgs> { } }:
with pkgs;
mkShell {
  nativeBuildInputs = [
    nodejs_20
    bun
    npm-check-updates
  ];

  PRODUCT_KEY = "";
  DEVICE_NAME = "";

  MQTT_HOST = "";
  MQTT_PORT = 1883;

  PASSWORD = "";

  TIMESTAMP = "";

  shellHook = ''
    ncu -u
    bun install
    bun start
  '';
}
