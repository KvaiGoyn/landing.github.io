'use client';

import React, { Suspense, lazy } from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Modal } from '@/app/components/ui/Modal/Modal';

// Динамические импорты для форм (загружаются только при открытии модального окна)
const CallbackForm = lazy(() => import('@/app/components/forms/CallbackForm'));
const ConsultationForm = lazy(() => import('@/app/components/forms/ConsultationForm'));
const CalculationForm = lazy(() => import('@/app/components/forms/CalculationForm'));
const MeasurementForm = lazy(() => import('@/app/components/forms/MeasurementForm'));
const ContactForm = lazy(() => import('@/app/components/forms/ContactForm'));
const OrderForm = lazy(() => import('@/app/components/forms/OrderForm'));
const ProjectDetailsModal = lazy(() => import('@/app/components/forms/ProjectDetailsForm'));

// Компонент-загрузчик для динамических импортов
const FormLoader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * Компонент для управления всеми модальными окнами с формами
 */
const ModalManager: React.FC = () => {
  const { activeModal, modalData, closeModal } = useModal();

  const getModalTitle = (modalType: string) => {
    switch (modalType) {
      case 'callback':
        return '';
      case 'consultation':
        return '';
      case 'calculation':
        return '';
      case 'measurement':
        return '';
      case 'contact':
        return '';
      case 'order':
        return '';
      case 'project-details':
        return `Детали проекта: ${modalData?.projectName || 'Проект'}`;
      default:
        return 'Форма';
    }
  };

  const getModalSize = (modalType: string) => {
    switch (modalType) {
      case 'callback':
      case 'calculation':
      case 'consultation':
      case 'measurement':
      case 'contact':
        return 'sm';
      case 'order':
        return 'md';
      case 'project-details':
        return 'lg';
      default:
        return 'md';
    }
  };

  const getModalContentClassName = (modalType: string) => {
    switch (modalType) {
      // Для простых форм используем размер sm (max-w-2xl)
      // Дополнительные классы не нужны
      default:
        return '';
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'callback':
        return <CallbackForm onSuccess={closeModal} />;
      case 'consultation':
        return <ConsultationForm onSuccess={closeModal} defaultService={modalData?.service} />;
      case 'calculation':
        return <CalculationForm onSuccess={closeModal} />;
      case 'measurement':
        return <MeasurementForm onSuccess={closeModal} />;
      case 'contact':
        return <ContactForm onSuccess={closeModal} />;
      case 'order':
        return <OrderForm onSuccess={closeModal} defaultService={modalData?.service} />;
      default:
        return null;
    }
  };

  if (!activeModal) {
    return null;
  }

  if (activeModal === 'project-details') {
    return (
      <Suspense fallback={<FormLoader />}>
        <ProjectDetailsModal
          projectId={modalData?.projectId}
          projectName={modalData?.projectName}
          projectDescription={modalData?.projectDescription}
          projectImages={modalData?.projectImages}
          projectFeatures={modalData?.projectFeatures}
          projectPrice={modalData?.projectPrice}
          projectTimeline={modalData?.projectTimeline}
        />
      </Suspense>
    );
  }

  return (
    <Modal
      isOpen={!!activeModal}
      onClose={closeModal}
      title={getModalTitle(activeModal)}
      size={getModalSize(activeModal)}
      contentClassName={getModalContentClassName(activeModal)}
      position="center"
      closeOnOverlayClick={true}
      closeOnEsc={true}
      showCloseButton={true}
    >
      <div className="max-h-[80vh] overflow-y-auto p-6">
        <Suspense fallback={<FormLoader />}>
          {renderModalContent()}
        </Suspense>
      </div>
    </Modal>
  );
};

export default ModalManager;