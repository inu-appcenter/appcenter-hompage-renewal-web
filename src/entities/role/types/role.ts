export interface RoleForm {
  roleName: string;
}

export interface Role extends RoleForm {
  readonly roleId: number;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
}
