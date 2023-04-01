import { Store } from "react-notifications-component";
declare type NOTIFICATION_TYPE =
  | "success"
  | "danger"
  | "info"
  | "default"
  | "warning";


const notification: any = {
  type: "success",
  insert: "bottom",
  container: "bottom-right",
  dismiss: {
    duration: 5000,
    onScreen: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (message: string, type: NOTIFICATION_TYPE = "success") {
  Store.addNotification({
    ...notification,
    message,
    type,
  });
}
