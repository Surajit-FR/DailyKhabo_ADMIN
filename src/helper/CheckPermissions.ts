import { PermissionCheckResult, UserData } from "../config/DataTypes.config";

export const permissionsToCheck = ["all", "read", "write_create", "edit_update", "delete"];

export const checkPermissions = (userData: UserData | null | undefined, permissionNames: string[]): PermissionCheckResult => {
    const permissionNamesSet = new Set(permissionNames);
    const permissions = userData?.role?.permissions || [];
    const result: PermissionCheckResult = {};

    for (const permission of permissions) {
        if (permissionNamesSet.has(permission.name)) {
            result[permission.name] = true;
        }
    }

    for (const permissionName of permissionNames) {
        if (!(permissionName in result)) {
            result[permissionName] = false;
        }
    }

    return result;
};