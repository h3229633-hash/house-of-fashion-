'use client';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="px-4 md:px-8 py-14 max-w-7xl mx-auto border-t border-black/5">
      <div className="text-center mb-10">
        <span className="block text-xs tracking-[0.2em] uppercase text-(--color-accent) mb-2">
          Journal
        </span>
        <h2 className="font-(family-name:--font-display) text-3xl md:text-4xl font-normal">
          Latest From Our Blog
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-sm text-(--color-text-muted)">Loading articles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border border-black/8 p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-(family-name:--font-display) text-xl font-semibold mb-3 capitalize line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-(--color-text-muted) line-clamp-3 leading-relaxed">
                {post.body}
              </p>
              <button className="mt-4 text-xs uppercase tracking-wide text-(--color-accent) hover:underline">
                Read More
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
