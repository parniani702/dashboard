import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return ( 
    <div>
      <Link href="/login">
        <Button variant="dim">ورود به داشبورد</Button>
      </Link>
    </div>
   );
}
 
export default HomePage;