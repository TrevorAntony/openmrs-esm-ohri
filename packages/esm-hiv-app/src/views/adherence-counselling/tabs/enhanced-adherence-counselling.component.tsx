import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@ohri/openmrs-esm-ohri-commons-lib';

interface EnhancedAdherenceCounsellingListProps {
  patientUuid: string;
}

const EnhancedAdherenceCounsellingList: React.FC<EnhancedAdherenceCounsellingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('enhancedAdherenceCounsellingTitle', 'Enhanced Adherence Counselling');
  const displayText = t('enhancedAdherenceCounsellingDisplay', 'Enhanced Adherence Counselling');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default EnhancedAdherenceCounsellingList;
