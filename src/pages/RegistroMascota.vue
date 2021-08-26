<template>
  <q-page class="column items-center">
    <div class="max-w-600 q-pa-lg w-full">
      <p class="text-h5 text-center">Información de la mascota</p>
      <q-form autofocus greedy @submit="guardar" class="w-full">
        <q-input
          class="q-my-xs"
          v-model="pet_.name"
          label="Nombre *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-select
          class="q-my-xs"
          v-model="pet_.type"
          :options="typeOptions"
          label="Tipo de mascota *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-input
          class="q-my-xs"
          v-model="pet_.breed"
          label="Raza *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-select
          class="q-my-xs"
          v-model="pet_.gender"
          :options="genderOptions"
          label="Género *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-input
          class="q-my-xs"
          v-model="pet_.age"
          label="Edad *"
          type="number"
          suffix="meses"
          lazy-rules
          :rules="[val => val > 0 || 'Campo numérico requerido.']"
        />
        <q-input
          class="q-my-xs"
          v-model="pet_.color"
          label="Color *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-select
          class="q-my-xs"
          v-model="pet_.size"
          :options="sizeOptions"
          label="Tamaño *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-select
          class="q-my-xs"
          v-model="pet_.city"
          :options="cityOptions"
          label="Cuidad de residencia *"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <!-- TODO: Date input -->
        <q-input
          class="q-my-xs"
          v-model="pet_.birthday"
          label="Fecha de nacimiento *"
          mask="##/##/####"
          fill-mask=""
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
        />
        <q-input class="q-my-xs" v-model="pet_.description" label="Descripción" />
        <q-input class="q-my-xs" v-model="pet_.personality" label="Personalidad" />
        <q-file class="q-my-xs" v-model="pet_.photo" label="Foto" />
        <q-btn
          class="w-full q-my-md"
          color="primary"
          :label="submitLabel"
          type="submit"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "RegistroMascota",
  beforeMount () {
    this.pet_ = {...this.pet},
    this.setRouteName('Registro mascota')
  },
  data() {
    return {
      pet_: {},
      typeOptions: ["Gato", "Perro"],
      genderOptions: ["Macho", "Hembra"],
      sizeOptions: ["Pequeño", "Mediano", "Grande"],
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
    ...mapGetters('main', {
      pet: 'pet'
    }),
    submitLabel: () => {
      return 'Continuar'
    }
  },
  methods: {
    ...mapActions('main', {
      establecerMascota: 'establecerMascota',
      setRouteName: 'setRouteName',
    }),
    guardar() {
      console.log(this.pet_.photo)
      this.establecerMascota({...this.pet_})
      this.$router.push({ name: 'HistoriaMedica' })
    }
  }
};
</script>
