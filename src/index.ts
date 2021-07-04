import { Model, ModelCtor } from "sequelize-typescript";
import { FindOptions } from "sequelize/types";

export class PaginationMeta {
  perPage: number;
  page: number;
  totalPage?: number;
  total?: number;
}

export class PaginationResponse<T> {
  data: Array<T>;
  meta: PaginationMeta;
}

export class SequelizePaginator {
  static async paginate<M extends Model>(
    model: ModelCtor<M>,
    meta: PaginationMeta = { perPage: 10, page: 1 },
    options: FindOptions<M["_attributes"]> = {}
  ): Promise<PaginationResponse<M>> {
    delete options.limit;
    delete options.offset;

    options.limit = meta.perPage;
    options.offset = (meta.page - 1) * (meta.perPage + 1);

    const total = await model.count(options);
    const items = await model.findAll(options);

    return {
      data: items,
      meta: {
        perPage: meta.perPage,
        page: meta.page,
        totalPage: Math.ceil(total / meta.perPage),
        total: total,
      },
    };
  }
}
