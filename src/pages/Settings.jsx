import Heading from '../ui/Heading';
import Spinner from '../ui/Spinner';

import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import useSettings from '../features/settings/useSetting';

function Settings() {
  console.log('RERENDER SETTINGS');
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading: isReading,
  } = useSettings();

  if (isReading) return <Spinner />;

  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm
        minBookingLength={minBookingLength}
        maxBookingLength={maxBookingLength}
        maxGuestsPerBooking={maxGuestsPerBooking}
        breakfastPrice={breakfastPrice}
      />
    </>
  );
}

export default Settings;
