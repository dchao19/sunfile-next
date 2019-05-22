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
