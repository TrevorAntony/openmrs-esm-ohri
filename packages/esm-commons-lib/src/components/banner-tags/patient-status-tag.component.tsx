import React from 'react';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatientHivStatus } from './patientHivStatus';
import { usePatientOutcome } from './useInfantFinalOutcome';
import { usePatientFamilyNames } from './usePatientFamilyNames';

export function PatientStatusBannerTag({ patientUuid }) {
  const { t } = useTranslation();

  const { hivStatus } = usePatientHivStatus(patientUuid);

  const { patientOutcome } = usePatientOutcome(patientUuid);

  const greenOutcomes = ['Still in Care', 'HIV negative infant discharged from PMTCT'];
  const redOutcomes = ['Confirmed HIV positive', 'Lost to follow up', 'Dead', 'Transferred out'];

  let outcomeTagColor = '';
  if (greenOutcomes.includes(patientOutcome)) {
    outcomeTagColor = 'green';
  } else if (redOutcomes.includes(patientOutcome)) {
    outcomeTagColor = 'red';
  }

  const { childrenNames, motherName, patientGender, isLoading, isError } = usePatientFamilyNames(patientUuid);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <div>Error fetching family information</div>;
  }

  return (
    <>
      {hivStatus === 'positive' && <Tag type="red">{t('hivPositive', 'HIV Positive')}</Tag>}
      {hivStatus === 'negative' && <Tag type="green">{t('hivNegative', 'HIV Negative')}</Tag>}

      {patientOutcome && outcomeTagColor && <Tag type={outcomeTagColor}>{patientOutcome}</Tag>}

      {motherName && <Tag type="purple">Mother: {motherName}</Tag>}

      {patientGender === 'F' && childrenNames.length > 0 && (
        <Tag type="purple">Children: {childrenNames.join('     ||     ')}</Tag>
      )}
    </>
  );
}
