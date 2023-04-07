import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state);
  console.log(user);

  return (
    <div>
        <h1>Home</h1>
    </div>
  );
}
