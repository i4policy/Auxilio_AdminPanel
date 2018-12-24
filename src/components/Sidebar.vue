<template>
  <v-navigation-drawer
    v-model="drawerStatus"
    :width="265"
    :style="cssProps"
    app
    class="sidebarColor"
    fixed
    clipped
  >
    <v-list>
      <template v-for="menu in menus">
        <v-list-tile v-if="!menu.children" :key="menu.title" :to="menu.path" exact ripple>
          <v-list-tile-action>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          v-if="menu.children"
          :key="menu.title"
          :prepend-icon="menu.icon"
          :value="true"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="submenu in menu.children"
            :key="submenu.title"
            :to="submenu.path"
            ripple
            exact
          >
            <v-list-tile-action>
              <v-icon>{{ submenu.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ submenu.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',
  data() {
    return {
      userProfile: {},
      menus: [
        {
          title: 'Home',
          icon: 'dashboard',
          path: '/app',
        },
        {
          title: 'Agenda',
          icon: 'library_books',
          path: '/app/agendas',
        },
        {
          title: 'Settings',
          icon: 'settings',
          roles: ['ADMIN'],
          children: [
            {
              title: 'Users',
              icon: 'account_box',
              path: '/app/users',
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState('core', ['appName']),
    cssProps() {
      return {
        '--secondary-color': this.$vuetify.theme.secondary,
      };
    },
    drawerStatus: {
      get() {
        return this.$store.state.layout.navDrawerToggle;
      },
      set(newValue) {
        this.$store.state.layout.navDrawerToggle = newValue;
      },
    },
  },
  methods: {
    menuGroupShouldBeExpanded(menu) {
      if (menu.childrenUrlMatcher) {
        return this.$route.fullPath.includes(menu.childrenUrlMatcher);
      }

      return false;
    },
  },
};
</script>
<style>
.v-list__tile--active {
  background-color: var(--secondary-color);
}
</style>
