<template>
  <div class="sourceTable">
    <AddSourceModal
      :id="modal.id"
      :title="modal.title"
      @source-created="addSource"
    />
    <b-form-input
      class="sourceFilter"
      v-model="filterText"
      placeholder="Search..."
    ></b-form-input>
    <b-button @click="showModal" class="addSourceButton" variant="primary"
      >Add a new source</b-button
    >
    <b-table
      :per-page="pagination.rowsPerPage"
      :current-page="pagination.currentPage"
      :filter="filterText"
      :busy="loading"
      :fields="fields"
      :items="items"
      small
      hover
    >
      <div slot="table-busy">
        <b-spinner></b-spinner>
      </div>
    </b-table>
    <b-pagination
      v-model="pagination.currentPage"
      :total-rows="pagination.totalRows"
      :per-page="pagination.rowsPerPage"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SourceService from "@/services/sourceService";
import AddSourceModal from "@/components/AddSourceModal.vue";
import { Source } from "@/types";

@Component({
  components: {
    AddSourceModal
  }
})
export default class SourceTable extends Vue {
  filterText: string = "";
  loading: boolean = true;
  items: Source[] = [];
  fields = [
    {
      key: "rootUrl",
      sortable: true,
      label: "URL"
    },
    {
      key: "name",
      sortable: true,
      label: "Name"
    },
    {
      key: "code",
      sortable: true,
      label: "Code"
    }
  ];
  pagination = {
    rowsPerPage: 5,
    currentPage: 1,
    totalRows: 0
  };
  modal = {
    id: "add-source-modal",
    title: "Add a new source"
  };

  async mounted() {
    const sources = await SourceService.getAllSources();
    this.items = sources;
    this.pagination.totalRows = this.items.length;
    this.loading = false;
  }

  showModal() {
    this.$bvModal.show(this.modal.id);
  }

  addSource(newSource: Source) {
    this.items = [newSource, ...this.items];
    this.pagination.totalRows = this.items.length;
  }
}
</script>

<style scoped>
.addSourceButton {
  margin-bottom: 1.5em;
  width: 100%;
}

.sourceFilter {
  margin-bottom: 0.75em;
}
</style>
