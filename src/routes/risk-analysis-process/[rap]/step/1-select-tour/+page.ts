
import type { PageLoad } from './$types';
import { SVC_ASSET_LIST } from '$lib/routes';

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(SVC_ASSET_LIST()).then(response => response.json());
    const res = {
        asset_list: [
            {code: "AST-0001",name: "App developement process", asset_type: "business process"},
            {code: "AST-0002",name: "Dumb switch", asset_type: "IT system"},
            {code: "AST-0003",name: "Internal internet links", asset_type: "communication link"},
            {code: "AST-0004",name: "Server room", asset_type: "room"},
            {code: "AST-0005",name: "Office Suite", asset_type: "application"},
        ]
    };
    return res;
}