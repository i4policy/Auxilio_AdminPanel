<template>
  <VContainer fluid fill-height pa-0>
    <VLayout column>
      <VFlex class="accent">
        <VLayout row wrap>
          <VFlex xs12 md12 order-xs2 order-md1>
            <div class="text-xs-center">
              <VLayout
                class="pa-0 ma-0 asd"
                align-center
                justify-center
                fill-height
                fill-width
                style="z-index: 99; position:absolute; width:100%;bottom:6em"
              >
                <VFlex xs10 sm8 md4 lg3>
                  <VCard class="elevation-12">
                    <VToolbar>
                      <VSpacer />
                      <VToolbarTitle>
                        <img src="@/assets/logo.png" height="64" alt />
                      </VToolbarTitle>
                      <span class="text-xs-center primary--text display-1">Auxillio</span>
                      <VSpacer />
                    </VToolbar>
                    <VCardText>
                      <VForm @submit.prevent="login">
                        <VAlert v-if="authError" :value="true" type="error">
                          {{ authError }}
                        </VAlert>
                        <VTextField
                          v-validate="'required'"
                          v-model="user.username"
                          :error-messages="errors.collect('username')"
                          prepend-icon="person"
                          name="username"
                          label="User"
                          type="text"
                          autocomplete="username"
                        />
                        <VTextField
                          v-validate="'required'"
                          v-model="user.password"
                          :error-messages="errors.collect('password')"
                          prepend-icon="lock"
                          name="password"
                          autocomplete="current-password"
                          label="Password"
                          type="password"
                        />
                        <VCardActions class="text-xs-center">
                          <VBtn type="submit" block color="primary">Login</VBtn>
                        </VCardActions>
                      </VForm>
                    </VCardText>
                  </VCard>
                </VFlex>
              </VLayout>
            </div>
          </VFlex>
        </VLayout>
      </VFlex>
    </VLayout>
  </VContainer>
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
      this.$validator.validateAll().then(valid => {
        if (valid) {
          self.authError = null;
          AuthService.login(this.user.username, this.user.password)
            .then(() => {
              this.$validator.reset();
              this.$router.push({ name: 'home' });
            })
            .catch(err => {
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
