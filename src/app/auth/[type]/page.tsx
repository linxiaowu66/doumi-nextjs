"use client";
import React, { useState } from "react";
import { Snackbar, Fab } from "@mui/material";
import { ArrowForward, Done } from "@mui/icons-material";
import clsx from "clsx";
import "./page.css";
import LoginRegForm from "./Form";
import { DouMiBlog } from "@/interface";
import { useParams } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";

const LoginOrRegister: React.FC<void> = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const params = useParams<{ type: "login" | "register" }>();
  const [reqSuccess, setReqSuccess] = useState<boolean>(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");

  const login = async (data: DouMiBlog.LoginParam) => {
    try {
      const res = await signIn("credentials", { ...data, redirect: false });

      if (!res || !res.error) {
        setReqSuccess(true);
        setTimeout(() => {
          location.href = "/admin";
        }, 2000);
      } else {
        setIsOpenSnackbar(true);
        setSnackbarMsg(res.error);
      }
    } catch (err) {
      setIsOpenSnackbar(true);
      setSnackbarMsg("登录失败，请联系管理员");
    }
  };

  const registerUser = async (data: DouMiBlog.RegisterParam) => {
    try {
      const result = await axios.post("/api/auth/register", data);

      if (result.data.code === 200) {
        setReqSuccess(true);
        setTimeout(() => {
          setReqSuccess(false);
        }, 1500);
        setTimeout(() => {
          location.href = "/auth/login";
          setShowForm(true);
        }, 4000);
      }
    } catch (err) {
      setIsOpenSnackbar(true);
      setSnackbarMsg("注册失败，请联系管理员");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <section
          className={clsx({
            "login-form": true,
            animation: reqSuccess,
          })}
        >
          <div
            className={clsx({
              "welcome-login": true,
              hidden: showForm,
            })}
          >
            <p>We</p>
            <p>LOVE</p>
            <p>LIFE</p>
          </div>
          <Fab
            color="secondary"
            className={clsx({
              "login-forward": true,
              hidden: showForm,
            })}
            onClick={() => setShowForm(true)}
          >
            <ArrowForward />
          </Fab>
          <LoginRegForm
            type={params.type}
            visible={showForm}
            registerCb={registerUser}
            loginCb={login}
            actionSuccess={reqSuccess}
          />
          <div
            className={clsx({
              "success-tip": true,
              active: reqSuccess,
            })}
          >
            <span>{params.type === "register" ? "注册成功" : "登录成功"}</span>
            <Done />
          </div>
        </section>
        <Snackbar
          autoHideDuration={1500}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          key={"top,right"}
          open={isOpenSnackbar}
          onClose={() => setIsOpenSnackbar(false)}
          message={snackbarMsg}
        />
      </div>
    </div>
  );
};

export default LoginOrRegister;
