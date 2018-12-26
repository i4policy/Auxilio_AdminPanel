<template>
  <div>
    <VContainer fluid class="pb-0">
      <VLayout>
        <VFlex xs12> <div class="headline">Category</div> </VFlex>
      </VLayout>
    </VContainer>
    <VContainer class="pt-2" fluid grid-list-lg>
      <VLayout wrap>
        <VFlex xs12>
          <VCard class="pt-2">
            <VToolbar flat color="white">
              <VBtn
                color="primary"
                class="pa-0 pl-2 pr-3"
                @click="$router.push({ name: 'category-create' })"
              >
                <VIcon class="mr-1">add_circle_outline</VIcon>New Category
              </VBtn>
              <VSpacer />

              <VFlex xs12 md4>
                <VTextField v-model="search" :label="'search'" single-line append-icon="search" />
              </VFlex>
            </VToolbar>

            <VDataTable
              :headers="headers"
              :items="items"
              :loading="loading"
              :total-items="totalItems"
              disable-initial-sort
              :pagination.sync="pagination"
              @update:pagination="loadData"
            >
              <template slot="headerCell" slot-scope="{ header }">
                <span class="table-header-text caption font-weight-bold">
                  {{ header.textKey }}
                </span>
              </template>
              <template slot="items" slot-scope="{ index, item }">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>
                  <VLayout row>
                    <VFlex xs1>
                      <VLayout column>
                        <VFlex xs12>
                          <div id="color-avatar" :style="{ 'background-color': item.color }"></div>
                        </VFlex>
                      </VLayout>
                    </VFlex>
                    <VFlex xs6>
                      <VLayout column>
                        <VFlex xs6> {{ item.color }} </VFlex>
                      </VLayout>
                    </VFlex>
                  </VLayout>
                </td>
                <td>
                  <VMenu offset-x left bottom>
                    <VBtn slot="activator" icon> <VIcon>more_vert</VIcon> </VBtn>

                    <VList dense>
                      <VListTile
                        ripple
                        @click="$router.push({ name: 'category-update', params: { id: item.id } })"
                      >
                        <VListTileAction> <VIcon>edit</VIcon> </VListTileAction>
                        <VListTileTitle>Edit</VListTileTitle>
                      </VListTile>

                      <VListTile ripple @click="deleteItem(item.id)">
                        <VListTileAction> <VIcon>delete</VIcon> </VListTileAction>
                        <VListTileTitle>Delete</VListTileTitle>
                      </VListTile>
                    </VList>
                  </VMenu>
                </td>
              </template>
            </VDataTable>
          </VCard>
        </VFlex>
      </VLayout>
    </VContainer>
  </div>
</template>

<script>
import { PostCategoryAPI } from '@/api';
import { buildFilter, buildSearchFilter } from '@/util';

const debounce = require('lodash.debounce');

const ITEMS_PER_PAGE = 25;

export default {
  name: 'PostCategoryList',
  data() {
    return {
      search: '',
      searchStarted: false,
      items: [],
      loading: false,
      totalItems: 0,
      pagination: {
        skip: 1,
        rowsPerPage: ITEMS_PER_PAGE
      },
      searchField: 'name',
      headers: [
        { textKey: '#', value: 'id', sortable: false },
        { textKey: 'Name', value: 'name' },
        { textKey: 'Color', value: 'color' },
        { textKey: 'Actions', value: 'actions', sortable: false }
      ]
    };
  },
  methods: {
    doSearch: debounce(async function s() {
      if (this.searchField && this.search) {
        this.loadData(buildSearchFilter(this.searchField, this.search));
      } else {
        this.loadData();
      }
    }, 500),
    async loadData(filter) {
      this.loading = true;
      const filters = {
        filter: {
          ...filter,
          ...buildFilter(this.pagination)
        }
      };
      const { rows, count } = await PostCategoryAPI.all(filters);
      this.items = rows;
      this.totalItems = count;
      this.loading = false;
    },
    async deleteItem(id) {
      if (id) {
        await PostCategoryAPI.remove(id);
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'category deleted successfully'
        });
        this.loadData();
      }
    }
  },
  watch: {
    pagination: {
      handler() {
        this.loadData();
      },
      deep: true
    },
    search: {
      handler() {
        this.doSearch();
      }
    }
  }
};
</script>

<style>
#color-avatar {
  width: 15px;
  border-radius: 15px;
  height: 15px;
}
</style>
