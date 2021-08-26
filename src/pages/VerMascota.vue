<template>
  <q-page class="row justify-center">
    <div class="q-ma-sm m-card" v-if="online">
      <q-card>
        <img :src="pet.photo" />

        <q-card-section class="q-pb-sm">
          <div class="text-h6">{{ pet.name }}</div>
          <div class="text-subtitle2">{{ pet.type }} - {{ pet.breed }}</div>
        </q-card-section>
        <q-card-section v-if="pet.description" class="q-py-none">
          <span>{{ pet.description }}</span>
        </q-card-section>
        <q-card-section class="q-pt-sm">
          <div class="row justify-between items-center">
            <div>
              <small class="text-grey-8">Edad</small>
              <p>{{ pet.age }} meses</p>
            </div>
            <div>
              <small class="text-grey-8">Ciudad</small>
              <p>{{ pet.city }}</p>
            </div>
            <div>
              <small class="text-grey-8">Genero</small>
              <p>{{ pet.gender }}</p>
            </div>
          </div>
          <div class="row justify-between items-center">
            <div>
              <small class="text-grey-8">Fundacion o tenedor</small>
              <p>{{ pet.created_by }}</p>
            </div>
            <div>
              <small class="text-grey-8">Tamaño</small>
              <p>{{ pet.size }}</p>
            </div>
            <div>
              <small class="text-grey-8">Fecha de nacimiento</small>
              <p>{{ pet.birthday }}</p>
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            color="primary"
            class="w-full"
            :disable="pet.adopted"
            @click="adoptar"
          >
            Adoptar
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div v-else>
      <p class="text-center text-h6 text-grey-7">
        No hay conexión a internet
      </p>
    </div>
  </q-page>
</template>

<script>
import { db } from "boot/firebase";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "VerMascota",
  async mounted() {
    const { id } = this.$route.params
    const query = await db
      .collection("pets")
      .doc(id)
      .get();
    this.pet = {id, ...query.data()};
    this.setRouteName(this.pet.name);
  },
  data() {
    return {
      pet: {}
    };
  },
  computed: {
    ...mapGetters("main", {
      online: "online"
    })
  },
  methods: {
    ...mapActions("main", {
      setRouteName: "setRouteName"
    }),
    adoptar() {
      console.log(this.pet.id)
      this.$router.push({
        name: "FormularioAdopcion",
        params: { id: this.pet.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.m-card {
  max-width: 600px;
}
</style>
