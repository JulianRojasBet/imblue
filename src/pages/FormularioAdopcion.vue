<template>
  <q-page class="column items-center">
    <div class="max-w-600 q-pa-lg w-full">
      <p class="text-h5 text-center">Formulario de adopción</p>
      <q-form autofocus greedy @submit="guardar" class="w-full">
        <q-input
          class="q-my-xs"
          v-model="adoption.documentId"
          label="Documento de identidad *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-input
          class="q-my-xs"
          v-model="adoption.fullname"
          label="Nombre completo *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-input
          class="q-my-xs"
          v-model="adoption.phone"
          label="Teléfono *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-input
          class="q-my-xs"
          v-model="adoption.address"
          label="Dirección *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-select
          class="q-my-xs"
          v-model="adoption.city"
          label="Ciudad *"
          :options="cityOptions"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-input
          class="q-my-xs"
          type="email"
          v-model="adoption.email"
          label="Correo electrónico *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-toggle
          label="¿En su casa existen personas alérgicas?"
          v-model="adoption.areAllergen"
        />
        <q-toggle
          label="¿Tiene otras mascotas en su casa?"
          v-model="adoption.otherPets"
        />
        <q-toggle
          label="¿Su casa tiene un lugaradecuado para la mascota?"
          v-model="adoption.goodPlace"
        />
        <q-btn
          class="w-full q-my-md"
          color="primary"
          label="Enviar formulario de adopción"
          type="submit"
          :disable="!online"
        />
      </q-form>
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
    this.setRouteName(`Adoptar a ${this.pet.name}`);
  },
  data() {
    return {
      pet: {},
      adoption: {},
      cityOptions: [
        "Barranquilla",
        "Bogotá",
        "Bucaramanga",
        "Cali",
        "Cartagena",
        "Manizales",
        "Medellín",
        "Montería"
      ],
    };
  },
  computed: {
    ...mapGetters("main", {
      userId: "userId",
      online: "online"
    })
  },
  methods: {
    ...mapActions("main", {
      setRouteName: "setRouteName",
      enviarAdopcion: "enviarAdopcion",
      actualizarMascota: "actualizarMascota",
    }),
    async guardar() {
      try {
        this.$q.loading.show();
        const query = await this.enviarAdopcion({
          ...this.adoption,
          pet: this.$route.params.id
        });
        console.log(query.id);
        await this.actualizarMascota({
          ...this.pet,
          adopted: true,
          adoption: query.id,
          adopted_by: this.userId,
        })
        this.$q.notify({
          message: "Formulario enviado.",
          icon: "done"
        });
      } catch (err) {
        this.$q.notify({
          message: err,
          icon: "cancel"
        });
      } finally {
        this.$q.loading.hide();
        this.$router.replace({
          name: "ListadoMascotas"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-card {
  max-width: 600px;
}
</style>
