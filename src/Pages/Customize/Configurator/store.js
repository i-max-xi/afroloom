import { proxy } from "valtio";
import whiteTexture from "./textures/whitetxture.jpg";

export const state = proxy({
  color: "#ffffff",
  texture: whiteTexture, // Set the initial texture here
});
