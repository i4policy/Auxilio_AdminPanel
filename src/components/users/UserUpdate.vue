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
          <span class="headline">Update user account</span>
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
                <VLayout row>
                  <!-- <VFlex xs5>
                    <VSelect
                      :error-messages="errors.collect('title')"
                      v-validate="'required'"
                      name="title"
                      :items="titles"
                      v-model="item.title"
                      label="Title"
                      solo
                    ></VSelect>
                  </VFlex>-->
                  <VFlex xs5 offset-xs1>
                    <VTextField
                      v-validate="'required'"
                      v-model="item.givenName"
                      :error-messages="errors.collect('given name')"
                      label="Given Name *"
                      name="given name"
                      outline
                      background-color="white elevation-1"
                    />
                  </VFlex>
                  <VFlex xs5 offset-xs1>
                    <VTextField
                      v-validate="'required'"
                      v-model="item.familyName"
                      :error-messages="errors.collect('family name')"
                      label="Family Name *"
                      name="family name"
                      outline
                      background-color="white elevation-1"
                    />
                  </VFlex>
                </VLayout>

                <VLayout row>
                  <VFlex xs5 offset-xs1>
                    <VTextField
                      v-model="item.organization"
                      :error-messages="errors.collect('organization')"
                      label="Organization"
                      name="organization"
                      outline
                      background-color="white elevation-1"
                    />
                  </VFlex>
                  <VFlex xs5 offset-xs1>
                    <CountrySelect v-model="item.country" :country="country" top-country="US" />
                  </VFlex>
                </VLayout>

                <VLayout row>
                  <!-- <VFlex xs5>
                    <VTextField
                      v-model="item.position"
                      label="Position"
                      name="position"
                      outline
                      background-color="white elevation-1"
                    />
                  </VFlex>-->
                  <VFlex xs5 offset-xs1>
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
                  <VFlex xs5 offset-xs1>
                    <VueTelInput
                      name="phoneNumber"
                      :error-messages="errors.collect('phoneNumber')"
                      v-validate="'required'"
                      v-model="item.phoneNumber"
                      @onInput="onPhoneInput"
                      :preferred-countries="[]"
                    ></VueTelInput>
                  </VFlex>
                </VLayout>
                <VLayout row>
                  <VFlex xs5 offset-xs1>
                    <VSelect
                      :error-messages="errors.collect('role')"
                      v-validate="'required'"
                      name="role"
                      :items="roles"
                      item-text="name"
                      item-value="id"
                      v-model="item.roleId"
                      label="Role"
                      solo
                    ></VSelect>
                  </VFlex>
                  <VFlex xs5 offset-xs1>
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
                </VLayout>
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
import 'vue-tel-input/dist/vue-tel-input.css';
import VueTelInput from 'vue-tel-input';

export default {
  name: 'UserUpdate',
  components: {
    ProfilePictureUpload,
    VueTelInput
  },
  data() {
    return {
      resourceName: 'User',
      errorMessage: null,
      item: {},
      country: '',
      roles: []
    };
  },
  async created() {
    const { id } = this.$route.params;
    const user = await UserAccountAPI.get(id);
    delete user.createdAt;
    delete user.updatedAt;
    delete user._isDeleted; // eslint-disable-line
    delete user.roleId;
    this.item = user;
    this.roles = (await UserAccountAPI.getRoles()).rows;
  },
  methods: {
    async save() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        this.errorMessage = null;
        try {
          await UserAccountAPI.updateMember(this.item);
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
    onPhoneInput({ number, isValid, country }) {
      console.log(number, isValid, country);
    }
  }
};
</script>
