# Sequelize Typescript Paginator

A utility to paginate a model using [`sequelize-typescript`](https://github.com/RobinBuschmann/sequelize-typescript) package by [RobinBuschmann](https://github.com/RobinBuschmann).

## Installation

```
npm install sequelize-typescript-paginator
```

## Usage

Simplest way is to call `paginate` and pass the Model class to the 1st parameter. By default it will paginate 10 items without any filter, and ordering.

```ts
import { PaginationResponse, SequelizePaginator } from "sequelize-typescript-paginator";

async fetch(): PaginationResponse {
    return await SequelizePaginator.paginate(UserModel);
}
```

Code above will return an object with `data` and `meta` inside of it.

```ts
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
```

For advance use, you can simply pass `PaginationMeta` in second paramter of `paginate` and `FindOptions` in third parameter as shown below.

```ts
import { PaginationResponse, SequelizePaginator } from "sequelize-typescript-paginator";

async fetch(): PaginationResponse {
    return await SequelizePaginator.paginate(
        UserModel,
        {
            perPage: 10,
            page: 1,
        },
        {
            where: { email_verified_at: { [Op.ne]: null } },
            order: [['created_at', 'desc']],
        },
    );
}
```
