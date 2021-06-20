import { JsonController, UseBefore } from "routing-controllers";
import AuthorizationFilter from "Security/Filters/AuthorizationFilter";
import { Service } from "typedi";

export function RestController(path: string){

    return function (constructor: Function) {
        JsonController(path)(constructor);
        Service()(constructor);
    }
}

export function RestAuthorizatedController(path: string){

    return function (constructor: Function) {
        JsonController(path)(constructor);
        UseBefore(AuthorizationFilter)(constructor)
        Service()(constructor);
    }
}