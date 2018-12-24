<template>
  <div>
    <v-container fluid class="pb-0">
      <v-layout>
        <v-flex xs12>
          <div class="headline font-weight-thin">Agendas</div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="pt-2" fluid grid-list-lg>
      <v-layout wrap>
        <v-flex xs12>
          <v-card class="pt-2">
            <v-toolbar flat color="white">
              <v-btn
                color="primary"
                class="pa-0 pl-2 pr-3"
                @click="$router.push({ name: 'agenda-create' })"
              >
                <v-icon class="mr-1">add_circle_outline</v-icon>
                New Agenda
              </v-btn>

              <v-spacer/>

              <v-flex xs12 md4>
                <v-text-field
                  v-model="search"
                  label="search"
                  single-line
                  append-icon="search"
                  solo
                />
              </v-flex>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="items"
              :loading="loading"
              :total-items="totalItems"
              disable-initial-sort
              :pagination.sync="pagination"
              @update:pagination="getList"
            >
              <template slot="headerCell" slot-scope="props">
                <span class="table-header-text caption font-weight-bold">
                  {{ props.header.textKey }}
                </span>
              </template>
              <template slot="items" slot-scope="props">
                <td>{{ props.index+1 }}</td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.description }}</td>
                <td>
                  <v-menu offset-x left bottom>
                    <v-btn slot="activator" icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>

                    <v-list dense>
                      <v-list-tile
                        ripple
                        @click="$router.push({name:'agenda-update',params:{id:props.item.id}})"
                      >
                        <v-list-tile-action>
                          <v-icon>edit</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>Edit</v-list-tile-title>
                      </v-list-tile>

                      <v-list-tile ripple @click="deleteItem(props.item.id)">
                        <v-list-tile-action>
                          <v-icon>delete</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>Delete</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { AgendaAPI } from '@/api/api.index';

export default {
  name: 'AgendaList',
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
        { textKey: 'Title', value: 'fullName' },
        { textKey: 'Description', value: 'phoneNumber' },
        { textKey: 'Actions', value: 'actions', sortable: false }
      ]
    };
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
          include: []
        }
      };
      this.loading = true;
      AgendaAPI.all(f).then((res) => {
        this.loading = false;
        this.items = res.rows;
        this.totalItems = res.count;
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
        await AgendaAPI.remove(id);
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'agenda deleted successfully'
        });
        this.getList();
        // }
      }
    }
  }
};
</script>
