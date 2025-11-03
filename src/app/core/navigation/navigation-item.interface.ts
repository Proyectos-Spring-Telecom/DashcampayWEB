export type NavigationItem =
  | NavigationLink
  | NavigationDropdown
  | NavigationSubheading;

export interface NavigationLink {
  type: 'link';
  route?: string | any;
  fragment?: string;
  label: string;
  icon?: string;
  permissions?: Array<string | number>;
  routerLinkActiveOptions?: { exact: boolean };
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationDropdown {
  type: 'dropdown';
  label: string;
  permissions?: Array<string | number>;
  icon?: string;
  children: Array<NavigationLink | NavigationDropdown>;
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationSubheading {
  type: 'subheading';
  label: string;
  permissions?: Array<string | number>;
  children: Array<NavigationLink | NavigationDropdown>;
}
