<template>
  <q-page class="row justify-center">
    <div class="q-pa-md max-w-600 w-full">
      <q-list v-for="record in records" :key="record.id" bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label>{{ record.type }}</q-item-label>
            <q-item-label caption>{{ record.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <p v-show="!records.length" class="text-center text-h6 text-grey-7">
        No hay registros médicos para esta mascota
      </p>
    </div>

    <q-dialog v-model="recordForm" persistent>
      <q-card style="min-width: 350px">
        <q-form autofocus greedy @submit="crearRegistro">
          <q-card-section>
            <div class="text-h6">Agregar registro</div>
              <q-select
                class="q-my-xs"
                v-model="record.type"
                :options="typeOptions"
                label="Tipo"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
              /> 
              <q-input
                class="q-my-xs"
                v-model="record.date"
                label="Fecha *"
                mask="##/##/####"
                fill-mask=""
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
              />
              <q-input
                class="q-my-xs"
                v-model="record.name"
                label="Nombre *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo requerido.']"
              />
              <q-input
                class="q-my-xs"
                v-model="record.description"
                label="Descripción"
              />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat color="red" label="Cancelar" @click="reiniciarRegistro" />
            <q-btn flat label="crearRegistro" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom"  class="column q-px-xs">
      <q-btn
        class="w-full q-my-sm"
        color="primary"
        label="Agregar registro"
        @click="agregarRegistro"
      />
      <q-btn
        class="w-full q-my-sm"
        color="primary"
        label="Finalizar registro"
        :disable="!online"
        @click="save"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "HistoriaMedica",
  beforeRouteEnter(to, from, next) {
    if (to.name === "HistoriaMedica" && from.name !== "RegistroMascota")
      next({ name: "ListadoMascotas" });
    else next();
  },
  mounted () {
    this.setRouteName('Historia médica')
  },
  data() {
    return {
      record: {
        type: "",
        date: "",
        name: "",
        description: ""
      },
      type: "",
      records: [],
      recordForm: false,
      typeOptions: ["Vacuna", "Operación"]
    };
  },
  computed: {
    ...mapGetters('main', {
      pet: 'pet',
      online: 'online',
    })
  },
  methods: {
    ...mapActions('main', {
      reiniciarMascota: 'reiniciarMascota',
      crearMascota: 'crearMascota',
      setRecords: 'setRecords',
      setRouteName: 'setRouteName',
    }),
    agregarRegistro() {
      this.recordForm = true;
    },
    reiniciarRegistro() {
      this.recordForm = false;
      this.record = {
        type: "",
        date: "",
        name: "",
        description: ""
      };
    },
    crearRegistro() {
      this.recordForm = false;
      this.records.push(this.record);
      this.reiniciarRegistro();
    },
    async save() {
      try {
        this.$q.loading.show()
        this.reiniciarRegistro();
        await this.crearMascota({
          ...this.pet,
          records: this.records
        })
        this.$q.notify({
          message: 'Mascota registrada con éxito.',
          icon: 'done'
        })
      } catch (err) {
        this.$q.notify({
          message: err,
          icon: 'cancel'
        })
      } finally {
        this.$q.loading.hide()
        this.$router.replace({
          name: "MisMascotas"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-card {
  max-width: 350px;
}
</style>
