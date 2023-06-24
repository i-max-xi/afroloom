import { proxy } from "valtio";
import kente from "./textures/kente.png";

export const state = proxy({
  color: "#ffffff",
  texture: kente, // Set the initial texture here
});
