'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamic import must run in a Client Component when using ssr: false
const DynamicFeaturedProjects = dynamic(() => import('./FeaturedProjects'), { ssr: false });

const FeaturedProjectsClient: React.FC = () => {
  return <DynamicFeaturedProjects />;
};

export default FeaturedProjectsClient;
