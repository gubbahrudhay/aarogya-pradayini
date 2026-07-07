import { Calendar, Image, Video, Users2, ArrowRight } from 'lucide-react';

export default function CollectionCard({ collection, onSelect }) {
  const { month, year, title, coverImage, photoCount, videoCount, patientsServed, description } = collection;

  return (
    <div className="group bg-white rounded-3xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-400 flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-border/20">
          <span className="font-poppins font-extrabold text-sm text-primary leading-none uppercase">{month}</span>
          <span className="font-inter text-[10px] font-bold text-text-secondary leading-none mt-1">{year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3 className="font-poppins font-bold text-xl text-text-primary group-hover:text-primary transition-colors duration-300 leading-snug mb-3">
          {title}
        </h3>
        <p className="text-text-secondary font-inter text-sm leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3 border-t border-b border-border py-4 mb-6 text-center">
          <div className="flex flex-col items-center">
            <Users2 className="w-4 h-4 text-primary mb-1.5" />
            <span className="font-poppins font-extrabold text-sm text-text-primary leading-none">{patientsServed}</span>
            <span className="text-[10px] font-bold text-text-secondary/70 uppercase font-inter mt-1.5">Served</span>
          </div>
          <div className="flex flex-col items-center border-l border-r border-border">
            <Image className="w-4 h-4 text-accent mb-1.5" />
            <span className="font-poppins font-extrabold text-sm text-text-primary leading-none">{photoCount}</span>
            <span className="text-[10px] font-bold text-text-secondary/70 uppercase font-inter mt-1.5">Photos</span>
          </div>
          <div className="flex flex-col items-center">
            <Video className="w-4 h-4 text-primary mb-1.5" />
            <span className="font-poppins font-extrabold text-sm text-text-primary leading-none">{videoCount}</span>
            <span className="text-[10px] font-bold text-text-secondary/70 uppercase font-inter mt-1.5">Videos</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => onSelect(month, year)}
          className="mt-auto inline-flex items-center justify-center gap-2 bg-primary/5 hover:bg-primary text-primary hover:text-white font-semibold text-sm px-5 py-2.5 rounded-2xl transition-all duration-300 font-inter w-full text-center"
        >
          View Collection
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
