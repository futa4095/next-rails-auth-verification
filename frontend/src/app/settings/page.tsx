import AccountDeleteForm from "./accountDeleteForm";
import EmailChangeForm from "./emailChangeForm";
import PasswordChangeForm from "./passwordChangeForm";

export default function SettingsPage() {
  return (
    <>
      <EmailChangeForm />
      <PasswordChangeForm />
      <AccountDeleteForm />
    </>
  );
}
