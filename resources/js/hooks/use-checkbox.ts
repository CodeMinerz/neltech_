// resources/js/hooks/useCheckbox.ts
import { useState, useCallback } from 'react';

const useCheckbox = <T>(initialValues: T[]) => {
    const [values, setValues] = useState<T[]>(initialValues);

    const handleCheckboxChange = useCallback(
        (value: T, checked: boolean) => {
            if (checked) {
                setValues((prevValues) => [...prevValues, value]);
            } else {
                setValues((prevValues) => prevValues.filter((item) => item !== value));
            }
        },
        [setValues]
    );

    return { values, handleCheckboxChange, setValues };
};

export default useCheckbox;