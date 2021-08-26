import { db, storage } from "boot/firebase";
import { initialPet } from "./state";
import obtenerFecha from "src/helper/obtenerFecha";

const imgPath =
  "https://firebasestorage.googleapis.com/v0/b/imblue-a4d7c.appspot.com/o/";

export function setOnline({ commit }) {
  console.log(window.navigator.onLine);
  commit("SET_ONLINE", window.navigator.onLine);
}

export function establecerMascota({ commit }, pet) {
  commit("SET_PET", pet);
}

export function reiniciarMascota({ commit }) {
  commit("SET_PET", { ...initialPet });
}

export function setUserId({ commit }, id) {
  commit("SET_USER_ID", id);
}

export async function crearMascota({ state }, pet) {
  const { photo } = pet;
  const ref = storage.ref(photo.name);
  const snapshot = await ref.put(photo);
  const query = await db.collection("pets").add({
    ...pet,
    photo: `${imgPath}${photo.name}?alt=media`,
    created_by: state.userId,
    created_at: obtenerFecha()
  });
  return query;
}

export async function actualizarMascota({ state }, pet) {
  const query = await db
    .collection("pets")
    .doc(pet.id)
    .update({
      ...pet
    });
  return query;
}

export async function enviarAdopcion({ state }, adoption) {
  const query = await db.collection("adoptions").add({
    ...adoption,
    created_by: state.userId,
    created_at: obtenerFecha()
  });
  return query;
}

export function setRouteName({ commit }, routeName) {
  commit("SET_ROUTE_NAME", routeName || "ImBlue");
}
