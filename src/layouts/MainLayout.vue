<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
          <q-toolbar-title>
            <router-link to="/" class="text-white">
                {{routeName}}
            </router-link>
          </q-toolbar-title>
        <q-icon :name="netIcon" size="sm"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <NavItem
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

import NavItem from 'src/components/NavItem.vue'

const linksData = [
  {
    title: 'Inicio',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Mis Mascotas',
    caption: 'Listado de mascotas registradas por el usuario',
    icon: 'list',
    link: '/mis-mascotas/'
  }
];

export default {
  name: 'MainLayout',
  components: { NavItem },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    }
  },
  computed: {
    ...mapGetters('main', {
      online: 'online',
      routeName: 'routeName',
    }),
    netIcon: function () {
      return this.online ? 'wifi' : 'wifi_off'
    }
  },
}
</script>
