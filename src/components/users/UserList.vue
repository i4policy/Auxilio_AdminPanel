<template>
  <div>
    <VContainer fluid class="pb-0">
      <VLayout>
        <VFlex xs12> <div class="headline font-weight-thin">users</div> </VFlex>
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
                <VIcon class="mr-1">add_circle_outline</VIcon>
                New user
              </VBtn>

              <VSpacer />

              <VFlex xs12 md4>
                <VTextField v-model="search" label="search" single-line append-icon="search" solo />
              </VFlex>
            </VToolbar>

            <VDataTable
              :headers="headers"
              :items="items"
              :loading="loading"
              :total-items="totalItems"
              disable-initial-sort
              :pagination.sync="pagination"
              @update:pagination="getList"
            >
              <template slot="headerCell" slot-scope="props">
                <span class="table-header-text caption font-weight-bold">{{
                  props.header.textKey
                }}</span>
              </template>
              <template slot="items" slot-scope="props">
                <td>{{ props.index + 1 }}</td>
                <td>{{ props.item.fullName }}</td>
                <td>{{ props.item.phoneNumber }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.role.name }}</td>
                <td>
                  <VMenu offset-x left bottom>
                    <VBtn slot="activator" icon> <VIcon>more_vert</VIcon> </VBtn>

                    <VList dense>
                      <VListTile
                        ripple
                        @click="
                          $router.push({ name: 'user-update', params: { id: props.item.id } })
                        "
                      >
                        <VListTileAction> <VIcon>edit</VIcon> </VListTileAction>
                        <VListTileTitle>Edit</VListTileTitle>
                      </VListTile>

                      <VListTile ripple @click="deleteItem(props.item.id)">
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
import { UserAccountAPI } from '@/api/api.index';

export default {
  name: 'UserList',
  data() {
    return {
      search: '',
      items: [],
      loading: false,
      totalItems: 100,
      pagination: {
        page: 1,
        rowsPerPage: 25
      },
      searchField: 'name',
      headers: [
        { textKey: '#', value: 'id', sortable: false },
        { textKey: 'Full Name', value: 'fullName' },
        { textKey: 'Phone number', value: 'phoneNumber' },
        { textKey: 'Email', value: 'email' },
        { textKey: 'Role', value: 'role' },
        { textKey: 'Actions', value: 'actions', sortable: false }
      ]
    };
  },
  created() {
    // ;
  },
  methods: {
    test(value) {
      console.log('aa', value);
    },
    getList() {
      const f = {
        filter: {
          limit: this.pagination.rowsPerPage,
          skip: (this.pagination.page - 1) * this.rowsPerPage,
          include: [
            {
              relation: 'role',
              scope: {
                fields: ['name', 'id']
              }
            }
          ]
        }
      };
      this.loading = true;
      UserAccountAPI.all(f).then(res => {
        this.loading = false;
        this.items = res.rows;
        this.totalItems = res.count;
        console.log(this.totalItems);
      });
    },
    async deleteItem(id) {
      if (id) {
        // @TODO: fix confirm modal
        // const confirmed = await this.$confirm('Are you sure?', {
        //   buttonTrueText: 'yes',
        //   buttonFalseText: 'no'
        // });
        // if (confirmed) {
        await UserAccountAPI.remove(id);
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'user deleted successfully'
        });
        this.getList();
        // }
      }
    }
  }
};
</script>
