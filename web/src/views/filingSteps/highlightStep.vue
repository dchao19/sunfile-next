<template>
    <div class="highlightStep">
                <div class="toolbar position-sticky">
                    <b-button @click="startHighlight" class="icon highlightButton" size="sm"><GreasePencilIcon/></b-button>
                    <b-button-group vertical>
                        <b-button :disabled="saveLoading" @click="save" class="icon" variant="primary" size="sm">
                            <b-spinner small v-if="saveLoading"/>
                            <ContentSaveIcon v-else/>
                        </b-button>
                        <b-button class="icon" variant="danger" size="sm"><DeleteIcon/></b-button>
                    </b-button-group>
                </div>
                <div class="mainArticle">
                    <h2>{{title}}</h2>

                    <p v-for="(paragraph, pIndex) in paragraphs" v-bind:key="pIndex">
                    <span v-for="(highlightElement, hIndex) in paragraph.content" v-bind:key="`${pIndex}+${hIndex}`">
                        {{highlightElement.beforeHighlight}}<mark v-if="highlightElement.highlight">{{highlightElement.highlight}}</mark>
                    </span>
                    </p>
                </div>
 
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

import GreasePencilIcon from "vue-material-design-icons/GreasePencil.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import ContentSaveIcon from "vue-material-design-icons/ContentSave.vue";

import FilingService from "@/services/filingService";
import { FileParagraphs } from '@/types';

@Component({
    components: {
        GreasePencilIcon,
        DeleteIcon,
        ContentSaveIcon
    }
})
export default class HighlightStep extends Vue {
    paragraphs: FileParagraphs = this.$store.state.article.paragraphs;
    title = this.$store.state.article.metadata.title;

    saveLoading: boolean = false;

    @Action showError!: (message: string) => void;

    startHighlight() {
        const selection = window.getSelection()
        if (!selection) {
            return;
        }

        const selectionRange = selection.getRangeAt(0);
        this.onHighlight(selectionRange.toString());
    }

    onHighlight(text: string) {
        const pIndex = this.paragraphs.findIndex(i => i.content.findIndex(j => j.beforeHighlight.includes(text)) >= 0);
        const elements = this.paragraphs[pIndex].content;

        for (const [elementIndex, element] of elements.entries()) {
            const index = element.beforeHighlight.indexOf(text);
            if (index < 0) {
                continue;
            }

            if (index + text.length === element.beforeHighlight.length) {
                const temp = element.beforeHighlight;
                element.beforeHighlight = temp.substr(0, index);
                element.highlight = text;
                break;
            }

            const before = element.beforeHighlight.substr(0, index);
            const highlight = text;
            const after = element.beforeHighlight.substr(index + text.length);
            
            element.beforeHighlight = before;
            element.highlight = highlight;

            this.paragraphs[pIndex].content.splice(elementIndex +1, 0, { beforeHighlight: after, highlight: "" })
        }
    }

    async save() {
        try {
            this.saveLoading = true;

            const { id, filename } = await FilingService.templateArticle(this.paragraphs, this.$store.state.article.metadata);
            const url = FilingService.getArticleDownloadUrl(id);
            console.log(url);

            Dropbox.save(url, filename, {
                success() {
                    console.log("yay");
                }
            })
        } catch (e) {
            this.showError("Something went wrong!")
        } finally {
            this.saveLoading = false;
        }
    }
}
</script>

<style scoped>
.highlightStep {
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-height: 500px;
}

.highlightButton {
    margin-bottom: 15px;
}

.icon {
    font-size: 1.50em;
}

.toolbar {
    height: 50px;
    margin-right: 2em;
}

.mainArticle {
    text-align: left;
    font-size: 15pt;
    overflow-y: scroll;
}
</style>

