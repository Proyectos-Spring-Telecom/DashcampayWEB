export interface MailSidenavLink {
  label: string;
  route: string[];
  icon: string;
  routerLinkActiveOptions?: { exact: boolean };
}
