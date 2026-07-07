import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function BlogCard({ blog }) {
  const { title, slug, publishedDate, coverImage, readingTime, category, summary, author } = blog;

  return (
    <article className="group bg-white rounded-3xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-400 flex flex-col h-full">
      {/* Cover Photo */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Details */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs font-semibold text-text-secondary/80 font-inter mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            {publishedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-poppins font-bold text-xl text-text-primary group-hover:text-primary transition-colors duration-300 leading-snug mb-3">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>

        {/* Summary */}
        <p className="text-text-secondary font-inter text-sm leading-relaxed mb-6 line-clamp-3">
          {summary}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary/70 font-semibold font-inter">Written by</span>
            <span className="text-sm font-semibold text-text-primary font-poppins">{author}</span>
          </div>
          <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:text-accent transition-colors font-poppins"
          >
            Read More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </article>
  );
}
