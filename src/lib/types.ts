import { Prisma } from "@prisma/client";

export function getUserDataSelect() {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    role: true,
    createdAt: true,
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export function getPermitDataInclude() {
  return {
    user: {
      select: getUserDataSelect(),
    },
  } satisfies Prisma.PermitInclude;
}

export type PermitData = Prisma.PermitGetPayload<{
  include: ReturnType<typeof getPermitDataInclude>;
}>;
