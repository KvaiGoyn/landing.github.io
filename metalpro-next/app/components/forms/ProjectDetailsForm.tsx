'use client';

import React, { useState } from 'react';
import { useModal } from '@/app/context/AppContext';

interface ProjectDetailsModalProps {
  projectId?: string;
  projectName?: string;
  projectDescription?: string;
  projectImages?: string[];
  projectFeatures?: string[];
  projectPrice?: string;
  projectTimeline?: string;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  projectId,
  projectName,
  projectDescription,
  projectImages,
  projectFeatures,
  projectPrice,
  projectTimeline,
}) => {
  const { closeModal } = useModal();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = projectImages || [];
  const hasMultiple = images.length > 1;

  if (!images.length) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-7xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 z-20 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
          aria-label="Закрыть"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.2fr] gap-0 flex-1 min-h-0">
          {/* Левая панель с фото */}
          <div className="bg-white relative flex flex-col justify-between p-4 sm:p-6 md:p-8 min-h-0 overflow-hidden">
            <div className="flex-1 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center min-h-0">
              <img
                src={images[activeImageIndex]}
                alt={projectName}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {hasMultiple && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-4 flex-shrink-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-orange-400 shadow-lg shadow-orange-500/30 scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="aspect-square object-cover w-full" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Правая панель с текстом */}
          <div className="bg-white flex flex-col p-6 sm:p-8 min-h-0 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider">
                  Проект
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 leading-tight">{projectName}</h1>
              </div>

              <p className="text-gray-700 text-sm sm:text-base leading-7">{projectDescription}</p>

              {projectFeatures && projectFeatures.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Что включено</h3>
                  <div className="space-y-3">
                    {projectFeatures.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto pt-6">
              {projectPrice && (
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">Стоимость</div>
                  <div className="text-2xl font-bold text-orange-700 mt-2">{projectPrice}</div>
                </div>
              )}
              {projectTimeline && (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">Срок</div>
                  <div className="text-2xl font-bold text-slate-900 mt-2">{projectTimeline}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
