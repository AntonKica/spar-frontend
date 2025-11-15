import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    return {
        asset_detail: {
            code: "AST-0001",
            name: "App developement process",
            asset_type: "business process",
            description: "Hlavný proces na vývoj našej aplikácie",
            
            confidentiality_protection_needs: "veĺmi vysoká",
            integrity_protection_needs: "vysoká",
            availability_protection_needs: "normálna",
            
            security_measure_list: [
                {
                    code: "SM-00001",
                    name: "prvé bezpečnostné opatrenie",
                    confidentiality_treatment: true,
                    integrity_treatment: false,
                    availability_treatment: true,
                    description: "rutinné bezpečnostné opatrenie",
                },
                {
                    code: "SM-00002",
                    name: "druhé bezpečnostné opatrenie",
                    confidentiality_treatment: false,
                    integrity_treatment: false,
                    availability_treatment: true,
                    description: "nerutinné bezpečnostné opatrenie",
                }
            ],
            fullfilled_threat_list: [
                {
                    code: "G_01",
                    name: "Fire",
                    confidentiality_threat: true,
                    integrity_threat: false,
                    availability_threat: true,
                    description: "oheň",
                },
                {
                    code: "THR-00001",
                    name: "prvá špecifická hrozba",
                    describe: "nerutinné bezpečnostné opatrenie",
                    confidentiality_threat: false,
                    integrity_threat: true,
                    availability_threat: true,
                    time_cost: 5,
                    time_cost_unit: "týž.",
                    monetary_cost: 2000,
                    description: "hrozba spôsobila dlhodobý výpadok služieb",
                }
            ]
        }
    };
};