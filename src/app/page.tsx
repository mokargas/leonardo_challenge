
import Home from "@/components/Home/Home";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: 'Home | Leonardo.ai Web Challenge 2024',
};

const HomePage: NextPage = () => {
  return <Home />
}
export default HomePage