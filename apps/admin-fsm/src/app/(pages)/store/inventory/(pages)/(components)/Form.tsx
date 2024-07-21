import { Button, Modal, MultiStep } from '@fsm/ui';
import { schema } from '@foreversolemates/utils';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import clsx from 'clsx';

import PricingAndAvailability from './Form/PricingAndAvailability';
import ProductInformation from './Form/ProductInfo';
import { getFinalPrice } from './Form/utils/Utils';
import { options } from '../../../../../../hooks';

export interface IForm {
  collection_id: string;
  name: string;
  initial_price: number;
  discount: number;
  alert: number;
  description: string;
  images: File[];
  final_price: number;
  available_sizes_and_units: { size: number; available_units: number }[];
  total_available_units: number;
  includes_sizes: boolean;
}

export interface SectionProps {
  setActiveSectionIsValid: React.Dispatch<React.SetStateAction<boolean>>;
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
      onPrevious: () => onCancel(),
      onProceed: () => setActiveSection('pricing_and_availability'),
    },
    pricing_and_availability: {
      title: 'Pricing and Availability',
      onPrevious: () => setActiveSection('product_information'),
      onProceed: (handleSubmit: () => void) => {
        handleSubmit();
      },
    },
  };
  const total_steps = Object.keys(sections).length;

  /**
   * Hooks
   */

  /**
   * State
   */
  const [activeSection, setActiveSection] = useState<keyof typeof sections>(
    'product_information'
  );
  const [activeSectionIsValid, setActiveSectionIsValid] = useState(false);

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
        validateOnMount
        enableReinitialize
        validationSchema={yup.object({
          name: schema.requireString('Product name'),
          collection_id: schema.requireString('Collection'),
          initial_price: schema.requireNumber('Initial price').min(1),
          total_available_units: yup
            .number()
            .min(1, 'Must be at least 1')
            .when('includes_sizes', (value, schema) => {
              if (!value)
                return schema.required('Total available units is required');
              return schema;
            }),
          alert: schema.requireNumber('Low stock indicator'),
          description: schema.requireString('Description'),
          discount: yup
            .number()
            .required('Discount is required')
            .max(100, 'Discount must not exceed 100%')
            .min(0, 'Discount cannot be lower than 0%'),
          available_sizes_and_units: yup
            .array()
            .of(
              yup.object({
                size: schema.requireNumber('Size'),
                available_units: schema.requireNumber('Available units'),
              })
            )
            .when('includes_sizes', (value, schema) => {
              if (value) {
                return schema.required('Sizes and Units are required');
              }
              return schema;
            }),
          images: yup
            .array()
            .of(
              schema.requireFile({
                field: 'image',
              })
            )
            .required('Images are required'),
        })}
        initialValues={{
          includes_sizes:
            Boolean(defaultValues?.available_sizes_and_units?.length) || false,
          collection_id: defaultValues?.collection_id || '',
          name: defaultValues?.name || '',
          initial_price: defaultValues?.initial_price,
          discount: defaultValues?.discount || 0,
          alert: defaultValues?.alert,
          description: defaultValues?.description || '',
          images: defaultValues?.images || ([] as File[]),
          total_available_units: defaultValues?.total_available_units,
          final_price: getFinalPrice(
            defaultValues?.initial_price || 0,
            defaultValues?.discount || 0
          ),
          available_sizes_and_units:
            defaultValues?.available_sizes_and_units ||
            ([] as {
              size: number;
              available_units: number;
            }[]),
        }}
        onSubmit={(params, actions) => {
          //getting total available units if product includes sizes
          const total_available_units = (() => {
            const params_units = params.total_available_units;
            const params_sizes = params.available_sizes_and_units;

            if (params_units) return params_units;
            if (params_sizes.length >= 1) {
              return params_sizes.reduce((total, current) => {
                return current.available_units + total;
              }, 0);
            }
            return 0;
          })();

          onSubmit(
            { ...params, total_available_units } as IForm,
            actions as FormikHelpers<IForm>
          );
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <div className={clsx('flex flex-col justify-between gap-6')}>
            <div className="h-[550px] overflow-y-auto">
              {activeSection === 'product_information' && (
                <ProductInformation {...{ setActiveSectionIsValid }} />
              )}
              {activeSection === 'pricing_and_availability' && (
                <PricingAndAvailability {...{ setActiveSectionIsValid }} />
              )}
            </div>

            {/* Button Group */}
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
                className={clsx('rounded-lg')}
                variant={
                  proceedLabel.toLowerCase().includes('delete')
                    ? 'alert'
                    : 'default'
                }
                icon="arrow-right"
                onClick={() => activeSectionDetails.onProceed(handleSubmit)}
                disabled={activeSectionIsValid}
                {...{ isSubmitting }}
              >
                <div className="max-w-[100px] truncate">{proceedLabel}</div>
              </Button>
            </div>
          </div>
        )}
      </Formik>
    </MultiStep>
  );
}
