<template>
  <v-toolbar fixed app dark dense clipped-left color="navbarColor" height="64" class="on-top">
    <v-toolbar-side-icon @click="toggleNavBar()"/>
    <img height="64" src="@/assets/logo.png">
    <v-toolbar-title class="align-center">
      <span class="display-1 font-weight-bold primary--text">{{ appName }}</span>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-menu
        v-model="profilePopupVisible"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >

        <v-btn slot="activator" icon>
            <v-icon large dark>account_circle</v-icon>
        </v-btn>
        <div slot="activator" class="subheader">
            {{userProfile.name}}
        </div>
        <v-btn slot="activator"  icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-card>
          <v-list>
            <v-list-tile avatar @click="logout()">
              <v-list-tile-avatar>
                <v-icon large>call_made</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action/>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import {
  mapMutations,
} from 'vuex';
import { AuthService } from '@/services/services.index';

export default {
  name: 'Navbar',
  data() {
    return {
      profilePopupVisible: false,
      appName: 'Auxilio',
      userProfile: {
        name: 'Mike',
        role: 'Admin',
      },
    };
  },
  methods: {
    ...mapMutations('layout', ['toggleNavBar']),
    logout() {
      AuthService.logout();
    },
  },
};
</script>
<style>
.on-top {
  z-index: 99;
}
</style>
