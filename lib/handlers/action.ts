"use server";

import { ZodError, ZodType, type ZodSchema } from "zod";

import { getServerSession } from "../get-session";
import { UnauthorizedError, ValidationError } from "../http-errors";
import dbConnect from "../mongoose";

type profileType = "candidate" | "employee";
type Roles = "admin" | "user";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodType<T>;
  authorizeRole?: profileType | undefined;
  role?: Roles | undefined;
};

// 1. Checking whether the schema and params are provided and validated.
// 2. Checking whether the user is authorized.
// 3. Connecting to the database.
// 4. Returning the params and session.

async function action<T>({ params, schema, authorizeRole, role }: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(error.flatten().fieldErrors as Record<string, string[]>);
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  if (authorizeRole) {
    const me = await getServerSession();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (me?.user?.accountType !== authorizeRole) {
      return new UnauthorizedError("You do not have permission to perform this action");
    }
  }
  if (role) {
    const me = await getServerSession();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (me?.user?.role !== role) {
      return new UnauthorizedError("You do not have permission to perform this action");
    }
  }

  //   if (authorizeRole) {
  //     const isAuthorized = await checkRole(authorizeRole);

  //     if (!isAuthorized) {
  //       return new UnauthorizedError(
  //         'You do not have permission to perform this action'
  //       );
  //     }
  //   }

  await dbConnect();

  return { params };
}

export default action;
