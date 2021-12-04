import yup from "yup";

const userSchema = yup.object({
    username: yup.string().required('Please Enter your username'),
    password: yup.string().matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ).required('Please Enter your password'),
 });

 const validate = (schema) => async (request, response, next) => {
    try {
      await schema.validate(request.body);
      return next();
    } catch (err) {
      return response.status(500).json(err);
    }
  };

  export {
    userSchema,
    validate
  
  };