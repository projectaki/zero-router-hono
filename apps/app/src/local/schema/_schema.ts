import { createSchema, definePermissions, NOBODY_CAN, type ExpressionBuilder } from '@rocicorp/zero';
import { useZero } from '@rocicorp/zero/react';
import { usersSchema } from './users';
import { itemsSchema } from './items';

export const schema = createSchema({
  version: 1,
  tables: {
    users: usersSchema,
    items: itemsSchema,
  },
});

export type Schema = typeof schema;

type AuthData = {
  sub: string;
};

export const permissions = definePermissions<AuthData, typeof schema>(schema, () => {
  const allowIfSelf = (
    authData: AuthData,
    { cmp }: ExpressionBuilder<typeof usersSchema>,
  ) => cmp('id', '=', authData.sub);

  const allowIfItemOwner = (
    authData: AuthData,
    { cmp }: ExpressionBuilder<typeof itemsSchema>,
  ) => cmp('userId', '=', authData.sub);

  return {
    users: {
      row: {
        insert: NOBODY_CAN,
        delete: NOBODY_CAN,
        update: {
          preMutation: NOBODY_CAN,
        },
        select: [allowIfSelf],
      },
    },
    items: {
      row: {
        insert: [allowIfItemOwner],
        delete: [allowIfItemOwner],
        update: {
          preMutation: [allowIfItemOwner],
        },
        select: [allowIfItemOwner],
      },
    },
  };
});