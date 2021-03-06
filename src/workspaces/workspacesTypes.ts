import { BaseEntityModel } from "~/allEntities/allEntitiesTypes";

export interface WorkspaceModel extends BaseEntityModel {
  id: string;
  name: string;
  userIds: string[];
  isAdmin: boolean | null;
}

export type WorkspacesByIdModel = Record<string, WorkspaceModel>;
