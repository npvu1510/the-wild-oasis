import Heading from '../ui/Heading';
import Spinner from '../ui/Spinner';

import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import useSettings from '../features/settings/useSetting';

function Settings() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isFetching,
  } = useSettings();

  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
      {isFetching && <Spinner />}
      {!isFetching && (
        <>
          <UpdateSettingsForm
            minBookingLength={minBookingLength}
            maxBookingLength={maxBookingLength}
            maxGuestsPerBooking={maxGuestsPerBooking}
            breakfastPrice={breakfastPrice}
          />
        </>
      )}
    </>
  );
}

export default Settings;
