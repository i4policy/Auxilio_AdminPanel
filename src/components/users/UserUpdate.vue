<template>
  <v-layout
    justify-center
    row
    wrap
  >
    <v-flex xs6>
      <v-form @submit.prevent="save">
        <v-toolbar
          dense
          class="grey lighten-4 elevation-2 mb-1"
        >
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              icon
              @click="$router.push({ name: 'user-list' })">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <span>cancel</span>
          </v-tooltip>
          <v-spacer/>
          <span class="headline"> Edit user</span>
          <v-spacer/>
        </v-toolbar>

        <v-card
          tile
          class=" pa-3"
        >
          <form-error-messages
            :messages="errorMessage" />
          <v-layout column>
            <v-flex
              xs12>
              <v-text-field
                v-validate="'required'"
                v-model="item.fullName"
                :error-messages="errors.collect('Full Name')"
                label="Full Name"
                name="Full Name"
                outline
                background-color="white elevation-1"
              />
            </v-flex>
            <v-flex
              xs12>
              <v-text-field
                v-model="item.phoneNumber"
                :error-messages="errors.collect('Phone Number')"
                label="Phone Number"
                name="Phone Number"
                outline
                background-color="white elevation-1"
              />
            </v-flex>
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
            <v-flex
              xs12>
              <v-text-field
                v-model="item.email"
                :error-messages="errors.collect('Email Address')"
                label="Email Address"
                name="Email Address"
                v-validate="'required|email'"
                type="email"
                outline
                background-color="white elevation-1"
              />
            </v-flex>
            <v-flex
              xs12>
              <v-text-field
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
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout>
          <v-toolbar>
            <v-spacer/>
            <v-btn
              color="defualt"
              @click="$router.push({ name: 'user-list' })"
              type="button"
            >
              cancel
            </v-btn>
            <v-btn
              color="primary"
              type="submit"
            >
              save
            </v-btn>
            <v-spacer/>
          </v-toolbar>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { UserAccountAPI, UserRoleAPI } from '@/api/api.index';

export default {
  name: 'UserCreate',
  data() {
    return {
      resourceName: 'User',
      errorMessage: null,
      item: {},
      roleList: []
    };
  },
  computed: {},

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
    },
    async getRoles() {
      this.roleList = (await UserRoleAPI.all()).rows;
    }
  },
  watch: {}
};
</script>
