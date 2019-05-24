<template>
  <div class="filing-extraction">
    <file-move-icon style="font-size: 3.2em"></file-move-icon>
    <h1>File an article</h1>
    <p>
      Remember, the most comprehensive filing is still available directly in the mobile apps or through the extension.
      Web filing is only supported by news websites whose articles are not behind a paywall (i.e. they do not require an additional login).
      If you need to file an article behind a paywall, you'll need to download the extension.
    </p>
    <b-input
      size="lg"
      class="extractionUrlInput"
      v-model="url"
      type="text"
      placeholder="Enter the article's URL"
    ></b-input>
    <b-button
      :disabled="loading"
      class="extractionSubmit"
      type="submit"
      variant="primary"
      size="lg"
      v-on:click="extract"
    >
      <b-spinner v-if="loading"></b-spinner>
      <span v-else>Let's go!</span>
    </b-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import FileMoveIcon from "vue-material-design-icons/FileMove.vue";

import { FileParagraphs, ArticleMetadata } from "@/types";
import FilingService from "@/services/filingService";

@Component({
    components: {
        "file-move-icon": FileMoveIcon
    }
})
export default class ExtractionStep extends Vue {
    @Action setArticle!: ({ metadata, paragraphs }:  { metadata: ArticleMetadata, paragraphs: FileParagraphs }) => void;
    @Action showError!: (message: string) => void;

    url: string = "";
    loading: boolean = false;

    async extract() {
        try {
            this.loading = true;
            
            const article = await FilingService.extractArticle(this.url);
            this.setArticle(article);

            this.$router.push({ name: "highlightStep" });
        } catch (e) {
            this.showError("An error occurred!");
        } finally {
            this.loading = false;
        }
    }
}
</script>

<style>
.filing-extraction {
  height: 100%;
}

.extractionUrlInput {
  margin-bottom: 0.75em;
}
</style>
