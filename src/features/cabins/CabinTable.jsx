import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabin from './useCabin';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  console.log('re-render CabinTable');
  let { cabins, isLoading, error } = useCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner></Spinner>;
  if (!cabins) return <Empty resource="cabin"></Empty>;

  // 1. FILTER
  let filteredCabins = cabins;
  const filterValue = searchParams.get('discount') || 'all';

  if (filterValue === 'with-discount')
    filteredCabins = filteredCabins.filter((cabin) => cabin.discount !== 0);
  else if (filterValue === 'no-discount')
    filteredCabins = filteredCabins.filter((cabin) => cabin.discount === 0);

  // 2. SORT
  let sortedCabins = filteredCabins;
  const sortValue = searchParams.get('sortBy') || '';

  console.log(sortValue);
  console.log(filteredCabins);

  const [sortField, direction] = sortValue.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const compareNumber = (a, b) => (a[sortField] - b[sortField]) * modifier;

  const compareName = (a, b) => a.name.localeCompare(b.name) * modifier;

  sortedCabins = sortedCabins.sort(
    sortField === 'name' ? compareName : compareNumber
  );
  console.log(sortedCabins);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
        {/* {error && <p>{error.message}</p>}
      {isLoading && <Spinner />} */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
