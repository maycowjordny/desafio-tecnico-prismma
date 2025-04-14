import { NextResponse } from "next/server";

export const responseHandler = {
  success: (data: unknown, status = 200) => {
    return NextResponse.json(data, { status });
  },

  badRequest: (message: string, errors?: unknown) => {
    return NextResponse.json({ message, errors }, { status: 400 });
  },

  notFound: (message: string) => {
    return NextResponse.json({ message }, { status: 404 });
  },

  internalError: (message: string) => {
    return NextResponse.json({ message }, { status: 500 });
  },
};
