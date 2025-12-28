import React, { forwardRef } from 'react';
import { CardConfig, PlayerData } from '../types';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';

interface IdCardBackProps {
  playerData: PlayerData;
  cardConfig: CardConfig;
}

export const IdCardBack = forwardRef<HTMLDivElement, IdCardBackProps>(({ playerData, cardConfig }, ref) => {
    const { teamName } = playerData;
    const { secondaryColor } = cardConfig;

    return (
        <div ref={ref} className="w-full h-full rounded-xl shadow-2xl bg-white text-gray-800 p-4 flex flex-col text-[8px] leading-snug">
            <div className="flex-grow">
                <h4 className="font-bold text-center text-[10px] mb-1">Player Code of Conduct</h4>
                <ul className="space-y-1 list-disc list-inside">
                    <li>
                        <span className="font-bold">Membership:</span> Valid for the current season only.
                    </li>
                    <li>
                        <span className="font-bold">Conduct:</span> Holder agrees to abide by World Rugby Code of Conduct and club bylaws.
                    </li>
                    <li>
                        <span className="font-bold">Liability:</span> {teamName.toUpperCase()} is not responsible for injury or loss of property.
                    </li>
                    <li>
                        <span className="font-bold">Verification:</span> This card is club property and must be surrendered upon termination of membership.
                    </li>
                </ul>
            </div>
            
            {(playerData.twitterHandle || playerData.instagramHandle) && (
                <div className="my-2 text-[7px] space-y-1">
                    {playerData.twitterHandle && (
                        <div className="flex items-center space-x-1">
                            <TwitterIcon className="w-3 h-3 flex-shrink-0" style={{ color: secondaryColor }} />
                            <span>{playerData.twitterHandle}</span>
                        </div>
                    )}
                    {playerData.instagramHandle && (
                        <div className="flex items-center space-x-1">
                            <InstagramIcon className="w-3 h-3 flex-shrink-0" style={{ color: secondaryColor }} />
                            <span>{playerData.instagramHandle}</span>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-between items-end">
                <div className="w-2/3">
                    <div className="font-bold text-gray-400">X</div>
                    <div className="w-full h-[1px] bg-gray-800"></div>
                    <p className="text-center font-bold text-[7px]">PLAYER SIGNATURE</p>
                </div>
                <div className="w-1/3 flex justify-end">
                    <QrCodeIcon className="w-14 h-14" style={{ color: secondaryColor }} />
                </div>
            </div>
            <div className="w-full h-6 bg-gray-800 mt-2 -mx-4 -mb-4"></div>
        </div>
    );
});