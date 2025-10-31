export const SVC_BUSINESS_PROCESS_LIST = ():string => '/svc/business-process/';
export const SVC_BUSINESS_PROCESS_GET = (code: string): string => `/svc/business-process/${code}`;
export const SVC_BUSINESS_PROCESS_GET_ASSIGNED_ROLES = (code: string): string => `/svc/business-process/${code}/assigned-roles/`;
export const SVC_ROLE_LIST = (): string => `/svc/role/`;
export const SVC_ROLE_GET = (code: string): string => `/svc/role/${code}`;
export const SVC_APPLICATION_LIST = (): string => `/svc/application/`;
export const SVC_APPLICATION_GET = (code: string): string => `/svc/application/${code}`;
export const SVC_BUSINESS_PROCESS_APPLICATION_LIST = ():string => '/svc/business-process-application/';
export const SVC_IT_SYSTEM_LIST = (): string => `/svc/it-system/`;
export const SVC_IT_SYSTEM_GET = (code: string): string => `/svc/it-system/${code}`;
export const SVC_ENUM_BSI_IT_GRUNDSHUTZ_MODULE_LIST = (): string => `/svc/enum/bsi-it-grundschutz-module/`;
export const SVC_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST = (): string => `/svc/enum/bsi-it-grundschutz-elementary-threat/`;
export const SVC_ASSET_LIST = (): string => `/svc/asset/`;

export const UI_ENUM_BSI_IT_GRUNDSHUTZ_MODULE_LIST = (): string => `/bsi-it-grundschutz-module`;
export const UI_ENUM_BSI_IT_GRUNDSHUTZ_MODULE_GET = (entity: any): string => `/bsi-it-grundschutz-module/${entity.code}`;
export const UI_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_LIST = (): string => `/bsi-it-grundschutz-elementary-threat`;
export const UI_ENUM_BSI_IT_GRUNDSHUTZ_ELEMENTARY_THREAT_GET = (entity: any): string => `/bsi-it-grundschutz-elementary-threat/${entity.code}`;
export const UI_BUSINESS_PROCESS_LIST = (): string => `/organization-info/business-process`;
export const UI_BUSINESS_PROCESS_GET = (entity: any): string => `/organization-info/business-process/${entity.code}`;
export const UI_ROLE_LIST = (): string => `/organization-info/role`;
export const UI_ROLE_GET = (entity: any): string => `/organization-info/role/${entity.code}`;
export const UI_APPLICATION_LIST = (): string => `/organization-info/application`;
export const UI_APPLICATION_GET = (entity: any): string => `/organization-info/application/${entity.code}`;
export const UI_IT_SYSTEM_LIST = (): string => `/organization-info/it-system`;
export const UI_IT_SYSTEM_GET = (entity: any): string => `/organization-info/it-system/${entity.code}`;
export const UI_TABLES = (): string => `/organization-info/tables`;

export const UI_RISK_ANALYSIS_CREATE = (): string => `/risk-analysis-process/create`;