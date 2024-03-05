import * as React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import styles from "./index.module.css";

interface FormProps {
  type: "login" | "register";
  visible: boolean;
  actionSuccess: boolean;
  registerCb: (param: {
    email: string;
    username: string;
    password: string;
  }) => void;
  loginCb: (param: { email: string; password: string }) => void;
}

export default function LoginRegForm(props: FormProps) {
  const { visible, actionSuccess } = props;
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const { type } = props;

  const onSubmit = (data: any) => {
    if (type === "register") {
      props.registerCb(data);
    } else {
      props.loginCb(data);
    }
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={`${styles.root} ${visible ? styles.visible : ""} ${
          actionSuccess ? styles.loginSuccess : ""
        }`}
      >
        <header>JOIN</header>
        <TextField
          id="outlined-email-input-required"
          label="邮箱地址"
          type="email"
          autoComplete="email"
          margin="normal"
          fullWidth
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email && "无效的邮箱地址"}
          {...register("email", {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {type === "register" ? (
          <TextField
            id="outlined-name-input-required"
            label="昵称"
            type="text"
            margin="normal"
            fullWidth
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username && "用户名格式不正确"}
            {...register("username")}
          />
        ) : null}
        <TextField
          id="outlined-password-input-required"
          label="密码"
          type="password"
          autoComplete="password"
          margin="normal"
          fullWidth
          variant="outlined"
          helperText={errors.password && "密码错误"}
          {...register("password")}
        />
        <Button
          type="submit"
          size="large"
          color="secondary"
          variant="contained"
          fullWidth
        >
          {type === "register" ? "注册" : "登录"}
        </Button>
      </form>
    </React.Fragment>
  );
}
