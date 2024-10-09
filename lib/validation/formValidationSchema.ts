// validationSchema.ts
export const registerValidation = {
  name: {
    required: "Name is required",
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters long",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])/,
      message: "Password must contain both lowercase and uppercase letters",
    },
  },

  title: {
    required: "Title is required",
    minLength: {
      value: 5,
      message: "Title must be at least 5 characters long",
    },
    maxLength: {
      value: 50,
      message: "Title must not exceed 50 characters",
    },
  },
  description: {
    required: "Description is required",
    minLength: {
      value: 10,
      message: "Description must be at least 10 characters long",
    },
    maxLength: {
      value: 300,
      message: "Description must not exceed 300 characters",
    },
  },
};
