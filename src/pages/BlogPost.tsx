
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog Post: {slug}</h1>
      <p className="text-lg">Content of this blog post will be displayed here.</p>
    </div>
  );
};

export default BlogPost;
