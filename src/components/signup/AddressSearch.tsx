import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DaumPostcode from 'react-daum-postcode';

interface AddressSearchProps {
  address: string;
  isOpen: boolean;
  onComplete: (data: any) => void;
  onClose: () => void;
}

export const AddressSearch: React.FC<AddressSearchProps> = ({
  address,
  isOpen,
  onComplete,
  onClose,
}) => {
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    onComplete({ address: fullAddress });
    onClose();
  };

  return (
    <>
      <div className="flex space-x-2">
        <Input type="text" value={address} readOnly placeholder="주소 검색을 클릭하세요" />
        <Button type="button" onClick={onClose}>주소 검색</Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg">
            <DaumPostcode
              onComplete={handleComplete}
              autoClose={false}
              style={{ width: '500px', height: '600px' }}
            />
            <Button onClick={onClose} className="mt-4">닫기</Button>
          </div>
        </div>
      )}
    </>
  );
};