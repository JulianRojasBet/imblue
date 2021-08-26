<template>
  <q-page class="row justify-center q-mb-xl">
    <div v-if="online">
      <q-pull-to-refresh @refresh="obtenerDatos">
        <pet-card class="q-ma-sm m-card" v-for="pet in pets" :key="pet.id" :pet="pet">
        </pet-card>
        <p class="text-center text-h6 text-grey-7" v-if="!pets.length">
          No hay mascotas registradas
        </p>
      </q-pull-to-refresh>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" @click="mostrarRegistroMascota" />
      </q-page-sticky>
    </div>
    <div v-else>
      <p class="text-center text-h6 text-grey-7">
        No hay conexión a internet
      </p>
    </div>
  </q-page>

</template>

<script>
import { db } from 'boot/firebase'
import { mapActions, mapGetters } from 'vuex'

import PetCard from 'components/pet/PetCard.vue'

export default {
  name: "ListadoMascotas",
  components: { PetCard },
  mounted () {
    this.obtenerDatos()
    this.setRouteName('Listado mascotas')
  },
  data () {
    return {
      pets: []
    }
  },
  computed: {
    ...mapGetters('main', { online: 'online'})
  },
  methods: {
    ...mapActions('main', {
      setRouteName: 'setRouteName'
    }),
    mostrarRegistroMascota() {
      this.$router.push({name: 'RegistroMascota'})
    },
    async obtenerDatos(done) {
      // https://bluuweb.github.io/quasar/todo-firestore/#get-tasks
      if (!done) this.$q.loading.show()
      const query = await db.collection('pets').get()
      query.forEach((element) => {
        const pet = {id: element.id, ...element.data()}
        const index = this.pets.findIndex(({ id }) => id === pet.id)
        if (index < 0) this.pets.unshift(pet)
      })
      if (done) done()
      this.$q.loading.hide()
    }
  }
};
</script>

<style lang="scss" scoped>
.m-card {
  max-width: 350px;
}
</style>
