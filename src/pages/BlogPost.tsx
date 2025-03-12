
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // In a real app, you would fetch the blog post based on the slug
  // For now, we'll use a placeholder
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Blog Post: {slug}</h1>
        <p className="text-gray-600 mb-8">Published on October 15, 2023</p>
        
        <div className="prose max-w-none">
          <p>This is a placeholder for blog post content. In a real application, this would be fetched from a database or CMS based on the slug parameter.</p>
          
          <h2>Section Title</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
          
          <blockquote>
            <p>This is a blockquote example that could contain a notable quote from the article.</p>
          </blockquote>
          
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
