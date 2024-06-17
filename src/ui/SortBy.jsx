import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = function (e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };
  const currentSort = searchParams.get('sortBy') || options.at(0).value;
  console.log(`currentSort: ${options.at(0).value}`);
  return (
    <Select
      value={currentSort}
      options={options}
      onChange={handleChange}
    ></Select>
  );
}

export default SortBy;
