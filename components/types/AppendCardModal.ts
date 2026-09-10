import { OrganisationName } from "@/public/assets/organisations";

export type AppendCardModalType = {
  onClose: () => void;
  addOrg: (arg0: OrganisationName) => void;
};
