import { VerifyScreen } from "@/features/auth/components/VerifyScreen";

export default function EnumeratorVerify() {
  return (
    <VerifyScreen
      name="Ibrahim"
      phone="+234 801 234 5678"
      email="ibrahim.musa@example.com"
      next={["Add your ID, skills and languages", "Complete the short training", "Apply for projects once verified"]}
    />
  );
}