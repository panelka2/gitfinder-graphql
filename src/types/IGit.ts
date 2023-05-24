 
export interface IGit {
    name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  owner: {
    login: string;
    url: string;
    avatarUrl: string;
  };
  defaultBranchRef: {
    name: string;
  };
  forkCount: number;
  watchers: {
    totalCount: number;
  };
  languages: {
    nodes: {
      name: string;
    }[];
  };
  description: string;
} 
