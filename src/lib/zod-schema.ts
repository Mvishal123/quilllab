import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().describe("Email").email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .describe("Password"),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .describe("Email")
      .email({ message: "Enter a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be a minumum of 6 characters" })
      .describe("Password"),
    cpassword: z
      .string()
      .min(6, { message: "Password must be a minumum of 6 characters" })
      .describe("Confirm Password"),
  })
  .refine((ctx) => {
    ctx.password === ctx.cpassword,
      { message: "Passwords must match", path: ["cpassword"] };
  });

export const workspaceSchema = z.object({
  workspaceName: z.string().min(1, { message: "Workspace name is required" }),
  logo: z.any(),
});
