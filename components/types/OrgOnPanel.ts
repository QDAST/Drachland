import { OrganisationName } from "@/public/assets/organisations";

export type OrgOnPanelType = {
  closeOrg: (arg0: OrganisationName) => void;
  openOrg: (arg0: OrganisationName) => void;
  removeOrg: (arg0: OrganisationName) => void;
  index: number;
  name: OrganisationName;
};
