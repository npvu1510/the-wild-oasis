import { useEffect, useState } from 'react';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm({
  minBookingLength,
  maxBookingLength,
  maxGuestsPerBooking,
  breakfastPrice,
}) {
  const [minBooking, setMinBooking] = useState(minBookingLength);
  const [maxBooking, setMaxBooking] = useState(maxBookingLength);
  const [maxGuests, setMaxGuests] = useState(maxGuestsPerBooking);
  const [breakfast, setBreakfast] = useState(breakfastPrice);

  const { editSetting, isEditing } = useUpdateSetting();

  useEffect(() => {
    setMinBooking(minBookingLength);
    setMaxBooking(maxBookingLength);
    setMaxGuests(maxGuestsPerBooking);
    setBreakfast(breakfastPrice);
  }, [minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice]);
  const handleUpdate = function (e) {
    const field = e.target.id;
    const value = e.target.value;

    if (!value) return;

    editSetting({ [field]: value });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBooking}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={handleUpdate}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
