<template>
  <div class="q-ma-sm m-card" @click="view">
    <q-card>
      <img :src="pet.photo" />

      <q-card-section class="q-pb-sm">
      <div class="text-h6">{{pet.name}}</div>
      <div class="text-subtitle2">{{pet.type}} - {{pet.breed}}</div>
      </q-card-section>
      <q-card-section v-if="pet.description" class="q-py-none">
      <span>{{pet.description}}</span>
      </q-card-section>
      <q-card-section class="q-pt-sm">
      <div class="row justify-between items-center">
        <div>
          <small class="text-grey-8">Edad</small>
          <p>{{pet.age}} meses</p>
        </div>
        <div>
          <small class="text-grey-8">Ciudad</small>
          <p>{{pet.city}}</p>
        </div>
        <div>
          <small class="text-grey-8">Genero</small>
          <p>{{pet.gender}} </p>
        </div>
      </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
    name: "FormularioAdopcion",
    props: ['pet'],
    methods: {
      view () {
        this.$router.push({ name: 'VerMascota', params: { id: this.pet.id } })
      }
    }
}
</script>

<style lang="scss" scoped>
  .m-card {
    max-width: 350px;
  }
  </style>
  