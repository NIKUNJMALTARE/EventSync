
import { ArrowRight } from "lucide-react";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-1">
      <span className={`font-bold ${sizeClasses[size]} tracking-tight`}>
        Hack<span className="text-primary">Judge</span>
      </span>
      <div className="hidden md:flex items-center justify-center bg-primary text-white rounded-full p-1">
        <ArrowRight size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} className="stroke-[3]" />
      </div>
    </div>
  );
};

export default Logo;
