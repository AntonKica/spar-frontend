export interface Threat {
    code: string;
    name: string;
    description: string;
    confidentiality_impaired: boolean;
    integrity_impaired: boolean;
    availability_impaired: boolean;
    category: string;
}
export interface Requirement {
    code: string;
    module: string;
    description: string;
}