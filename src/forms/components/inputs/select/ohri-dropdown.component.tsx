import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'carbon-components-react';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRIFormFieldProps } from '../../../types';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';
import styles from '../_input.scss';
import { isTrue } from '../../../utils/boolean-utils';
import { getConceptNameAndUUID } from '../../../utils/ohri-form-helper';
import { fieldRequiredErrCode } from '../../../validators/ohri-form-validator';

const OHRIDropdown: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [items, setItems] = React.useState([]);
  const [errors, setErrors] = useState([]);
  const [conceptName, setConceptName] = useState('Loading...');
  const isFieldRequiredError = useMemo(() => errors[0]?.errCode == fieldRequiredErrCode, [errors]);

  useEffect(() => {
    if (question['submission']?.errors) {
      setErrors(question['submission']?.errors);
    }
  }, [question['submission']]);

  const handleChange = value => {
    setFieldValue(question.id, value);
    onChange(question.id, value, setErrors);
    question.value = handler.handleFieldSubmission(question, value, encounterContext);
  };

  const itemToString = item => {
    const answer = question.questionOptions.answers.find(opt => (opt.value ? opt.value == item : opt.concept == item));
    return answer?.label;
  };
  useEffect(() => {
    setItems(question.questionOptions.answers.map(item => item.value || item.concept));
  }, [question.questionOptions.answers]);

  useEffect(() => {
    getConceptNameAndUUID(question.questionOptions.concept).then(conceptTooltip => {
      setConceptName(conceptTooltip);
    });
  }, [conceptName]);

  return encounterContext.sessionMode == 'view' || isTrue(question.readonly) ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} tooltipText={conceptName} />
      {field.value ? <OHRIValueDisplay value={handler.getDisplayValue(question, field.value)} /> : <OHRIValueEmpty />}
    </div>
  ) : (
    !question.isHidden && (
      <div className={styles.formInputField}>
        <div
          className={
            isFieldRequiredError ? `${styles.errorLabel} ${styles.dropDownOverride}` : styles.dropDownOverride
          }>
          <Dropdown
            id={question.id}
            titleText={question.label}
            label="Choose an option"
            items={items}
            itemToString={itemToString}
            selectedItem={field.value}
            onChange={({ selectedItem }) => handleChange(selectedItem)}
            disabled={question.disabled}
            invalid={!isFieldRequiredError && errors.length > 0}
            invalidText={errors.length && errors[0].errMessage}
          />
        </div>
      </div>
    )
  );
};

export default OHRIDropdown;
