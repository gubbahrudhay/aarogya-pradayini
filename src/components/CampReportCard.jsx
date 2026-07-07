import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users2, ArrowRight } from 'lucide-react';

export default function CampReportCard({ report }) {
  const { title, slug, month, date, coverImage, patientsServed, summary, stats } = report;

  // Take the first 4 service labels for quick preview in card
  const previewServices = stats ? stats.map(s => s.label).slice(0, 5) : [];

  return (
    <article className="group bg-white rounded-3xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-400 flex flex-col h-full">
      {/* Cover Photo */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Month Badge */}
        <span className="absolute top-4 left-4 bg-accent text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm font-inter">
          {month}
        </span>
      </div>

      {/* Details */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-poppins font-bold text-xl text-text-primary group-hover:text-primary transition-colors duration-300 leading-snug mb-3">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>

        {/* Location & Date */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-text-secondary/80 font-inter mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Kalwakurthy
          </span>
        </div>

        {/* Patients Served Highlight */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-4">
          <Users2 className="w-5 h-5 text-primary" />
          <span className="font-poppins font-bold text-sm text-primary">
            {patientsServed} Patients Served
          </span>
        </div>

        {/* Short Summary */}
        <p className="text-text-secondary font-inter text-sm leading-relaxed mb-5 line-clamp-2">
          {summary}
        </p>

        {/* Services List Preview */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {previewServices.map((service, idx) => (
            <span
              key={idx}
              className="bg-bg text-text-secondary/90 font-medium font-inter text-[11px] px-2.5 py-1 rounded-md border border-border"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Button */}
        <Link
          to={`/blog/${slug}`}
          className="mt-auto inline-flex items-center justify-center gap-2 bg-primary/5 hover:bg-primary text-primary hover:text-white font-semibold text-sm px-5 py-2.5 rounded-2xl transition-all duration-300 font-inter w-full text-center"
        >
          Read Camp Report
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </article>
  );
}
