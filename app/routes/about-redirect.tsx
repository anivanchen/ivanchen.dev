import { redirect } from "react-router";

export function loader() {
  return redirect("/");
}

export default function AboutRedirect() {
  return null;
}
