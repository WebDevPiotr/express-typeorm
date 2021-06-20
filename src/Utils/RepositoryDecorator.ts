import { Service } from "typedi";
import { EntityRepository as OrmEntityRepository, EntitySchema } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions"

export function EntityRepository(entity?: Function | EntitySchema<any>) {
    return function (constructor: Function) {
        OrmEntityRepository(entity)(constructor);
        Service()(constructor);
    }
}

export function RepositoryInstance() {
    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
        InjectRepository(process.env.NODE_ENV)(target, propertyKey, parameterIndex);
    }
}
