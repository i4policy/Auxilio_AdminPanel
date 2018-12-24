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
              @click="$router.push({ name: 'agenda-list' })">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <span>cancel</span>
          </v-tooltip>
          <v-spacer/>
          <span class="headline">Edit agenda</span>
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
                v-model="item.title"
                :error-messages="errors.collect('Title')"
                label="Title"
                name="Title"
                outline
                background-color="white elevation-1"
              />
            </v-flex>
            <v-flex
              xs12>
              <v-textarea
                v-model="item.description"
                :error-messages="errors.collect('Description')"
                label="Description"
                name="Description"
                outline
                background-color="white elevation-1"
              />
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout>
          <v-toolbar>
            <v-spacer/>
            <v-btn
              color="defualt"
              @click="$router.push({ name: 'agenda-list' })"
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
import { AgendaAPI } from '@/api/api.index';

export default {
  name: 'AgendaCreate',
  data() {
    return {
      resourceName: 'Agenda',
      errorMessage: null,
      item: {},
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
          await AgendaAPI.update(this.item);
          this.$notify({
            type: 'success',
            title: 'success',
            message: 'Agenda updated'
          });
          this.$router.push({ name: 'agenda-list' });
        } catch (err) {
          const messages = (err && err.message) || err.toString();
          this.errorMessage = messages;
        }
      }
    },
    async getData(id) {
      this.item = await AgendaAPI.get(id);
    }
  },
  watch: {}
};
</script>
