import { Formik, FormikHelpers } from 'formik';
import { Button, Modal, MultiStep } from '@fsm/ui';
import { useState } from 'react';
import clsx from 'clsx';

import ProductInformation from './Form/ProductInfo';
import { getFinalPrice } from './Form/utils/Utils';
import ButtonGroup from './Form/ButtonGroup';
import PricingAndAvailability from './Form/PricingAndAvailability';

export interface IForm {
  collection_id: string;
  name: string;
  initial_price: number;
  discount: number;
  alert: number;
  description: string;
  images: File[];
  final_price: number;
  sizes_and_units?: { size: number; available_units: number }[];
  total_available_units?: number;
}

interface Props {
  header: string;
  onCancel: () => void;
  onSubmit: (params: IForm, actions: FormikHelpers<IForm>) => void;
  submitLabel: 'Add' | 'Update' | 'Delete';
  defaultValues?: Partial<IForm>;
}

interface Section {
  title: string;
  proceedLabel: string;
  onProceed: () => void;
  previousLabel?: string;
  onPrevious?: () => void;
  onCancel?: () => void;
}

export default function Form({
  defaultValues,
  header,
  submitLabel,
  onSubmit,
  onCancel,
}: Props) {
  /**
   *  Variables
   */

  const sections = {
    product_information: {
      title: 'Product Information',
      onPrevious: () => onCancel,
      onProceed: () => setActiveSection('pricing_and_availability'),
    },
    pricing_and_availability: {
      title: 'Pricing and Availability',
      onPrevious: () => setActiveSection('product_information'),
      onProceed: onSubmit,
    },
  };
  const total_steps = Object.keys(sections).length;

  /**
   * State
   */
  const [activeSection, setActiveSection] = useState<keyof typeof sections>(
    'product_information'
  );

  /**
   * Type
   */
  type TSection = (typeof sections)[keyof typeof sections];

  /**
   * Logic
   */
  const sectionKeys = Object.keys(sections);
  const currentStep = sectionKeys.findIndex((key) => key === activeSection);
  const nextDetails =
    currentStep + 1 < sectionKeys.length
      ? ((sections as any)?.[sectionKeys[currentStep + 1]] as TSection)
      : null;
  const previousDetails =
    currentStep - 1 >= 0
      ? ((sections as any)?.[sectionKeys[currentStep - 1]] as TSection)
      : null;
  const nextTitle = nextDetails?.title;
  const activeSectionDetails = sections[activeSection];
  const proceedLabel = nextDetails ? nextDetails.title : submitLabel;
  const previousLabel = previousDetails?.title;

  return (
    <MultiStep
      count={total_steps}
      currentTitle={sections[activeSection].title}
      currentStep={currentStep + 1}
      nextTitle={nextTitle}
    >
      <Formik
        validationSchema={{}}
        initialValues={{
          collection_id: defaultValues?.collection_id || '',
          name: defaultValues?.name || '',
          initial_price: defaultValues?.initial_price || 0,
          discount: defaultValues?.discount || 0,
          alert: defaultValues?.alert || 0,
          description: defaultValues?.description || '',
          images: defaultValues?.images || ([] as File[]),
          final_price: getFinalPrice(
            defaultValues?.initial_price || 0,
            defaultValues?.discount || 0
          ),
          sizes_and_units: [],
        }}
        onSubmit={() => {
          //
        }}
      >
        <div className={clsx('flex flex-col justify-between gap-6')}>
          <div className="h-[550px] overflow-y-auto">
            {activeSection === 'product_information' && <ProductInformation />}
            {activeSection === 'pricing_and_availability' && (
              <PricingAndAvailability />
            )}
          </div>

          <div className="flex justify-between">
            <Button
              className="rounded-lg"
              variant="outline-tertiary"
              onClick={() => activeSectionDetails?.onPrevious?.()}
              icon={previousLabel ? 'arrow-left' : undefined}
              direction="left"
            >
              <div className="max-w-[100px] truncate">
                {previousLabel || 'Cancel'}
              </div>
            </Button>
            <Button
              className="rounded-lg"
              icon="arrow-right"
              onClick={() =>
                activeSectionDetails.onProceed('' as any, '' as any)
              }
            >
              <div className="max-w-[100px] truncate">{proceedLabel}</div>
            </Button>
          </div>
        </div>
      </Formik>
    </MultiStep>
  );
}
