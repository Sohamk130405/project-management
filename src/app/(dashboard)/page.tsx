import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <div className="flex gap-4">This is a home page</div>;
};

export default Home;
