import React, {useEffect, useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DataTable} from '../../components/molecules/DataTable';
import {DataTableStructureItem} from '../../components/molecules/DataTable/dataTable.types';
import {getCargoTypeMeasureUnitsTranslation} from '../../utils/specificTranslations.utils';
import {citiesSlice} from '../../store/cities/cities.slice';
import {City} from '../../types/city.types';
import {vehiclesSlice} from '../../store/vehicles/vehicles.slice';
import {RawVehicle, Vehicle} from '../../types/vehicle.types';
import VehicleForm from './parts/VehicleForm';

function getTableStructure (citiesHash: Record<string, City>): DataTableStructureItem[] {
  return [
    {
      title: 'Vehicle',
      relatedFieldName: 'title',
    },
    {
      title: 'Capacity',
      renderCell: (item) => {
        const vehicle = item as Vehicle;
        return vehicle.cargoSize;
      },
    },
    {
      title: 'Cargo type',
      renderCell: (item) => {
        const vehicle = item as Vehicle;
        return getCargoTypeMeasureUnitsTranslation(vehicle.cargoType);
      },
    },
    {
      title: 'Assigned to...',
      renderCell: (item) => {
        const vehicle = item as Vehicle;
        return citiesHash[vehicle.currentCity];
      },
    },
  ];
}

enum FORM_MODES {
  REST = 'rest',
  EDIT = 'edit',
  ADD = 'add',
}

const IS_REMOVABLE_CHECK_MOCK = () => true;
const IS_EDITABLE_CHECK_MOCK = () => true;

export function VehiclesListPage () {
  const dispatch = useDispatch();
  const vehicles = useSelector(vehiclesSlice.selectors.getVehicles);
  const citiesHash = useSelector(citiesSlice.selectors.getCitiesHash);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | Partial<RawVehicle> | null>(null);
  const [mode, setMode] = useState(FORM_MODES.REST);

  const tableStructure = useMemo(() => {
    return getTableStructure(citiesHash);
  }, [citiesHash]);

  const handleEditItemClick = (uuid: string) => {
    const vehicleToEdit = vehicles.find((vehicle) => (vehicle.uuid === uuid));
    setMode(FORM_MODES.EDIT);
    setVehicleToEdit(vehicleToEdit as Vehicle);
  };

  const handleAddItemClick = () => {
    setMode(FORM_MODES.ADD);
    setVehicleToEdit({});
  };

  const handleRemoveItemClick = (uuid: string) => {
    const itemToRemove = vehicles.find((vehicle) => (vehicle.uuid === uuid));
    itemToRemove && dispatch(vehiclesSlice.actions.deleteVehicle(itemToRemove));
    if (vehicleToEdit !== null && 'uuid' in vehicleToEdit && vehicleToEdit.uuid === uuid) {
      setVehicleToEdit(null);
      setMode(FORM_MODES.REST);
    }
  };

  const handleFormClose = () => {
    setVehicleToEdit(null);
    setMode(FORM_MODES.REST);
  };

  const handleFormSubmit = async (vehicle: Vehicle | RawVehicle) => {
    if (mode === FORM_MODES.EDIT) {
      await dispatch(vehiclesSlice.actions.updateVehicle(vehicle as Vehicle));
    }
    if (mode === FORM_MODES.ADD) {
      await dispatch(vehiclesSlice.actions.createVehicle(vehicle as RawVehicle));
    }
    setVehicleToEdit(null);
    setMode(FORM_MODES.REST);
  };

  useEffect(() => {
    dispatch(vehiclesSlice.actions.loadVehicles());
  }, [dispatch]);

  return (
    <>
      {mode !== FORM_MODES.REST && vehicleToEdit !== null && (
        <VehicleForm
          vehicle={vehicleToEdit}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}
      <DataTable
        items={vehicles}
        uniqueFieldName={'uuid'}
        structure={tableStructure}
        noDataString={'No vehicles presented. Please, add new one'}
        onRemoveItemClick={handleRemoveItemClick}
        isRemovableItem={IS_REMOVABLE_CHECK_MOCK}
        onEditItemClick={handleEditItemClick}
        isEditableItem={IS_EDITABLE_CHECK_MOCK}
        onAddItemClick={handleAddItemClick}
      />
    </>
  )
}
