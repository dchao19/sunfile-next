<template>
  <b-modal busy :id="id" :title="title">
    <b-alert dismissible :show="alert.show" variant="danger">{{alert.message}}</b-alert>
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        description="ex. New York Times"
        label="Name"
        label-for="nameField"
        invalid-feedback="A source name is required!"
        :state="name.validated"
      >
        <b-form-input id="nameField" v-model="name.value" required></b-form-input>
      </b-form-group>

      <b-form-group
        description="ex. NYT"
        label="Code"
        label-for="codeField"
        invalid-feedback="A source code is required!"
        :state="code.validated"
      >
        <b-form-input id="codeField" v-model="code.value" required></b-form-input>
      </b-form-group>

      <b-form-group
        description="ex. nytimes.com"
        label="URL"
        label-for="urlField"
        invalid-feedback="A url is required!"
        :state="url.validated"
      >
        <b-form-input id="urlField" v-model="url.value" required></b-form-input>
      </b-form-group>
    </b-form>

    <template
      v-bind="{loading, addSource, formsValidated}"
      slot="modal-footer"
      slot-scope="{ cancel }"
    >
      <b-button :disabled="loading" @click="cancel()">Cancel</b-button>
      <b-button :disabled="loading || !formsValidated" variant="primary" @click="addSource">
        <b-spinner small v-if="loading"/>
        {{ loading ? "Loading..." : "Add" }}
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SourceService from "@/services/sourceService";

@Component
export default class AddSourceModal extends Vue {
  @Prop() id!: string;
  @Prop() title!: string;

  name = {
    get validated() {
      return this.value.length > 0;
    },
    value: ""
  };
  code = {
    get validated() {
      return this.value.length > 0;
    },
    value: ""
  };
  url = {
    get validated() {
      return this.value.length > 0;
    },
    value: ""
  };

  loading = false;

  alert = {
    show: false,
    message: ""
  };

  get formsValidated() {
    return this.name.validated && this.code.validated && this.url.validated;
  }

  async addSource() {
    this.loading = true;

    try {
      const newSource = await SourceService.createSource(
        this.name.value,
        this.code.value,
        this.url.value
      );

      this.$emit("source-created", newSource);

      this.$bvModal.hide(this.id);
    } catch (e) {
      this.alert.show = true;
      this.alert.message = "Something went wrong.";
    } finally {
      this.loading = false;
    }
  }
}
</script>
