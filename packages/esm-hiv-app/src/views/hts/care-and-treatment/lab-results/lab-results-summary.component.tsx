import React, { useState } from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../../../../views/common.scss';
import CD4ResultsList from './Tabs/cd4-results.component';
import ViralLoadResultsList from './Tabs/viral-load-results.component';
import { useTranslation } from 'react-i18next';
import { OHRIProgrammeSummaryTiles } from '@ohri/openmrs-esm-ohri-commons-lib';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [missingCd4Count, setMissingCd4Count] = useState(0);
  const [dueForVlCount, setDueForVlCount] = useState(0);
  const [highVlCount, setHighVlCount] = useState(0);

  const tiles = [
    {
      title: t('missingCd4', 'Missing CD4'),
      linkAddress: '#',
      subTitle: t('noCd4Results', 'Patients with no CD4 result (count)'),
      value: missingCd4Count,
    },
    {
      title: t('vlDue', 'Due for VL'),
      linkAddress: '#',
      subTitle: t('noVlResults', 'Patients with no VL in the last 12 months (count)'),
      value: dueForVlCount,
    },
    {
      title: t('highVl', 'High VL'),
      linkAddress: '#',
      subTitle: t('highVlResults', 'Patients whose recent VL >1000 copies/ml (count)'),
      value: highVlCount,
    },
  ];

  return (
    <div className={styles.tabContainer}>
      <div>
        <h4 style={{ margin: '5px' }}>Lab Results</h4>
      </div>
      <OHRIProgrammeSummaryTiles tiles={tiles} />
      <Tabs type="container">
        <Tab label="CD4 Lab Results" className="tab-14rem">
          <CD4ResultsList patientUuid={patientUuid} />
        </Tab>
        <Tab label="Viral Load Results" className="tab-12rem" style={{ padding: 0 }}>
          <ViralLoadResultsList patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default LabResultsSummary;
