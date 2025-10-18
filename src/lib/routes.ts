export const SVC_BUSINESS_PROCESS_LIST = ():string => '/svc/business-process/';
export const SVC_BUSINESS_PROCESS_GET = (code: string): string => `/svc/business-process/${code}`;
export const SVC_BUSINESS_PROCESS_GET_ASSIGNED_ROLES = (code: string): string => `/svc/business-process/${code}/assigned-roles/`;
export const SVC_ROLE_LIST = (): string => `/svc/role/`;
export const SVC_ROLE_GET = (code: string): string => `/svc/role/${code}`;
export const SVC_APPLICATION_LIST = (): string => `/svc/application/`;
export const SVC_APPLICATION_GET = (code: string): string => `/svc/application/${code}`;
export const SVC_ENUM_MODULE_LIST = (): string => `/svc/enum/module-type/`;

export const UI_BSI_MODULES_LIST = (): string => `/bsi-modules`;
//export const UI_BSI_MODULES_GET = (entity: any): string => `/bsi-modules/${entity.code}`;
export const UI_BSI_MODULES_GET = (entity: any): string => `/bsi-modules`;
export const UI_BUSINESS_PROCESS_LIST = (): string => `/organization-info/business-process`;
export const UI_BUSINESS_PROCESS_GET = (entity: any): string => `/organization-info/business-process/${entity.code}`;
export const UI_ROLE_LIST = (): string => `/organization-info/role`;
export const UI_ROLE_GET = (entity: any): string => `/organization-info/role/${entity.code}`;
export const UI_APPLICATION_LIST = (): string => `/organization-info/application`;
export const UI_APPLICATION_GET = (entity: any): string => `/organization-info/application/${entity.code}`;