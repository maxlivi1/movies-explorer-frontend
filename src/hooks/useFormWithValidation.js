import { useState } from "react";

const useFormWithValidation = () => {
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(target.form.checkValidity());
  };

  return { values, handleChange, isValid, setValues };
};

export { useFormWithValidation };
