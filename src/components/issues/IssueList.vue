<template>
  <div>
    <VContainer fluid class="pb-0">
      <VLayout>
        <VFlex xs12> <div class="headline">Issues</div> </VFlex>
      </VLayout>
    </VContainer>
    <VContainer class="pt-2" fluid grid-list-lg>
      <VLayout wrap>
        <VFlex xs12>
          <VCard class="pt-2">
            <VToolbar flat color="white">
              <div color="primary" class="pa-0 pl-2 pr-3"></div>
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
                <td>{{ item.user && `${item.user.givenName} ${item.user.familyName}` }}</td>
                <td>{{ item.urgencyLevel }}</td>
                <td>{{ item.description }}</td>
                <td>
                  <VMenu offset-x left bottom>
                    <VBtn slot="activator" icon> <VIcon>more_vert</VIcon> </VBtn>

                    <VList dense>
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
import { UserAccountAPI } from '@/api';
import { buildFilter, buildSearchFilter } from '@/util';

const debounce = require('lodash.debounce');

const ITEMS_PER_PAGE = 25;

export default {
  name: 'FeedbackList',
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
      searchField: 'givenName',
      headers: [
        { textKey: '#', value: 'id', sortable: false },
        { textKey: 'Full Name', value: 'givenName' },
        { textKey: 'UrgencyLevel', value: 'urgencyLevel' },
        { textKey: 'Description', value: 'description' },
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
          where: {
            feedbackType: 'ISSUE'
          },
          include: ['user'],
          ...buildFilter(this.pagination)
        }
      };
      const { rows, count } = await UserAccountAPI.allIssues(filters);
      this.items = rows;
      this.totalItems = count;
      this.loading = false;
    },
    async deleteItem(id) {
      if (id) {
        await UserAccountAPI.removeFeedback(id);
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'issue deleted successfully'
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
