<template>
    <div>
    <navbar/>
    <sidebar/>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </div>
</template>
<script>

import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'AppContent',
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
