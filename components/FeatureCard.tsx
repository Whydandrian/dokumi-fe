import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group relative p-6 md:p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>

        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
