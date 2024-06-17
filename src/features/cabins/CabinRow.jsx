import styled from 'styled-components';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCreateCabin from './useCreateCabin';
import useDeleteCabin from './useDeleteCabin';

//
import CreateCabinForm from './CreateCabinForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { HiDuplicate, HiTrash } from 'react-icons/hi';
import { HiPencil } from 'react-icons/hi';

//
import { deleteCabin } from '../../services/apiCabins';

import { formatCurrency } from '../../utils/helpers';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const { createCabin, isCreating } = useCreateCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const handleDuplicate = () => {
    console.log(image);
    createCabin({ name, maxCapacity, regularPrice, discount, image });
  };

  const isWorking = isCreating || isDeleting;

  if (isWorking) return;

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up tp {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>

        <Modal>
          <Menus.Menu>
            <Menus.Toggle triggerOf={cabinId} />

            <Menus.Select id={cabinId}>
              <Menus.Option icon={<HiDuplicate />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Option>

              <Modal.Trigger triggerOf="edit-cabin">
                <Menus.Option icon={<HiPencil />}>Edit</Menus.Option>
              </Modal.Trigger>

              <Modal.Trigger triggerOf="confirm-delete-cabin">
                <Menus.Option icon={<HiTrash />}>Delete</Menus.Option>
              </Modal.Trigger>
            </Menus.Select>
          </Menus.Menu>

          <Modal.Window name="edit-cabin">
            <CreateCabinForm cabinToEdit={cabin}></CreateCabinForm>
          </Modal.Window>

          <Modal.Window name="confirm-delete-cabin">
            <ConfirmDelete
              onConfirm={() => {
                deleteCabin(cabinId);
              }}
            />
          </Modal.Window>
        </Modal>
      </Table.Row>
    </>
  );
}

export default CabinRow;
