import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../..';
import {
  artLinkage,
  hivTestStatus,
  motherPostnatalEncounterType,
  pTrackerIdConcept,
  recenctViralLoad,
  visitDate,
} from '../../../constants';

interface PostnatalCareListProps {
  patientUuid: string;
}

const PostnatalCareList: React.FC<PostnatalCareListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('postnatalCare', 'Postnatal Care');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'pTrackerId',
        header: t('pTrackerId', 'PTracker Id'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, pTrackerIdConcept);
        },
      },
      {
        key: 'bookedForANC',
        header: t('bookedForANC', 'Booked for ANC'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, visitDate, true);
        },
      },
      {
        key: 'ancHivStatus',
        header: t('ancHivStatus', 'ANC HIV status results'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, hivTestStatus);
        },
      },
      {
        key: 'artInitiation',
        header: t('artInitiation', 'ART Initiation'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, artLinkage);
        },
      },
      {
        key: 'birthCount',
        header: t('birthCount', 'Birth Count'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, recenctViralLoad);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'mother_postanatal_form', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'mother_postanatal_form', package: 'maternal_health' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Edit Form'),
            mode: 'edit',
          },
        ],
      },
    ],
    [],
  );

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={motherPostnatalEncounterType}
      form={{ package: 'maternal_health', name: 'mother_postanatal_form' }}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default PostnatalCareList;