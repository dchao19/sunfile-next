import { ARTICLE_SET, ARTICLE_CONTENT_SET } from "@/store/mutationTypes";
import { ArticleMetadata, FileParagraphs } from "@/types";
import { ActionContext } from "vuex";

export interface IArticleState {
    metadata: ArticleMetadata;
    paragraphs: FileParagraphs;
}

export const article = {
    state: {
        metadata: {},
        paragraphs: [],
    },

    mutations: {
        [ARTICLE_SET](
            prevState: IArticleState,
            payload: { metadata: ArticleMetadata, paragraphs: FileParagraphs }
        ) {
            prevState.metadata = payload.metadata;
            prevState.paragraphs = payload.paragraphs;
        }
    },

    actions: {
        setArticle(
            { commit }: ActionContext<IArticleState, {}>,
            payload: { metadata: ArticleMetadata, paragraphs: FileParagraphs }
        ) {
            commit(ARTICLE_SET, { metadata: payload.metadata, paragraphs: payload.paragraphs });
        }
    }
};
