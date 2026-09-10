import { OrganisationName } from "@/public/assets/organisations";

export type OrgPanelType = {
  orgs: OrganisationName[];
  removeOrg: (arg0: OrganisationName) => void;
};
