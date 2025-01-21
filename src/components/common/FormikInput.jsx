import { Field, ErrorMessage } from "formik";

const FormikInput = ({ label, name, type = "text", placeholder }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="form-control"
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default FormikInput;
