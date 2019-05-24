export type Team = {
    name: string;
    teamCode: string;
  };
  
  export type APIResponse<T> = {
    success: boolean;
    result: T;
    message: string;
  };
  
  export type Source = {
    rootUrl: string;
    code: string;
    name: string;
  };
  
  export type TeamMember = {
    name: string;
    numArticles: number;
  };
  
  export type TeamOverview = {
    name: string;
    teamCode: string;
    userCount: number;
    teamCount: number;
  };
  
  export type ArticleMetadata = {
    title?: string;
    content?: string;
    author?: string;
    date_published?: string;
    lead_image_url?: string;
    dek?: string;
    next_page_url?: string;
    url?: string;
    domain?: string;
    excerpt?: string;
    word_count?: number;
    direction?: string;
    total_pages?: number;
    rendered_pages?: number;
  }

  export type HighlightElement = {
    beforeHighlight: string;
    highlight: string | null;
  }

  export type ParagraphElement = {
    content: HighlightElement[];
  }

  export type FileParagraphs = ParagraphElement[];

  export type TemplatedArticle = {
    id: string;
    filename: string;
  }

  export type ExtractedArticle = {
    metadata: ArticleMetadata;
    paragraphs: FileParagraphs;
  }