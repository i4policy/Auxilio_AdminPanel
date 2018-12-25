<template>
  <VLayout justify-center row wrap>
    <VFlex xs6>
      <VForm @submit.prevent="save">
        <VToolbar dense class="grey lighten-4 elevation-2 mb-1">
          <VTooltip bottom>
            <VBtn slot="activator" icon @click="$router.push({ name: 'agenda-list' })">
              <VIcon>arrow_back</VIcon>
            </VBtn>
            <span>cancel</span>
          </VTooltip>
          <VSpacer />
          <span class="headline">Edit agenda</span>
          <VSpacer />
        </VToolbar>

        <VCard tile class=" pa-3">
          <FormErrorMessages :messages="errorMessage" />
          <VLayout column>
            <VFlex xs12>
              <VTextField
                v-validate="'required'"
                v-model="item.title"
                :error-messages="errors.collect('Title')"
                label="Title"
                name="Title"
                outline
                background-color="white elevation-1"
              />
            </VFlex>
            <VFlex xs12>
              <VTextarea
                v-model="item.description"
                :error-messages="errors.collect('Description')"
                label="Description"
                name="Description"
                outline
                background-color="white elevation-1"
              />
            </VFlex>
          </VLayout>
        </VCard>
        <VLayout>
          <VToolbar>
            <VSpacer />
            <VBtn color="defualt" @click="$router.push({ name: 'agenda-list' })" type="button">
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
import { AgendaAPI } from '@/api/api.index';

export default {
  name: 'AgendaCreate',
  data() {
    return {
      resourceName: 'Agenda',
      errorMessage: null,
      item: {}
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
