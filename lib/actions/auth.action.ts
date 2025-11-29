"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Candidate } from "@/database/candidate.model";
import { Employee } from "@/database/employee.model";
import { auth } from "@/lib/auth";
import { ISignInEmailParams, ISignUpEmailParams } from "@/types/action";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { signInFormSchema, signupFormSchema } from "../validations/auth";

export const signUpWithEmailPassword = async (
  params: ISignUpEmailParams
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ActionResponse<{ user: any; token: string | null }>> => {
  const validationResult = await action({
    params,
    schema: signupFormSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, email, password, confirmPassword, agreeOnTerms, accountType } = validationResult.params!;

  if (password !== confirmPassword) {
    throw new Error("Password does not match");
  }

  if (!agreeOnTerms) {
    throw new Error("User must agree to the terms before signing up.");
  }

  try {
    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        agreeOnTerms,
        accountType,
      },
    });

    return {
      success: true,
      status: 201,
      data: {
        user: data.user,
        token: data.token,
      },
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }
    return handleError(error) as ErrorResponse;
  }
};

export const loginWithEmailPassword = async (
  params: ISignInEmailParams
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ActionResponse<{ user: any; token: string | null }>> => {
  const validationResult = await action({
    params,
    schema: signInFormSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { email, password, rememberMe } = validationResult.params!;

  try {
    const data = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
      headers: await headers(),
    });

    return {
      success: true,
      status: 200,
      data: {
        user: data.user,
        token: data.token,
      },
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
};

export const logoutUser = async (): Promise<ActionResponse> => {
  try {
    console.log("loggingg... out");
    await auth.api.signOut({
      headers: await headers(),
    });

    console.log("logged out");

    redirect("/sign-in");

    return {
      success: true,
      message: "User logged out successfully.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
};

export const sendVerificationEmail = async (email: string, redirectURL: string): Promise<ActionResponse> => {
  try {
    await auth.api.sendVerificationEmail({
      body: {
        email: email,
        callbackURL: redirectURL,
      },
      headers: await headers(),
    });
    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
};

// forgot password request
export const sendPasswordResetEmail = async (email: string, redirectURL: string): Promise<ActionResponse> => {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email: email,
        redirectTo: redirectURL,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Password reset email sent successfully.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
};

// reset password

export const resetPassword = async (newPassword: string, token: string): Promise<ActionResponse> => {
  try {
    if (!token) {
      throw new Error("Invalid token. try again");
    }

    await auth.api.resetPassword({
      body: {
        newPassword: newPassword,
        token: token,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Password reset successfully",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
};

// update user name

export const updateUserName = async (name: string, email: string, accountType: string): Promise<ActionResponse> => {
  try {
    await auth.api.updateUser({
      body: {
        name: name,
      },
      headers: await headers(),
    });

    if (accountType === "employee") {
      // search on employee
      await Employee.findOneAndUpdate({ email: email }, { $set: { name } }, { new: true });
    } else {
      // search on candidate
      await Candidate.findOneAndUpdate({ email: email }, { $set: { name } }, { new: true });
    }

    return {
      success: true,
      message: "Name updated Successully",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        status: error.statusCode,
        error: {
          message: error.message,
        },
      };
    }

    return handleError(error) as ErrorResponse;
  }
};
