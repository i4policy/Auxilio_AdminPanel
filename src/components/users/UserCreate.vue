<template>
  <VLayout justify-center row wrap>
    <VFlex xs10>
      <VForm @submit.prevent="save">
        <VToolbar dense class="grey lighten-4 elevation-2 mb-1">
          <VTooltip bottom>
            <VBtn slot="activator" icon @click="$router.push({ name: 'user-list' })">
              <VIcon>arrow_back</VIcon>
            </VBtn>
            <span>cancel</span>
          </VTooltip>
          <VSpacer />
          <span class="headline">Create new user account</span>
          <VSpacer />
        </VToolbar>

        <VCard tile class="pa-3">
          <FormErrorMessages :messages="errorMessage" />
          <VLayout row>
            <VFlex xs4>
              <ProfilePictureUpload @onUploadComplete="item.profilePicture = $event" />
            </VFlex>
            <VFlex xs8>
              <VLayout column>
                <VFlex xs12>
                  <VTextField
                    v-validate="'required'"
                    v-model="item.title"
                    :error-messages="errors.collect('title')"
                    label="Title *"
                    name="title"
                    outline
                    background-color="white elevation-1"
                  />
                </VFlex>
                <VFlex xs12>
                  <VTextField
                    v-validate="'required'"
                    v-model="item.fullName"
                    :error-messages="errors.collect('full name')"
                    label="Full Name *"
                    name="full name"
                    outline
                    background-color="white elevation-1"
                  />
                </VFlex>

                <VFlex xs12>
                  <VTextField
                    v-model="item.email"
                    :error-messages="errors.collect('email')"
                    label="Email *"
                    name="email"
                    v-validate="'required|email'"
                    type="email"
                    outline
                    background-color="white elevation-1"
                  />
                </VFlex>
                <VFlex xs12>
                  <VTextField
                    v-model="item.password"
                    :error-messages="errors.collect('password')"
                    label="Password *"
                    name="password"
                    type="password"
                    v-validate="'required'"
                    outline
                    background-color="white elevation-1"
                    ref="password"
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
              </VLayout>
            </VFlex>
          </VLayout>
        </VCard>
        <VLayout>
          <VToolbar>
            <VSpacer />
            <VBtn color="defualt" @click="$router.push({ name: 'user-list' })" type="button"
              >cancel</VBtn
            >
            <VBtn color="primary" type="submit">save</VBtn>
            <VSpacer />
          </VToolbar>
        </VLayout>
      </VForm>
    </VFlex>
  </VLayout>
</template>

<script>
import { UserAccountAPI } from '@/api';
import ProfilePictureUpload from './ProfilePictureUpload.vue';

export default {
  name: 'UserCreate',
  components: {
    ProfilePictureUpload
  },
  data() {
    return {
      resourceName: 'User',
      errorMessage: null,
      item: {}
    };
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
            message: `${'User'} ${'created'}`
          });
          this.$router.push({ name: 'user-list' });
        } catch (err) {
          const messages = (err && err.message) || err.toString();
          this.errorMessage = messages;
        }
      }
    }
  }
};
</script>
