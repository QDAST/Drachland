import { OrganisationName } from "@/public/assets/organisations";
import { TransportName } from "@/public/assets/transport";

export type BottomPanelType = {
  openedOrgs: OrganisationName[];
  trans: TransportName[];
  addOrg: (arg0: OrganisationName) => void;
};
