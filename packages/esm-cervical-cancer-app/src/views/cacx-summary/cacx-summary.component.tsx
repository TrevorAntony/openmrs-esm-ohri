import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface CacxSummaryListProps {
  patientUuid: string;
}

const CacxSummaryList: React.FC<CacxSummaryListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacx_summary_header', 'CaCx Summary');
  const displayText = t('cacx_summary_display', 'CaCx Summary');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default CacxSummaryList;
