import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';


Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#ed0083',
    lightBlue: '#89d5ff',
    primaryDark: '#388E3C',
    secondary: '#ebebeb',
    accent: '#593c79',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#FF5722',
    navbarColor: '#593c79',
    sidebarColor: '#f5f5f5',
    green: '#44bb4b',
    purple: '#6d60b6',
  },
});
