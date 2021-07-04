"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginationMeta {
}
exports.PaginationMeta = PaginationMeta;
class PaginationResponse {
}
exports.PaginationResponse = PaginationResponse;
class SequelizePaginator {
    static async paginate(model, meta = { perPage: 10, page: 1 }, options = {}) {
        delete options.limit;
        delete options.offset;
        options.limit = meta.perPage;
        options.offset = (meta.page - 1) * (meta.perPage + 1);
        const total = await model.count(options);
        const items = await model.findAll(options);
        console.log(options);
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
exports.SequelizePaginator = SequelizePaginator;
//# sourceMappingURL=index.js.map