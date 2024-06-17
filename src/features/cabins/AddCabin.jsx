import { useState } from 'react';

import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Trigger triggerOf="add-cabin-modal">
          <Button>Add cabin</Button>
        </Modal.Trigger>
        <Modal.Window name="add-cabin-modal">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
