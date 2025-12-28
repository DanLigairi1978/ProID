
import React from 'react';
import { CardConfig, PlayerData, CardFormat } from '../types';
import { IdCardFront } from './IdCardFront';
import { IdCardBack } from './IdCardBack';

interface IdCardPreviewProps {
  playerData: PlayerData;
  cardConfig: CardConfig;
  frontCardRef: React.RefObject<HTMLDivElement>;
  backCardRef: React.RefObject<HTMLDivElement>;
}

const getCardDimensions = (format: CardFormat) => {
    switch(format) {
        case CardFormat.CR79:
            return 'w-[300px] h-[180px] sm:w-[320px] sm:h-[192px]';
        case CardFormat.CR100:
            return 'w-[360px] h-[216px] sm:w-[380px] sm:h-[228px]';
        case CardFormat.CR80:
        default:
            return 'w-[340px] h-[204px] sm:w-[360px] sm:h-[216px]';
    }
};

export const IdCardPreview: React.FC<IdCardPreviewProps> = ({
  playerData,
  cardConfig,
  frontCardRef,
  backCardRef,
}) => {
  const dimensions = getCardDimensions(cardConfig.cardFormat);

  return (
    <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-4 lg:gap-8">
      <div className={`${dimensions} transform transition-all duration-300`}>
        <IdCardFront ref={frontCardRef} playerData={playerData} cardConfig={cardConfig} />
      </div>
      <div className={`${dimensions} transform transition-all duration-300`}>
        <IdCardBack ref={backCardRef} playerData={playerData} cardConfig={cardConfig} />
      </div>
    </div>
  );
};
