export interface Threat {
    code: string;
    name: string;
    description: string;
    confidentiality_impaired: boolean;
    integrity_impaired: boolean;
    availability_impaired: boolean;
    category: string;
}