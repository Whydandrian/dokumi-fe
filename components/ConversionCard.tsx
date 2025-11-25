'use client';

import { useState } from 'react';
import { Upload, FileText, Loader2, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ConversionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function ConversionCard({
  title,
  description,
  icon,
  href,
}: ConversionCardProps) {

  return (
    <Link href={href}>
      <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-6 text-sm md:text-base">{description}</p>

        </CardContent>
      </Card>
    </Link>
  );
}
