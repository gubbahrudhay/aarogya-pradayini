import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function ImageLightbox({ children }) {
  return (
    <PhotoProvider
      speed={() => 250}
      maskOpacity={0.9}
    >
      {children}
    </PhotoProvider>
  );
}

export { PhotoView };
