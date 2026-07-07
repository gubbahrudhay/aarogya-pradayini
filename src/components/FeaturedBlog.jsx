import { Link } from 'react-router-dom';
import { Calendar, Clock, Users2, ArrowRight } from 'lucide-react';

export default function FeaturedBlog({ item }) {
  if (!item) return null;

  const isCamp = item.type === 'camp-report';
  const { title, slug, publishedDate, date, coverImage, readingTime, patientsServed, category, summary, month } = item;

  return (
    <div className="group bg-white rounded-3xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-400 grid grid-cols-1 lg:grid-cols-12">
      {/* Cover Image */}
      <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100 min-h-[300px]">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
        />
        {/* Badge */}
        <span className={`absolute top-6 left-6 ${isCamp ? 'bg-accent' : 'bg-primary'} text-white font-bold text-xs px-4 py-2 rounded-full shadow-sm font-inter`}>
          {isCamp ? 'Latest Camp Report' : category}
        </span>
      </div>

      {/* Content */}
      <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs font-semibold text-text-secondary/80 font-inter mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-accent" />
            {isCamp ? date : publishedDate}
          </span>
          {isCamp ? (
            <span className="flex items-center gap-1.5 text-primary">
              <Users2 className="w-4 h-4" />
              {patientsServed} Served
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-primary">
              <Clock className="w-4 h-4" />
              {readingTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-text-primary group-hover:text-primary transition-colors duration-300 leading-tight mb-4">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h2>

        {/* Summary */}
        <p className="text-text-secondary font-inter text-base leading-relaxed mb-6">
          {summary}
        </p>

        {/* Read Button */}
        <div>
          <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3 font-semibold text-sm"
          >
            Read Full Article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
