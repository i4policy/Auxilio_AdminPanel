<template>
  <v-container fluid fill-height pa-0>
    <v-layout column>
      <v-flex class="accent">
        <v-layout row wrap>
          <v-flex xs12 md12 order-xs2 order-md1>
            <div class="text-xs-center">
              <v-layout
                class="pa-0 ma-0 asd"
                align-center
                justify-center
                fill-height
                fill-width
                style="z-index: 99; position:absolute; width:100%;bottom:6em"
              >
                <v-flex xs10 sm8 md4 lg3>
                  <v-card class="elevation-12">
                    <v-toolbar>
                      <v-spacer/>
                      <v-toolbar-title>
                        <img src="@/assets/logo.png" height="64" alt>
                      </v-toolbar-title>
                      <span class="text-xs-center primary--text display-1">Auxillio</span>
                      <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                      <v-form @submit.prevent="login">
                        <v-alert v-if="authError" :value="true" type="error">
                          {{ authError }}
                        </v-alert>
                        <v-text-field
                          v-validate="'required'"
                          v-model="user.username"
                          :error-messages="errors.collect('username')"
                          prepend-icon="person"
                          name="username"
                          label="User"
                          type="text"
                          autocomplete="username"
                        />
                        <v-text-field
                          v-validate="'required'"
                          v-model="user.password"
                          :error-messages="errors.collect('password')"
                          prepend-icon="lock"
                          name="password"
                          autocomplete="current-password"
                          label="Password"
                          type="password"
                        />
                        <v-card-actions class="text-xs-center">
                          <v-btn type="submit" block color="primary">Login</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { AuthService } from '@/services/services.index';

export default {
  name: 'Login',
  data() {
    return {
      authError: '',
      user: {}
    };
  },
  methods: {
    login() {
      const self = this;
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          self.authError = null;
          AuthService.login(this.user.username, this.user.password)
            .then(() => {
              this.$validator.reset();
              this.$router.push({ name: 'home' });
            })
            .catch((err) => {
              if (err.statusCode === 400) {
                self.authError = 'Username or password is incorrect';
              }
            });
        }
      });
    }
  }
};
</script>
