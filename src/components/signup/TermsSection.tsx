import React, { useEffect, useState } from 'react';
import { CustomCheckbox } from '@/components/common/CustomCheckbox';
import { Term } from '@/types/signup';

interface Props {
  terms: Term[];
  error?: string;
  onChange: (termCode: string, checked: boolean) => void;
  onAllChange: (checked: boolean) => void;
}

const TermsSection: React.FC<Props> = ({ 
  terms, 
  error, 
  onChange, 
  onAllChange 
}) => {

  const [allAgreed, setAllAgreed] = useState(false);

  const handleAllChange = (checked: boolean) => {
    setAllAgreed(checked);
    onAllChange(checked);
  };
  
  const handleTermChange = (termCode: string, checked: boolean) => {
    onChange(termCode, checked);
    const allTermsAgreed = terms.every(t => t.agreed);
    setAllAgreed(allTermsAgreed);
  };

  return (
    <div>
      <h3>약관 동의</h3>
      <div className="mb-[30px] mt-[8px]">
        <CustomCheckbox
          id="select-all"
          checked={allAgreed}
          onCheckedChange={handleAllChange}
          label="전체 동의"
        />
      </div>
      {terms.map((term) => (
        <div key={term.code} className="mb-[30px]">
          <h4>
            <span className='font-bold text-green-600'>{term.chkTerm ? '[필수]' : '[선택]'} </span>
            {term.termName} 
          </h4>
          <p>{term.shortCont}</p>
          <p className='text-gray-400'>{term.longCont}</p>
          <CustomCheckbox
            id={term.termCode}
            checked={term.agreed}
            onCheckedChange={(checked) => handleTermChange(term.termCode, checked)}
            label="동의합니다."
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ))}
    </div>
  );
};

export default TermsSection;