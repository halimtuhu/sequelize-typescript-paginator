import { Model, ModelCtor } from "sequelize-typescript";
import { FindOptions } from "sequelize/types";

export class PaginationOptions<M extends Model> {
  perPage: number;
  page: number;
  options: FindOptions<M["_attributes"]>;
}

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
    paginationOptions: PaginationOptions<M> = {
      perPage: 10,
      page: 1,
      options: {},
    }
  ): Promise<PaginationResponse<M>> {
    // remove given limit and offset
    delete paginationOptions.options.limit;
    delete paginationOptions.options.offset;

    // count total items
    const total = await model.count(paginationOptions.options);

    // calculate limit and offset based on pagination options
    paginationOptions.options.limit = paginationOptions.perPage;
    paginationOptions.options.offset =
      (paginationOptions.page - 1) * paginationOptions.perPage;

    // get all items based on options
    const items = await model.findAll(paginationOptions.options);

    // return pagination result
    return {
      data: items,
      meta: {
        perPage: paginationOptions.perPage,
        page: paginationOptions.page,
        totalPage: Math.ceil(total / paginationOptions.perPage),
        total: total,
      },
    };
  }
}
