<template>
  <b-button
    :disabled="isFiling || isError"
    size="lg"
    @click="fileClick"
    block
    variant="outline-success"
    >{{ fileButtonText }}</b-button
  >
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

import { isExtension } from "@/utils/isExtension";
import ArticleService from "@/services/articleService";

@Component
export default class FileButton extends Vue {
  @Action showError: any;
  isFiling: boolean = false;
  isError: boolean = false;

  get fileButtonText() {
    if (this.isFiling) return "Filing...";
    if (this.isError) return "An error occurred!";
    return "File this article";
  }

  mounted() {
    const x = this;

    if (isExtension()) {
      chrome.runtime.onMessage.addListener(
        async (message, sender, sendResponse) => {
          if (message.requestType === "pageSource") {
            try {
              await ArticleService.fileArticle(message.source, message.url);

              this.isFiling = false;
            } catch (e) {
              this.isFiling = false;
              this.showError("An error occurred while filing that article!");
            }
          }
        }
      );
    }
  }

  fileClick() {
    if (!isExtension()) {
      this.showError("You can only file when you use the extension!");
      return;
    }

    this.isFiling = true;

    chrome.tabs.executeScript({ file: "helpers/getPageSource.js" }, () => {
      if (chrome.runtime.lastError) {
        this.isFiling = false;
      }
    });
  }
}
</script>
