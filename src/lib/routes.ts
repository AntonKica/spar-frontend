export const SVC_BUSINESS_PROCESS_LIST = ():string => '/svc/business-process/';
export const SVC_BUSINESS_PROCESS_GET = (code: string): string => `/svc/business-process/${code}`;
export const SVC_BUSINESS_PROCESS_GET_ASSIGNED_ROLES = (code: string): string => `/svc/business-process/${code}/assigned-roles/`;
export const SVC_ROLE_LIST = (): string => `/svc/role/`;
export const SVC_ROLE_GET = (code: string): string => `/svc/role/${code}`;

export const UI_BUSINESS_PROCESS_GET = (entity: any): string => `/organization-info/business-process/${entity.code}`;
export const UI_ROLE_GET = (entity: any): string => `/organization-info/role/${entity.code}`;