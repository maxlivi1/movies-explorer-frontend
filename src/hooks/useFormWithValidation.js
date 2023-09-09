import { useState } from "react";

const useFormWithValidation = () => {
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);

  const getError = (target) => {
    let customError = "";
    if (target.validity.valueMissing) {
      customError = `Поле не должно быть пустым`;
    }
    if (target.validity.patternMismatch) {
      if (target.name === "name") {
        customError = `Значение поля невалидно. Используйте только латиницу, кириллицу, пробел и дефис. От 2 до 30 символов.`;
      }
      if (target.name === "email") {
        customError = `Значение поля невалидно. Пример maxim@mail.ru`;
      }
    }
    return customError;
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (value.trim().length === 0) {
      setValues({ ...values, [name]: value.trim() });
    } else {
      setValues({ ...values, [name]: value });
    }
    setIsValid(target.form.checkValidity());
  };

  return { values, handleChange, isValid, setValues, getError };
};

export { useFormWithValidation };
