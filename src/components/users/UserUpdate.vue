<template>
  <VLayout justify-center row wrap>
    <VFlex xs6>
      <VForm @submit.prevent="save">
        <VToolbar dense class="grey lighten-4 elevation-2 mb-1">
          <VTooltip bottom>
            <VBtn slot="activator" icon @click="$router.push({ name: 'user-list' })">
              <VIcon>arrow_back</VIcon>
            </VBtn>
            <span>cancel</span>
          </VTooltip>
          <VSpacer />
          <span class="headline"> Edit user</span>
          <VSpacer />
        </VToolbar>

        <VCard tile class=" pa-3">
          <FormErrorMessages :messages="errorMessage" />
          <VLayout column>
            <VFlex xs12>
              <VTextField
                v-validate="'required'"
                v-model="item.fullName"
                :error-messages="errors.collect('Full Name')"
                label="Full Name"
                name="Full Name"
                outline
                background-color="white elevation-1"
              />
            </VFlex>
            <VFlex xs12>
              <VTextField
                v-model="item.phoneNumber"
                :error-messages="errors.collect('Phone Number')"
                label="Phone Number"
                name="Phone Number"
                outline
                background-color="white elevation-1"
              />
            </VFlex>
            <!-- <v-flex
              xs12 >
              <v-select
                v-validate="'required'"
                :items="roleList"
                item-text="name"
                item-value="id"
                outline
                v-model="item.role"
                label="Role"
                :error-messages="errors.collect('Role')"
                name="Role"
                background-color="white elevation-1"
              />
            </v-flex> -->
            <VFlex xs12>
              <VTextField
                v-model="item.email"
                :error-messages="errors.collect('Email Address')"
                label="Email Address"
                name="Email Address"
                v-validate="'required|email'"
                type="email"
                outline
                background-color="white elevation-1"
              />
            </VFlex>
            <VFlex xs12>
              <VTextField
                v-model="item.password"
                :error-messages="errors.collect('Password')"
                label="Password"
                name="Password"
                type="password"
                v-validate="'required'"
                outline
                background-color="white elevation-1"
                ref="password"
              />
            </VFlex>
          </VLayout>
        </VCard>
        <VLayout>
          <VToolbar>
            <VSpacer />
            <VBtn color="defualt" @click="$router.push({ name: 'user-list' })" type="button">
              cancel
            </VBtn>
            <VBtn color="primary" type="submit"> save </VBtn>
            <VSpacer />
          </VToolbar>
        </VLayout>
      </VForm>
    </VFlex>
  </VLayout>
</template>

<script>
import { UserAccountAPI } from '@/api';

export default {
  name: 'UserCreate',
  data() {
    return {
      resourceName: 'User',
      errorMessage: null,
      item: {}
    };
  },

  created() {
    const { id } = this.$route.params;
    this.getData(id);
  },

  methods: {
    async save() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        this.errorMessage = null;
        try {
          await UserAccountAPI.registerMember(this.item);
          this.$notify({
            type: 'success',
            title: 'success',
            message: 'User updated'
          });
          this.$router.push({ name: 'user-list' });
        } catch (err) {
          const messages = (err && err.message) || err.toString();
          this.errorMessage = messages;
        }
      }
    },
    async getData(id) {
      this.item = await UserAccountAPI.get(id);
    }
  }
};
</script>
