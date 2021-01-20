import { useState } from "react";
import { IS_ACTIVE } from "../graphql/client";
import { useQuery } from "@apollo/client";
import { GET_MY_INFO } from "../graphql/querys";

export const useForm = (callback, initialState = {}) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    if (!event.target.value) {
      delete errors[event.target.name];
      setErrors(errors);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };
  return {
    onChange,
    onSubmit,
    setErrors,
    errors,
    values,
  };
};

export const useFile = (initialState = "") => {
  const [file, setfile] = useState(initialState);
  const handlechange = (event) => {
    const { files } = event.target;
    const file = files[0] ? files[0] : null;
    event.target.value = "";
    setfile(file);
  };
  return [file, handlechange];
};

export const useSrc = (imageFile) => {
  const [src, setSrc] = useState("");
  const reader = new FileReader();
  reader.onload = () => {
    setSrc(reader.result);
  };
  if (!imageFile) return;
  reader.readAsDataURL(imageFile);
  return {
    src,
  };
};

export const useLogged = () => {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_ACTIVE);
  return isLoggedIn;
};

export const useMyInfo = () => {
  const {
    data: { getMyInfo },
    loading,
    error,
  } = useQuery(GET_MY_INFO);
  if (loading || error) return {};
  return getMyInfo;
};
