<template>
  <VLayout justify-center row wrap>
    <VFlex xs8>
      <VForm @submit.prevent="save">
        <VToolbar dense class="grey lighten-4 elevation-2 mb-1">
          <VTooltip bottom>
            <VBtn slot="activator" icon @click="$router.push({ name: 'category-list' })">
              <VIcon>arrow_back</VIcon>
            </VBtn>
            <span>cancel</span>
          </VTooltip>
          <VSpacer />
          <span class="headline">Update post category</span>
          <VSpacer />
        </VToolbar>

        <VCard tile class="pa-3">
          <VLayout row>
            <VFlex xs9>
              <VLayout column>
                <VFlex xs12>
                  <VTextField
                    v-validate="'required'"
                    v-model="item.name"
                    :error-messages="errors.collect('name')"
                    label="Name *"
                    name="name"
                    outline
                    background-color="white elevation-1"
                  />
                </VFlex>
              </VLayout>
            </VFlex>
            <VFlex xs3>
              <VLayout column>
                <VFlex xs12>
                  <div class="form__field">
                    <div class="form__input">
                      <Swatches v-model="item.color" :colors="colors" popover-to="left"></Swatches>
                    </div>
                  </div>
                </VFlex>
              </VLayout>
            </VFlex>
          </VLayout>
        </VCard>
        <VLayout>
          <VToolbar>
            <VSpacer />
            <VBtn color="defualt" @click="$router.push({ name: 'category-list' })" type="button"
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
import { PostCategoryAPI } from '@/api';
import Swatches from 'vue-swatches';

export default {
  name: 'PostCategoryUpdate',
  components: {
    Swatches
  },
  data() {
    return {
      colors: ['#F64272', '#388e3c', '#2196f3', '#725493', '#01001e', '#d8cd50', ''],
      resourceName: 'User',
      errorMessage: null,
      item: {}
    };
  },

  async created() {
    const { id } = this.$route.params;
    const category = await PostCategoryAPI.get(id);
    this.item = category;
  },

  methods: {
    async save() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        this.errorMessage = null;
        try {
          delete this.item.createdAt;
          delete this.item.updatedAt;
          delete this.item._isDeleted; // eslint-disable-line

          await PostCategoryAPI.update(this.item);
          this.$notify({
            type: 'success',
            title: 'success',
            message: 'Category updated'
          });
          this.$router.push({ name: 'category-list' });
        } catch (err) {
          const messages = (err && err.message) || err.toString();
          this.errorMessage = messages;
        }
      }
    }
  }
};
</script>
