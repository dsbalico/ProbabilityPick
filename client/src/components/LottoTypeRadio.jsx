import React from 'react';

function LottoTypeRadio({ type, label, lottoType, setResult, setLottoType }) {
    const handleChange = () => {
        setResult(['?', '?', '?', '?', '?', '?'])
        setLottoType(type);
    };

    return (
        <div className='flex gap-1 sm:gap-2 justify-center'>
            <input className='self-center checked:accent-orange-600 cursor-pointer'
                type='radio' name='lotto_type'
                checked={lottoType === type}
                onChange={() => handleChange() } />

            <label className='self-center font-medium tracking-tight text-xs'>{label}</label>
        </div>
    )
}

export default LottoTypeRadio