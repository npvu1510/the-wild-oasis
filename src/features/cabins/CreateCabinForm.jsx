// import styled from 'styled-components';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import Spinner from '../../ui/Spinner';
import FormRow from '../../ui/FormRow';

import { createEditCabin } from '../../services/apiCabins';
import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  // console.log('RENDER FORM');

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  console.log(isEditSession);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { editCabin, isEditing } = useEditCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const isLoading = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (!isEditSession)
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    else
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    // console.log(data);
  };

  if (isLoading) return <Spinner></Spinner>;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      role="form"
      type={onClose ? 'modal' : 'regular'}
    >
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: { value: true, message: 'This field is required' },
          })}
        />
      </FormRow>

      <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: { value: true, message: 'This field is required' },
            min: {
              value: 5,
              message: 'The maximum capacity must be at least 5 people',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: { value: true, message: 'This field is required' },
            min: {
              value: 50,
              message: 'The regular price must be at least 50$',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: { value: true, message: 'This field is required' },
            validate: {
              value: (value) =>
                value * 1 < getValues().regularPrice * 1 ||
                'The discount must be less than regular price',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register('description', {
            required: { value: true, message: 'This field is required' },
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register('image')} />
        {/* , {
            required: { value: true, message: ' This field is required' },
          } */}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
