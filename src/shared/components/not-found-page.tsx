import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-slate-500 animate-caret-blink">
        🔍 404
      </h1>
      <p className="text-xl my-5 text-slate-400">
        🙏 Upps sorry, your destination is not found 🙏
      </p>
      <Button className="bg-slate-500" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  );
};
