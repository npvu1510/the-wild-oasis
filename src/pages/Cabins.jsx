// import { useEffect } from "react";
// import { useEffect, useState } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import { getCabins } from '../services/apiCabins';
import CabinTable from '../features/cabins/CabinTable';
import { useState } from 'react';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable field="discount" />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
