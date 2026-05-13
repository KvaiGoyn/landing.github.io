'use client';

import React from 'react';
import { useModal } from '@/app/context/AppContext';
import { Modal } from '@/app/components/ui/Modal/Modal';
import CallbackForm from '@/app/components/forms/CallbackForm';
import ConsultationForm from '@/app/components/forms/ConsultationForm';
import CalculationForm from '@/app/components/forms/CalculationForm';
import MeasurementForm from '@/app/components/forms/MeasurementForm';
import ContactForm from '@/app/components/forms/ContactForm';
import OrderForm from '@/app/components/forms/OrderForm';
import ProjectDetailsModal from '@/app/components/forms/ProjectDetailsForm';

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
      <ProjectDetailsModal
        projectId={modalData?.projectId}
        projectName={modalData?.projectName}
        projectDescription={modalData?.projectDescription}
        projectImages={modalData?.projectImages}
        projectFeatures={modalData?.projectFeatures}
        projectPrice={modalData?.projectPrice}
        projectTimeline={modalData?.projectTimeline}
      />
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
        {renderModalContent()}
      </div>
    </Modal>
  );
};

export default ModalManager;