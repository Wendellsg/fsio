export const appRouter = {
  public: {
    ladingPage: {
      path: "/",
      name: "LandingPage",
    },
    login: {
      path: "/login",
      name: "Login",
    },
    register: {
      path: "/register",
      name: "Register",
    },
    forgotPassword: {
      path: "/forgot-password",
      name: "ForgotPassword",
    },
    resetPassword: {
      path: "/reset-password",
      name: "ResetPassword",
    },
    blog: {
      path: "/blog",
      name: "Blog",
    },
    blogPost: {
      path: "/blog/[slug]",
      name: "BlogPost",
    },
  },

  private: {
    home: {
      path: "/home",
      name: "Home",
    },
    patients: {
      path: "/patients",
      name: "Patients",
    },
    exercises: {
      path: "/exercises",
      name: "Exercises",
    },
    routines: {
      path: "/routines",
      name: "Routines",
    },
    feed: {
      path: "/feed",
      name: "Feed",
    },
  },
};

export const checkIsPublicRoute = (pathname: string) => {
  const publicRoutes = Object.values(appRouter.public).map(
    (route) => route.path
  );

  return publicRoutes.includes(pathname);
};
