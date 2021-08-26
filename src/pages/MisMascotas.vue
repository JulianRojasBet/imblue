<template>
  <q-page class="row justify-center q-mb-xl">
    <div v-if="online">
      <q-pull-to-refresh @refresh="obtenerDatos">
        <pet-card v-for="pet in pets" :key="pet.id" :pet="pet">
        </pet-card>
        <p class="text-center text-h6 text-grey-7" v-if="!pets.length">
          No hay mascotas registradas
        </p>
      </q-pull-to-refresh>
    </div>
    <div v-else>
      <p class="text-center text-h6 text-grey-7">
        No hay conexión a internet
      </p>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db } from 'boot/firebase'

import PetCard from 'components/pet/PetCard.vue'

export default {
  name: "MisMascotas",
  components: { PetCard },
  mounted () {
    this.obtenerDatos()
    this.setRouteName('Mis mascotas')
  },
  data () {
    return {
      pets: []
    }
  },
  computed: {
    ...mapGetters('main', { userId: 'userId', online: 'online' }),
  },
  methods: {
    ...mapActions('main', {
      setRouteName: 'setRouteName'
    }),
    async obtenerDatos(done) {
      // https://bluuweb.github.io/quasar/todo-firestore/#get-tasks
      if (!done) this.$q.loading.show()
      const query = await db.collection('pets').where('created_by', '==', this.userId).get()
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