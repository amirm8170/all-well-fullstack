import { ReactNode } from "react";

export type childProps = {
  children: ReactNode;
  className?:string
  widthAuto?:boolean
  center?:boolean
};

export type btnProps = {
    width?:number
    bgColor:string
    addClass?:string
}

export type inputProps = {
  width?:number
  height?:number
  rightIcon?:ReactNode
  error?:string
  addClass?:string
}

export type iconProps = {
  width:number | string
  height:number | string
  color?:string
}

export type hocType = {
  children: ReactNode;
  redirectPath:string
}


export type validationProps = {
  name:string
  value:string
  state:any
}

export type loginType = {
  email:string
  password:string
}
