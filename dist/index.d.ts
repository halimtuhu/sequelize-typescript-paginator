import { Model, ModelCtor } from "sequelize-typescript";
import { FindOptions } from "sequelize/types";
export declare class PaginationMeta {
    perPage: number;
    page: number;
    totalPage?: number;
    total?: number;
}
export declare class PaginationResponse<T> {
    data: Array<T>;
    meta: PaginationMeta;
}
export declare class SequelizePaginator {
    static paginate<M extends Model>(model: ModelCtor<M>, meta?: PaginationMeta, options?: FindOptions<M["_attributes"]>): Promise<PaginationResponse<M>>;
}
