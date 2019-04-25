<template>
  <div>
    <VContainer fluid class="pb-0">
      <VLayout>
        <VFlex xs12> <div class="headline">Users</div> </VFlex>
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
                @click="$router.push({ name: 'user-create' })"
              >
                <VIcon class="mr-1">add_circle_outline</VIcon>New user
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
                <td>{{ item.givenName }}</td>
                <td>{{ item.familyName }}</td>
                <td>{{ item.organization }}</td>
                <td>{{ item.country }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role && item.role.name }}</td>
                <td>
                  <VChip v-if="item.status == 'ACTIVE'" color="primary" text-color="white">{{
                    item.status
                  }}</VChip>
                  <VChip v-if="item.status == 'INACTIVE'" color="red" text-color="white">{{
                    item.status
                  }}</VChip>
                </td>
                <td>
                  <VMenu offset-x left bottom>
                    <VBtn slot="activator" icon> <VIcon>more_vert</VIcon> </VBtn>

                    <VList dense>
                      <VListTile
                        ripple
                        @click="$router.push({ name: 'user-update', params: { id: item.id } })"
                      >
                        <VListTileAction> <VIcon>edit</VIcon> </VListTileAction>
                        <VListTileTitle>Edit</VListTileTitle>
                      </VListTile>

                      <VListTile
                        v-if="item.status == 'INACTIVE'"
                        ripple
                        @click="approveUser(item.id)"
                      >
                        <VListTileAction> <VIcon>check</VIcon> </VListTileAction>
                        <VListTileTitle>Activate</VListTileTitle>
                      </VListTile>
                      <VListTile
                        v-if="item.status == 'ACTIVE'"
                        ripple
                        @click="disapproveUser(item.id)"
                      >
                        <VListTileAction> <VIcon>close</VIcon> </VListTileAction>
                        <VListTileTitle>Deactivate</VListTileTitle>
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
import { UserAccountAPI } from '@/api';
import { buildFilter, buildSearchFilter } from '@/util';

const debounce = require('lodash.debounce');

const ITEMS_PER_PAGE = 25;

export default {
  name: 'UserList',
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
        { textKey: 'Given Name', value: 'givenName' },
        { textKey: 'Family Name', value: 'familyName' },
        { textKey: 'Organization', value: 'organization' },
        { textKey: 'Country', value: 'country' },
        { textKey: 'Email', value: 'email' },
        { textKey: 'Role', value: 'role' },
        { textKey: 'Status', value: 'status' },
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
          include: ['role'],
          ...buildFilter(this.pagination)
        }
      };
      const { rows, count } = await UserAccountAPI.all(filters);
      this.items = rows;
      this.totalItems = count;
      this.loading = false;
    },
    async deleteItem(id) {
      if (id) {
        await UserAccountAPI.remove(id);
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'user deleted successfully'
        });
        this.loadData();
      }
    },
    async approveUser(userId) {
      const data = { userObj: { userIds: [userId] } };
      await UserAccountAPI.approveUser(data);
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'user activated'
      });
      const index = this.items.findIndex(item => item.id === userId);
      this.items[index].status = 'ACTIVE';
    },
    async disapproveUser(userId) {
      const data = { userObj: { userIds: [userId] } };
      await UserAccountAPI.disapproveUser(data);
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'user deactivated'
      });

      const index = this.items.findIndex(item => item.id === userId);
      this.items[index].status = 'INACTIVE';
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
