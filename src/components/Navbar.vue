<template>
  <VToolbar fixed app dark dense clipped-left color="navbarColor" height="64" class="on-top">
    <VToolbarSideIcon @click="toggleNavBar()" />
    <img height="64" src="@/assets/logo.png" />
    <VToolbarTitle class="align-center">
      <span class="display-1 font-weight-bold primary--text">{{ appName }}</span>
    </VToolbarTitle>
    <VSpacer />
    <VToolbarItems>
      <VMenu
        v-model="profilePopupVisible"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <VBtn slot="activator" icon> <VIcon large dark>account_circle</VIcon> </VBtn>
        <div slot="activator" class="subheader">{{ userProfile.name }}</div>
        <VBtn slot="activator" icon> <VIcon>more_vert</VIcon> </VBtn>
        <VCard>
          <VList>
            <VListTile avatar @click="logout()">
              <VListTileAvatar> <VIcon large>call_made</VIcon> </VListTileAvatar>
              <VListTileContent> <VListTileTitle>Logout</VListTileTitle> </VListTileContent>
              <VListTileAction />
            </VListTile>
          </VList>
        </VCard>
      </VMenu>
    </VToolbarItems>
  </VToolbar>
</template>
<script>
import { mapMutations } from 'vuex';
import { AuthService } from '@/services/services.index';

export default {
  name: 'Navbar',
  data() {
    return {
      profilePopupVisible: false,
      appName: 'Auxilio',
      userProfile: {
        name: 'Mike',
        role: 'Admin'
      }
    };
  },
  methods: {
    ...mapMutations('layout', ['toggleNavBar']),
    logout() {
      AuthService.logout();
    }
  }
};
</script>
<style>
.on-top {
  z-index: 99;
}
</style>
